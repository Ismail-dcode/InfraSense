import React from 'react';
import { Layers, Server, Sparkles, Bookmark, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TABS } from '../../hooks/useAppTabs';

export default function ServicesHubNav({ activeConsole = 'services', onSwitchConsole }) {
  return (
    <div className="border-b border-slate-200/90 bg-white/95 backdrop-blur-md sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 gap-3">
          
          {/* Suite Label */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              INFRASENSE SUITE:
            </span>
          </div>

          {/* Console Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100/90 border border-slate-200/80">
            <button
              onClick={() => onSwitchConsole(TABS.SERVICES)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeConsole === 'services' || activeConsole === TABS.SERVICES
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/70 scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeConsole === 'services' || activeConsole === TABS.SERVICES ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>Full Infra Services Architect</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-100 text-blue-700">
                NEW
              </span>
            </button>

            <button
              onClick={() => onSwitchConsole(TABS.CONSOLE)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeConsole === 'console' || activeConsole === TABS.CONSOLE
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/70 scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Server className={`w-3.5 h-3.5 ${activeConsole === 'console' || activeConsole === TABS.CONSOLE ? 'text-blue-600' : 'text-slate-400'}`} />
              <span>VM Sizer Calculator</span>
            </button>

            <button
              onClick={() => onSwitchConsole(TABS.DASHBOARD)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeConsole === 'dashboard' || activeConsole === TABS.DASHBOARD
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/70 scale-[1.01]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${activeConsole === 'dashboard' || activeConsole === TABS.DASHBOARD ? 'text-amber-500' : 'text-slate-400'}`} />
              <span>Saved Reports</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
