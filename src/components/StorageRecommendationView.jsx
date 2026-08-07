import React, { useState } from 'react';
import { evaluateStorageRequirements } from '../engine/ruleEngine';
import { HardDrive, Sparkles, CheckCircle2, ShieldCheck, DollarSign, Cloud } from 'lucide-react';

export default function StorageRecommendationView() {
  const [accessFrequency, setAccessFrequency] = useState('hot');
  const [volumeGB, setVolumeGB] = useState(1000);
  const [storageTypeNeeded, setStorageTypeNeeded] = useState('object');

  const result = evaluateStorageRequirements({ accessFrequency, volumeGB, storageTypeNeeded });
  const { primary } = result;
  const st = primary.service;

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10 animate-fadeIn">
      
      {/* Form Controls */}
      <div className="glass-panel p-4 sm:p-8 lg:p-12 space-y-6">
        <div className="border-b border-slate-800 pb-4 sm:pb-5">
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
            CLOUD STORAGE ADVISOR
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
            Cloud Storage & Object Store Recommendation
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Calculate storage costs for AWS S3, EBS SSD hard drives, EFS shared files, and Glacier cold archives.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            HOW OFTEN ARE FILES ACCESSED?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'hot', label: '⚡ Frequent / Hot Access', desc: 'User images, videos, web files accessed daily' },
              { id: 'cool', label: '🌙 Infrequent Access', desc: 'Monthly backups and old reports' },
              { id: 'archive', label: '❄️ Cold Archive Glacier', desc: 'Multi-year data backups & compliance records' }
            ].map(af => (
              <div
                key={af.id}
                onClick={() => setAccessFrequency(af.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  accessFrequency === af.id
                    ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-xl'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="font-extrabold text-sm text-slate-100">{af.label}</div>
                <div className="text-xs text-slate-400 font-medium mt-1">{af.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Total Storage Capacity</span>
            <span className="text-sm font-mono font-bold text-emerald-400">
              {volumeGB >= 1000 ? `${(volumeGB / 1000).toFixed(1)} TB` : `${volumeGB} GB`}
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="10000"
            step="50"
            value={volumeGB}
            onChange={(e) => setVolumeGB(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Result Card */}
      <div className="glass-panel p-8 sm:p-12 border-2 border-emerald-500/40 space-y-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <span className="glow-badge px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            {primary.score}% MATCH FIT SCORE
          </span>
          <span className="text-xs font-mono text-slate-400">Category: {st.storageCategory}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase font-mono">RECOMMENDED STORAGE TIER</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">{st.name}</h2>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">{st.description}</p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-right md:text-left space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono">Estimated Storage Bill</span>
            <div className="text-3xl font-extrabold font-mono text-emerald-300">
              ${primary.estimatedMonthlyCost.toFixed(2)}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">/mo</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">${st.costPerGB} per GB / month</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Data Durability</span>
            <span className="text-sm font-bold text-emerald-400 font-mono leading-7">{st.durability}</span>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Access Speed</span>
            <span className="text-sm font-bold text-white font-mono leading-7">{st.accessLatency}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Why this storage tier fits:
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
