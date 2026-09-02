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

const GITHUB_REPO = 'https://github.com/Ismail-dcode/Infrasence';

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
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8faff]">
      {/* Header */}
      <div className="border-b border-slate-200/80 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <ScrollReveal>
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Developer & Open Source
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built in the open
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
              InfraSense is a free, open-source tool licensed under MIT. Meet the creator, learn how to contribute, and run it locally.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
        {/* Creator */}
        <ScrollReveal>
          <section>
            <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
              <Heart className="w-5 h-5 text-blue-600" />
              Creator
            </h2>
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[2px] shadow-lg shadow-blue-500/20">
                    <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center">
                      <span className="text-2xl font-extrabold text-blue-600 font-mono">IS</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-extrabold text-slate-900">Ismail Shaikh</h3>
                  <p className="text-xs text-blue-600 font-bold font-mono mt-0.5">Full-Stack & Cloud Engineer</p>
                  <p className="mt-3 text-slate-600 leading-relaxed text-sm font-normal">
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
                    className="flex items-center gap-3 p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-200 transition-all group"
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

              <div className="mt-6 pt-5 border-t border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Tech Stack
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
          </section>
        </ScrollReveal>

        {/* Open Source License */}
        <ScrollReveal delay={80}>
          <section>
            <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              Open Source License
            </h2>
            <div className="p-6 rounded-3xl border border-blue-200 bg-blue-50/50 space-y-3">
              <p className="text-sm font-bold text-blue-700 font-mono">MIT License</p>
              <ul className="space-y-2">
                {LICENSE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-700 font-normal">
                    <span className="text-blue-600 mt-0.5 shrink-0">✓</span>
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
            <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
              <GitFork className="w-5 h-5 text-blue-600" />
              Contributing Guidelines
            </h2>
            <div className="space-y-3">
              {CONTRIBUTING_STEPS.map((step, i) => (
                <div key={step.title} className="flex gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-xs font-mono font-bold text-blue-600">{String(i + 1).padStart(2, '0')}</span>
                    <step.icon className="w-4 h-4 text-blue-600 mt-2" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 font-normal">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Local setup */}
        <ScrollReveal delay={160}>
          <section>
            <h2 className="text-xl font-extrabold text-slate-900 mb-5 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Run Locally
            </h2>
            <div className="mockup-window bg-slate-950 border border-slate-800 text-slate-100 shadow-lg">
              <div className="px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400">
                terminal
              </div>
              <pre className="p-4 text-[12px] font-mono text-blue-300 overflow-x-auto leading-relaxed">{`git clone ${GITHUB_REPO}.git
cd Infrasence
npm install
npm run dev
# → http://localhost:5173`}</pre>
            </div>
          </section>
        </ScrollReveal>

        {/* Issues */}
        <ScrollReveal delay={200}>
          <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Bug className="w-5 h-5 text-blue-600" />
              Report Issues & Feature Requests
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              Found a bug or have a rule engine heuristic to contribute? Open an issue on GitHub with steps to reproduce and your environment details.
            </p>
            <a
              href={`${GITHUB_REPO}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>Open GitHub Issues</span>
            </a>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
