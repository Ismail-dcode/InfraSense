/**
 * InfraSense Full Infrastructure & Cloud Services Recommendation Engine
 * Generates 3 strategic blueprints: Performance, Cost Efficient, and Minimum Overhead.
 */

export const WORKLOAD_PRESETS = [
  {
    id: 'saas_growth',
    name: 'SaaS Platform (B2B / Multi-tenant)',
    description: 'Scalable backend API, PostgreSQL database with Redis cache, S3 storage, custom VPC, WAF & monitoring.',
    config: {
      appType: 'server_api',
      trafficScale: 'growth_medium',
      databaseType: 'polyglot_sql_cache',
      storageType: 'object_storage',
      networking: 'custom_vpc',
      needElasticIp: true,
      needLoadBalancer: true,
      backupStrategy: 'pitr_continuous',
      securityLevel: 'secrets_kms_vault',
      monitoringLevel: 'apm_distributed_tracing',
      multiRegion: 'single_region',
      provider: 'aws',
    },
  },
  {
    id: 'ecommerce_store',
    name: 'High-Traffic E-Commerce',
    description: 'Fast Next.js SSR / Headless app, global CDN caching, high-IOPS database, DDoS shield & automated failover.',
    config: {
      appType: 'fullstack_monolith',
      trafficScale: 'high_scale',
      databaseType: 'polyglot_sql_cache',
      storageType: 'media_cdn',
      networking: 'custom_vpc',
      needElasticIp: true,
      needLoadBalancer: true,
      backupStrategy: 'multi_region_replication',
      securityLevel: 'soc2_hipaa_pci',
      monitoringLevel: 'realtime_slack_pagerduty',
      multiRegion: 'multi_region_active_passive',
      provider: 'aws',
    },
  },
  {
    id: 'jamstack_static',
    name: 'Static Web App / Jamstack MVP',
    description: 'Zero server overhead, Edge CDN hosting, serverless backend, low-cost NoSQL & automatic SSL certificates.',
    config: {
      appType: 'static_spa',
      trafficScale: 'mvp_small',
      databaseType: 'nosql_dynamo',
      storageType: 'object_storage',
      networking: 'basic_public',
      needElasticIp: false,
      needLoadBalancer: false,
      backupStrategy: 'automated_daily_snapshots',
      securityLevel: 'basic_ssl',
      monitoringLevel: 'basic_metrics',
      multiRegion: 'single_region',
      provider: 'aws',
    },
  },
  {
    id: 'ai_inference_pipeline',
    name: 'AI Agent & LLM API Workload',
    description: 'Containerized inference API, Vector DB / Redis cache, fast blob storage, high throughput & observability.',
    config: {
      appType: 'ai_ml_data',
      trafficScale: 'growth_medium',
      databaseType: 'vector_ai',
      storageType: 'object_storage',
      networking: 'custom_vpc',
      needElasticIp: true,
      needLoadBalancer: true,
      backupStrategy: 'automated_daily_snapshots',
      securityLevel: 'secrets_kms_vault',
      monitoringLevel: 'apm_distributed_tracing',
      multiRegion: 'single_region',
      provider: 'aws',
    },
  },
  {
    id: 'realtime_gaming_chat',
    name: 'Realtime Chat / WebSockets Fleet',
    description: 'Low-latency container fleet, in-memory pub/sub cluster, Network Load Balancer, global edge routing.',
    config: {
      appType: 'realtime_events',
      trafficScale: 'high_scale',
      databaseType: 'cache_redis',
      storageType: 'none',
      networking: 'custom_vpc',
      needElasticIp: true,
      needLoadBalancer: true,
      backupStrategy: 'pitr_continuous',
      securityLevel: 'waf_ddos_shield',
      monitoringLevel: 'realtime_slack_pagerduty',
      multiRegion: 'global_active_active_edge',
      provider: 'aws',
    },
  },
  {
    id: 'fintech_bankgrade',
    name: 'FinTech / Bank-Grade Secure API',
    description: 'Enterprise VPC, KMS hardware encryption, SOC2/PCI-DSS compliance, multi-AZ database clustering & SIEM auditing.',
    config: {
      appType: 'microservices_k8s',
      trafficScale: 'high_scale',
      databaseType: 'sql_postgres',
      storageType: 'object_storage',
      networking: 'custom_vpc',
      needElasticIp: true,
      needLoadBalancer: true,
      backupStrategy: 'zero_rpo_failover',
      securityLevel: 'soc2_hipaa_pci',
      monitoringLevel: 'realtime_slack_pagerduty',
      multiRegion: 'multi_region_active_passive',
      provider: 'aws',
    },
  },
];

export const APP_TYPES = [
  { id: 'server_api', label: 'Backend Server / REST/GraphQL API', icon: 'ec2', desc: 'Node.js, Python FastAPI/Django, Go, Java Spring Boot' },
  { id: 'static_spa', label: 'Static Web App / SPA / Frontend', icon: 'cloudfront', desc: 'React, Vue, Vite, Astro, Next.js SSG export' },
  { id: 'fullstack_monolith', label: 'Full-Stack SSR Monolith', icon: 'app_runner', desc: 'Next.js SSR, Laravel, Ruby on Rails, Django, Remix' },
  { id: 'microservices_k8s', label: 'Microservices / Container Fleet', icon: 'fargate', desc: 'Docker, ECS, Kubernetes, multiple interconnected services' },
  { id: 'realtime_events', label: 'Realtime / WebSockets / Event Streams', icon: 'redis', desc: 'Socket.io, Kafka, MQTT, live multiplayer/chat' },
  { id: 'ai_ml_data', label: 'AI/ML Inference & Data Pipeline', icon: 'ai', desc: 'LLM agents, PyTorch/TensorFlow, Embeddings, Vector search' },
  { id: 'mobile_backend', label: 'Mobile App Backend / Jamstack', icon: 'lambda', desc: 'Flutter/React Native backend, Auth, Push notifications' },
];

