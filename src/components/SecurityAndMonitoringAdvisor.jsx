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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/70',
      borderColor: 'border-blue-200',
      whySuggested: 'Why Suggested? You answered YES to 24/7 Monitoring. CloudWatch monitors your server CPU & Disk metrics 24/7, while SNS sends instant SMS/email alerts if server utilization exceeds 80%.'
    },
    {
      key: 'needLoadBalancer',
      serviceName: 'AWS Application Load Balancer (ALB)',
      icon: Network,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50/70',
      borderColor: 'border-indigo-200',
      whySuggested: 'Why Suggested? You answered YES to unexpected spiky load. ALB sits in front of your servers and distributes web traffic evenly across multiple instances so no single server gets overwhelmed.'
    },
    {
      key: 'needAutoScaling',
      serviceName: 'AWS Auto Scaling Group (ASG)',
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50/70',
      borderColor: 'border-amber-200',
      whySuggested: 'Why Suggested? You answered YES to automatic capacity scaling. ASG automatically launches new server instances when traffic spikes and terminates idle servers when traffic drops to cut your bill.'
    },
    {
      key: 'needMultiAZ',
      serviceName: 'Multi-AZ High Availability & Multi-Region',
      icon: Layers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/70',
      borderColor: 'border-blue-200',
      whySuggested: 'Why Suggested? You answered YES to High Availability & Disaster Recovery. Multi-AZ replicates your database and server subnets across 2 separate data centers to guarantee 99.99% uptime.'
    },
    {
      key: 'needEncryption',
      serviceName: 'AWS KMS AES-256 Encryption at Rest',
      icon: Lock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50/70',
      borderColor: 'border-purple-200',
      whySuggested: 'Why Suggested? You answered YES to Disk & Data Encryption. AWS KMS automatically encrypts all EBS hard drives and S3 files using military-grade AES-256 encryption keys.'
    }
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
            ARCHITECTURAL REASONS & EXPLANATIONS
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Why Was Each Cloud Component Suggested?
          </h3>
        </div>
      </div>

      {/* Why Each Service Was Suggested Section */}
      <div className="space-y-3">
        {reasonsList.map(item => {
          const isRequested = userQuestions[item.key] !== false;
          if (!isRequested) return null;
          const IconComp = item.icon;

          return (
            <div
              key={item.key}
              className={`p-4 sm:p-5 rounded-2xl border ${item.bgColor} ${item.borderColor} space-y-1.5`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <IconComp className={`w-5 h-5 ${item.color}`} />
                  <h4 className="font-extrabold text-sm text-slate-900">{item.serviceName}</h4>
                </div>
                <span className="px-2.5 py-0.5 text-[10px] font-mono rounded-md bg-white text-blue-700 font-bold border border-slate-200 shadow-xs">
                  USER ANSWER MATCH
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal pl-7">
                {item.whySuggested}
              </p>
            </div>
          );
        })}
      </div>

      {/* Region Selector */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 font-mono">
          <MapPin className="w-4 h-4 text-blue-600" />
          Recommended Deployment Region
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {AWS_REGIONS.map(reg => (
            <div
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                selectedRegion === reg.id
                  ? 'bg-blue-50 border-blue-500 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="font-extrabold text-xs text-slate-900">{reg.name}</div>
              <div className="text-[11px] font-mono text-blue-600 mt-0.5">{reg.id} • {reg.latency}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
