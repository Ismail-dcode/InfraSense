import React, { useState } from 'react';
import { Menu, X, Layers, Terminal, BookOpen, User, Sparkles, ArrowRight, Home, Moon, Sun } from 'lucide-react';
import { TABS } from '../../hooks/useAppTabs';

const NAV_TABS = [
  { id: TABS.HOME, label: 'Home', icon: Home },
  { id: TABS.CONSOLE, label: 'Console', icon: Terminal },
  { id: TABS.DOCS, label: 'How It Works', icon: BookOpen },
  { id: TABS.DEVELOPER, label: 'Developer', icon: User },
];

export default function SiteNavbar({ activeTab, setActiveTab, isDark, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleTab = (tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-sm rounded-2xl px-4 sm:px-6 h-16 flex items-center justify-between transition-all">
          
          {/* Brand */}
          <button
            onClick={() => handleTab(TABS.HOME)}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="InfraSense home"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-500 p-[1.5px] shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/35 transition-shadow">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                <Layers className="w-4.5 h-4.5 text-blue-600 group-hover:scale-105 transition-transform" />
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-tight">
                  Infra<span className="gradient-text-blue">Sense</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-50 text-blue-600 border border-blue-100">
                  v2.0
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 border border-slate-200/60" aria-label="Main navigation">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 dark:hover:border-slate-700"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleTab(TABS.CONSOLE)}
              className="relative group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          mobileOpen ? 'max-h-72 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-3 space-y-1">
          {NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-100'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onToggleTheme}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDark ? 'Light mode' : 'Dark mode'}
            </button>
            <button
              onClick={() => handleTab(TABS.CONSOLE)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Calculator</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
