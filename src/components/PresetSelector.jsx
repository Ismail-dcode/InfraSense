import React from 'react';
import { Database, Globe, Sparkles, HardDrive, Terminal, X, ArrowRight } from 'lucide-react';

export const PRESET_OPTIONS = [
  {
    id: 'preset-web-app',
    name: 'Production Web App / API',
    category: 'General Purpose',
    icon: Globe,
    description: '4 vCPU, 16 GB RAM for Node.js, Python, or Go web application microservices.',
    input: {
      vcpu: 4,
      ram: 16,
      storageGB: 100,
      storageType: 'gp3',
      iops: 3000,
      workload: 'general_web',
      provider: 'aws',
      budgetPriority: 'balanced',
      trafficPattern: 'steady'
    }
  },
  {
    id: 'preset-postgres-db',
    name: 'High Performance PostgreSQL DB',
    category: 'Database Heavy',
    icon: Database,
    description: '8 vCPU, 64 GB RAM, 20,000 IOPS for mission-critical relational database.',
    input: {
      vcpu: 8,
      ram: 64,
      storageGB: 500,
      storageType: 'io2',
      iops: 20000,
      workload: 'relational_db',
      provider: 'aws',
      budgetPriority: 'performance',
      trafficPattern: 'high_steady'
    }
  },
  {
    id: 'preset-ai-ml',
    name: 'AI Model Inference (PyTorch/LLM)',
    category: 'Accelerated GPU',
    icon: Sparkles,
    description: '4 vCPU, 16 GB RAM with GPU hardware for deep learning evaluation.',
    input: {
      vcpu: 4,
      ram: 16,
      storageGB: 250,
      storageType: 'NVMe SSD',
      iops: 15000,
      workload: 'ai_ml_inference',
      provider: 'aws',
      budgetPriority: 'performance',
      trafficPattern: 'steady'
    }
  },
  {
    id: 'preset-analytics-elasticsearch',
    name: 'Elasticsearch / Log Analytics',
    category: 'High IOPS Storage',
    icon: HardDrive,
    description: '8 vCPU, 32 GB RAM, 25,000 IOPS for heavy disk write log clustering.',
    input: {
      vcpu: 8,
      ram: 32,
      storageGB: 1000,
      storageType: 'NVMe SSD',
      iops: 25000,
      workload: 'storage_io_heavy',
      provider: 'all',
      budgetPriority: 'balanced',
      trafficPattern: 'high_steady'
    }
  },
  {
    id: 'preset-dev-micro',
    name: 'Dev / Testing Server (Low Cost)',
    category: 'Cost Optimized',
    icon: Terminal,
    description: '2 vCPU, 4 GB RAM burstable instance to minimize monthly cloud bill.',
    input: {
      vcpu: 2,
      ram: 4,
      storageGB: 40,
      storageType: 'gp3',
      iops: 3000,
      workload: 'general_web',
      provider: 'all',
      budgetPriority: 'cost',
      trafficPattern: 'burstable'
    }
  }
];

export default function PresetSelector({ isOpen, onClose, onSelectPreset }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col border border-slate-200 p-5 sm:p-7 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Select Architecture Preset</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 mb-4 font-normal">
          Choose a pre-configured architecture blueprint to instantly populate hardware, memory, IOPS, and workload parameters into the recommendation engine.
        </p>

        <div className="grid grid-cols-1 gap-2.5 overflow-y-auto pr-1">
          {PRESET_OPTIONS.map(preset => {
            const IconComponent = preset.icon;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset.input);
                  onClose();
                }}
                className="group p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 bg-slate-50/60 cursor-pointer transition-all flex items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center group-hover:border-blue-300 group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-colors shadow-xs">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                        {preset.name}
                      </h4>
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-white text-slate-700 border border-slate-200 font-semibold shadow-xs">
                        {preset.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-normal">{preset.description}</p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
