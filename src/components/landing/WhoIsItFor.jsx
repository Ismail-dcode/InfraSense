import React from 'react';
import { Code2, CloudCog, GraduationCap, Users, Terminal } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const AUDIENCES = [
  {
    icon: Code2,
    title: 'Developers',
    description:
      'Quickly figure out if your app needs a t3.small or c6i.xlarge before you write a line of Terraform. Use presets for common patterns like microservices or MVPs.',
    tag: 'Build faster',
  },
  {
    icon: CloudCog,
    title: 'DevOps Engineers',
    description:
      'Evaluate auto-scaling, load balancer, and monitoring requirements upfront. Export Terraform HCL and deployment checklists directly from recommendations.',
    tag: 'Deploy smarter',
  },
  {
    icon: Terminal,
    title: 'Cloud Engineers',
    description:
      'Compare instance families, IOPS tiers, and multi-AZ configurations across providers. Customize the rule engine to match your organization\'s standards.',
    tag: 'Architect better',
  },
  {
    icon: GraduationCap,
    title: 'Students & Learners',
    description:
      'Understand why a t3.medium beats a c6i.large for a burstable web app. Learn cloud sizing through interactive inputs and clear architectural justifications.',
    tag: 'Learn by doing',
  },
  {
    icon: Users,
    title: 'Teams & Startups',
    description:
      'Align engineering and finance on infrastructure costs before provisioning. Share preset workload profiles and health score reports across your team.',
    tag: 'Decide together',
  },
];

export default function WhoIsItFor() {
  return (
    <section className="relative py-24 sm:py-32 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Who Is It For
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for everyone who touches cloud infrastructure
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AUDIENCES.map((audience, i) => (
            <ScrollReveal key={audience.title} delay={i * 70}>
              <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/20 hover:bg-emerald-500/[0.03] transition-all duration-300 h-full group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <audience.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-emerald-400/80 uppercase tracking-wider px-2 py-1 rounded-md bg-emerald-500/10">
                    {audience.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{audience.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{audience.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