export const TRAFFIC_SCALES = [
  { id: 'mvp_small', label: 'MVP / Startup (<10k req/day)', desc: 'Development, testing, or early traction' },
  { id: 'growth_medium', label: 'Growth / Scaling (100k - 5M req/mo)', desc: 'Growing production product with steady traffic' },
  { id: 'high_scale', label: 'High Traffic (10M - 50M req/mo)', desc: 'High concurrency, enterprise SLAs required' },
  { id: 'hyper_scale', label: 'Global Hyper-Scale (100M+ req/mo)', desc: 'Multi-continent, high throughput, zero-downtime' },
];

export const DATABASE_TYPES = [
  { id: 'none', label: 'No Database (Stateless)', icon: 'cloud', desc: 'Pure compute / proxy or external API only' },
  { id: 'sql_postgres', label: 'Relational (PostgreSQL / Aurora)', icon: 'aurora', desc: 'ACID transactions, relational schema, JSONB support' },
  { id: 'sql_mysql', label: 'Relational (MySQL / MariaDB)', icon: 'aurora', desc: 'Proven web backend DB, master-replica replication' },
  { id: 'nosql_mongo', label: 'Document NoSQL (MongoDB Atlas)', icon: 'dynamodb', desc: 'Flexible schema, rapid iteration, nested documents' },
  { id: 'nosql_dynamo', label: 'Key-Value NoSQL (DynamoDB / Cosmos)', icon: 'dynamodb', desc: 'Single-digit millisecond latency at any scale' },
  { id: 'cache_redis', label: 'In-Memory Cache / Redis', icon: 'redis', desc: 'Sub-millisecond latency, pub/sub, session state' },
  { id: 'polyglot_sql_cache', label: 'Hybrid (PostgreSQL + Redis Cache)', icon: 'aurora', desc: 'Relational persistence + ultra-fast caching layer' },
  { id: 'vector_ai', label: 'Vector DB + Relational (pgvector/Pinecone)', icon: 'ai', desc: 'Semantic search, LLM embeddings, RAG pipelines' },
];

export const STORAGE_TYPES = [
  { id: 'none', label: 'No Persistent File Storage', icon: 'cloud', desc: 'Stateless containers without file uploads' },
  { id: 'object_storage', label: 'Object Storage (S3 / GCS / Blob)', icon: 's3', desc: 'Images, documents, user assets, data exports' },
  { id: 'block_storage', label: 'High-Speed Block SSD (EBS / Persistent Disk)', icon: 'ebs', desc: 'Low-latency disk for DBs, caching or stateful apps' },
  { id: 'shared_nfs', label: 'Shared Network File System (EFS / Filestore)', icon: 'efs', desc: 'Concurrent file system mounted across multiple instances' },
  { id: 'media_cdn', label: 'Global CDN + Object Storage Caching', icon: 'cloudfront', desc: 'High-speed worldwide media streaming & image optimization' },
];

export const NETWORKING_TYPES = [
  { id: 'basic_public', label: 'Basic Public Networking', icon: 'network', desc: 'Direct public internet access, default cloud VPC' },
  { id: 'custom_vpc', label: 'Custom Isolated VPC with Private Subnets', icon: 'vpc', desc: 'Isolated DB subnets, NAT Gateways & security groups' },
];

export const BACKUP_STRATEGIES = [
  { id: 'none', label: 'Manual / No Backups', icon: 'backup', desc: 'Dev/staging only' },
  { id: 'automated_daily_snapshots', label: 'Automated Daily Snapshots (7-day retention)', icon: 'backup', desc: 'Nightly automated DB & volume backups' },
  { id: 'pitr_continuous', label: 'Point-In-Time Continuous Recovery (35 days)', icon: 'backup', desc: 'Restore database to any exact second in the last 35 days' },
  { id: 'multi_region_replication', label: 'Cross-Region Automated Replication & Backups', icon: 'backup', desc: 'Geo-redundant disaster recovery snapshots' },
  { id: 'zero_rpo_failover', label: 'Synchronous Multi-AZ + Zero-RPO Failover', icon: 'backup', desc: 'Enterprise bank-grade zero data loss target' },
];

export const SECURITY_LEVELS = [
  { id: 'basic_ssl', label: 'Standard SSL/TLS Auto-Certificates', icon: 'waf', desc: 'HTTPS encryption at transit, standard cloud firewall' },
  { id: 'waf_ddos_shield', label: 'Web Application Firewall (WAF) & DDoS Shield', icon: 'waf', desc: 'OWASP Top 10 rule filtering, rate limiting & bot control' },
  { id: 'secrets_kms_vault', label: 'WAF + KMS Envelope Encryption + Secrets Manager', icon: 'secret', desc: 'Hardware KMS key rotation, zero plain-text env credentials' },
  { id: 'soc2_hipaa_pci', label: 'Bank-Grade Compliance (SOC2 / HIPAA / PCI-DSS)', icon: 'waf', desc: 'VPC Flow Logs, GuardDuty SIEM, WAF, KMS & audit logging' },
];

export const MONITORING_LEVELS = [
  { id: 'basic_metrics', label: 'Basic Cloud Metrics (CPU / RAM / Disk)', icon: 'cloudwatch', desc: 'Default cloud hypervisor graphs' },
  { id: 'centralized_logging', label: 'Centralized Log Aggregation & Querying', icon: 'sentry', desc: 'Structured logs search, retention & error alarms' },
  { id: 'apm_distributed_tracing', label: 'Full APM + Distributed Tracing (OpenTelemetry / Datadog)', icon: 'cloudwatch', desc: 'End-to-end request tracing, query bottlenecks, latency heatmaps' },
  { id: 'realtime_slack_pagerduty', label: 'APM + Tracing + Real-Time Slack & PagerDuty Alerting', icon: 'pagerduty', desc: 'Instant on-call paging, SLA breach detection & synthetic probes' },
];

