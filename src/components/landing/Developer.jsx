import React from 'react';
import { Github, Globe, ExternalLink } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const TECH_STACK = [
  'React 18',
  'Vite 5',
  'Tailwind CSS',
  'JavaScript',
  'Terraform',
  'AWS / GCP / Azure',
  'Lucide Icons',
  'Vercel',
];

const LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/Ismail-dcode/InfraSense-Cloud-Infrastructure-Recommendation-Platform',
    description: 'Source code & contributions',
  },
  {
    icon: Globe,
    label: 'Live Demo',
    href: 'https://infrasence.ismailshaikh.in',
    description: 'infrasence.ismailshaikh.in',
  },
  {
    icon: ExternalLink,
    label: 'Portfolio',
    href: 'https://ismailshaikh.in',
    description: 'ismailshaikh.in',
  },
];

export default function Developer() {
  return (
    <section id="developer" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Developer
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built by a cloud engineer, for cloud engineers
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto">
            <div className="glass-panel p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-[2px] shadow-xl shadow-emerald-500/20">
                    <div className="w-full h-full rounded-[14px] bg-[#0a0f18] flex items-center justify-center">
                      <span className="text-3xl font-bold text-emerald-400 font-mono">IS</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#0a0f18]" />
                </div>

                {/* Bio */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-white">Ismail Shaikh</h3>
                  <p className="text-sm text-emerald-400 font-mono mt-1">Full-Stack & Cloud Engineer</p>
                  <p className="mt-4 text-slate-400 leading-relaxed text-sm">
                    InfraSense was built to solve a real problem: choosing the right cloud resources
                    without wasting hours comparing instance types across provider docs. As someone
                    who architects and deploys cloud infrastructure, I wanted a decision engine that
                    applies systematic heuristics — not generic AI guesses — and outputs actionable
                    Terraform configurations you can actually use.
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className="grid sm:grid-cols-3 gap-3 mt-8">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/25 hover:bg-emerald-500/[0.03] transition-all group"
                  >
                    <link.icon className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {link.label}
                      </div>
                      <div className="text-xs text-slate-500">{link.description}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Tech stack */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-300 bg-white/[0.04] border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
