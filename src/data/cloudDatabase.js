export const CLOUD_INSTANCES = [
  // ==========================================
  // AWS EC2 INSTANCES
  // ==========================================
  {
    id: 'aws-t3-nano',
    provider: 'aws',
    family: 'General Purpose (Burstable)',
    familyCategory: 'general',
    name: 't3.nano',
    vCPU: 2,
    ramGB: 0.5,
    architecture: 'x86_64',
    networkSpeed: 'Up to 5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 3000,
    hourlyRate: 0.0052,
    monthlyEstimate: 3.75,
    burstable: true,
    description: 'Ultra-low cost burstable instance for micro-services, testing, and tiny background scripts.',
    bestUseCases: ['Low-traffic websites', 'Dev/Test environments', 'Microservices', 'Cron jobs']
  },
  {
    id: 'aws-t3-micro',
    provider: 'aws',
    family: 'General Purpose (Burstable)',
    familyCategory: 'general',
    name: 't3.micro',
    vCPU: 2,
    ramGB: 1,
    architecture: 'x86_64',
    networkSpeed: 'Up to 5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 3000,
    hourlyRate: 0.0104,
    monthlyEstimate: 7.50,
    burstable: true,
    description: 'Entry level burstable server for small applications and lightweight web servers.',
    bestUseCases: ['Entry web apps', 'Small APIs', 'Dev servers', 'Staging environments']
  },
  {
    id: 'aws-t3-small',
    provider: 'aws',
    family: 'General Purpose (Burstable)',
    familyCategory: 'general',
    name: 't3.small',
    vCPU: 2,
    ramGB: 2,
    architecture: 'x86_64',
    networkSpeed: 'Up to 5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 3000,
    hourlyRate: 0.0208,
    monthlyEstimate: 15.00,
    burstable: true,
    description: 'Small workload burstable instance with balanced CPU and 2GB RAM.',
    bestUseCases: ['Single page apps', 'Small WordPress blogs', 'Code repository servers']
  },
  {
    id: 'aws-t3-medium',
    provider: 'aws',
    family: 'General Purpose (Burstable)',
    familyCategory: 'general',
    name: 't3.medium',
    vCPU: 2,
    ramGB: 4,
    architecture: 'x86_64',
    networkSpeed: 'Up to 5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 3000,
    hourlyRate: 0.0416,
    monthlyEstimate: 30.00,
    burstable: true,
    description: 'Very popular general-purpose burstable instance for medium web apps and backend services.',
    bestUseCases: ['Node.js / Django backends', 'Staging databases', 'Build servers']
  },
  {
    id: 'aws-t3-large',
    provider: 'aws',
    family: 'General Purpose (Burstable)',
    familyCategory: 'general',
    name: 't3.large',
    vCPU: 2,
    ramGB: 8,
    architecture: 'x86_64',
    networkSpeed: 'Up to 5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 3000,
    hourlyRate: 0.0832,
    monthlyEstimate: 60.00,
    burstable: true,
    description: 'Standard 2 vCPU / 8 GB burstable instance suitable for moderate production web applications.',
    bestUseCases: ['Production Web Apps', 'Docker containers', 'Medium traffic CMS', 'Internal tools']
  },
  {
    id: 'aws-t3-xlarge',
    provider: 'aws',
    family: 'General Purpose (Burstable)',
    familyCategory: 'general',
    name: 't3.xlarge',
    vCPU: 4,
    ramGB: 16,
    architecture: 'x86_64',
    networkSpeed: 'Up to 5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 3000,
    hourlyRate: 0.1664,
    monthlyEstimate: 120.00,
    burstable: true,
    description: 'High capacity burstable instance with 4 vCPUs and 16 GB RAM.',
    bestUseCases: ['Multi-tenant web applications', 'CI/CD runner pools', 'Small ElasticSearch nodes']
  },

  // Dedicated Fixed M6i
  {
    id: 'aws-m6i-large',
    provider: 'aws',
    family: 'General Purpose (Dedicated)',
    familyCategory: 'general',
    name: 'm6i.large',
    vCPU: 2,
    ramGB: 8,
    architecture: 'x86_64',
    networkSpeed: 'Up to 12.5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 12000,
    hourlyRate: 0.096,
    monthlyEstimate: 69.12,
    burstable: false,
    description: 'Dedicated 3rd Gen Intel Xeon Ice Lake processor with steady predictable performance.',
    bestUseCases: ['Sustained high load web servers', 'Application clusters', 'Enterprise software']
  },
  {
    id: 'aws-m6i-xlarge',
    provider: 'aws',
    family: 'General Purpose (Dedicated)',
    familyCategory: 'general',
    name: 'm6i.xlarge',
    vCPU: 4,
    ramGB: 16,
    architecture: 'x86_64',
    networkSpeed: 'Up to 12.5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 12000,
    hourlyRate: 0.192,
    monthlyEstimate: 138.24,
    burstable: false,
    description: '4 vCPU / 16 GB dedicated instance providing sustained performance for critical applications.',
    bestUseCases: ['Production APIs', 'E-commerce backends', 'Microservice gateways']
  },
  {
    id: 'aws-m6i-2xlarge',
    provider: 'aws',
    family: 'General Purpose (Dedicated)',
    familyCategory: 'general',
    name: 'm6i.2xlarge',
    vCPU: 8,
    ramGB: 32,
    architecture: 'x86_64',
    networkSpeed: 'Up to 12.5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 12000,
    hourlyRate: 0.384,
    monthlyEstimate: 276.48,
    burstable: false,
    description: '8 vCPU / 32 GB RAM workhorse instance for demanding business applications.',
    bestUseCases: ['High throughput application servers', 'Game servers', 'Container orchestrators']
  },

  // C6i Compute
  {
    id: 'aws-c6i-xlarge',
    provider: 'aws',
    family: 'Compute Optimized',
    familyCategory: 'compute',
    name: 'c6i.xlarge',
    vCPU: 4,
    ramGB: 8,
    architecture: 'x86_64',
    networkSpeed: 'Up to 12.5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 12000,
    hourlyRate: 0.17,
    monthlyEstimate: 122.40,
    burstable: false,
    description: '4 vCPU high clock speed processor for compute intensive batch workloads.',
    bestUseCases: ['Video encoding/transcoding', 'High-performance web servers', 'Scientific modeling']
  },

  // R6i Memory
  {
    id: 'aws-r6i-xlarge',
    provider: 'aws',
    family: 'Memory Optimized',
    familyCategory: 'memory',
    name: 'r6i.xlarge',
    vCPU: 4,
    ramGB: 32,
    architecture: 'x86_64',
    networkSpeed: 'Up to 12.5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 12000,
    hourlyRate: 0.252,
    monthlyEstimate: 181.44,
    burstable: false,
    description: '4 vCPU / 32 GB RAM memory powerhouse for medium-sized relational & NoSQL databases.',
    bestUseCases: ['Production Relational DBs', 'Elasticsearch / OpenSearch nodes', 'Real-time analytics']
  },
  {
    id: 'aws-r6i-2xlarge',
    provider: 'aws',
    family: 'Memory Optimized',
    familyCategory: 'memory',
    name: 'r6i.2xlarge',
    vCPU: 8,
    ramGB: 64,
    architecture: 'x86_64',
    networkSpeed: 'Up to 12.5 Gbps',
    defaultStorageType: 'gp3',
    maxIops: 12000,
    hourlyRate: 0.504,
    monthlyEstimate: 362.88,
    burstable: false,
    description: '8 vCPU / 64 GB RAM memory optimized instance for high-load memory databases.',
    bestUseCases: ['Enterprise Databases', 'Apache Spark workers', 'Large Redis clusters']
  },

  // GPU & Azure/GCP
  {
    id: 'aws-g4dn-xlarge',
    provider: 'aws',
    family: 'GPU / Accelerated Computing',
    familyCategory: 'gpu',
    name: 'g4dn.xlarge',
    vCPU: 4,
    ramGB: 16,
    gpu: '1x NVIDIA T4 (16GB VRAM)',
    architecture: 'x86_64',
    networkSpeed: 'Up to 25 Gbps',
    defaultStorageType: 'NVMe SSD',
    maxIops: 40000,
    hourlyRate: 0.526,
    monthlyEstimate: 378.72,
    burstable: false,
    description: 'Cost-effective GPU instance with NVIDIA T4 for AI model inference and graphics rendering.',
    bestUseCases: ['LLM / AI Model Inference', '3D Graphics Rendering', 'Deep Learning evaluation']
  },
  {
    id: 'azure-d4s-v5',
    provider: 'azure',
    family: 'D-Series General Purpose',
    familyCategory: 'general',
    name: 'Standard_D4s_v5',
    vCPU: 4,
    ramGB: 16,
    architecture: 'x86_64',
    networkSpeed: '12.5 Gbps',
    defaultStorageType: 'Premium SSD v2',
    maxIops: 12800,
    hourlyRate: 0.192,
    monthlyEstimate: 138.24,
    burstable: false,
    description: 'Enterprise general-purpose VM tier running on 3rd Gen Intel Xeon processors.',
    bestUseCases: ['Production web servers', 'Enterprise business applications', 'Build agents']
  },
  {
    id: 'gcp-e2-standard-4',
    provider: 'gcp',
    family: 'E2 Cost-Optimized',
    familyCategory: 'general',
    name: 'e2-standard-4',
    vCPU: 4,
    ramGB: 16,
    architecture: 'x86_64',
    networkSpeed: '10 Gbps',
    defaultStorageType: 'pd-balanced',
    maxIops: 15000,
    hourlyRate: 0.134,
    monthlyEstimate: 96.48,
    burstable: true,
    description: 'Cost-optimized general purpose instance type on Google Cloud Platform.',
    bestUseCases: ['GCP web deployments', 'Medium load app servers', 'Internal web services']
  }
];