export const MULTI_REGION_OPTIONS = [
  { id: 'single_region', label: 'Single Region (Low Latency for Primary Market)', icon: 'globe', desc: 'Cost-effective, best for localized user bases' },
  { id: 'multi_region_active_passive', label: 'Multi-Region (Active-Passive Disaster Recovery)', icon: 'globe', desc: 'Standby secondary region for business continuity' },
  { id: 'global_active_active_edge', label: 'Global Active-Active + Edge Compute Network', icon: 'globe', desc: 'Worldwide low latency, edge cached API & routing' },
];

/**
 * Main calculation engine function for Full Infrastructure Recommendation
 */
export function recommendInfrastructureServices(input) {
  const {
    appType = 'server_api',
    trafficScale = 'growth_medium',
    databaseType = 'sql_postgres',
    storageType = 'object_storage',
    networking = 'custom_vpc',
    needElasticIp = true,
    needLoadBalancer = true,
    backupStrategy = 'pitr_continuous',
    securityLevel = 'secrets_kms_vault',
    monitoringLevel = 'apm_distributed_tracing',
    multiRegion = 'single_region',
    provider = 'aws',
  } = input;

  // Build the 3 strategies
  const performanceStrategy = buildPerformanceStrategy(input);
  const costStrategy = buildCostEfficientStrategy(input);
  const minimumOverheadStrategy = buildMinimumOverheadStrategy(input);

  return {
    input,
    strategies: {
      performance: performanceStrategy,
      cost_efficient: costStrategy,
      minimum_overhead: minimumOverheadStrategy,
    },
    meta: {
      timestamp: new Date().toISOString(),
      providerRecommended: provider,
      evaluatedRulesCount: 28,
    },
  };
}

/**
 * Strategy 1: PERFORMANCE FIRST (Ultra-low latency, High Concurrency, Dedicated Power, Enterprise Resilience)
 */
