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
  ArrowRight,
} from 'lucide-react';
import ScrollReveal from '../components/landing/ScrollReveal';
import CodeSnippets from '../components/landing/CodeSnippets';
import { TABS } from '../hooks/useAppTabs';

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

export default function DocumentationPage({ setActiveTab }) {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8faff]">
      {/* Header */}
      <div className="border-b border-slate-200/80 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-1">
                  Documentation & Guide
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  How InfraSense Works
                </h1>
                <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
                  A complete guide to the decision engine — from workload inputs to Terraform exports. No account required.
                </p>
              </div>

              {setActiveTab && (
                <button
                  onClick={() => setActiveTab(TABS.CONSOLE)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all shrink-0"
                >
                  <span>Open Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar nav */}
          <aside className="lg:w-56 shrink-0">
            <nav className="lg:sticky lg:top-24 space-y-1 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs" aria-label="Documentation sections">
              {DOC_SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
            <section id="overview" className="scroll-mt-28">
              <ScrollReveal>
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                  <h2 className="text-2xl font-extrabold text-slate-900">Overview</h2>
                  <div className="space-y-3 text-sm text-slate-600 leading-relaxed font-normal">
                    <p>
                      <strong className="text-slate-900 font-bold">InfraSense</strong> is a rule-based cloud infrastructure recommendation platform. It evaluates your workload requirements — vCPU, RAM, storage IOPS, traffic patterns, and enterprise hardening options — and returns ranked instance matches across AWS, GCP, and Azure.
                    </p>
                    <p>
                      Unlike generic AI estimators, InfraSense uses a transparent heuristic rule engine. Every recommendation comes with a clear justification: which rules fired, why an instance family was boosted or penalized, and what the estimated monthly cost looks like.
                    </p>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-slate-900 font-mono text-xs text-blue-300 overflow-x-auto shadow-inner">
                    <pre>{`User Inputs → Rule Engine (ruleEngine.js) → Score & Rank → Recommendations
                                              ↓
                              Terraform HCL · Health Scores · Topology Diagrams`}</pre>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Workflow */}
            <section id="workflow" className="scroll-mt-28">
              <ScrollReveal>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Workflow</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {WORKFLOW.map((item) => (
                    <div key={item.step} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{item.step}</span>
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <item.icon className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{item.description}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Service Categories */}
            <section id="services" className="scroll-mt-28">
              <ScrollReveal>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Service Categories</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <div key={cat.title} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                          <cat.icon className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-base text-slate-900">{cat.title}</h3>
                      </div>
                      <ul className="space-y-1.5">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 font-normal">
                            <span className="text-blue-600 mt-1 shrink-0">•</span>
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
            <section id="console" className="scroll-mt-28">
              <ScrollReveal>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Console Tabs</h2>
                <p className="text-slate-600 mb-5 text-sm font-normal">
                  The Console page contains four primary tools accessible via the sub-navigation bar:
                </p>
                <div className="space-y-3">
                  {CONSOLE_TABS.map((tab) => (
                    <div key={tab.name} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                        <tab.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{tab.name}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-normal">{tab.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Rule Engine */}
            <section id="rule-engine" className="scroll-mt-28">
              <ScrollReveal>
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
                  <h2 className="text-2xl font-extrabold text-slate-900">Rule Engine</h2>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    Rules live in <code className="text-blue-600 font-mono font-semibold text-xs bg-blue-50 px-1.5 py-0.5 rounded">src/data/defaultRules.js</code> and are evaluated by <code className="text-blue-600 font-mono font-semibold text-xs bg-blue-50 px-1.5 py-0.5 rounded">src/engine/ruleEngine.js</code>.
                  </p>
                  <div className="mockup-window bg-slate-950 border border-slate-800 text-slate-100 shadow-lg">
                    <div className="px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400">
                      example heuristic rule object
                    </div>
                    <pre className="p-4 text-[12px] font-mono text-blue-300 overflow-x-auto leading-relaxed">{`{
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
                </div>
              </ScrollReveal>
            </section>

            {/* Outputs */}
            <section id="outputs" className="scroll-mt-28">
              <ScrollReveal>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Outputs & Artifacts</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {OUTPUTS.map((output) => (
                    <div key={output.title} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-2">
                      <output.icon className="w-5 h-5 text-blue-600" />
                      <h3 className="font-bold text-slate-900 text-sm">{output.title}</h3>
                      <p className="text-xs text-slate-600 font-normal">{output.desc}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Code Examples */}
            <section id="code" className="scroll-mt-28">
              <CodeSnippets embedded />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
