import React from 'react';
import { Github, Globe, Layers } from 'lucide-react';
import { TABS } from '../../hooks/useAppTabs';

const GITHUB_REPO =
  'https://github.com/Ismail-dcode/InfraSense-Cloud-Infrastructure-Recommendation-Platform';

export default function Footer({ activeTab, setActiveTab }) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Console', tab: TABS.CONSOLE },
    { label: 'How It Works', tab: TABS.DOCS },
    { label: 'Developer', tab: TABS.DEVELOPER },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050709] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <button
              onClick={() => setActiveTab(TABS.CONSOLE)}
              className="flex items-center gap-2.5 mb-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 p-[1px]">
                <div className="w-full h-full rounded-[7px] bg-[#050709] flex items-center justify-center">
                  <Layers className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-bold text-white">
                Infra<span className="text-emerald-400">Sense</span>
              </span>
            </button>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Open-source cloud infrastructure recommendation platform. MIT licensed.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-white/[0.04] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://infrasence.ismailshaikh.in"
                className="p-2 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-white/[0.04] transition-colors"
                aria-label="Website"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setActiveTab(link.tab)}
                    className={`text-sm transition-colors ${
                      activeTab === link.tab
                        ? 'text-emerald-400'
                        : 'text-slate-500 hover:text-emerald-400'
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
            <h4 className="text-sm font-semibold text-white mb-3">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={`${GITHUB_REPO}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab(TABS.DOCS)}
                  className="text-sm text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  Documentation
                </button>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Developer</h4>
            <div className="space-y-2 text-sm text-slate-500">
              <p>Ismail Shaikh</p>
              <a
                href="https://ismailshaikh.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-emerald-400 transition-colors"
              >
                ismailshaikh.in
              </a>
              <a
                href="https://github.com/Ismail-dcode"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-emerald-400 transition-colors"
              >
                github.com/Ismail-dcode
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            &copy; {currentYear} InfraSense. Open source under MIT License.
          </p>
          <p className="text-xs text-slate-600 font-mono">
            Crafted for cloud engineers &amp; scalable systems.
          </p>
        </div>
      </div>
    </footer>
  );
}
