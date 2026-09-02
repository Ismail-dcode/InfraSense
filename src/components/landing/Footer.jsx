import React from 'react';
import { Github, Globe, Layers, Sparkles } from 'lucide-react';
import { TABS } from '../../hooks/useAppTabs';

const GITHUB_REPO = 'https://github.com/Ismail-dcode/Infrasence';

export default function Footer({ activeTab, setActiveTab }) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Home', tab: TABS.HOME },
    { label: 'Console', tab: TABS.CONSOLE },
    { label: 'How It Works', tab: TABS.DOCS },
    { label: 'Developer', tab: TABS.DEVELOPER },
  ];

  return (
    <footer className="relative border-t border-slate-200/80 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab(TABS.HOME)}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-[1px] shadow-sm shadow-blue-500/20">
                <div className="w-full h-full rounded-[11px] bg-white flex items-center justify-center">
                  <Layers className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <span className="font-extrabold text-slate-900 tracking-tight">
                Infra<span className="text-blue-600">Sense</span>
              </span>
            </button>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-normal">
              Open-source cloud infrastructure recommendation engine. Transparent heuristic rules with instant Terraform exports. MIT licensed.
            </p>
            <div className="flex gap-2 pt-1">
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://infrasence.ismailshaikh.in"
                className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setActiveTab(link.tab)}
                    className={`text-xs transition-colors font-medium ${
                      activeTab === link.tab
                        ? 'text-blue-600 font-bold'
                        : 'text-slate-500 hover:text-blue-600'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
                >
                  Report an Issue / Rule Request
                </a>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab(TABS.DOCS)}
                  className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium"
                >
                  Documentation & Workflow
                </button>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-4">
              Developer
            </h4>
            <div className="space-y-2 text-xs text-slate-500 font-medium">
              <p className="font-bold text-slate-800">Ismail Shaikh</p>
              <a
                href="https://ismailshaikh.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-blue-600 transition-colors"
              >
                ismailshaikh.in
              </a>
              <a
                href="https://github.com/Ismail-dcode"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-blue-600 transition-colors"
              >
                github.com/Ismail-dcode
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {currentYear} InfraSense. Open source under MIT License.
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            Crafted for cloud engineers &amp; scalable infrastructure.
          </p>
        </div>
      </div>
    </footer>
  );
}
