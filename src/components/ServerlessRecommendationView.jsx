import React, { useState } from 'react';
import { evaluateServerlessRequirements } from '../engine/ruleEngine';
import { Zap, Sparkles, CheckCircle2, ShieldCheck, Box, Server } from 'lucide-react';

export default function ServerlessRecommendationView() {
  const [workloadType, setWorkloadType] = useState('container');

  const result = evaluateServerlessRequirements({ workloadType });
  const { primary } = result;
  const srv = primary.service;

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10 animate-fadeIn">
      
      {/* Selector */}
      <div className="glass-panel p-4 sm:p-8 lg:p-12 space-y-6">
        <div className="border-b border-slate-800 pb-4 sm:pb-5">
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
            SERVERLESS & CONTAINER ADVISOR
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
            Serverless & Container Host Recommendation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Compare AWS Lambda, Fargate Docker containers, App Runner, and Google Cloud Run for zero-server deployments.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            WHAT IS YOUR CODE PACKAGING MODEL?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'container', label: '🐳 Docker Container', desc: 'Package app into a Docker container image (Next.js, Python, Go)' },
              { id: 'function', label: '⚡ Single Function (Lambda)', desc: 'Deploy standalone JS/Python function code with zero containers' }
            ].map(wt => (
              <div
                key={wt.id}
                onClick={() => setWorkloadType(wt.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  workloadType === wt.id
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-xl'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="font-extrabold text-base text-slate-100">{wt.label}</div>
                <div className="text-xs text-slate-400 font-medium mt-1">{wt.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="glass-panel p-8 sm:p-12 border-2 border-cyan-500/40 space-y-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <span className="glow-badge px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            {primary.score}% MATCH SCORE
          </span>
          <span className="text-xs font-mono text-slate-400">Category: {srv.serviceCategory}</span>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase font-mono">RECOMMENDED SERVERLESS SERVICE</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">{srv.name}</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">{srv.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Pricing Model</span>
            <span className="text-xs font-bold text-cyan-300 font-mono leading-relaxed">{srv.pricingModel}</span>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Scaling Speed</span>
            <span className="text-xs font-bold text-emerald-400 font-mono leading-relaxed">{srv.scalingSpeed}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Why this serverless service fits:
          </h4>
          {primary.reasons.map((r, i) => (
            <div key={i} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {r}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
