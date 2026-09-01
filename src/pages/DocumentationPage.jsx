import React, { useState } from 'react';
import {
  Sliders,
  Cpu,
  FileOutput,
  Rocket,
  Database,
  HardDrive,
  Zap,
  ShieldCheck,
  FileCode2,
  BarChart3,
  Network,
  Settings2,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import ScrollReveal from '../components/landing/ScrollReveal';
import CodeSnippets from '../components/landing/CodeSnippets';

const WORKFLOW = [
  {
    step: '01',
    icon: Sliders,
    title: 'Define Your Workload',
    description:
      'Open the Console tab and select a cloud category — compute, database, storage, or serverless. Use sliders and toggles to set vCPU, RAM, IOPS, traffic patterns, provider preference, and enterprise options.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Run the Rule Engine',
    description:
      'InfraSense passes your inputs through 15+ heuristic rules in `ruleEngine.js`. Rules adjust instance scores — e.g. penalizing burstable families under sustained load, or boosting memory-optimized types for database workloads.',
  },
  {
    step: '03',
    icon: FileOutput,
    title: 'Review Recommendations',
    description:
      'Get ranked instance matches with hourly/monthly cost estimates, architectural justifications, health scores, topology diagrams, and alternative options (lowest cost vs maximum power).',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Export & Deploy',
    description:
      'Copy Terraform HCL from the generator, follow the deployment checklist, and customize rules in the Rule Manager to align with your team\'s standards.',
  },
];

const SERVICE_CATEGORIES = [
  {
    icon: Cpu,
    title: 'Virtual Servers (EC2 / VMs)',
    items: ['vCPU & RAM sizing', 'IOPS & storage type selection', 'Instance family matching (t3, c6i, r6i, m6i)', 'Multi-instance cluster configs'],
  },
  {
    icon: Database,
    title: 'Managed Databases',
    items: ['AWS RDS & Aurora Serverless v2', 'DynamoDB & Redis cache layers', 'Connection & IOPS analysis', 'Read/write ratio evaluation'],
  },
  {
    icon: HardDrive,
    title: 'Cloud Storage & S3',
    items: ['S3 tiering (Standard, Intelligent-Tiering, Glacier)', 'EBS volume sizing (gp3 vs io2)', 'Archive vs hot storage guidance'],
  },
  {
    icon: Zap,
    title: 'Serverless & Containers',
    items: ['Lambda vs ECS Fargate comparison', 'AWS App Runner & GCP Cloud Run', 'Concurrency & execution duration matching'],
  },
];

const CONSOLE_TABS = [
  {
    icon: Sliders,
    name: 'Engine',
    description: 'Main calculator — select a service category, configure inputs, and generate recommendations.',
  },
  {
    icon: ShieldCheck,
    name: 'Rule Manager',
    description: 'Enable/disable built-in heuristic rules or add custom condition-based rules with scoring weights.',
  },
  {
    icon: Settings2,
    name: 'Instance Catalog',
    description: 'Browse 50+ cloud instance specs — family, vCPU, RAM, network throughput, and pricing data.',
  },
  {
    icon: Sparkles,
    name: 'Quick Presets',
    description: 'One-click workload profiles: High-Traffic E-Commerce, Microservice API, AI/ML Inference, Low-Cost MVP.',
  },
];

const OUTPUTS = [
  { icon: FileCode2, title: 'Terraform IaC', desc: 'VPC, subnets, security groups, ALB, Auto Scaling, and RDS HCL blocks.' },
  { icon: BarChart3, title: 'Health Scores', desc: 'Radar scores for cost, performance, reliability, security, and scalability.' },
  { icon: Network, title: 'Architecture Diagrams', desc: 'Route 53 → ALB → Auto Scaling → Multi-AZ RDS → CloudWatch flow.' },
  { icon: ShieldCheck, title: 'Deployment Checklist', desc: 'Production hardening steps: SSL/TLS, backups, multi-AZ failover, monitoring.' },
];

const DOC_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'services', label: 'Service Categories' },
  { id: 'console', label: 'Console Tabs' },
  { id: 'rule-engine', label: 'Rule Engine' },
  { id: 'outputs', label: 'Outputs' },
  { id: 'code', label: 'Code Examples' },
];

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <ScrollReveal>
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Documentation
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How InfraSense Works
            </h1>
            <p className="mt-3 text-slate-400 max-w-2xl leading-relaxed">
              A complete guide to the recommendation engine — from workload input to Terraform export.
              No account required. All processing runs client-side in your browser.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar nav */}
          <aside className="lg:w-56 shrink-0">
            <nav className="lg:sticky lg:top-24 space-y-1" aria-label="Documentation sections">
              {DOC_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-16 pb-16">
            {/* Overview */}
            <section id="overview" className="scroll-mt-24">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <div className="prose prose-invert max-w-none space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    <strong className="text-white">InfraSense</strong> is a rule-based cloud infrastructure
                    recommendation platform. It evaluates your workload requirements — vCPU, RAM, storage IOPS,
                    traffic patterns, and enterprise hardening options — and returns ranked instance matches
                    across AWS, GCP, and Azure.
                  </p>
                  <p>
                    Unlike generic AI estimators, InfraSense uses a transparent heuristic rule engine. Every
                    recommendation comes with a clear justification: which rules fired, why an instance family
                    was boosted or penalized, and what the estimated monthly cost looks like.
                  </p>
                </div>

                <div className="mt-6 p-5 rounded-xl bg-[#0a0f18] border border-white/[0.06] font-mono text-xs text-slate-400 overflow-x-auto">
                  <pre>{`User Inputs → Rule Engine (ruleEngine.js) → Score & Rank → Recommendations
                                              ↓
                              Terraform HCL · Health Scores · Topology Diagrams`}</pre>
                </div>
              </ScrollReveal>
            </section>

            {/* Workflow */}
            <section id="workflow" className="scroll-mt-24">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white mb-6">Workflow</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {WORKFLOW.map((item, i) => (
                    <div key={item.step} className="glass-panel p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono font-bold text-emerald-400">{item.step}</span>
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-emerald-400" />
                        </div>
                      </div>
                      <h3 className="font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Service Categories */}
            <section id="services" className="scroll-mt-24">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white mb-6">Service Categories</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <div key={cat.title} className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                      <div className="flex items-center gap-3 mb-3">
                        <cat.icon className="w-5 h-5 text-emerald-400" />
                        <h3 className="font-bold text-white">{cat.title}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                            <span className="text-emerald-500 mt-1.5 shrink-0">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Console Tabs */}
            <section id="console" className="scroll-mt-24">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white mb-6">Console Tabs</h2>
                <p className="text-slate-400 mb-5 text-sm">
                  The Console page contains four tools accessible via the sub-navigation bar:
                </p>
                <div className="space-y-3">
                  {CONSOLE_TABS.map((tab) => (
                    <div key={tab.name} className="flex gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <tab.icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{tab.name}</h3>
                        <p className="text-sm text-slate-400 mt-0.5">{tab.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Rule Engine */}
            <section id="rule-engine" className="scroll-mt-24">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white mb-4">Rule Engine</h2>
                <p className="text-slate-400 mb-5 leading-relaxed">
                  Rules live in <code className="text-emerald-400 font-mono text-sm">src/data/defaultRules.js</code> and
                  are evaluated by <code className="text-emerald-400 font-mono text-sm">src/engine/ruleEngine.js</code>.
                  Each rule has a condition function and a scoring weight function.
                </p>
                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0f18]">
                  <div className="px-4 py-2 border-b border-white/[0.06] text-xs font-mono text-slate-500">
                    example rule object
                  </div>
                  <pre className="p-4 text-[13px] leading-relaxed font-mono text-slate-300 overflow-x-auto">{`{
  id: 'high_mem_db_rule',
  name: 'Database Workload Memory Boost',
  category: 'workload',
  enabled: true,
  condition: (input) => input.workload === 'database',
  applyWeight: (instance) => {
    if (instance.family.startsWith('r')) return 25;
    return 0;
  }
}`}</pre>
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Open the Rule Manager tab in Console to toggle rules on/off or add custom rules at runtime.
                </p>
              </ScrollReveal>
            </section>

            {/* Outputs */}
            <section id="outputs" className="scroll-mt-24">
              <ScrollReveal>
                <h2 className="text-2xl font-bold text-white mb-6">Outputs & Artifacts</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {OUTPUTS.map((output) => (
                    <div key={output.title} className="glass-panel p-5">
                      <output.icon className="w-5 h-5 text-emerald-400 mb-3" />
                      <h3 className="font-bold text-white mb-1">{output.title}</h3>
                      <p className="text-sm text-slate-400">{output.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Code Examples */}
            <section id="code" className="scroll-mt-24">
              <CodeSnippets embedded />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
