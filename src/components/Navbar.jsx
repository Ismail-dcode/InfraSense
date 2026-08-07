import React from 'react';
import { Cpu, Server, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenPresets }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-b-2 border-slate-800">
      <div className="max-w-6xl mx-auto px-3 sm:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 sm:py-4">
          
          {/* Brand Logo & Mobile Preset Launcher */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-xl shadow-cyan-500/25 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[13px] sm:rounded-[14px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-white font-mono">
                    INFRA<span className="gradient-text">SENCE</span>
                  </span>
                  <span className="px-2 py-0.5 text-[9px] sm:text-[11px] font-bold font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-sm">
                    ADVISOR
                  </span>
                </div>
                <p className="text-[11px] font-semibold text-slate-300 hidden md:block">AI-Assisted Cloud Resource & Architecture Recommender</p>
              </div>
            </div>

            {/* Mobile Quick Presets Button */}
            <button
              onClick={onOpenPresets}
              className="flex md:hidden items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>Presets</span>
            </button>
          </div>

          {/* High-Visibility Nav Links */}
          <nav className="flex items-center justify-center gap-1.5 sm:gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar py-1 sm:py-0">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold transition-all border-2 shrink-0 ${
                activeTab === 'calculator'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold transition-all border-2 shrink-0 ${
                activeTab === 'rules'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>Rule Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold transition-all border-2 shrink-0 ${
                activeTab === 'catalog'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Server className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>Server Catalog</span>
            </button>
          </nav>

          {/* Desktop Quick Presets Launcher */}
          <button
            onClick={onOpenPresets}
            className="hidden md:flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Quick Presets</span>
          </button>

        </div>
      </div>
    </header>
  );
}