function buildPerformanceStrategy(input) {
  const { appType, trafficScale, databaseType, storageType, needElasticIp, needLoadBalancer, securityLevel, monitoringLevel, multiRegion, provider } = input;

  const services = [];

  // Compute Layer
  if (appType === 'static_spa') {
    services.push({
      category: 'Compute & Edge',
      name: 'AWS CloudFront Global Edge + S3 Origin with Multi-Region Edge Workers',
      serviceId: 'cloudfront',
      tier: 'Edge Anycast CDN with 400+ PoPs + TLS 1.3 & Brotli',
      estimatedCost: 18,
      why: 'Delivers sub-15ms TTFB worldwide with ultra-fast edge caching and automatic SSL offloading.',
      spec: 'Global CDN, Edge Lambdas, Unlimited bandwidth scaling',
    });
  } else if (appType === 'microservices_k8s') {
    services.push({
      category: 'Compute & Containers',
      name: 'Amazon EKS (Elastic Kubernetes Service) Dedicated Node Fleet',
      serviceId: 'k8s',
      tier: '3x c6i.xlarge (12 vCPU / 24 GB RAM) High-throughput nodes',
      estimatedCost: 280,
      why: 'Dedicated compute cluster with hardware virtualization, eBPF Cilium networking and instant horizontal pod autoscaling (HPA).',
      spec: '12 vCPUs total, 24 GB RAM, 10Gbps dedicated network',
    });
  } else if (appType === 'realtime_events') {
    services.push({
      category: 'Compute & Realtime',
      name: 'Amazon ECS Fargate High-Concurrency Container Fleet',
      serviceId: 'fargate',
      tier: '4x Fargate Tasks (4 vCPU / 8 GB RAM per task)',
      estimatedCost: 190,
      why: 'Zero cold-start container concurrency with dedicated keep-alive WebSocket connections and NLB layer.',
      spec: '16 vCPUs total, 32 GB RAM, WebSocket support',
    });
  } else if (appType === 'ai_ml_data') {
    services.push({
      category: 'Compute & AI Acceleration',
      name: 'Amazon EC2 Accelerated Inference (g5.xlarge) + ECR Fleet',
      serviceId: 'compute_vm',
      tier: '1x g5.xlarge (4 vCPU / 16 GB RAM + 24GB NVIDIA A10G GPU)',
      estimatedCost: 380,
      why: 'High-throughput GPU inference with CUDA acceleration, dedicated TensorRT engine & fast NVMe cache.',
      spec: 'NVIDIA A10G GPU, 4 vCPUs, 16 GB RAM',
    });
  } else {
    // Server API or Fullstack Monolith
    services.push({
      category: 'Compute & Backend',
      name: 'Amazon EC2 High-Performance Cluster (c6i.2xlarge Auto-Scaling Fleet)',
      serviceId: 'compute_vm',
      tier: '2x c6i.xlarge (4 vCPU / 8 GB RAM per node, Min: 2, Max: 8)',
      estimatedCost: 148,
      why: 'Dedicated Intel Xeon Ice Lake compute with guaranteed baseline CPU, sub-millisecond hypervisor latency and Multi-AZ distribution.',
      spec: '8 vCPUs active, 16 GB RAM, 12.5 Gbps network',
    });
  }

  // Database Layer
  if (databaseType.includes('postgres') || databaseType.includes('sql') || databaseType === 'polyglot_sql_cache') {
    services.push({
      category: 'Database Tier',
      name: 'Amazon Aurora PostgreSQL Multi-AZ Cluster + Provisioned IOPS',
      serviceId: 'aurora',
      tier: 'db.r6g.xlarge Primary (4 vCPU / 32 GB RAM) + 1x Read Replica',
      estimatedCost: 290,
      why: 'Distributed storage engine with 6-way replication, sub-10ms read latencies, and 30-second automated failover.',
      spec: '32 GB RAM, NVMe log buffer, 6-way storage replication',
    });
  } else if (databaseType.includes('dynamo') || databaseType.includes('nosql')) {
    services.push({
      category: 'Database Tier',
      name: 'Amazon DynamoDB with Global Tables & DAX In-Memory Accelerator',
      serviceId: 'dynamodb',
      tier: 'Provisioned Capacity + DAX microsecond cache cluster',
      estimatedCost: 140,
      why: 'Single-digit microsecond latency with dedicated hardware in-memory accelerator and active-active replication.',
      spec: 'Microsecond reads, infinite scaling, zero locks',
    });
  } else if (databaseType.includes('vector')) {
    services.push({
      category: 'Database & AI Vectors',
      name: 'Amazon Aurora pgvector + Pinecone Dedicated Vector Pod',
      serviceId: 'ai',
      tier: 'r6g.xlarge + Pinecone p2.s1 Pod',
      estimatedCost: 260,
      why: 'Sub-5ms approximate nearest neighbor (ANN) vector searches combined with relational metadata.',
      spec: 'Millions of vector embeddings, HNSW indexing',
    });
  }

  // In-memory Cache Layer (For performance strategy)
  if (databaseType.includes('cache') || databaseType.includes('polyglot') || appType === 'realtime_events' || appType === 'ecommerce_store') {
    services.push({
      category: 'In-Memory Caching',
      name: 'Amazon ElastiCache for Redis Cluster (Multi-AZ with Auto-Failover)',
      serviceId: 'redis',
      tier: '2x cache.r6g.large (Primary + Read Replica with Multi-AZ)',
      estimatedCost: 135,
      why: 'Guarantees sub-millisecond database query caching, session management, and rate limiting.',
      spec: '26 GB RAM memory, 0.5ms response time',
    });
  }

  // Storage Layer
  if (storageType === 'object_storage' || storageType === 'media_cdn') {
    services.push({
      category: 'Object Storage & CDN',
      name: 'Amazon S3 Intelligent-Tiering + CloudFront Enterprise CDN Shield',
      serviceId: 's3',
      tier: 'Multi-AZ S3 Standard with Origin Shield & Byte-Range Fetches',
      estimatedCost: 35,
      why: '99.999999999% (11 9s) durability with dedicated CloudFront origin shielding for ultra-fast asset delivery.',
      spec: 'Unlimited GBs, Origin Shielding, <20ms CDN delivery',
    });
  } else if (storageType === 'shared_nfs') {
    services.push({
      category: 'Shared Storage',
      name: 'Amazon EFS Max I/O Provisioned Throughput File System',
      serviceId: 'efs',
      tier: 'Provisioned 250 MB/s Throughput + General Purpose Mode',
      estimatedCost: 75,
      why: 'High-concurrency POSIX file sharing across 100+ compute nodes with dedicated throughput.',
      spec: '250 MB/s IO throughput, Multi-AZ persistence',
    });
  }

  // Networking Layer
  services.push({
    category: 'Networking & Routing',
    name: 'AWS Application Load Balancer (ALB) + Enterprise Multi-AZ VPC + Route 53 Anycast',
    serviceId: 'alb',
    tier: 'Multi-AZ ALB with cross-zone load balancing + Dual NAT Gateways',
    estimatedCost: 75,
    why: 'Hardware SSL termination, layer 7 path routing, HTTP/2 & gRPC support with zero packet drops.',
    spec: '100,000 req/sec capacity, 3 Availability Zones',
  });

  // Security & WAF Layer
  services.push({
    category: 'Security & Encryption',
    name: 'AWS WAF Enterprise Rule Packs + AWS Shield Advanced + AWS KMS HSM',
    serviceId: 'waf',
    tier: 'Managed OWASP Top 10 + Bot Control + Dedicated KMS Key',
    estimatedCost: 45,
    why: 'Deep packet inspection with real-time DDoS mitigation, rate-limiting and HSM hardware key encryption.',
    spec: 'Sub-millisecond rule evaluation, automated IP ban',
  });

  // Monitoring & Observability Layer
  services.push({
    category: 'Observability & APM',
    name: 'Datadog Full APM Suite + AWS CloudWatch Detailed Monitoring (1-min metric resolution)',
    serviceId: 'datadog',
    tier: 'Distributed APM Tracing + Live Profiling + PagerDuty Integration',
    estimatedCost: 95,
    why: 'Flamegraphs, distributed tracing, database query bottleneck analyzer, and 100% telemetry coverage.',
    spec: 'Real-time telemetry, 1-second trace sampling, PagerDuty on-call',
  });

  // Backups
  services.push({
    category: 'Disaster Recovery & Backup',
    name: 'AWS Backup Multi-Region Continuous Replication with 0-RPO Snapshot Sync',
    serviceId: 'backup',
    tier: 'Continuous PITR + Cross-Region Vault Lock',
    estimatedCost: 40,
    why: 'Ensures instantaneous point-in-time recovery to any millisecond with secondary region fallback.',
    spec: '35-day continuous logs, immutable vault protection',
  });

  const totalCost = services.reduce((acc, s) => acc + s.estimatedCost, 0);

  return {
    id: 'performance',
    title: '⚡ Performance First Blueprint',
    subtitle: 'Maximum Throughput · Sub-15ms Latency · High Availability Multi-AZ',
    badge: 'Enterprise Performance',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    accentGradient: 'from-amber-500 to-orange-600',
    totalEstimatedMonthlyCost: totalCost,
    maintenanceHoursPerWeek: '3 - 5 hrs',
    averageLatency: '< 15 ms',
    scalabilityScore: 98,
    simplicityScore: 70,
    resilienceScore: 99,
    costScore: 65,
    summary: 'Optimized for high-throughput workloads, heavy concurrent traffic, and mission-critical production environments where latency and zero downtime take absolute priority.',
    pros: [
      'Dedicated compute and memory resources with zero noisy neighbor risk',
      'Ultra-fast sub-millisecond Redis caching layer and Aurora 6-way replication',
      'Multi-AZ active redundancy with automated 30-second failover',
      'Full distributed APM observability with Datadog & CloudWatch',
    ],
    cons: [
      'Higher fixed baseline monthly infrastructure cost',
      'Requires standard DevOps monitoring & configuration upkeep',
    ],
    services,
  };
}

