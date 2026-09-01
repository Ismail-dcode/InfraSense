import React from 'react';
import { Menu, X, Layers, Terminal, BookOpen, User } from 'lucide-react';
import { TABS } from '../../hooks/useAppTabs';

const NAV_TABS = [
  { id: TABS.CONSOLE, label: 'Console', icon: Terminal },
  { id: TABS.DOCS, label: 'How It Works', icon: BookOpen },
  { id: TABS.DEVELOPER, label: 'Developer', icon: User },
];

export default function SiteNavbar({ activeTab, setActiveTab }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleTab = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#07090e]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <button
            onClick={() => handleTab(TABS.CONSOLE)}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="InfraSense home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-[1px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <div className="w-full h-full rounded-[11px] bg-[#07090e] flex items-center justify-center">
                <Layers className="w-4.5 h-4.5 text-emerald-400" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-bold text-lg tracking-tight text-white block leading-tight">
                Infra<span className="text-emerald-400">Sense</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500 hidden sm:block">
                open source · MIT
              </span>
            </div>
          </button>

          {/* Desktop tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]" aria-label="Main navigation">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile tabs */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav
          className="px-4 pb-4 pt-2 space-y-1 border-t border-white/[0.06] bg-[#07090e]/98 backdrop-blur-xl"
          aria-label="Mobile navigation"
        >
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
