export const DEFAULT_RULES = [
  {
    id: 'rule-burstable-fit',
    name: 'Smart Money Saver (Low-Traffic / Flexible Workloads)',
    category: 'Cost Optimization',
    enabled: true,
    severity: 'info',
    description: 'If your application needs up to 4 CPU Cores and 16 GB Memory, we recommend flexible "Burstable" servers (like AWS T3). They give you full power when you get sudden user visits, but save you up to 60% on your monthly bill when idle!',
    condition: (input) => input.vcpu <= 4 && input.ram <= 16 && (input.workload === 'general_web' || input.budgetPriority === 'cost'),
    applyWeight: (instance) => {
      if (instance.burstable) return +25;
      return 0;
    },
    reason: '💡 Great Budget Fit: Fits your CPU & memory needs while using flexible capacity to save up to 60% on monthly hosting costs!'
  },
  {
    id: 'rule-memory-heavy-db',
    name: 'High-Memory Database Protection Rule',
    category: 'Database & Fast Memory',
    enabled: true,
    severity: 'warning',
    description: 'Databases (like MySQL, PostgreSQL, or Redis) need lots of short-term Memory (RAM) so user queries load instantly without freezing your server.',
    condition: (input) => input.workload === 'relational_db' || (input.ram / Math.max(1, input.vcpu)) >= 6.0,
    applyWeight: (instance) => {
      if (instance.familyCategory === 'memory') return +40;
      if (instance.familyCategory === 'compute') return -30;
      return 0;
    },
    reason: '⚡ Extra RAM Booster: Databases store information in fast memory. This server family provides 4x to 8x more RAM per processor core to keep your data loading fast!'
  },
  {
    id: 'rule-compute-bound',
    name: 'High-Speed CPU Computing Rule',
    category: 'Heavy Computation',
    enabled: true,
    severity: 'info',
    description: 'If your server does lots of math calculations, video converting, or code compiling, this rule picks servers with maximum CPU clock speed.',
    condition: (input) => input.workload === 'compute_heavy',
    applyWeight: (instance) => {
      if (instance.familyCategory === 'compute') return +35;
      return 0;
    },
    reason: '🚀 Maximum Processing Speed: This server family gives you ultra-fast CPU clock speeds for heavy calculations and processing.'
  },
  {
    id: 'rule-gpu-acceleration',
    name: 'Artificial Intelligence & GPU Accelerator Rule',
    category: 'AI & Smart Models',
    enabled: true,
    severity: 'important',
    description: 'AI models, ChatGPT-style LLMs, and image generators require special Graphics Cards (GPUs) to process smart requests quickly.',
    condition: (input) => input.workload === 'ai_ml_inference',
    applyWeight: (instance) => {
      if (instance.gpu || instance.familyCategory === 'gpu') return +50;
      return -20;
    },
    reason: '🤖 Dedicated AI Graphics Chip: Equipped with an NVIDIA graphics card built specifically for running AI models fast.'
  },
  {
    id: 'rule-high-iops-storage',
    name: 'Ultra-Fast Disk Speed Rule',
    category: 'Disk Read/Write',
    enabled: true,
    severity: 'warning',
    description: 'When handling massive disk reading and writing, standard hard drives cause bottlenecks. This rule selects fast SSD drives.',
    condition: (input) => input.iops >= 20000 || input.storageType === 'NVMe SSD',
    applyWeight: (instance) => {
      if (instance.familyCategory === 'storage' || instance.defaultStorageType === 'NVMe SSD') return +45;
      return 0;
    },
    reason: '💾 Blazing Fast SSD Storage: Uses high-speed NVMe solid-state storage so saving and loading large files happens instantly.'
  },
  {
    id: 'rule-sustained-enterprise',
    name: 'Guaranteed 24/7 Dedicated Power Rule',
    category: 'High Traffic Stability',
    enabled: true,
    severity: 'info',
    description: 'For large systems or non-stop high traffic, this rule guarantees dedicated CPU power that never slows down or gets throttled.',
    condition: (input) => input.vcpu >= 8 || input.ram >= 32 || input.trafficPattern === 'high_steady',
    applyWeight: (instance) => {
      if (instance.burstable) return -30;
      if (instance.familyCategory === 'general' && !instance.burstable) return +20;
      return 0;
    },
    reason: '🛡️ 100% Dedicated Server Power: Gives your business guaranteed, unthrottled processor cores for 24/7 steady traffic.'
  }
];