/**
 * Strategy 2: COST EFFICIENT (Right-Sized, Auto-scale to Zero, Spot/Burstables, Lean Budget)
 */
function buildCostEfficientStrategy(input) {
  const { appType, trafficScale, databaseType, storageType, needElasticIp, needLoadBalancer, securityLevel, monitoringLevel, multiRegion, provider } = input;

  const services = [];

  // Compute Layer
  if (appType === 'static_spa') {
    services.push({
      category: 'Compute & Edge',
      name: 'Cloudflare Pages / AWS S3 + CloudFront (Free Tier Optimized)',
      serviceId: 'cloudfront',
      tier: 'Global CDN with generous 1TB/mo free tier egress',
      estimatedCost: 0,
      why: 'Global edge distribution utilizing 100% free-tier edge limits for static assets with unlimited requests.',
      spec: 'Free SSL, 1TB free bandwidth, Unlimited deploy previews',
    });
  } else if (appType === 'microservices_k8s' || appType === 'realtime_events') {
    services.push({
      category: 'Compute & Containers',
      name: 'Amazon ECS on Fargate Spot + Auto-Scaling (Scaled down on low traffic)',
      serviceId: 'fargate',
      tier: '2x Fargate Spot tasks (0.5 vCPU / 1 GB RAM, scales 1 to 4)',
      estimatedCost: 28,
      why: 'Utilizes up to 70% discounted AWS Fargate Spot capacity with auto-scaling triggers based on CPU utilization.',
      spec: '70% Spot savings, dynamic auto-scaling',
    });
  } else if (appType === 'server_api' || appType === 'fullstack_monolith') {
    services.push({
      category: 'Compute & Backend',
      name: 'Amazon EC2 t4g.small (ARM Graviton2) Burstable Instance',
      serviceId: 'compute_vm',
      tier: '1x t4g.small (2 vCPU / 2 GB RAM Graviton2 ARM)',
      estimatedCost: 14,
      why: 'AWS Graviton2 ARM architecture delivers 40% better price-performance than x86 with burstable CPU credits.',
      spec: '2 vCPUs, 2 GB RAM, 20% cheaper than t3 equivalent',
    });
  } else {
    // AI / ML
    services.push({
      category: 'Compute & AI',
      name: 'Serverless GPU Inference (RunPod Serverless / Modal) + t4g.small Gateway',
      serviceId: 'ai',
      tier: 'Pay-per-millisecond GPU inference + t4g.small API proxy',
      estimatedCost: 45,
      why: 'Scale GPU compute to exactly 0 when no inference requests are active, avoiding thousands in idle GPU reservations.',
      spec: 'Pay-per-second, 0 idle cost when quiet',
    });
  }

  // Database Layer
  if (databaseType.includes('postgres') || databaseType.includes('sql') || databaseType === 'polyglot_sql_cache') {
    services.push({
      category: 'Database Tier',
      name: 'Amazon RDS PostgreSQL db.t4g.micro (Single-AZ with gp3 storage)',
      serviceId: 'aurora',
      tier: 'db.t4g.micro (2 vCPU / 1 GB RAM + 20 GB gp3 SSD)',
      estimatedCost: 19,
      why: 'Cost-optimized managed database with automated daily snapshots and burstable Graviton2 compute.',
      spec: '1 GB RAM, 20 GB gp3 SSD, 3000 free IOPS',
    });
  } else if (databaseType.includes('dynamo') || databaseType.includes('nosql')) {
    services.push({
      category: 'Database Tier',
      name: 'Amazon DynamoDB On-Demand (Pay-Per-Request Mode)',
      serviceId: 'dynamodb',
      tier: 'On-Demand Capacity (25 GB free storage + $1.25/million writes)',
      estimatedCost: 4,
      why: 'Zero baseline cost when idle. You pay only for the exact reads and writes executed with generous free tier.',
      spec: '25 GB free tier, zero hourly reservation',
    });
  } else if (databaseType.includes('vector')) {
    services.push({
      category: 'Database & Vectors',
      name: 'Supabase Postgres with pgvector (Free / Micro Tier)',
      serviceId: 'postgres',
      tier: '500 MB database with pgvector extension included',
      estimatedCost: 0,
      why: 'Leverages open-source pgvector in Postgres to avoid expensive specialized vector database subscriptions.',
      spec: 'pgvector embedded in primary SQL instance',
    });
  }

  // In-memory Cache Layer (If needed, lightweight Upstash / embedded)
  if (databaseType.includes('cache') || databaseType.includes('polyglot') || appType === 'realtime_events') {
    services.push({
      category: 'In-Memory Caching',
      name: 'Upstash Serverless Redis (Pay-per-request / Free tier)',
      serviceId: 'redis',
      tier: '10,000 commands/day Free Tier, then $0.20 per 100k commands',
      estimatedCost: 3,
      why: 'Serverless Redis with no persistent idle hourly charges. Instant connection pooling via REST/TCP.',
      spec: 'Sub-millisecond cache, $0 idle fees',
    });
  }

  // Storage Layer
  if (storageType === 'object_storage' || storageType === 'media_cdn') {
    services.push({
      category: 'Object Storage',
      name: 'Cloudflare R2 Storage (Zero Egress Fees) / S3 Standard',
      serviceId: 's3',
      tier: '10 GB Free Storage + $0.015/GB with $0 Egress charges',
      estimatedCost: 2,
      why: 'Zero egress fee structure saves hundreds of dollars in bandwidth costs compared to traditional cloud storage.',
      spec: 'S3-compatible API, 0 egress cost',
    });
  }

  // Networking Layer
  services.push({
    category: 'Networking & DNS',
    name: 'Cloudflare Free DNS + Managed SSL + Single-AZ Public Gateway',
    serviceId: 'route53',
    tier: 'Cloudflare Universal SSL + Anycast DNS + Port 443 Direct Routing',
    estimatedCost: 0,
    why: 'Free global Anycast DNS with built-in SSL and basic DDoS protection without requiring an expensive $25/mo AWS ALB.',
    spec: 'Free SSL certificates, 0 DNS queries cost',
  });

  // Security Layer
  services.push({
    category: 'Security & Secrets',
    name: 'Cloudflare Free WAF + AWS Parameter Store (Standard Free Tier)',
    serviceId: 'waf',
    tier: 'Cloudflare Free Rule Set + SSM Parameter Store (Free KMS)',
    estimatedCost: 0,
    why: 'Store secrets in AWS SSM Parameter Store at $0/month while filtering malicious bot traffic at Cloudflare edge.',
    spec: '10,000 free stored parameters, Free Edge WAF',
  });

  // Monitoring Layer
  services.push({
    category: 'Monitoring & Alerting',
    name: 'AWS CloudWatch Basic Metrics + Sentry Developer (Free 5k errors/mo)',
    serviceId: 'cloudwatch',
    tier: 'Default 5-min CloudWatch metrics + Sentry Free Tier + Slack Webhook',
    estimatedCost: 0,
    why: '100% free error tracking and fundamental infrastructure telemetry delivered straight to a Slack channel.',
    spec: 'Free tier error reporting & uptime alarms',
  });

  // Backups
  services.push({
    category: 'Backups & Recovery',
    name: 'Automated RDS Nightly Snapshots (7-day retention within free storage)',
    serviceId: 'backup',
    tier: 'Single-region automated snapshots matching DB storage allocation',
    estimatedCost: 1,
    why: 'Free backup storage included up to 100% of your provisioned database storage size.',
    spec: 'Nightly 1-click restore snapshot',
  });

  const totalCost = services.reduce((acc, s) => acc + s.estimatedCost, 0);

  return {
    id: 'cost_efficient',
    title: '💰 Cost-Efficient Blueprint',
    subtitle: 'Budget Optimized · Auto-Scale to Zero · Maximum Free Tier Utilization',
    badge: 'Budget Friendly',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentGradient: 'from-emerald-500 to-teal-600',
    totalEstimatedMonthlyCost: totalCost,
    maintenanceHoursPerWeek: '1 - 2 hrs',
    averageLatency: '~ 35 - 50 ms',
    scalabilityScore: 82,
    simplicityScore: 88,
    resilienceScore: 80,
    costScore: 98,
    summary: 'Tailored for startups, side projects, MVPs, and cost-conscious engineering teams who want maximum cloud efficiency without unnecessary idle cloud spending.',
    pros: [
      'Extremely low monthly burn rate ($20 - $70/mo total)',
      'Leverages Graviton2 ARM pricing and serverless pay-per-request pricing',
      'Zero bandwidth egress costs with Cloudflare edge tiering',
      'Easily upgradeable to multi-AZ when traffic doubles',
    ],
    cons: [
      'Single-AZ database means short failover downtime during major cloud outages',
      'Burstable CPU instances throttle if sustained 100% CPU exceeds baseline credits',
    ],
    services,
  };
}

