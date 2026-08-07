import React, { useState } from 'react';
import { CLOUD_INSTANCES } from '../data/cloudDatabase';
import { Search, Server, Cpu, Zap, HardDrive, Filter, ExternalLink } from 'lucide-react';

export default function InstanceCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [selectedFamily, setSelectedFamily] = useState('all');

  const filteredInstances = CLOUD_INSTANCES.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inst.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProvider = selectedProvider === 'all' || inst.provider === selectedProvider;
    const matchesFamily = selectedFamily === 'all' || inst.familyCategory === selectedFamily;

    return matchesSearch && matchesProvider && matchesFamily;
  });

  return (
    <div className="glass-panel p-6 sm:p-8 space-y-6">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-cyan-400" />
            Cloud Hardware Instance Catalog
          </h2>
          <p className="text-xs text-slate-400">
            Browse complete specs, costs, and hardware profiles across AWS, Azure, and GCP.
          </p>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search t3.large, r6i, GPU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>

        {/* Provider Filters */}
        {['all', 'aws', 'azure', 'gcp'].map(p => (
          <button
            key={p}
            onClick={() => setSelectedProvider(p)}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors uppercase ${
              selectedProvider === p
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {p}
          </button>
        ))}

        <div className="h-4 w-px bg-slate-800 mx-1" />

        {/* Family Category Filters */}
        {[
          { id: 'all', label: 'All Families' },
          { id: 'general', label: 'General Purpose' },
          { id: 'compute', label: 'Compute' },
          { id: 'memory', label: 'Memory' },
          { id: 'storage', label: 'Storage' },
          { id: 'gpu', label: 'GPU AI' }
        ].map(fam => (
          <button
            key={fam.id}
            onClick={() => setSelectedFamily(fam.id)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
              selectedFamily === fam.id
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {fam.label}
          </button>
        ))}
      </div>

      {/* Instance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInstances.map(inst => (
          <div
            key={inst.id}
            className="glass-panel p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {inst.provider}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  ${inst.monthlyEstimate.toFixed(2)}/mo
                </span>
              </div>

              <h3 className="text-xl font-bold font-mono text-white mb-1">{inst.name}</h3>
              <p className="text-xs text-slate-400 font-medium mb-3">{inst.family}</p>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                {inst.description}
              </p>

              {/* Hardware Pill Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{inst.vCPU} vCPU</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{inst.ramGB} GB RAM</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{inst.maxIops.toLocaleString()} IOPS • {inst.defaultStorageType}</span>
                </div>
              </div>
            </div>

            {/* Best Use Case Tags */}
            <div className="pt-2 border-t border-slate-800/50 flex flex-wrap gap-1">
              {inst.bestUseCases.slice(0, 3).map((uc, i) => (
                <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {uc}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
