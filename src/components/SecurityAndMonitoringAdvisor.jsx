import React, { useState } from 'react';
import { ShieldCheck, Bell, Lock, MapPin, CheckCircle2, Network, Activity, Zap, Layers, HelpCircle } from 'lucide-react';

export const AWS_REGIONS = [
  { id: 'us-east-1', name: 'US East (N. Virginia)', latency: '~20ms (Americas)' },
  { id: 'us-west-2', name: 'US West (Oregon)', latency: '~35ms (Americas West)' },
  { id: 'eu-west-1', name: 'Europe (Ireland)', latency: '~25ms (Europe)' },
  { id: 'ap-south-1', name: 'Asia Pacific (Mumbai)', latency: '~15ms (Asia / India)' },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', latency: '~20ms (SE Asia)' }
];

export default function SecurityAndMonitoringAdvisor({ userQuestions = {} }) {
  const [selectedRegion, setSelectedRegion] = useState('us-east-1');

  const reasonsList = [
    {
      key: 'needMonitoring',
      serviceName: 'AWS CloudWatch Alarms & SNS Alerts',
      icon: Activity,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      whySuggested: 'Why Suggested? You answered YES to 24/7 Monitoring. CloudWatch monitors your server CPU & Disk metrics 24/7, while SNS sends instant SMS/email alerts if server utilization exceeds 80%.'
    },
    {
      key: 'needLoadBalancer',
      serviceName: 'AWS Application Load Balancer (ALB)',
      icon: Network,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      whySuggested: 'Why Suggested? You answered YES to unexpected spiky load. ALB sits in front of your servers and distributes web traffic evenly across multiple instances so no single server gets overwhelmed.'
    },
    {
      key: 'needAutoScaling',
      serviceName: 'AWS Auto Scaling Group (ASG)',
      icon: Zap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      whySuggested: 'Why Suggested? You answered YES to automatic capacity scaling. ASG automatically launches new server instances when traffic spikes and terminates idle servers when traffic drops to cut your bill.'
    },
    {
      key: 'needMultiAZ',
      serviceName: 'Multi-AZ High Availability & Multi-Region',
      icon: Layers,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      whySuggested: 'Why Suggested? You answered YES to High Availability & Disaster Recovery. Multi-AZ replicates your database and server subnets across 2 separate data centers to guarantee 99.99% uptime.'
    },
    {
      key: 'needEncryption',
      serviceName: 'AWS KMS AES-256 Encryption at Rest',
      icon: Lock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      whySuggested: 'Why Suggested? You answered YES to Disk & Data Encryption. AWS KMS automatically encrypts all EBS hard drives and S3 files using military-grade AES-256 encryption keys.'
    }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            ARCHITECTURAL REASONS & EXPLANATIONS
          </span>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            Why Was Each Cloud Component Suggested?
          </h3>
        </div>
      </div>

      {/* Why Each Service Was Suggested Section */}
      <div className="space-y-3.5">
        {reasonsList.map(item => {
          const isRequested = userQuestions[item.key] !== false;
          if (!isRequested) return null;
          const IconComp = item.icon;

          return (
            <div
              key={item.key}
              className={`p-5 rounded-2xl border ${item.bgColor} ${item.borderColor} space-y-2`}
            >
              <div className="flex items-center gap-2.5">
                <IconComp className={`w-5 h-5 ${item.color}`} />
                <h4 className="font-extrabold text-sm text-slate-100">{item.serviceName}</h4>
                <span className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-cyan-300 font-bold border border-slate-700">
                  MATCHED BY USER ANSWER
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium pl-7">
                {item.whySuggested}
              </p>
            </div>
          );
        })}
      </div>

      {/* Region Selector */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 font-mono">
          <MapPin className="w-4 h-4 text-cyan-400" />
          Recommended AWS Deployment Region
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {AWS_REGIONS.map(reg => (
            <div
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedRegion === reg.id
                  ? 'bg-cyan-500/15 border-cyan-400 text-white'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-extrabold text-xs text-slate-100">{reg.name}</div>
              <div className="text-[11px] font-mono text-cyan-300 mt-1">{reg.id} • {reg.latency}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