/**
 * Strategy 3: MINIMUM OVERHEAD / ZERO-OPS (Serverless, Fully-Managed PaaS, Push-to-Deploy, Zero Maintenance)
 */
function buildMinimumOverheadStrategy(input) {
  const { appType, trafficScale, databaseType, storageType, needElasticIp, needLoadBalancer, securityLevel, monitoringLevel, multiRegion, provider } = input;

  const services = [];

  // Compute Layer
  if (appType === 'static_spa') {
    services.push({
      category: 'Compute & Hosting',
      name: 'Vercel / Cloudflare Pages Managed Frontend Edge Platform',
      serviceId: 'cloudfront',
      tier: 'Pro Plan / Automated Edge Deployments with Preview Branches',
      estimatedCost: 20,
      why: 'Zero DevOps required: push code to GitHub and receive instant atomic deployments, global edge SSL and analytics.',
      spec: 'Global Edge network, automatic CI/CD git integration',
    });
  } else if (appType === 'server_api' || appType === 'fullstack_monolith') {
    services.push({
      category: 'Compute & Backend',
      name: 'AWS App Runner / Google Cloud Run (Fully Managed Container Platform)',
      serviceId: 'app_runner',
      tier: 'Managed Auto-Scaling Container (1 vCPU / 2 GB RAM, scales 0 to 10)',
      estimatedCost: 35,
      why: 'No VPC routing to manage, no EC2 patching, no load balancer configuration. Just point to a Docker container or Git repo.',
      spec: 'Zero OS management, automatic HTTPS, automatic load balancing',
    });
  } else if (appType === 'realtime_events' || appType === 'mobile_backend') {
    services.push({
      category: 'Compute & Functions',
      name: 'AWS Lambda + API Gateway (Serverless HTTP & WebSocket API)',
      serviceId: 'lambda',
      tier: 'Serverless Functions with Provisioned Concurrency & WebSocket Gateway',
      estimatedCost: 25,
      why: 'Event-driven serverless architecture that scales from 0 to 10,000 requests per second seamlessly with zero servers.',
      spec: '100% serverless, zero server maintenance, built-in TLS',
    });
  } else if (appType === 'ai_ml_data') {
    services.push({
      category: 'Compute & AI',
      name: 'Amazon Bedrock / OpenAI API + Managed Serverless Workers',
      serviceId: 'ai',
      tier: 'Managed Model Endpoints + Serverless API Router',
      estimatedCost: 50,
      why: 'Avoid running and patching custom GPU hardware. Consume top-tier foundation models via managed APIs with zero infra burden.',
      spec: 'Managed API, zero GPU driver maintenance',
    });
  } else {
    // Microservices
    services.push({
      category: 'Compute & Microservices',
      name: 'Render / AWS App Runner Multi-Service Mesh',
      serviceId: 'app_runner',
      tier: 'Managed Services with automatic private networking & service discovery',
      estimatedCost: 55,
      why: 'Private microservice communication with zero Kubernetes complexity or manifest maintenance.',
      spec: 'Zero Kubernetes YAML, push-to-deploy Git ops',
    });
  }

  // Database Layer
  if (databaseType.includes('postgres') || databaseType.includes('sql') || databaseType === 'polyglot_sql_cache') {
    services.push({
      category: 'Database Tier',
      name: 'Neon / AWS Aurora Serverless v2 (Instant Autoscaling Storage & Compute)',
      serviceId: 'aurora',
      tier: 'Aurora Serverless v2 (0.5 ACU to 4 ACU dynamic scaling)',
      estimatedCost: 45,
      why: 'Seamlessly scales compute in fractions of a second based on load, includes automated branching, snapshots, and zero-downtime patching.',
      spec: 'Dynamic ACU scaling, automatic backups, point-in-time recovery',
    });
  } else if (databaseType.includes('dynamo') || databaseType.includes('nosql')) {
    services.push({
      category: 'Database Tier',
      name: 'MongoDB Atlas Serverless / AWS DynamoDB Managed',
      serviceId: 'dynamodb',
      tier: 'Serverless Elastic Tier with automated continuous backup',
      estimatedCost: 30,
      why: 'Fully managed document database with zero schema migration headaches and built-in visual metrics.',
      spec: 'Zero cluster management, instant elastic scale',
    });
  } else if (databaseType.includes('vector')) {
    services.push({
      category: 'Database & Vectors',
      name: 'Pinecone Serverless Vector Database',
      serviceId: 'ai',
      tier: 'Serverless Vector Index (Pay per read/write unit)',
      estimatedCost: 20,
      why: 'Zero index maintenance or sharding. High-speed vector similarity queries with a simple REST/Python SDK.',
      spec: 'Serverless indexing, zero cluster configuration',
    });
  }

  // In-Memory Cache
  if (databaseType.includes('cache') || databaseType.includes('polyglot') || appType === 'realtime_events') {
    services.push({
      category: 'In-Memory Cache',
      name: 'Upstash Serverless Redis (Zero-Ops REST / TCP Redis)',
      serviceId: 'redis',
      tier: 'Managed Multi-Zone Serverless Cache with Eviction Policies',
      estimatedCost: 15,
      why: 'No Redis clustering or master-replica nodes to configure. Connect via REST or standard Redis client from anywhere.',
      spec: 'Zero server config, TLS enabled, automatic multi-zone',
    });
  }

  // Storage Layer
  if (storageType === 'object_storage' || storageType === 'media_cdn') {
    services.push({
      category: 'Object Storage',
      name: 'Amazon S3 Managed Bucket + CloudFront Pre-Configured Distribution',
      serviceId: 's3',
      tier: 'S3 Standard with default encryption and lifecycle management rules',
      estimatedCost: 12,
      why: 'Reliable managed object storage with automated lifecycle policies to transition old assets to cold archive automatically.',
      spec: 'Automatic archiving, zero disk management',
    });
  }

  // Networking & Load Balancing
  services.push({
    category: 'Networking & TLS',
    name: 'Fully Managed Edge Routing with Automated DNS & SSL (Route 53 / Cloudflare)',
    serviceId: 'alb',
    tier: 'Integrated Platform Routing with Managed HTTPS & HTTP/3',
    estimatedCost: 10,
    why: 'Compute platform handles load balancing, health checks, and certificate renewals natively with zero manual config.',
    spec: 'Zero manual NGINX/ALB configuration',
  });

  // Security Layer
  services.push({
    category: 'Security & Secrets',
    name: 'AWS Secrets Manager + Platform Environment Injection',
    serviceId: 'secret',
    tier: 'Automated Key Rotation & Encrypted Secrets Store',
    estimatedCost: 8,
    why: 'Direct environment variable synchronization into running containers with automatic encryption at rest.',
    spec: 'Zero file-based secret handling, automated rotation',
  });

  // Monitoring Layer
  services.push({
    category: 'Monitoring & APM',
    name: 'Sentry Performance Monitoring + Logtail / BetterStack Uptime & Alarms',
    serviceId: 'sentry',
    tier: 'Plug-and-play APM SDK with automated Slack & SMS alert escalation',
    estimatedCost: 22,
    why: 'Install with 1 line of code. Generates rich stack traces, session replays, and latency alerts with zero agent daemons.',
    spec: '1-line SDK setup, session replay, uptime checks',
  });

  // Backups
  services.push({
    category: 'Disaster Recovery',
    name: 'Managed Continuous Point-in-Time Database Rollback (Built-in)',
    serviceId: 'backup',
    tier: 'Automated 1-click restore to any point in the past 14 days',
    estimatedCost: 10,
    why: 'One-click instant rollback directly from the web console without manual database dump restoration.',
    spec: '1-click web console restore',
  });

  const totalCost = services.reduce((acc, s) => acc + s.estimatedCost, 0);

  return {
    id: 'minimum_overhead',
    title: '🛠️ Minimum Overhead (Zero-Ops) Blueprint',
    subtitle: 'Fully Managed Serverless & PaaS · Zero DevOps · Push-to-Deploy Simplicity',
    badge: 'Zero Maintenance',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentGradient: 'from-indigo-500 to-blue-600',
    totalEstimatedMonthlyCost: totalCost,
    maintenanceHoursPerWeek: '< 30 mins',
    averageLatency: '~ 25 - 35 ms',
    scalabilityScore: 92,
    simplicityScore: 99,
    resilienceScore: 90,
    costScore: 84,
    summary: 'Engineered for small engineering teams, solo founders, and agile product teams who want to ship fast without managing Linux servers, complex VPC subnets, or Kubernetes manifests.',
    pros: [
      'Virtually zero DevOps maintenance (<30 mins/week)',
      'Automated security patches, OS updates, and SSL renewals',
      'Instant push-to-deploy git integrations with preview environments',
      'Dynamic compute scaling that scales automatically with user traffic spikes',
    ],
    cons: [
      'Slightly higher unit cost per computation compared to unmanaged bare EC2 VMs',
      'Less fine-grained kernel and low-level network customization',
    ],
    services,
  };
}

