import React from 'react';
import { Network, Server, Database, HardDrive, Shield, Cloud, Activity, ArrowRight, Layers } from 'lucide-react';

export default function ArchitectureDiagram({ instanceName, provider = 'aws', workload = 'general_web' }) {
  const normProvider = (provider || 'aws').toLowerCase();

  const providerSpecs = {
    azure: {
      dns: 'Azure DNS',
      lb: 'Azure App Gateway',
      cluster: 'VM Scale Set',
      db: 'Azure Database / SQL',
      monitoring: 'Azure Monitor & Insights'
    },
    gcp: {
      dns: 'Google Cloud DNS',
      lb: 'Cloud Load Balancer',
      cluster: 'Managed Instance Group',
      db: 'GCP Cloud SQL',
      monitoring: 'Google Cloud Monitoring'
    },
    aws: {
      dns: 'AWS Route 53 DNS',
      lb: 'App Load Balancer (ALB)',
      cluster: 'Auto Scaling Group',
      db: 'Managed RDS DB',
      monitoring: 'AWS CloudWatch Alarms'
    }
  };

  const specs = providerSpecs[normProvider] || providerSpecs.aws;

  return (
    <div className="glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            VISUAL TOPOLOGY DIAGRAM
          </span>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
            <Layers className="w-5 h-5 text-emerald-400" />
            Recommended Cloud Architecture Blueprint
          </h3>
        </div>
        <span className="px-3 py-1 text-xs font-mono rounded-full bg-slate-900 text-slate-300 border border-slate-800 uppercase">
          {provider} Infrastructure
        </span>
      </div>

      <p className="text-xs text-slate-300">
        Automated architectural flow displaying how traffic routes through DNS ({specs.dns}), Load Balancers ({specs.lb}), Compute Nodes ({instanceName}), Database ({specs.db}), and Monitoring ({specs.monitoring}).
      </p>

      {/* Touch swipe hint for mobile devices */}
      <span className="block sm:hidden text-[10px] font-mono text-emerald-400/80 text-center">
        ← Swipe horizontally to view topology flow →
      </span>

      {/* Visual Diagram Box */}
      <div className="bg-slate-950/80 p-4 sm:p-8 rounded-2xl border border-slate-800/80 relative overflow-x-auto no-scrollbar">
        <div className="min-w-[650px] flex items-center justify-between gap-4 text-center">
          
          {/* Step 1: Internet & DNS */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
              <Cloud className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">Internet Users</span>
            <span className="text-[10px] font-mono text-slate-400">{specs.dns}</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />

          {/* Step 2: Load Balancer */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-lg">
              <Network className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">{specs.lb}</span>
            <span className="text-[10px] font-mono text-slate-400">HTTPS / TLS 1.3</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />

          {/* Step 3: Compute Cluster */}
          <div className="flex flex-col items-center gap-2 bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/40">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 shadow-xl">
              <Server className="w-7 h-7" />
            </div>
            <span className="text-xs font-extrabold text-emerald-300 font-mono">{instanceName}</span>
            <span className="text-[10px] font-mono text-slate-300">{specs.cluster}</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />

          {/* Step 4: Managed Database */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-lg">
              <Database className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">{specs.db}</span>
            <span className="text-[10px] font-mono text-slate-400">Multi-AZ / HA Standby</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-600 shrink-0" />

          {/* Step 5: Monitoring & Alarms */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
              <Activity className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-200">{specs.monitoring}</span>
            <span className="text-[10px] font-mono text-slate-400">Alerts & Metrics</span>
          </div>

        </div>
      </div>

    </div>
  );
}

