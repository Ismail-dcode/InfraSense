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
    <section className="relative py-20 sm:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest block mb-2">
              Who Is It For
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for everyone who touches cloud infrastructure
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              From solo developers building MVPs to engineering teams scaling enterprise systems.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AUDIENCES.map((audience, i) => (
            <ScrollReveal key={audience.title} delay={i * 70}>
              <div className="relative p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full group flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                      <audience.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-blue-700 uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100">
                      {audience.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {audience.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
