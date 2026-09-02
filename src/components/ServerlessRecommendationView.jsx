import React, { useState } from 'react';
import { evaluateServerlessRequirements } from '../engine/ruleEngine';
import { Zap, Sparkles, CheckCircle2, ShieldCheck, Box, Server } from 'lucide-react';

export default function ServerlessRecommendationView() {
  const [workloadType, setWorkloadType] = useState('container');

  const result = evaluateServerlessRequirements({ workloadType });
  const { primary } = result;
  const srv = primary.service;

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Selector */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4 sm:pb-5">
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            SERVERLESS & CONTAINER ADVISOR
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
            Serverless & Container Host Recommendation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare AWS Lambda, Fargate Docker containers, App Runner, and Google Cloud Run for zero-server deployments.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            WHAT IS YOUR CODE PACKAGING MODEL?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'container', label: '🐳 Docker Container', desc: 'Package app into a Docker container image (Next.js, Python, Go)' },
              { id: 'function', label: '⚡ Standalone Function (Lambda)', desc: 'Deploy standalone JS/Python function code with zero containers' }
            ].map(wt => (
              <div
                key={wt.id}
                onClick={() => setWorkloadType(wt.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  workloadType === wt.id
                    ? 'bg-blue-50/70 border-blue-500 shadow-md shadow-blue-500/10'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="font-extrabold text-base text-slate-900">{wt.label}</div>
                <div className="text-xs text-slate-500 font-normal mt-1">{wt.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result Card */}
      <div className="bg-white border-2 border-blue-400 rounded-3xl p-6 sm:p-10 space-y-6 shadow-lg animate-fadeIn">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {primary.score}% MATCH SCORE
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500">Category: {srv.serviceCategory}</span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase font-mono tracking-wider">RECOMMENDED SERVERLESS SERVICE</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">{srv.name}</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">{srv.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">Pricing Model</span>
            <span className="text-xs font-bold text-blue-700 font-mono leading-relaxed">{srv.pricingModel}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">Scaling Speed</span>
            <span className="text-xs font-bold text-blue-700 font-mono leading-relaxed">{srv.scalingSpeed}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Why this serverless service fits:
          </h4>
          {primary.reasons.map((r, i) => (
            <div key={i} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
              {r}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
