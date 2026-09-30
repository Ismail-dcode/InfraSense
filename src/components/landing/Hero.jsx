import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Server,
  Database,
  HardDrive,
  Zap,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Search,
  Code2,
  Bookmark,
  Layers,
  Wrench,
  Construction,
  Bot,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { TABS } from '../../hooks/useAppTabs';

const PROMPT_SUGGESTIONS = [
  {
    label: '🚀 High-Traffic Web App',
    text: 'Production Next.js & Node.js API with 50k visitors/day and load balancing',
    preset: { vcpu: 4, ram: 16, workload: 'general_web', provider: 'aws', budgetPriority: 'balanced' },
  },
  {
    label: '🐘 PostgreSQL Database',
    text: 'Mission-critical database with 64GB RAM, 20,000 IOPS and Multi-AZ replication',
    preset: { vcpu: 8, ram: 64, workload: 'relational_db', provider: 'aws', budgetPriority: 'performance' },
  },
  {
    label: '🧠 AI / ML Inference',
    text: 'PyTorch deep learning model server with GPU acceleration and high NVMe storage',
    preset: { vcpu: 4, ram: 16, workload: 'ai_ml_inference', provider: 'aws', budgetPriority: 'performance' },
  },
  {
    label: '💵 Low-Cost MVP',
    text: 'Cost-optimized starter server under $20/month for development & testing',
    preset: { vcpu: 2, ram: 4, workload: 'general_web', provider: 'all', budgetPriority: 'cost' },
  },
];

const ROTATING_PROMPTS = [
  'Size a high-availability microservices cluster on AWS with Multi-AZ...',
  'Find the best PostgreSQL database server for 20,000 IOPS...',
  'Recommend the cheapest 8-core, 32GB RAM VM across AWS, Azure, and GCP...',
  'Generate Terraform code for an Auto Scaling web tier behind an ALB...',
  'Compare AWS Lambda vs ECS Fargate for background worker jobs...',
];

