import React from 'react';
import { Server, ShieldCheck, Sliders, Sparkles } from 'lucide-react';

export default function ToolNavbar({ activeTab, setActiveTab, onOpenPresets }) {
  const tabs = [
    { id: 'calculator', label: 'Engine', icon: Sliders },
    { id: 'rules', label: 'Rule Manager', icon: ShieldCheck },
    { id: 'catalog', label: 'Instance Catalog', icon: Server },
  ];

  return (
    <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1.5" aria-label="Tool Navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs font-bold'
                      : 'text-slate-600 border border-transparent hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>

          <button
            onClick={onOpenPresets}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all shrink-0 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">Quick Presets</span>
            <span className="sm:hidden">Presets</span>
          </button>
        </div>
      </div>
    </div>
  );
}
