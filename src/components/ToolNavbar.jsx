import React from 'react';
import { Server, ShieldCheck, Sliders, Sparkles } from 'lucide-react';

export default function ToolNavbar({ activeTab, setActiveTab, onOpenPresets }) {
  const tabs = [
    { id: 'calculator', label: 'Engine', icon: Sliders },
    { id: 'rules', label: 'Rule Manager', icon: ShieldCheck },
    { id: 'catalog', label: 'Instance Catalog', icon: Server },
  ];

  return (
    <div className="sticky top-16 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 border border-transparent hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#07090e] transition-all shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Quick Presets</span>
            <span className="sm:hidden">Presets</span>
          </button>
        </div>
      </div>
    </div>
  );
}
