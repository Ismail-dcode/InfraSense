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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-600" />
            Cloud Hardware Instance Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Browse complete specs, costs, and hardware profiles across AWS, Azure, and GCP.
          </p>
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search t3.large, r6i, GPU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 flex items-center gap-1 mr-2 font-medium">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>

        {/* Provider Filters */}
        {['all', 'aws', 'azure', 'gcp'].map(p => (
          <button
            key={p}
            onClick={() => setSelectedProvider(p)}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors uppercase cursor-pointer ${
              selectedProvider === p
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {p}
          </button>
        ))}

        <div className="h-4 w-px bg-slate-200 mx-1" />

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
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedFamily === fam.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
            className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md hover:bg-white transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-white text-slate-700 border border-slate-200 shadow-xs">
                  {inst.provider}
                </span>
                <span className="text-xs font-mono font-extrabold text-blue-600">
                  ${inst.monthlyEstimate.toFixed(2)}/mo
                </span>
              </div>

              <h3 className="text-xl font-bold font-mono text-slate-900 mb-0.5">{inst.name}</h3>
              <p className="text-xs text-slate-500 font-semibold mb-2">{inst.family}</p>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal">
                {inst.description}
              </p>

              {/* Hardware Specs */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-700 pt-2 border-t border-slate-200/80">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{inst.vCPU} vCPU</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{inst.ramGB} GB RAM</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <HardDrive className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{inst.maxIops.toLocaleString()} IOPS • {inst.defaultStorageType}</span>
                </div>
              </div>
            </div>

            {/* Best Use Case Tags */}
            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-1">
              {inst.bestUseCases.slice(0, 3).map((uc, i) => (
                <span key={i} className="px-2 py-0.5 text-[10px] rounded-md bg-white text-slate-600 border border-slate-200 font-medium">
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
