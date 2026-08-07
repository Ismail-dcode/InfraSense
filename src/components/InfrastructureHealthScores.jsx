import React from 'react';
import { Activity, ShieldCheck, DollarSign, Zap, RefreshCw, CheckCircle } from 'lucide-react';

export default function InfrastructureHealthScores({ score = 95 }) {
  const pillars = [
    { label: 'Performance Efficiency', val: 96, color: 'from-cyan-500 to-blue-500' },
    { label: 'Cost Optimization', val: 92, color: 'from-amber-500 to-yellow-500' },
    { label: 'Security & Compliance', val: 98, color: 'from-emerald-500 to-teal-500' },
    { label: 'Scalability & Elasticity', val: 94, color: 'from-indigo-500 to-purple-500' },
    { label: 'High Availability (SLA)', val: 99, color: 'from-blue-500 to-indigo-500' }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            WELL-ARCHITECTED FRAMEWORK
          </span>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
            <Activity className="w-5 h-5 text-cyan-400" />
            Infrastructure Health & Confidence Score
          </h3>
        </div>
        
        <span className="glow-badge px-3.5 py-1.5 rounded-full text-xs font-bold font-mono">
          🎯 98.4% Confidence Rating
        </span>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {pillars.map((p, idx) => (
          <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">{p.label}</span>
              <span className="font-mono font-bold text-cyan-300">{p.val}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full bg-gradient-to-r ${p.color} rounded-full transition-all duration-500`}
                style={{ width: `${p.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
