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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
            VISUAL TOPOLOGY DIAGRAM
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
            <Layers className="w-5 h-5 text-blue-600" />
            Recommended Cloud Architecture Blueprint
          </h3>
        </div>
        <span className="px-3 py-1 text-xs font-mono rounded-full bg-slate-100 text-slate-700 border border-slate-200 uppercase font-semibold">
          {provider} Infrastructure
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-600">
        Automated architectural flow displaying how traffic routes through DNS ({specs.dns}), Load Balancers ({specs.lb}), Compute Nodes ({instanceName}), Database ({specs.db}), and Monitoring ({specs.monitoring}).
      </p>

      {/* Touch swipe hint for mobile */}
      <span className="block sm:hidden text-[10px] font-mono text-blue-600 text-center">
        ← Swipe horizontally to view topology flow →
      </span>

      {/* Visual Diagram Box */}
      <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 relative overflow-x-auto no-scrollbar">
        <div className="min-w-[650px] flex items-center justify-between gap-4 text-center">
          
          {/* Step 1: Internet & DNS */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
              <Cloud className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-900">Internet Users</span>
            <span className="text-[10px] font-mono text-slate-500">{specs.dns}</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

          {/* Step 2: Load Balancer */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-sm">
              <Network className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-900">{specs.lb}</span>
            <span className="text-[10px] font-mono text-slate-500">HTTPS / TLS 1.3</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

          {/* Step 3: Compute Cluster */}
          <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl border-2 border-blue-500 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <Server className="w-7 h-7" />
            </div>
            <span className="text-xs font-extrabold text-blue-700 font-mono">{instanceName}</span>
            <span className="text-[10px] font-mono text-slate-500">{specs.cluster}</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

          {/* Step 4: Managed Database */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm">
              <Database className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-900">{specs.db}</span>
            <span className="text-[10px] font-mono text-slate-500">Multi-AZ / HA Standby</span>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-400 shrink-0" />

          {/* Step 5: Monitoring & Alarms */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-sm">
              <Activity className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-slate-900">{specs.monitoring}</span>
            <span className="text-[10px] font-mono text-slate-500">Alerts & Metrics</span>
          </div>

        </div>
      </div>

    </div>
  );
}
