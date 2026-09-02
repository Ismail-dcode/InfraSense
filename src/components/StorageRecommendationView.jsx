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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Form Controls */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4 sm:pb-5">
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-sky-50 text-sky-700 border border-sky-200 uppercase tracking-wider">
            CLOUD STORAGE ADVISOR
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
            Cloud Storage & Object Store Recommendation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Calculate storage costs for AWS S3, EBS SSD hard drives, EFS shared files, and Glacier cold archives.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
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
                    ? 'bg-sky-50/70 border-sky-500 shadow-md shadow-sky-500/10'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="font-extrabold text-sm text-slate-900">{af.label}</div>
                <div className="text-xs text-slate-500 font-normal mt-1">{af.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Total Storage Capacity</span>
            <span className="text-sm font-mono font-bold text-sky-600">
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
      <div className="bg-white border-2 border-sky-400 rounded-3xl p-6 sm:p-10 space-y-6 shadow-lg animate-fadeIn">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 bg-sky-50 text-sky-700 border border-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            {primary.score}% MATCH FIT SCORE
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500">Tier: {st.storageCategory}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs font-bold text-sky-600 uppercase font-mono tracking-wider">RECOMMENDED STORAGE TIER</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">{st.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">{st.description}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left space-y-1 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Estimated Storage Bill</span>
            <div className="text-3xl font-extrabold font-mono text-sky-600">
              ${primary.estimatedMonthlyCost.toFixed(2)}
              <span className="text-xs text-slate-500 font-sans font-normal ml-1">/mo</span>
            </div>
            <p className="text-xs text-slate-500 font-mono">${st.costPerGB} per GB / month</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">Data Durability</span>
            <span className="text-sm font-bold text-sky-700 font-mono leading-7">{st.durability}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">Access Latency</span>
            <span className="text-sm font-bold text-slate-900 font-mono leading-7">{st.accessLatency}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            Why this storage tier fits:
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
