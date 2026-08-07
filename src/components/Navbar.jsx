import React from 'react';
import { Cpu, Server, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenPresets }) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-b-2 border-slate-800">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-22 py-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-xl shadow-cyan-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-white font-mono">
                  INFRA<span className="gradient-text">SENCE</span>
                </span>
                <span className="px-3 py-0.5 text-[11px] font-bold font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-sm">
                  CLOUD ADVISOR
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-300 hidden sm:block">AI-Assisted Cloud Resource & Architecture Recommender</p>
            </div>
          </div>

          {/* High-Visibility Nav Links */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all border-2 ${
                activeTab === 'calculator'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Recommendation Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all border-2 ${
                activeTab === 'rules'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Rule Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all border-2 ${
                activeTab === 'catalog'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-lg shadow-cyan-500/15'
                  : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Server Catalog</span>
            </button>
          </nav>

          {/* Quick Presets Launcher */}
          <button
            onClick={onOpenPresets}
            className="hidden md:flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-xl shadow-cyan-500/25 transition-all hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            <span>Quick Presets</span>
          </button>

        </div>
      </div>
    </header>
  );
}
