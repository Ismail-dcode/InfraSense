import { CLOUD_INSTANCES, DATABASE_SERVICES, STORAGE_SERVICES, SERVERLESS_SERVICES } from '../data/cloudDatabase';

/**
 * 1. Virtual Compute Instance Evaluator
 */
export function evaluateCloudRequirements(input, activeRules = []) {
  const {
    vcpu = 2,
    ram = 2,
    storageGB = 100,
    storageType = 'gp3',
    iops = 3000,
    workload = 'general_web',
    provider = 'all',
    budgetPriority = 'balanced',
    trafficPattern = 'steady'
  } = input;

  const filteredCatalog = CLOUD_INSTANCES.filter(inst => {
    if (provider !== 'all' && inst.provider !== provider) return false;
    return true;
  });

  const evaluatedResults = filteredCatalog.map(instance => {
    let baseScore = 50;
    const triggeredRules = [];

    const cpuRatio = instance.vCPU / vcpu;
    const ramRatio = instance.ramGB / ram;

    if (instance.vCPU < vcpu) {
      baseScore -= (vcpu - instance.vCPU) * 20;
    } else {
      if (cpuRatio >= 1 && cpuRatio <= 2) baseScore += 15;
      else if (cpuRatio > 2) baseScore += 5;
    }

    if (instance.ramGB < ram) {
      baseScore -= (ram - instance.ramGB) * 15;
    } else {
      if (ramRatio >= 1 && ramRatio <= 2) baseScore += 15;
      else if (ramRatio > 2) baseScore += 5;
    }

    activeRules.forEach(rule => {
      if (!rule.enabled) return;

      try {
        const isMatched = rule.condition({
          vcpu,
          ram,
          storageGB,
          storageType,
          iops,
          workload,
          provider,
          budgetPriority,
          trafficPattern
        });

        if (isMatched) {
          const weightDelta = rule.applyWeight(instance);
          if (weightDelta !== 0) {
            baseScore += weightDelta;
            triggeredRules.push({
              ruleId: rule.id,
              ruleName: rule.name,
              category: rule.category,
              severity: rule.severity,
              impact: weightDelta > 0 ? `+${weightDelta} Score` : `${weightDelta} Score`,
              reason: rule.reason
            });
          }
        }
      } catch (err) {
        console.warn(`Error evaluating rule ${rule.id}:`, err);
      }
    });

    if (budgetPriority === 'cost') {
      const costBonus = Math.max(0, 30 - instance.monthlyEstimate * 0.1);
      baseScore += costBonus;
    } else if (budgetPriority === 'performance') {
      if (!instance.burstable) baseScore += 15;
      if (instance.maxIops >= 12000) baseScore += 10;
    }

    const cpuMatchPct = Math.min(100, Math.round((instance.vCPU / vcpu) * 100));
    const ramMatchPct = Math.min(100, Math.round((instance.ramGB / ram) * 100));
    const finalScore = Math.max(0, Math.min(99, Math.round(baseScore)));

    return {
      instance,
      score: finalScore,
      triggeredRules,
      metrics: {
        cpuMatchPct,
        ramMatchPct,
        exactHardwareFit: instance.vCPU >= vcpu && instance.ramGB >= ram
      }
    };
  });

  evaluatedResults.sort((a, b) => b.score - a.score);

  const topMatch = evaluatedResults.find(r => r.metrics.exactHardwareFit) || evaluatedResults[0];
  const exactFits = evaluatedResults.filter(r => r.metrics.exactHardwareFit);
  const budgetPick = [...exactFits].sort((a, b) => a.instance.monthlyEstimate - b.instance.monthlyEstimate)[0] || topMatch;
  const perfPick = [...exactFits].sort((a, b) => (b.instance.vCPU + b.instance.ramGB) - (a.instance.vCPU + a.instance.ramGB))[0] || topMatch;

  return {
    primary: topMatch,
    budgetPick,
    perfPick,
    allMatches: evaluatedResults,
    totalEvaluated: evaluatedResults.length
  };
}

/**
 * 2. Managed Database Service Evaluator with Hardware Sizing & Extended Rules
 */