export default function Hero({ onLaunchConsole, onLaunchServices, onNavigateTab }) {
  const [promptText, setPromptText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect for prompt placeholder
  useEffect(() => {
    const currentTarget = ROTATING_PROMPTS[placeholderIndex];
    let charIndex = 0;
    setDisplayedPlaceholder('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex <= currentTarget.length) {
        setDisplayedPlaceholder(currentTarget.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
        }, 2400);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [placeholderIndex]);

  const handleLaunch = (preset) => {
    if (onLaunchServices) {
      onLaunchServices(preset);
    } else if (onLaunchConsole) {
      onLaunchConsole(preset);
    }
  };

  return (
    <section className="relative pt-8 pb-20 sm:pt-14 sm:pb-28 overflow-hidden">
      {/* Background Soft Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[550px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] sm:left-1/4 w-[120%] sm:w-[500px] h-[350px] bg-blue-400/15 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute top-[-5%] right-[-10%] sm:right-1/4 w-[120%] sm:w-[450px] h-[350px] bg-indigo-400/15 rounded-full blur-[100px] animate-float-slow-reverse" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12 sm:space-y-16">
        
        {/* Hero Top Copy */}
        <div className="max-w-4xl mx-auto space-y-4">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-sm text-blue-700 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Cloud Architecture & Services Platform</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] tracking-tight">
              Design & size your complete <br className="hidden sm:block" />
              <span className="gradient-text-blue">cloud infrastructure</span> with InfraSense
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
              From full infrastructure suites with 3 strategic blueprints to VM compute sizing calculators, InfraSense gives you instant production architectures and Terraform IaC exports.
            </p>
          </ScrollReveal>
        </div>

        {/* Interactive Chatbox with "UNDER DEVELOPMENT" Banner (Requirement 3) */}
        <ScrollReveal delay={200}>
          <div className="max-w-2xl mx-auto">
            <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-blue-600 via-amber-400 to-indigo-600 shadow-xl shadow-blue-500/10">
              <div className="bg-white rounded-[22px] p-5 sm:p-6 text-left space-y-4">
                
                {/* Under Development Badge */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <Construction className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>AI Natural Language Chatbox</strong> — Under Active Development
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-800 font-bold uppercase">
                    v2.1 Preview
                  </span>
                </div>

                {/* Input Area */}
                <div className="relative min-h-[56px] flex items-start">
                  <textarea
                    rows="2"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder={displayedPlaceholder || 'Describe your cloud workload...'}
                    className="w-full text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none bg-transparent"
                  />
                  {isTyping && !promptText && (
                    <span className="inline-block w-0.5 h-4 bg-blue-600 animate-blink ml-0.5 mt-0.5" />
                  )}
                </div>

                {/* Bottom Row Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-2 pt-4 sm:pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200/60">
                      <Bot className="w-3.5 h-3.5 text-blue-600" />
                      <span>Natural Language Parser</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunch()}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto cursor-pointer"
                  >
                    <span>Launch Dedicated Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {PROMPT_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setPromptText(sug.text);
                    handleLaunch(sug.preset);
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white/90 hover:bg-white hover:text-blue-600 border border-slate-200/80 shadow-xs transition-all hover:border-blue-300 hover:shadow-xs cursor-pointer"
                >
                  {sug.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* InfraSense Provided Consoles & Services Suite (Requirement 3) */}
        <ScrollReveal delay={240}>
          <div className="space-y-6 pt-4 text-left">
            <div className="text-center space-y-1 max-w-2xl mx-auto">
              <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                INFRASENSE PROVIDED SERVICES & CONSOLES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Choose a Specialized Cloud Architecture Service
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Click any service below to open its dedicated decision console and generate production-ready architectures:
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Service 1: Full Infra Architect */}
              <div
                onClick={() => (onNavigateTab ? onNavigateTab(TABS.SERVICES) : handleLaunch())}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col justify-between space-y-4 group cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-100 text-blue-700">
                      NEW · FEATURED
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Full Infra Services Architect
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Recommends the complete cloud stack: Compute, Databases, Storage, VPC, WAF & Monitoring with <strong>Performance</strong>, <strong>Cost Efficient</strong>, and <strong>Zero-Ops</strong> blueprints.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Open Services Architect</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 2: VM & Compute Sizing Console */}
              <div
                onClick={() => (onNavigateTab ? onNavigateTab(TABS.CONSOLE) : onLaunchConsole())}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 transition-all flex flex-col justify-between space-y-4 group cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Server className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-indigo-100 text-indigo-700">
                      CALCULATOR
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      VM & Compute Sizing Console
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Deterministic heuristic instance matcher for AWS EC2, Azure VMs, and GCP Compute Engine with vCPU, RAM, IOPS, and live pricing benchmarks.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Open VM Sizer Console</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 3: User Dashboard Saved Reports */}
              <div
                onClick={() => (onNavigateTab ? onNavigateTab(TABS.DASHBOARD) : onLaunchServices())}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10 transition-all flex flex-col justify-between space-y-4 group cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Bookmark className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-amber-100 text-amber-700">
                      DASHBOARD
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                      Recently Saved Reports & Results
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Review, export, and reload your saved infrastructure configurations, architecture decision records, and budget estimations in your private dashboard.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                  <span>View Saved Reports</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 4: Database Advisor */}
              <div
                onClick={() => (onNavigateTab ? onNavigateTab(TABS.CONSOLE) : onLaunchConsole())}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all flex flex-col justify-between space-y-4 group cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Database className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-purple-100 text-purple-700">
                      DATABASE
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                      Cloud Database & Cache Sizer
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      PostgreSQL, MySQL, Amazon Aurora Serverless v2, DynamoDB, and Redis sizing based on connections, IOPS, and RAM cache ratios.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                  <span>Explore Database Sizer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 5: Storage & CDN Optimizer */}
              <div
                onClick={() => (onNavigateTab ? onNavigateTab(TABS.CONSOLE) : onLaunchConsole())}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/10 transition-all flex flex-col justify-between space-y-4 group cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <HardDrive className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-sky-100 text-sky-700">
                      STORAGE
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                      Cloud Storage & CDN Optimizer
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Compare Amazon S3 Intelligent-Tiering, EBS SSD (gp3 vs io2), Glacier archives, and CloudFront edge delivery costs.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
                  <span>Explore Storage Sizer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Service 6: Terraform IaC Generator */}
              <div
                onClick={() => (onNavigateTab ? onNavigateTab(TABS.SERVICES) : handleLaunch())}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10 transition-all flex flex-col justify-between space-y-4 group cursor-pointer hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-100 text-emerald-700">
                      TERRAFORM
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Terraform IaC Generator Studio
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      Export 100% production-ready HashiCorp HCL files for VPC, subnets, security groups, ALB, compute clusters, and databases.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Generate Terraform IaC</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
