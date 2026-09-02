import React from 'react';
import { Github, Globe, ExternalLink, Heart } from 'lucide-react';
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
    <section id="developer" className="relative py-20 sm:py-28 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest block mb-2">
              Developer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built by a cloud engineer, for cloud engineers
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-blue-500/20">
                    <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                      <span className="text-2xl font-extrabold text-blue-600 font-mono">IS</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" />
                </div>

                {/* Bio */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-extrabold text-slate-900">Ismail Shaikh</h3>
                  <p className="text-xs font-bold font-mono text-blue-600 mt-1">Full-Stack & Cloud Engineer</p>
                  <p className="mt-3 text-slate-600 leading-relaxed text-sm font-normal">
                    InfraSense was built to solve a real problem: choosing the right cloud resources
                    without wasting hours comparing instance types across provider docs. As someone
                    who architects and deploys cloud infrastructure, I wanted a decision engine that
                    applies systematic heuristics — not generic AI guesses — and outputs actionable
                    Terraform configurations you can actually deploy.
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
                    className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all group"
                  >
                    <link.icon className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {link.label}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[130px]">{link.description}</div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Tech stack */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium text-slate-700 bg-slate-100 border border-slate-200/60"
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
