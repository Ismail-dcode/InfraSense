import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Server,
  Database,
  ShieldCheck,
  Code2,
  Layers,
  Cpu,
  Zap,
  Activity,
  Lock,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function ProductDetails({ onLaunchConsole }) {
  return (
    <section className="relative py-20 sm:py-28 space-y-24 sm:space-y-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Deep Dive 1: Heuristic Sizing Engine (Text Left, Mockup Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Copy */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                <span>Heuristic Engine</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Never guess your cloud <br />
                <span className="gradient-text-blue">instance sizes again.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                InfraSense surfaces the ideal hardware specs for your workload, then evaluates them against 15+ transparent heuristic rules. Sizing a production server takes seconds, not spreadsheets.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-3 pt-2">
                {[
                  '50+ cloud instances evaluated and ranked for your exact workload',
                  'Deterministic heuristic rules with explicit justifications (no black-box AI)',
                  'Multi-cloud cost comparison across AWS, Azure, and Google Cloud',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm sm:text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={260}>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onLaunchConsole && onLaunchConsole()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Launch Compute Sizing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Browser Window Mockup */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left" delay={150}>
              <div className="mockup-window bg-white">
                {/* Browser Top Bar */}
                <div className="px-4 py-3 border-b border-slate-200/80 bg-slate-50/80 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0 max-w-xs mx-auto text-center px-3 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-500 truncate">
                    app.infrasense.io/console/evaluate
                  </div>
                </div>

                {/* Mockup Body: Live Recommendation Card */}
                <div className="p-6 space-y-5 bg-gradient-to-b from-white to-slate-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        98% MATCH SCORE
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-slate-100 text-slate-700">
                        AWS EC2
                      </span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ✓ Active Rule Match
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      RECOMMENDED SERVER SIZE
                    </span>
                    <h3 className="text-2xl font-extrabold font-mono text-slate-900 mt-0.5">
                      t3.xlarge
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">General Purpose Burstable Family</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <span className="text-slate-400 block text-[10px]">vCPU Cores</span>
                      <span className="font-bold text-slate-900 text-sm">4 Cores</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <span className="text-slate-400 block text-[10px]">Memory</span>
                      <span className="font-bold text-slate-900 text-sm">16 GB RAM</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                      <span className="text-slate-400 block text-[10px]">Est. Monthly</span>
                      <span className="font-bold text-blue-600 text-sm">$121.40/mo</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-blue-800 block">Why this instance?</span>
                    <p className="text-[11px] text-slate-600">
                      Rule Engine evaluated 4 vCPU & 16GB memory requirement with burstable CPU allowance for sporadic traffic spikes.
                    </p>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Deep Dive 2: Terraform IaC & Multi-Cloud (Mockup Left, Copy Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Browser Window Mockup */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ScrollReveal direction="right" delay={150}>
              <div className="mockup-window bg-white">
                <div className="px-4 py-3 border-b border-slate-200/80 bg-slate-50/80 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0 max-w-xs mx-auto text-center px-3 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-500 truncate">
                    app.infrasense.io/console/terraform
                  </div>
                </div>

                <div className="p-5 bg-slate-900 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                    <span className="text-blue-400">main.tf — Terraform Blueprint</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-semibold text-[10px]">
                      Ready to apply
                    </span>
                  </div>
                  <pre className="text-[12px]">{`# Generated by InfraSense
resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.xlarge"
  count         = 2

  root_block_device {
    volume_size = 100
    volume_type = "gp3"
    encrypted   = true
  }

  tags = {
    Name = "InfraSense-Compute-Cluster"
  }
}`}</pre>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <ScrollReveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold">
                <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Infrastructure as Code</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Deploy with confidence <br />
                <span className="gradient-text-indigo">without the manual YAML.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Batch your architecture requirements in one sitting. InfraSense exports complete, production-ready Terraform HCL configs for VPCs, ALBs, Auto Scaling groups, and RDS databases.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="space-y-3 pt-2">
                {[
                  'One-click copy and download of tested Terraform HCL modules',
                  'Pre-configured TLS listeners, security groups & KMS encryption',
                  'Deployment readiness checklist ensuring 99.99% high availability',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm sm:text-base text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={260}>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onLaunchConsole && onLaunchConsole()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>See Terraform Generator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
}
