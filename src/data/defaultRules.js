export const DEFAULT_RULES = [
  {
    id: 'rule-burstable-fit',
    name: 'Smart Money Saver (Low-Traffic / Flexible Workloads)',
    category: 'Cost Optimization',
    enabled: true,
    severity: 'info',
    description: 'If your application needs up to 4 CPU Cores and 16 GB Memory, we recommend flexible "Burstable" servers (AWS T3, Azure B-series, GCP E2). They give you full power when user traffic spikes, saving up to 60% when idle!',
    condition: (input) => input.vcpu <= 4 && input.ram <= 16 && (input.workload === 'general_web' || input.budgetPriority === 'cost'),
    applyWeight: (instance) => {
      if (instance.burstable) return +25;
      return 0;
    },
    reason: '💡 Great Budget Fit: Fits your CPU & memory needs while using flexible capacity to save up to 60% on monthly hosting costs across AWS, Azure, and GCP!'
  },
  {
    id: 'rule-memory-heavy-db',
    name: 'High-Memory Database Protection Rule',
    category: 'Database & Fast Memory',
    enabled: true,
    severity: 'warning',
    description: 'Databases (MySQL, PostgreSQL, Redis, SQL Server) require high RAM per vCPU (AWS R6i, Azure E-series, GCP N2 HighMem) so queries execute instantly in memory without freezing.',
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
    description: 'If your server handles math calculations, video converting, or code compiling, this rule selects high clock speed compute instances (AWS C6i, Azure F-series, GCP C2).',
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
    description: 'AI models, ChatGPT-style LLMs, PyTorch, and image generators require dedicated Graphics Cards (AWS G4dn, Azure NC-series, GCP G2) to process requests fast.',
    condition: (input) => input.workload === 'ai_ml_inference',
    applyWeight: (instance) => {
      if (instance.gpu || instance.familyCategory === 'gpu') return +50;
      return -20;
    },
    reason: '🤖 Dedicated AI Graphics Chip: Equipped with an NVIDIA graphics card built specifically for running AI models and deep learning inference fast.'
  },
  {
    id: 'rule-high-iops-storage',
    name: 'Ultra-Fast Disk Speed Rule',
    category: 'Disk Read/Write',
    enabled: true,
    severity: 'warning',
    description: 'Massive log aggregation and database disk writes require high IOPS. This rule selects NVMe SSD storage instances (AWS EBS gp3/NVMe, Azure L-series, GCP N2D Local SSD).',
    condition: (input) => input.iops >= 20000 || input.storageType === 'NVMe SSD' || input.workload === 'storage_io_heavy',
    applyWeight: (instance) => {
      if (instance.familyCategory === 'storage' || instance.defaultStorageType === 'NVMe SSD') return +45;
      return 0;
    },
    reason: '💾 Blazing Fast SSD Storage: Uses high-speed NVMe solid-state storage so saving and loading large files and logs happens instantly.'
  },
  {
    id: 'rule-sustained-enterprise',
    name: 'Guaranteed 24/7 Dedicated Power Rule',
    category: 'High Traffic Stability',
    enabled: true,
    severity: 'info',
    description: 'For enterprise systems or non-stop high traffic, this rule guarantees dedicated unthrottled CPU power (AWS M6i, Azure D-series v5, GCP N2).',
    condition: (input) => input.vcpu >= 8 || input.ram >= 32 || input.trafficPattern === 'high_steady',
    applyWeight: (instance) => {
      if (instance.burstable) return -30;
      if (instance.familyCategory === 'general' && !instance.burstable) return +20;
      return 0;
    },
    reason: '🛡️ 100% Dedicated Server Power: Gives your business guaranteed, unthrottled processor cores for 24/7 steady traffic.'
  },

  // ==========================================
  // AZURE SPECIFIC RECOMMENDATION RULES
  // ==========================================
  {
    id: 'rule-azure-b-series-burstable',
    name: 'Azure B-Series Smart Cost Saver',
    category: 'Azure Optimization',
    enabled: true,
    severity: 'info',
    description: 'Recommends Microsoft Azure B-Series burstable Virtual Machines for variable traffic workloads to cut Azure hosting bills up to 60%.',
    condition: (input) => (input.provider === 'azure' || input.provider === 'all') && input.vcpu <= 4 && input.ram <= 16 && input.trafficPattern === 'burstable',
    applyWeight: (instance) => {
      if (instance.provider === 'azure' && instance.family.includes('B-Series')) return +30;
      return 0;
    },
    reason: '☁️ Azure B-Series Saver: Dynamically accumulates CPU credits during low usage to burst to full capacity during traffic peaks.'
  },
  {
    id: 'rule-azure-e-series-memory',
    name: 'Azure E-Series SQL & Memory Engine Rule',
    category: 'Azure Optimization',
    enabled: true,
    severity: 'warning',
    description: 'Prioritizes Azure E-Series v5 Memory Optimized VMs (8GB RAM per vCPU) for Microsoft SQL Server, PostgreSQL Flexible Server, and Redis Cache.',
    condition: (input) => (input.provider === 'azure' || input.provider === 'all') && (input.workload === 'relational_db' || input.ram >= 32),
    applyWeight: (instance) => {
      if (instance.provider === 'azure' && instance.family.includes('E-Series')) return +35;
      return 0;
    },
    reason: '🏢 Azure E-Series DB Booster: Optimized high-memory architecture designed for enterprise database caching and fast SQL execution.'
  },
  {
    id: 'rule-azure-f-series-compute',
    name: 'Azure F-Series Intel Xeon Compute Rule',
    category: 'Azure Optimization',
    enabled: true,
    severity: 'info',
    description: 'Selects Azure F-Series v2 high clock speed compute VMs for CPU-intensive backend applications and batch processing.',
    condition: (input) => (input.provider === 'azure' || input.provider === 'all') && input.workload === 'compute_heavy',
    applyWeight: (instance) => {
      if (instance.provider === 'azure' && instance.family.includes('F-Series')) return +35;
      return 0;
    },
    reason: '⚡ Azure F-Series Speed: Leverages Intel Xeon Platinum 8168 turbo processors with high clock frequency for heavy computation.'
  },

  // ==========================================
  // GCP SPECIFIC RECOMMENDATION RULES
  // ==========================================
  {
    id: 'rule-gcp-e2-cost-saver',
    name: 'GCP E2 Cost-Optimized Allocation Rule',
    category: 'GCP Optimization',
    enabled: true,
    severity: 'info',
    description: 'Recommends Google Cloud E2 family instances for general web services to provide cost-efficient dynamic vCPU allocation.',
    condition: (input) => (input.provider === 'gcp' || input.provider === 'all') && (input.workload === 'general_web' || input.budgetPriority === 'cost') && input.vcpu <= 8,
    applyWeight: (instance) => {
      if (instance.provider === 'gcp' && instance.family.includes('E2 Cost-Optimized')) return +30;
      return 0;
    },
    reason: '🔷 GCP E2 Smart Saver: Efficiently manages CPU resources on Google Cloud infrastructure for optimal price-performance ratio.'
  },
  {
    id: 'rule-gcp-n2-highmem',
    name: 'GCP N2 High-Memory Database Accelerator',
    category: 'GCP Optimization',
    enabled: true,
    severity: 'warning',
    description: 'Selects Google Cloud N2 High-Memory instances for PostgreSQL, MySQL, and MemoryStore Redis clusters needing high memory buffer pools.',
    condition: (input) => (input.provider === 'gcp' || input.provider === 'all') && (input.workload === 'relational_db' || input.ram >= 32),
    applyWeight: (instance) => {
      if (instance.provider === 'gcp' && instance.family.includes('N2 High-Memory')) return +35;
      return 0;
    },
    reason: '🔷 GCP N2 HighMem Fit: Delivers 8 GB RAM per vCPU to keep relational database indexes and queries resident in fast memory.'
  },
  {
    id: 'rule-gcp-c2-compute',
    name: 'GCP C2 High-Frequency Compute Rule',
    category: 'GCP Optimization',
    enabled: true,
    severity: 'info',
    description: 'Matches Google Cloud C2 Compute Optimized instances with 3.8 GHz all-core turbo speed for calculation-heavy workloads.',
    condition: (input) => (input.provider === 'gcp' || input.provider === 'all') && input.workload === 'compute_heavy',
    applyWeight: (instance) => {
      if (instance.provider === 'gcp' && instance.family.includes('C2 Compute Optimized')) return +35;
      return 0;
    },
    reason: '⚡ GCP C2 Turbo Compute: Provides top-tier single-thread CPU performance on Google Cloud for intense data crunching.'
  },

  // ==========================================
  // MULTI-CLOUD PROVIDER MATCHING RULE
  // ==========================================
  {
    id: 'rule-provider-alignment',
    name: 'Selected Cloud Provider Priority Match',
    category: 'Multi-Cloud Matching',
    enabled: true,
    severity: 'info',
    description: 'Ensures servers matching your specifically chosen cloud provider (AWS, Azure, or GCP) receive priority scoring.',
    condition: (input) => input.provider !== 'all',
    applyWeight: (instance) => {
      // Handled by catalog filter, but provides explicit feedback
      return +15;
    },
    reason: '🎯 Target Provider Alignment: Server matches your specified cloud provider preference.'
  }
];