/**
 * Generate Terraform HCL code for the selected strategy and requirements
 */
export function generateServicesTerraform(strategy, input) {
  const isPerformance = strategy.id === 'performance';
  const isCost = strategy.id === 'cost_efficient';
  const isOverhead = strategy.id === 'minimum_overhead';

  return `# ==============================================================================
# InfraSense Infrastructure as Code (Terraform)
# Blueprint: ${strategy.title}
# App Workload: ${input.appType} | Database: ${input.databaseType}
# Target Provider: ${input.provider.toUpperCase()} | Generated: ${new Date().toISOString()}
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Environment = var.environment
      ManagedBy   = "InfraSense-Cloud-Architect"
      Strategy    = "${strategy.id}"
    }
  }
}

# --- VPC & Networking ---
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "infrasense-\${var.environment}-vpc"
  }
}

resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "\${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = { Name = "infrasense-public-1" }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.10.0/24"
  availability_zone = "\${var.aws_region}a"

  tags = { Name = "infrasense-private-1" }
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
  tags   = { Name = "infrasense-igw" }
}

# --- Security Group ---
resource "aws_security_group" "app_sg" {
  name        = "infrasense-\${var.environment}-app-sg"
  description = "Security group for application tier"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "Allow HTTPS inbound"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Allow HTTP inbound"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# --- Compute Service ---
${isPerformance ? `# Dedicated High-Performance Auto Scaling Compute Fleet
resource "aws_launch_template" "app" {
  name_prefix   = "infrasense-c6i-app-"
  image_id      = var.ami_id
  instance_type = "c6i.xlarge"

  vpc_security_group_ids = [aws_security_group.app_sg.id]

  monitoring {
    enabled = true
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "infrasense-perf-node"
    }
  }
}

