import React from 'react';
import {
  Github,
  Globe,
  ExternalLink,
  GitFork,
  Bug,
  Scale,
  Heart,
  Terminal,
  Package,
  Code2,
} from 'lucide-react';
import ScrollReveal from '../components/landing/ScrollReveal';

const GITHUB_REPO =
  'https://github.com/Ismail-dcode/InfraSense-Cloud-Infrastructure-Recommendation-Platform';

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
  { icon: Github, label: 'GitHub Repository', href: GITHUB_REPO, description: 'Source code & issues' },
  { icon: Globe, label: 'Live Demo', href: 'https://infrasence.ismailshaikh.in', description: 'infrasence.ismailshaikh.in' },
  { icon: ExternalLink, label: 'Portfolio', href: 'https://ismailshaikh.in', description: 'ismailshaikh.in' },
];

const CONTRIBUTING_STEPS = [
  {
    icon: GitFork,
    title: 'Fork the repository',
    description: 'Create your own fork on GitHub from the InfraSense repository page.',
  },
  {
    icon: Terminal,
    title: 'Clone & install',
    description: 'Run `git clone`, then `npm install` and `npm run dev` to start locally on port 5173.',
  },
  {
    icon: Code2,
    title: 'Make your changes',
    description: 'Add rules, improve UI, extend cloud catalogs, or fix bugs. Keep changes focused and tested.',
  },
  {
    icon: Github,
    title: 'Open a Pull Request',
    description: 'Push to your fork and open a PR with a clear description of what changed and why.',
  },
];

const LICENSE_POINTS = [
  'Free to use, modify, and distribute for any purpose — including commercial projects.',
  'No warranty is provided. Use recommendations as guidance, not production guarantees.',
  'Attribution is appreciated but not required under MIT terms.',
  'Contributions are welcome and will be licensed under the same MIT License.',
];

export default function DeveloperPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <ScrollReveal>
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Developer & Open Source
            </span>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built in the open
            </h1>
            <p className="mt-3 text-slate-400 max-w-2xl leading-relaxed">
              InfraSense is a free, open-source tool licensed under MIT. Meet the creator, learn how to
              contribute, and run it locally.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
        {/* Creator */}
        <ScrollReveal>
          <section>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Heart className="w-5 h-5 text-emerald-400" />
              Creator
            </h2>
            <div className="glass-panel p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-[2px] shadow-xl shadow-emerald-500/20">
                    <div className="w-full h-full rounded-[14px] bg-[#0a0f18] flex items-center justify-center">
                      <span className="text-2xl font-bold text-emerald-400 font-mono">IS</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white">Ismail Shaikh</h3>
                  <p className="text-sm text-emerald-400 font-mono mt-0.5">Full-Stack & Cloud Engineer</p>
                  <p className="mt-3 text-slate-400 leading-relaxed text-sm">
                    InfraSense was built to solve a real problem: choosing the right cloud resources without
                    wasting hours comparing instance types across provider documentation. The goal was a
                    transparent decision engine with systematic heuristics — not black-box AI guesses — that
                    outputs Terraform configurations you can actually deploy.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 mt-6">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-emerald-500/25 hover:bg-emerald-500/[0.03] transition-all group"
                  >
                    <link.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {link.label}
                      </div>
                      <div className="text-xs text-slate-500">{link.description}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-widest">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono text-slate-300 bg-white/[0.04] border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Open Source */}
        <ScrollReveal delay={80}>
          <section>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              Open Source License
            </h2>
            <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05]">
              <p className="text-sm font-semibold text-emerald-400 font-mono mb-3">MIT License</p>
              <ul className="space-y-2">
                {LICENSE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="text-emerald-500 mt-1 shrink-0">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </ScrollReveal>

        {/* Contributing */}
        <ScrollReveal delay={120}>
          <section>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <GitFork className="w-5 h-5 text-emerald-400" />
              Contributing Guidelines
            </h2>
            <div className="space-y-3">
              {CONTRIBUTING_STEPS.map((step, i) => (
                <div key={step.title} className="flex gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-400">{String(i + 1).padStart(2, '0')}</span>
                    <step.icon className="w-4 h-4 text-emerald-400 mt-2" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                    <p className="text-sm text-slate-400 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Local setup */}
        <ScrollReveal delay={160}>
          <section>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              Run Locally
            </h2>
            <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0f18]">
              <div className="px-4 py-2 border-b border-white/[0.06] text-xs font-mono text-slate-500">
                terminal
              </div>
              <pre className="p-4 text-[13px] leading-relaxed font-mono text-slate-300 overflow-x-auto">{`git clone ${GITHUB_REPO}.git
cd InfraSense-Cloud-Infrastructure-Recommendation-Platform
npm install
npm run dev
# → http://localhost:5173`}</pre>
            </div>
          </section>
        </ScrollReveal>

        {/* Issues */}
        <ScrollReveal delay={200}>
          <section>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Bug className="w-5 h-5 text-emerald-400" />
              Report Issues
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Found a bug or have a feature request? Open an issue on GitHub with steps to reproduce,
              expected behavior, and your browser/OS details. Pull requests that fix issues are especially welcome.
            </p>
            <a
              href={`${GITHUB_REPO}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#07090e] transition-all"
            >
              <Github className="w-4 h-4" />
              Open GitHub Issues
            </a>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