// ==========================================
// MANAGED CLOUD DATABASE SERVICES
// ==========================================
export const DATABASE_SERVICES = [
  {
    id: 'aws-rds-postgres-t4g',
    provider: 'aws',
    serviceType: 'Managed Relational DB',
    name: 'Amazon RDS (PostgreSQL / MySQL) - db.t4g.medium',
    engine: 'PostgreSQL / MySQL',
    vCPU: 2,
    ramGB: 4,
    storageType: 'gp3 SSD',
    multiAZ: true,
    monthlyEstimate: 42.50,
    hourlyRate: 0.059,
    description: 'Fully managed relational database with automated backups, patches, and point-in-time recovery.',
    bestUseCases: ['Small to medium Web App DBs', 'Production APIs', 'E-commerce catalogs']
  },
  {
    id: 'aws-rds-postgres-r6g',
    provider: 'aws',
    serviceType: 'Managed Relational DB',
    name: 'Amazon RDS PostgreSQL - db.r6g.xlarge',
    engine: 'PostgreSQL / MySQL',
    vCPU: 4,
    ramGB: 32,
    storageType: 'gp3 SSD / io2',
    multiAZ: true,
    monthlyEstimate: 260.00,
    hourlyRate: 0.361,
    description: 'High-memory Graviton3 processor database instance designed for sustained heavy query loads.',
    bestUseCases: ['High Traffic Production DBs', 'Complex SQL Joins', 'Analytics Data Store']
  },
  {
    id: 'aws-aurora-serverless-v2',
    provider: 'aws',
    serviceType: 'Serverless Relational DB',
    name: 'Amazon Aurora Serverless v2',
    engine: 'PostgreSQL / MySQL Compatible',
    vCPU: 'Auto-scaling (0.5 to 128 ACUs)',
    ramGB: 'Auto-scaling (2 GB to 256 GB)',
    storageType: 'Distributed Aurora Storage',
    multiAZ: true,
    monthlyEstimate: 85.00, // baseline estimate
    hourlyRate: 0.12,
    description: 'Instantly scales capacity up or down in fine-grained increments based on active queries. Zero downtime scaling.',
    bestUseCases: ['Unpredictable web traffic', 'SaaS multi-tenant apps', 'Dev/Test & Production DBs']
  },
  {
    id: 'aws-elasticache-redis',
    provider: 'aws',
    serviceType: 'In-Memory Cache & Key-Value',
    name: 'Amazon ElastiCache for Redis - cache.t4g.medium',
    engine: 'Redis / Valkey / Memcached',
    vCPU: 2,
    ramGB: 3.14,
    storageType: 'RAM In-Memory',
    multiAZ: true,
    monthlyEstimate: 38.00,
    hourlyRate: 0.052,
    description: 'Ultra-fast sub-millisecond in-memory cache to speed up web application session stores and database queries.',
    bestUseCases: ['Session Caching', 'User Auth Tokens', 'Real-time Leaderboards', 'API Caching']
  },
  {
    id: 'aws-dynamodb-payperreq',
    provider: 'aws',
    serviceType: 'NoSQL Serverless Database',
    name: 'Amazon DynamoDB (On-Demand)',
    engine: 'NoSQL Key-Value / Document',
    vCPU: 'Serverless',
    ramGB: 'Serverless In-Memory + SSD',
    storageType: 'Replicated NVMe SSD',
    multiAZ: true,
    monthlyEstimate: 25.00,
    hourlyRate: 0.035,
    description: 'Single-digit millisecond latency NoSQL database with zero server management and automatic scaling.',
    bestUseCases: ['Mobile app backends', 'User Profile stores', 'High throughput event streams']
  },
  {
    id: 'azure-sql-database',
    provider: 'azure',
    serviceType: 'Managed Relational DB',
    name: 'Azure SQL Database (General Purpose vCore)',
    engine: 'MS SQL Server',
    vCPU: 4,
    ramGB: 20,
    storageType: 'Premium SSD',
    multiAZ: true,
    monthlyEstimate: 220.00,
    hourlyRate: 0.305,
    description: 'Fully managed Microsoft SQL Server engine on Azure with built-in AI tuning and security.',
    bestUseCases: ['Enterprise .NET Applications', 'SQL Server migration', 'Financial records']
  },
  {
    id: 'gcp-cloud-sql-postgres',
    provider: 'gcp',
    serviceType: 'Managed Relational DB',
    name: 'GCP Cloud SQL for PostgreSQL',
    engine: 'PostgreSQL',
    vCPU: 4,
    ramGB: 16,
    storageType: 'pd-ssd',
    multiAZ: true,
    monthlyEstimate: 175.00,
    hourlyRate: 0.243,
    description: 'Managed PostgreSQL service on Google Cloud with automated backups and read replicas.',
    bestUseCases: ['GCP App Engine backends', 'Kubernetes DB workloads', 'Analytics']
  }
];