export function evaluateDatabaseRequirements(input) {
  const {
    dbEngine = 'postgres',
    vcpu = 2,
    ram = 16,
    dataSizeGB = 100,
    multiAZ = true,
    provider = 'all'
  } = input;

  const catalog = DATABASE_SERVICES.filter(db => provider === 'all' || db.provider === provider);

  const scored = catalog.map(db => {
    let score = 65;
    const reasons = [];

    // Rule 1: Engine Alignment Rule
    if (dbEngine === 'redis' && db.serviceType.includes('Cache')) {
      score += 30;
      reasons.push('⚡ Rule Matched (In-Memory Cache): ElastiCache Redis stores all keys in RAM for sub-millisecond speed.');
    } else if (dbEngine === 'nosql' && db.serviceType.includes('NoSQL')) {
      score += 30;
      reasons.push('📱 Rule Matched (Serverless NoSQL): DynamoDB handles massive concurrent reads & writes with zero server tuning.');
    } else if (dbEngine === 'aurora' && db.serviceType.includes('Serverless')) {
      score += 30;
      reasons.push('🔄 Rule Matched (Auto-Scaling Serverless): Aurora Serverless v2 scales vCPUs and RAM up/down dynamically.');
    } else if (dbEngine === 'postgres' && db.serviceType.includes('Relational')) {
      score += 20;
      reasons.push('🛡️ Rule Matched (Managed Relational DB): Handles automated daily backups, multi-AZ failover, and point-in-time recovery.');
    }

    // Rule 2: Hardware Capacity Rule (vCPU & RAM fit)
    if (typeof db.vCPU === 'number') {
      if (db.vCPU >= vcpu) score += 15;
      else score -= (vcpu - db.vCPU) * 10;
    }
    if (typeof db.ramGB === 'number') {
      if (db.ramGB >= ram) {
        score += 15;
        reasons.push(`⚡ Rule Matched (RAM Buffer Fit): ${db.ramGB} GB RAM meets your ${ram} GB buffer pool target.`);
      } else {
        score -= (ram - db.ramGB) * 5;
      }
    }

    // Rule 3: Multi-AZ High Availability Rule
    if (multiAZ && db.multiAZ) {
      score += 15;
      reasons.push('🛡️ Rule Matched (Multi-AZ Failover): Replicates data synchronously to a secondary Availability Zone for 99.99% SLA.');
    }

    // Rule 4: Data Storage Capacity Rule
    if (dataSizeGB >= 500 && db.serviceType.includes('Aurora')) {
      score += 15;
      reasons.push('💾 Rule Matched (Distributed Storage): Aurora distributed storage auto-expands up to 128 TB without downtime.');
    }

    return {
      service: db,
      score: Math.max(0, Math.min(99, Math.round(score))),
      reasons
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return {
    primary: scored[0] || { service: DATABASE_SERVICES[0], score: 90, reasons: [] },
    allOptions: scored
  };
}

/**
 * 3. Cloud Storage Service Evaluator
 */
export function evaluateStorageRequirements(input) {
  const { storageTypeNeeded = 'object', volumeGB = 500, accessFrequency = 'hot', provider = 'all' } = input;

  const catalog = STORAGE_SERVICES.filter(st => provider === 'all' || st.provider === provider);

  const scored = catalog.map(st => {
    let score = 70;
    const reasons = [];

    const monthlyCost = st.costPerGB * volumeGB;

    if (accessFrequency === 'hot' && st.name.includes('Standard')) {
      score += 25;
      reasons.push('⚡ Rule Matched (Hot Access): Standard S3 tier provides millisecond retrieval for active user files.');
    } else if (accessFrequency === 'archive' && st.name.includes('Glacier')) {
      score += 30;
      reasons.push('💵 Rule Matched (Cold Archive): Glacier cuts monthly storage costs by over 80% for compliance backups.');
    } else if (storageTypeNeeded === 'nfs' && st.name.includes('EFS')) {
      score += 25;
      reasons.push('📁 Rule Matched (Shared NFS): EFS allows thousands of server nodes to share the same file system.');
    }

    return {
      service: st,
      score: Math.min(99, score),
      estimatedMonthlyCost: monthlyCost,
      reasons
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return {
    primary: scored[0] || { service: STORAGE_SERVICES[0], score: 90, estimatedMonthlyCost: volumeGB * 0.023, reasons: [] },
    allOptions: scored
  };
}

/**
 * 4. Serverless & Container Service Evaluator
 */
export function evaluateServerlessRequirements(input) {
  const { workloadType = 'api' } = input;

  const catalog = SERVERLESS_SERVICES;

  const scored = catalog.map(srv => {
    let score = 75;
    const reasons = [];

    if (workloadType === 'function' && srv.name.includes('Lambda')) {
      score += 20;
      reasons.push('⚡ Rule Matched (Event-Driven Functions): Lambda executes code per request with zero server maintenance.');
    } else if (workloadType === 'container' && (srv.name.includes('Fargate') || srv.name.includes('Cloud Run'))) {
      score += 20;
      reasons.push('🐳 Rule Matched (Serverless Docker): Runs containers without managing EC2 clusters or Kubernetes nodes.');
    }

    return {
      service: srv,
      score: Math.min(99, score),
      reasons
    };
  });

  scored.sort((a, b) => b.score - a.score);

  return {
    primary: scored[0] || { service: SERVERLESS_SERVICES[0], score: 92, reasons: [] },
    allOptions: scored
  };
}
