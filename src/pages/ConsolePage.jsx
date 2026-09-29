import React from 'react';
import CalculatorApp from '../components/CalculatorApp';
import { useAuth } from '../hooks/useAuth';
import { User, LogOut, CheckCircle2 } from 'lucide-react';

export default function ConsolePage({ initialPreset, onClearInitialPreset }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8faff]">
      {/* Console Header Banner */}
      <div className="border-b border-slate-200/80 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest">
                  DECISION ENGINE CONSOLE
                </span>
                {user && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span>Authenticated as @{user.username}</span>
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Cloud Infrastructure Sizing Calculator
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl font-normal">
                Configure workload specs, evaluate heuristic rules, compare multi-cloud pricing, and export Terraform IaC.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700 shrink-0">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>engine ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CalculatorApp
        initialPreset={initialPreset}
        onClearInitialPreset={onClearInitialPreset}
      />
    </div>
  );
}