// ==========================================
// CLOUD STORAGE & OBJECT STORE SERVICES
// ==========================================
export const STORAGE_SERVICES = [
  {
    id: 'aws-s3-standard',
    provider: 'aws',
    storageCategory: 'Object Storage (Files/Images/Media)',
    name: 'Amazon S3 Standard',
    costPerGB: 0.023, // $0.023 per GB/mo
    durability: '99.999999999% (11 9s)',
    accessLatency: 'Milliseconds',
    description: 'High durability object store for websites, images, videos, documents, and data lakes.',
    bestUseCases: ['User Uploaded Files', 'Media Hosting', 'Static Website Assets', 'Data Lakes']
  },
  {
    id: 'aws-s3-infrequent',
    provider: 'aws',
    storageCategory: 'Object Storage (Cool Archive)',
    name: 'Amazon S3 Standard-IA (Infrequent Access)',
    costPerGB: 0.0125, // $0.0125 per GB/mo
    durability: '99.999999999%',
    accessLatency: 'Milliseconds',
    description: '50% cheaper storage for data accessed less frequently (e.g. monthly reports or old user files).',
    bestUseCases: ['Monthly backups', 'Historical log files', 'Audit records']
  },
  {
    id: 'aws-s3-glacier-flexible',
    provider: 'aws',
    storageCategory: 'Cold Archive Storage',
    name: 'Amazon S3 Glacier Flexible Archive',
    costPerGB: 0.0036, // $0.0036 per GB/mo (Super cheap!)
    durability: '99.999999999%',
    accessLatency: '1 to 5 hours',
    description: 'Ultra-low cost long-term cold archive storage for compliance and disaster recovery.',
    bestUseCases: ['Multi-year data archiving', 'Compliance backups', 'Raw video backups']
  },
  {
    id: 'aws-ebs-gp3',
    provider: 'aws',
    storageCategory: 'Block Storage (Server Hard Drives)',
    name: 'Amazon EBS gp3 Volume',
    costPerGB: 0.08, // $0.08 per GB/mo + 3000 free IOPS
    durability: '99.999%',
    accessLatency: 'Sub-millisecond SSD',
    description: 'General purpose SSD block storage attached directly to EC2 servers.',
    bestUseCases: ['Boot disks', 'Application storage', 'Dev/Test environments']
  },
  {
    id: 'aws-efs-file-storage',
    provider: 'aws',
    storageCategory: 'Shared Network File System (NFS)',
    name: 'Amazon EFS (Elastic File System)',
    costPerGB: 0.30,
    durability: '99.999999999%',
    accessLatency: 'Low millisecond',
    description: 'Serverless network file storage shareable across thousands of EC2 instances simultaneously.',
    bestUseCases: ['WordPress Shared Media', 'Container persistent volumes', 'Shared CI/CD builds']
  }
];

