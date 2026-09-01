import React from 'react';
import { Sliders, Cpu, FileOutput, Rocket } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const STEPS = [
  {
    step: '01',
    icon: Sliders,
    title: 'Define Your Workload',
    description:
      'Select a cloud category — compute, database, storage, or serverless. Configure vCPU, RAM, IOPS, traffic patterns, and enterprise options like Multi-AZ or encryption.',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'Run the Rule Engine',
    description:
      'InfraSense evaluates your inputs against 15+ heuristic rules — penalizing burstable instances for sustained load, boosting memory-optimized families for databases, and more.',
  },
  {
    step: '03',
    icon: FileOutput,
    title: 'Review Recommendations',
    description:
      'See ranked instance matches with cost estimates, architectural justifications, health scores, and visual topology diagrams showing DNS → ALB → EC2 → RDS flow.',
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Export & Deploy',
    description:
      'Copy Terraform HCL configurations, follow the deployment checklist, and customize rules in the Rule Manager to match your team\'s standards.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From requirements to production-ready architecture
            </h2>
            <p className="mt-4 text-slate-400">
              Four steps. No account required. Start sizing in under a minute.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {STEPS.map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 100}>
              <div className="relative h-full">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-gradient-to-r from-emerald-500/40 to-transparent z-0" />
                )}
                <div className="relative glass-panel p-6 h-full group hover:border-emerald-500/20 transition-all">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs font-mono font-bold text-emerald-400">{item.step}</span>
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/15 transition-colors">
                      <item.icon className="w-4.5 h-4.5 text-emerald-400" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
