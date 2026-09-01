import React from 'react';
import CalculatorApp from '../components/CalculatorApp';

export default function ConsolePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="border-b border-white/[0.06] bg-emerald-500/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                Console
              </span>
              <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Infrastructure Recommendation Engine
              </h1>
              <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                Configure workloads, run the rule engine, and export Terraform — all from one place.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              engine ready
            </div>
          </div>
        </div>
      </div>

      <CalculatorApp />
    </div>
  );
}
