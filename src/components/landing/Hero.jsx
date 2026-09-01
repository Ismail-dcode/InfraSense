import React from 'react';
import {
  ArrowRight,
  ChevronRight,
  Cloud,
  Server,
  Database,
  Zap,
  GitBranch,
} from 'lucide-react';
import { scrollToSection } from '../../hooks/useScrollReveal';
import ScrollReveal from './ScrollReveal';

const STATS = [
  { value: '4', label: 'Cloud Categories' },
  { value: '50+', label: 'Instance Types' },
  { value: '15+', label: 'Heuristic Rules' },
  { value: '3', label: 'Cloud Providers' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-600/8 rounded-full blur-[120px] animate-float-slow-reverse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Cloud Infrastructure Decision Engine
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[3.5rem] font-extrabold text-white leading-[1.08] tracking-tight">
                Size cloud infrastructure{' '}
                <span className="gradient-text-emerald">with confidence</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-xl">
                InfraSense evaluates your workload requirements and recommends optimal
                compute, database, storage, and serverless configurations — complete with
                Terraform IaC exports and architecture diagrams.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('product')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#07090e] transition-all hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5"
                >
                  Launch Calculator
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                >
                  See How It Works
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center sm:text-left">
                    <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Visual */}
          <ScrollReveal direction="left" delay={200}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-transparent rounded-3xl blur-2xl" />
              <div className="relative glass-panel p-6 sm:p-8 border-emerald-500/10">
                {/* Architecture visual */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-3 border-b border-white/[0.06]">
                    <span>infrasence — architecture preview</span>
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      live
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Server, label: 'Compute', sub: 'EC2 / VMs', color: 'text-emerald-400' },
                      { icon: Database, label: 'Database', sub: 'RDS / Aurora', color: 'text-emerald-300' },
                      { icon: Cloud, label: 'Storage', sub: 'S3 / EBS', color: 'text-emerald-400' },
                      { icon: Zap, label: 'Serverless', sub: 'Lambda / Fargate', color: 'text-emerald-300' },
                    ].map((item, i) => (
                      <div
                        key={item.label}
                        className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/20 transition-all group"
                        style={{ animationDelay: `${i * 150}ms` }}
                      >
                        <item.icon className={`w-5 h-5 ${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="text-xs text-slate-500">{item.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Flow diagram */}
                  <div className="mt-4 p-4 rounded-xl bg-[#0a0f18] border border-white/[0.06] font-mono text-xs">
                    <div className="flex items-center gap-2 text-slate-500 mb-3">
                      <GitBranch className="w-3.5 h-3.5" />
                      <span>recommendation pipeline</span>
                    </div>
                    <div className="space-y-2">
                      {['Input Requirements', 'Rule Engine', 'Score & Rank', 'Export IaC'].map(
                        (step, i) => (
                          <div key={step} className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                              {i + 1}
                            </span>
                            <span className="text-slate-400">{step}</span>
                            {i < 3 && (
                              <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
