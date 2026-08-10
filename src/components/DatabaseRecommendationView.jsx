import React, { useState } from 'react';
import { evaluateDatabaseRequirements } from '../engine/ruleEngine';
import { Database, Sparkles, CheckCircle2, ShieldCheck, DollarSign, Cpu, Zap, HardDrive, Layers, RefreshCw } from 'lucide-react';

export default function DatabaseRecommendationView() {
  const [dbEngine, setDbEngine] = useState('postgres');
  const [vcpu, setVcpu] = useState(2);
  const [ram, setRam] = useState(16);
  const [dataSizeGB, setDataSizeGB] = useState(250);
  const [multiAZ, setMultiAZ] = useState(true);
  const [provider, setProvider] = useState('all');

  const result = evaluateDatabaseRequirements({ dbEngine, vcpu, ram, dataSizeGB, multiAZ, provider });
  const { primary } = result;
  const db = primary.service;

  const ramQuickPresets = [4, 8, 16, 32, 64, 128, 256];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10 animate-fadeIn">
      
      {/* Database Sizing Form Controls */}
      <div className="glass-panel p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 shadow-2xl">
        <div className="border-b border-slate-800 pb-4 sm:pb-5">
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
            MANAGED DATABASE SIZING ADVISOR
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
            Database Engine, CPU & Memory Sizing
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Configure your database engine, processor cores, system RAM, and storage size to receive managed database recommendations.
          </p>
        </div>

        {/* 1. DB Engine Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            1. SELECT DATABASE ENGINE
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'postgres', label: 'PostgreSQL / MySQL', desc: 'Standard Relational DB' },
              { id: 'aurora', label: 'Aurora Serverless v2', desc: 'Auto-scaling Relational DB' },
              { id: 'redis', label: 'Redis / Memcached', desc: 'In-Memory Fast Cache' },
              { id: 'nosql', label: 'DynamoDB / NoSQL', desc: 'Serverless Document Store' }
            ].map(eng => (
              <div
                key={eng.id}
                onClick={() => setDbEngine(eng.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  dbEngine === eng.id
                    ? 'bg-indigo-500/15 border-indigo-400 text-white shadow-xl scale-[1.01]'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="font-extrabold text-sm text-slate-100">{eng.label}</div>
                <div className="text-xs text-slate-400 font-medium mt-1">{eng.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. vCPU & System RAM Custom Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          
          {/* DB vCPU */}
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                Database CPU Cores (vCPU)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="2"
                  max="64"
                  value={vcpu}
                  onChange={(e) => setVcpu(Math.max(2, parseInt(e.target.value) || 2))}
                  className="w-20 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-center text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
                <span className="text-xs text-slate-400">cores</span>
              </div>
            </div>

            <input
              type="range"
              min="2"
              max="32"
              step="2"
              value={vcpu}
              onChange={(e) => setVcpu(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>2 vCPU</span>
              <span>4 vCPU</span>
              <span>8 vCPU</span>
              <span>16 vCPU</span>
              <span>32 vCPU</span>
            </div>
          </div>

          {/* DB RAM */}
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-400" />
                Database Memory (RAM)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="4"
                  max="512"
                  value={ram}
                  onChange={(e) => setRam(Math.max(4, parseFloat(e.target.value) || 4))}
                  className="w-20 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-center text-sm font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400">GB</span>
              </div>
            </div>

            <input
              type="range"
              min="4"
              max="128"
              step="4"
              value={ram}
              onChange={(e) => setRam(parseFloat(e.target.value))}
              className="w-full"
            />

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[11px] text-slate-400">Quick Select:</span>
              {ramQuickPresets.map(presetRam => (
                <button
                  key={presetRam}
                  type="button"
                  onClick={() => setRam(presetRam)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-lg border transition-colors ${
                    ram === presetRam
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {presetRam} GB
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Storage Size & Multi-AZ Toggle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          
          <div className="sm:col-span-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Data Storage Capacity</span>
              <span className="text-sm font-mono font-bold text-indigo-400">{dataSizeGB} GB</span>
            </div>
            <input
              type="range"
              min="20"
              max="2000"
              step="20"
              value={dataSizeGB}
              onChange={(e) => setDataSizeGB(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-300">Multi-AZ High Availability</span>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMultiAZ(true)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border font-mono ${
                  multiAZ ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/50' : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setMultiAZ(false)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border font-mono ${
                  !multiAZ ? 'bg-slate-800 text-rose-300 border-rose-500/50' : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                NO
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Database Recommendation Result Card */}
      <div className="glass-panel p-8 sm:p-12 border-2 border-indigo-500/40 relative overflow-hidden shadow-2xl space-y-8">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="glow-badge px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              {primary.score}% MATCH SCORE
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-bold uppercase bg-slate-800 text-slate-200 border border-slate-700">
              {db.provider} Cloud
            </span>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Service: {db.serviceType}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase font-mono">
              RECOMMENDED MANAGED DATABASE TIER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
              {db.name}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {db.description}
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 text-right md:text-left space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono">Estimated Monthly Bill</span>
            <div className="text-3xl font-extrabold font-mono text-indigo-300">
              ${db.monthlyEstimate.toFixed(2)}
              <span className="text-xs text-slate-400 font-sans font-normal ml-1">/mo</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">~${db.hourlyRate.toFixed(3)} / hour</p>
          </div>
        </div>

        {/* Hardware Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">CPU Power</span>
            <span className="text-lg font-bold font-mono text-white">{db.vCPU} Cores</span>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Memory RAM</span>
            <span className="text-lg font-bold font-mono text-white">{db.ramGB} GB</span>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">Storage Capacity</span>
            <span className="text-sm font-bold font-mono text-emerald-400 leading-7">{dataSizeGB} GB ({db.storageType})</span>
          </div>
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">High Availability</span>
            <span className="text-sm font-bold text-indigo-400 leading-7">
              {multiAZ && db.multiAZ ? '✓ Multi-AZ Failover' : 'Single AZ'}
            </span>
          </div>
        </div>

        {/* Rules Reasons */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Why this database fits your project (Backend Rules Matched):
          </h4>
          {primary.reasons.map((r, i) => (
            <div key={i} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed font-medium">
              {r}
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
