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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Database Sizing Form Controls */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-sm">
        <div className="border-b border-slate-100 pb-4 sm:pb-5">
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
            MANAGED DATABASE SIZING ADVISOR
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
            Database Engine, CPU & Memory Sizing
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure your database engine, processor cores, system RAM, and storage size to receive managed database recommendations.
          </p>
        </div>

        {/* 1. DB Engine Selector */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
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
                    ? 'bg-indigo-50/70 border-indigo-500 shadow-md shadow-indigo-500/10 scale-[1.01]'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="font-extrabold text-sm text-slate-900">{eng.label}</div>
                <div className="text-xs text-slate-500 font-normal mt-1">{eng.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. vCPU & RAM Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* DB vCPU */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                Database CPU Cores (vCPU)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="2"
                  max="64"
                  value={vcpu}
                  onChange={(e) => setVcpu(Math.max(2, parseInt(e.target.value) || 2))}
                  className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-xl text-center text-xs sm:text-sm font-mono font-bold text-blue-700 focus:outline-none focus:border-blue-500"
                />
                <span className="text-xs text-slate-500">cores</span>
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
            <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
              <span>2 vCPU</span>
              <span>4 vCPU</span>
              <span>8 vCPU</span>
              <span>16 vCPU</span>
              <span>32 vCPU</span>
            </div>
          </div>

          {/* DB RAM */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                Database Memory (RAM)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="4"
                  max="512"
                  value={ram}
                  onChange={(e) => setRam(Math.max(4, parseFloat(e.target.value) || 4))}
                  className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-xl text-center text-xs sm:text-sm font-mono font-bold text-indigo-700 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-500">GB</span>
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
              <span className="text-[11px] text-slate-500">Quick Select:</span>
              {ramQuickPresets.map(presetRam => (
                <button
                  key={presetRam}
                  type="button"
                  onClick={() => setRam(presetRam)}
                  className={`px-2.5 py-0.5 text-[11px] font-mono rounded-lg border transition-colors cursor-pointer ${
                    ram === presetRam
                      ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {presetRam} GB
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Storage Slider & Multi-AZ Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Provisioned DB Storage</span>
              <span className="text-sm font-mono font-bold text-blue-600">{dataSizeGB} GB SSD</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={dataSizeGB}
              onChange={(e) => setDataSizeGB(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Multi-AZ Standby Replica</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">High availability synchronous failover</p>
            </div>
            <button
              type="button"
              onClick={() => setMultiAZ(!multiAZ)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                multiAZ
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              {multiAZ ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>
      </div>

      {/* Database Result Card */}
      <div className="bg-white border-2 border-indigo-400 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            {primary.score}% MATCH SCORE
          </span>
          <span className="text-xs font-mono font-semibold text-slate-500">Tier: {db.familyCategory}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase font-mono tracking-wider">
              RECOMMENDED MANAGED DATABASE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">{db.name}</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">{db.description}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left space-y-1 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase font-mono">Estimated Monthly DB Cost</span>
            <div className="text-3xl font-extrabold font-mono text-indigo-600">
              ${primary.estimatedMonthlyCost.toFixed(2)}
              <span className="text-xs text-slate-500 font-sans font-normal ml-1">/mo</span>
            </div>
            <p className="text-xs text-slate-500 font-mono">~${db.hourlyRate.toFixed(4)} / hr</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">vCPU Cores</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{db.vCPU} vCPU</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">RAM Memory</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{db.ramGB} GB</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">IOPS Capacity</span>
            <span className="text-lg font-bold text-slate-900 font-mono">{db.maxIops.toLocaleString()}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-[10px] text-slate-500 font-mono block uppercase">Storage Type</span>
            <span className="text-sm font-bold text-slate-900 font-mono leading-7">{db.defaultStorageType}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Why this database instance fits:
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
