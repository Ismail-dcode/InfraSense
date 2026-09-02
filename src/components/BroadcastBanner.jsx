import React from 'react';
import { Sparkles, ArrowRight, X, Wrench, Terminal, AlertCircle } from 'lucide-react';

export default function BroadcastBanner({ onOpenConsole, onClose }) {
  const broadcastMessage = "AI Infrastructure Engine is currently under active development — for now, please use the interactive Manual Console for cloud sizing, pricing & Terraform IaC export!";

  return (
    <aside 
      aria-label="Development status announcement"
      className="relative z-50 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-slate-200 text-xs border-b border-indigo-500/20 shadow-sm overflow-hidden"
    >
      {/* Background Animated Shimmer Light Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -inset-y-full w-48 bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent skew-x-12 animate-shimmer-sweep" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3 relative">
        
        {/* Left Side: Glowing Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>

          <div className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[10px] tracking-wider uppercase">
            <Wrench className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="hidden sm:inline">Under Development</span>
            <span className="sm:hidden">In Progress</span>
          </div>
        </div>

        {/* Center: Flowing Marquee / Announcement Text */}
        <div className="flex-1 min-w-0 overflow-hidden relative group">
          {/* Subtle gradient fades on edges for smooth marquee feel */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

          {/* Continuous Flowing Ticker */}
          <div className="animate-ticker flex items-center gap-8 whitespace-nowrap group-hover:[animation-play-state:paused] cursor-default select-none py-0.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="font-medium text-slate-200">
                <strong className="text-white font-semibold">AI Feature Notice:</strong> {broadcastMessage}
              </span>
            </div>

            <span className="text-indigo-400/50">✦</span>

            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-medium text-slate-300">
                Rule engine with 15+ heuristic benchmarks & live cost breakdown is fully operational in Manual Console.
              </span>
            </div>

            <span className="text-indigo-400/50">✦</span>

            {/* Repeat for continuous seamless loop */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="font-medium text-slate-200">
                <strong className="text-white font-semibold">AI Feature Notice:</strong> {broadcastMessage}
              </span>
            </div>

            <span className="text-indigo-400/50">✦</span>

            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-medium text-slate-300">
                Rule engine with 15+ heuristic benchmarks & live cost breakdown is fully operational in Manual Console.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action CTA & Dismiss Button */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenConsole}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-indigo-600/85 hover:bg-indigo-600 text-white font-semibold text-[11px] border border-indigo-400/30 shadow-sm transition-all hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]"
            title="Switch to Manual Sizing Console"
          >
            <span className="hidden sm:inline">Launch Manual Console</span>
            <span className="sm:hidden">Console</span>
            <ArrowRight className="w-3 h-3 text-indigo-200" />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Dismiss announcement"
              aria-label="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>
    </aside>
  );
}
