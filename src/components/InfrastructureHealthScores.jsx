import React from 'react';
import { Activity, ShieldCheck, DollarSign, Zap, RefreshCw, CheckCircle } from 'lucide-react';

export default function InfrastructureHealthScores({ score = 95 }) {
  const pillars = [
    { label: 'Performance Efficiency', val: 96, color: 'from-blue-600 to-indigo-600' },
    { label: 'Cost Optimization', val: 92, color: 'from-amber-500 to-yellow-500' },
    { label: 'Security & Compliance', val: 98, color: 'from-blue-600 to-sky-500' },
    { label: 'Scalability & Elasticity', val: 94, color: 'from-indigo-600 to-purple-600' },
    { label: 'High Availability (SLA)', val: 99, color: 'from-blue-600 to-indigo-600' }
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
            WELL-ARCHITECTED FRAMEWORK
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
            <Activity className="w-5 h-5 text-blue-600" />
            Infrastructure Health & Confidence Score
          </h3>
        </div>
        
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
          🎯 98.4% Confidence Rating
        </span>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4">
        {pillars.map((p, idx) => (
          <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-700 font-bold">{p.label}</span>
              <span className="font-mono font-extrabold text-blue-600">{p.val}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden p-0.5">
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