// ==========================================
// SERVERLESS & CONTAINER SERVICES
// ==========================================
export const SERVERLESS_SERVICES = [
  {
    id: 'aws-lambda',
    provider: 'aws',
    serviceCategory: 'Serverless Event-Driven Functions',
    name: 'AWS Lambda',
    pricingModel: '$0.20 per 1M requests + $0.0000166667 per GB-second',
    scalingSpeed: 'Instant (0 to thousands of concurrent executions)',
    description: 'Run code without provisioning or managing servers. Pay strictly per millisecond of code execution.',
    bestUseCases: ['API Gateways', 'Image processing on upload', 'Webhook handlers', 'Cron tasks']
  },
  {
    id: 'aws-fargate',
    provider: 'aws',
    serviceCategory: 'Serverless Container Engine',
    name: 'AWS Fargate (ECS / EKS)',
    pricingModel: '$0.04048 per vCPU hour + $0.004445 per GB hour',
    scalingSpeed: 'Automatic container autoscaling',
    description: 'Deploy Docker containers without managing EC2 instances or cluster infrastructure.',
    bestUseCases: ['Microservices', 'Docker Web Apps', 'Background queue workers']
  },
  {
    id: 'aws-app-runner',
    provider: 'aws',
    serviceCategory: 'Fully Managed App Platform',
    name: 'AWS App Runner',
    pricingModel: '$0.007 per GB hour baseline + per vCPU execution',
    scalingSpeed: 'Automatic web traffic scaling',
    description: 'Easiest way to build and run containerized web applications directly from GitHub or container registries.',
    bestUseCases: ['Next.js / Express web apps', 'REST APIs', 'Fast web service deployment']
  },
  {
    id: 'gcp-cloud-run',
    provider: 'gcp',
    serviceCategory: 'Serverless Container Platform',
    name: 'Google Cloud Run',
    pricingModel: 'Pay per request and CPU execution (Scales down to 0 cost)',
    scalingSpeed: 'Sub-second cold start scaling',
    description: 'Run stateless containers on Google Cloud infrastructure. Automatically scales to zero when traffic stops.',
    bestUseCases: ['GCP Web Applications', 'Webhooks', 'REST APIs']
  }
];

