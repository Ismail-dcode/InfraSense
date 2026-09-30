import React from 'react';
import ServicesRecommenderConsole from '../components/services/ServicesRecommenderConsole';
import ServicesHubNav from '../components/services/ServicesHubNav';
import { useAuth } from '../hooks/useAuth';
import { Sparkles, CheckCircle2, Cloud, Layers } from 'lucide-react';
import { TABS } from '../hooks/useAppTabs';

export default function ServicesConsolePage({ onSwitchTab, loadedReport }) {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8faff]">
      {/* Services Hub Quick Switcher */}
      <ServicesHubNav
        activeConsole="services"
        onSwitchConsole={(tab) => onSwitchTab && onSwitchTab(tab)}
      />

      {/* Services Console Header Banner */}
      <div className="border-b border-slate-200/80 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  FULL INFRASTRUCTURE & SERVICES ARCHITECT
                </span>
                {user && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Authenticated as @{user.username}</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Cloud Services & Architecture Recommender
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-3xl font-normal">
                Input your application architecture, databases, storage, networking, security, and DR requirements. InfraSense evaluates 28 heuristic rules to suggest the perfect set of cloud services across <strong>Performance</strong>, <strong>Cost Efficient</strong>, and <strong>Minimum Overhead</strong> strategies.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-semibold text-emerald-700 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>3-strategy engine active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Console Content */}
      <ServicesRecommenderConsole
        loadedReport={loadedReport}
        onNavigateToDashboard={() => onSwitchTab && onSwitchTab(TABS.DASHBOARD)}
      />
    </div>
  );
}