resource "aws_autoscaling_group" "app_asg" {
  vpc_zone_identifier = [aws_subnet.private_1.id]
  min_size            = 2
  max_size            = 8
  desired_capacity    = 2

  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }
}` : isCost ? `# Burstable Graviton2 ARM Cost-Optimized Compute
resource "aws_instance" "app_node" {
  ami           = var.ami_id
  instance_type = "t4g.small"
  subnet_id     = aws_subnet.public_1.id
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  root_block_device {
    volume_type = "gp3"
    volume_size = 20
    encrypted   = true
  }

  tags = {
    Name = "infrasense-cost-node"
  }
}` : `# Managed Serverless App Runner Service
resource "aws_apprunner_service" "app" {
  service_name = "infrasense-managed-service"

  source_configuration {
    image_repository {
      image_identifier      = "public.ecr.aws/docker/library/node:18-alpine"
      image_repository_type = "ECR_PUBLIC"
    }
    auto_deployments_enabled = true
  }

  instance_configuration {
    cpu    = "1024"
    memory = "2048"
  }
}`}

# --- Database Tier ---
${input.databaseType.includes('postgres') || input.databaseType.includes('sql') ? `resource "aws_db_instance" "database" {
  identifier           = "infrasense-\${var.environment}-db"
  allocated_storage    = 20
  max_allocated_storage= 100
  storage_type         = "gp3"
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "${isPerformance ? 'db.r6g.xlarge' : 'db.t4g.micro'}"
  db_name              = "appdb"
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = ${isCost ? 'true' : 'false'}
  multi_az             = ${isPerformance ? 'true' : 'false'}
  backup_retention_period = ${isPerformance ? '30' : '7'}
  publicly_accessible  = false
  vpc_security_group_ids = [aws_security_group.app_sg.id]
}` : `# Database is configured as Serverless NoSQL / External Managed`}

# --- Storage Tier ---
${input.storageType !== 'none' ? `resource "aws_s3_bucket" "assets" {
  bucket_prefix = "infrasense-assets-\${var.environment}-"
  force_destroy = false
}

resource "aws_s3_bucket_server_side_encryption_configuration" "assets_enc" {
  bucket = aws_s3_bucket.assets.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}` : `# No persistent object storage required`}

# --- Variables ---
variable "aws_region" {
  default = "us-east-1"
}

variable "environment" {
  default = "production"
}

variable "ami_id" {
  default = "ami-0c7217cdde317cfec" # Amazon Linux 2023
}

variable "db_username" {
  default = "infrasense_admin"
}

variable "db_password" {
  type      = string
  sensitive = true
  default   = "ChangeMeInProductionSecret123!"
}
`;
}

/**
 * Generate Docker Compose for local mirroring
 */
export function generateDockerComposeLocal(strategy, input) {
  return `# ==============================================================================
# InfraSense Local Development Stack (Docker Compose)
# Matches Recommended Architecture: ${strategy.title}
# ==============================================================================
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
      - DATABASE_URL=postgresql://app_user:app_password@db:5432/app_development
      - REDIS_URL=redis://cache:6379
      - S3_ENDPOINT=http://localstack:4566
    depends_on:
      - db
      - cache
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: app_password
      POSTGRES_DB: app_development
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

  localstack:
    image: localstack/localstack:latest
    ports:
      - "4566:4566"
    environment:
      - SERVICES=s3,secretsmanager
    volumes:
      - localstack:/var/lib/localstack

volumes:
  pgdata:
  redisdata:
  localstack:
`;
}