export const WORKLOAD_PROFILES = [
  {
    id: 'general_web',
    name: 'General Web Application / API',
    icon: 'Globe',
    defaultCpuRamRatio: 4,
    suggestedFamilyCategory: 'general',
    description: 'Standard REST APIs, Node.js/Python/Go backends, web frontends, and microservices.',
    recommendedProviderDefaults: { aws: 't3.large', azure: 'Standard_D4s_v5', gcp: 'e2-standard-4' }
  },
  {
    id: 'relational_db',
    name: 'Relational & NoSQL Database',
    icon: 'Database',
    defaultCpuRamRatio: 8,
    suggestedFamilyCategory: 'memory',
    description: 'PostgreSQL, MySQL, MongoDB, Redis, SQL Server needing high RAM for caching and query execution.',
    recommendedProviderDefaults: { aws: 'r6i.xlarge', azure: 'Standard_E8s_v5', gcp: 'n2-highmem-4' }
  },
  {
    id: 'compute_heavy',
    name: 'Compute Intensive / Batch Processing',
    icon: 'Cpu',
    defaultCpuRamRatio: 2,
    suggestedFamilyCategory: 'compute',
    description: 'Video encoding, scientific calculation, high-frequency processing, data compilation, and math pipelines.',
    recommendedProviderDefaults: { aws: 'c6i.xlarge', azure: 'Standard_D4s_v5', gcp: 'e2-standard-4' }
  },
  {
    id: 'ai_ml_inference',
    name: 'Machine Learning / AI Workloads',
    icon: 'Sparkles',
    defaultCpuRamRatio: 4,
    suggestedFamilyCategory: 'gpu',
    description: 'LLM inference, PyTorch/TensorFlow models, computer vision, deep learning evaluation.',
    recommendedProviderDefaults: { aws: 'g4dn.xlarge', azure: 'Standard_D4s_v5', gcp: 'n2-highmem-4' }
  },
  {
    id: 'storage_io_heavy',
    name: 'High IOPS / Big Data / Storage Heavy',
    icon: 'HardDrive',
    defaultCpuRamRatio: 8,
    suggestedFamilyCategory: 'storage',
    description: 'Log aggregation (ELK), ElasticSearch, Cassandra, high write volume disk storage pipelines.',
    recommendedProviderDefaults: { aws: 'i3en.xlarge', azure: 'Standard_E8s_v5', gcp: 'n2-highmem-4' }
  }
];
