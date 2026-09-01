import React from 'react';
import { WORKLOAD_PROFILES } from '../data/cloudDatabase';
import { AWS_REGIONS } from './SecurityAndMonitoringAdvisor';
import { Cpu, HardDrive, Zap, DollarSign, Cloud, Sparkles, RefreshCw, CheckCircle2, MapPin, ShieldCheck, Bell, Network, Lock, Activity, Server, Layers, Info } from 'lucide-react';

export default function RequirementForm({ input, onChange, onSubmit, onReset }) {
  const instanceCount = input.instanceCount || 1;

  const handleWorkloadSelect = (profileId) => {
    const profile = WORKLOAD_PROFILES.find(p => p.id === profileId);
    if (!profile) return;
    
    const suggestedRam = Math.max(input.ram, input.vcpu * profile.defaultCpuRamRatio);
    
    onChange({
      ...input,
      workload: profileId,
      ram: suggestedRam
    });
  };

  const handleInstanceCountChange = (count) => {
    const newCount = Math.max(1, count);
    const updatedQuestions = { ...input.questions };
    
    if (newCount <= 2) {
      updatedQuestions.needLoadBalancer = false;
      updatedQuestions.needAutoScaling = false;
    }

    onChange({
      ...input,
      instanceCount: newCount,
      questions: updatedQuestions
    });
  };

  const setQuestionValue = (questionKey, value) => {
    onChange({
      ...input,
      questions: {
        ...input.questions,
        [questionKey]: value
      }
    });
  };

  const ramQuickPresets = [2, 4, 8, 16, 32, 64, 128];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-10">
      
      {/* STEP 1: Application Profile */}
      <div className="glass-panel p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 sm:pb-6">
          <div>
            <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              STEP 1 OF 5
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
              What kind of project are you hosting?
            </h2>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          {WORKLOAD_PROFILES.map(profile => {
            const isSelected = input.workload === profile.id;
            return (
              <div
                key={profile.id}
                onClick={() => handleWorkloadSelect(profile.id)}
                className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 sm:space-y-4 ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-500/15 via-blue-600/10 to-indigo-600/15 border-emerald-400 shadow-2xl shadow-emerald-500/10 scale-[1.01]'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base sm:text-lg text-white">
                    {profile.name}
                  </h3>
                  {isSelected ? (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-emerald-400/50 shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-slate-700 shrink-0" />
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {profile.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Target Server Instance Quantity */}
      <div className="glass-panel p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 shadow-2xl">
        <div>
          <span className="px-3.5 py-1 text-xs font-extrabold font-mono rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase tracking-wider">
            STEP 2 OF 5 • INSTANCE QUANTITY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            How many server instances do you plan to run?
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Running 3+ instances will unlock dedicated Load Balancing & Auto Scaling configuration in Step 3.
          </p>
        </div>

        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-400" />
              Target Server Quantity
            </span>
            <span className="text-lg font-mono font-extrabold text-emerald-300">
              {instanceCount} {instanceCount === 1 ? 'Instance' : 'Instances'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { count: 1, label: '1 Instance (Single Server)' },
              { count: 2, label: '2 Instances (Dual Server)' },
              { count: 4, label: '3-5 Instances (Multi Node)' },
              { count: 8, label: '5+ Instances (Cluster)' }
            ].map(item => (
              <button
                key={item.count}
                type="button"
                onClick={() => handleInstanceCountChange(item.count)}
                className={`py-3.5 px-3 rounded-2xl text-xs font-extrabold border-2 transition-all ${
                  instanceCount === item.count || (item.count === 4 && instanceCount >= 3 && instanceCount <= 5) || (item.count === 8 && instanceCount > 5)
                    ? 'bg-slate-800 text-emerald-300 border-emerald-400 shadow-xl scale-[1.02]'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STEP 3: DEDICATED LOAD BALANCING & AUTO SCALING SECTION (Appears ONLY when instanceCount > 2) */}
      {instanceCount > 2 && (
        <div className="glass-panel p-8 sm:p-12 space-y-8 shadow-2xl border-2 border-blue-500/40 animate-fadeIn">
          <div>
            <span className="px-3.5 py-1 text-xs font-extrabold font-mono rounded-full bg-blue-500/15 text-blue-300 border border-blue-400 uppercase tracking-wider">
              STEP 3 OF 5 • MULTI-NODE TRAFFIC & AUTO SCALING
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Load Balancer & Capacity Scaling Configuration
            </h2>
            <p className="text-sm text-slate-300 mt-1">Unlocked for multi-instance deployments (3+ servers).</p>
          </div>

          <div className="space-y-5">
            
            {/* Dedicated Load Balancer Card */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-blue-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Network className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-extrabold text-white">Does your app get unexpected high traffic or spiky load?</h4>
                    <p className="text-xs text-slate-300 mt-1">Recommends AWS Application Load Balancer (ALB) to distribute requests evenly.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuestionValue('needLoadBalancer', true)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                      input.questions?.needLoadBalancer === true
                        ? 'bg-blue-500/20 text-blue-300 border-blue-400 shadow-md font-mono'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    YES
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionValue('needLoadBalancer', false)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                      input.questions?.needLoadBalancer !== true
                        ? 'bg-slate-800 text-rose-300 border-rose-500/50 shadow-md font-mono'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>

            {/* Dedicated Auto Scaling Card */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-amber-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-base font-extrabold text-white">Does your app require automatic capacity scaling?</h4>
                    <p className="text-xs text-slate-300 mt-1">Recommends AWS Auto Scaling Group (ASG) to dynamically scale server nodes.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuestionValue('needAutoScaling', true)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                      input.questions?.needAutoScaling === true
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md font-mono'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    YES
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionValue('needAutoScaling', false)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                      input.questions?.needAutoScaling !== true
                        ? 'bg-slate-800 text-rose-300 border-rose-500/50 shadow-md font-mono'
                        : 'bg-slate-950 text-slate-500 border-slate-800'
                    }`}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STEP 4: CPU Cores (vCPU) & System Memory (RAM) Sliders */}
      <div className="glass-panel p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 shadow-2xl">
        <div>
          <span className="px-3.5 py-1 text-xs font-extrabold font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
            STEP 4 OF 5 • CPU & MEMORY POWER
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
            Processor Cores (vCPU) & System Memory (RAM)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">Adjust capacity sliders to customize CPU and RAM requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* vCPU Slider */}
          <div className="bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                Processor Cores (vCPU)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="64"
                  value={input.vcpu}
                  onChange={(e) => onChange({ ...input, vcpu: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-16 sm:w-20 px-2.5 sm:px-3 py-1 bg-slate-950 border border-slate-700 rounded-xl text-center text-xs sm:text-sm font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[11px] sm:text-xs text-slate-400">cores</span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="32"
              step="1"
              value={input.vcpu}
              onChange={(e) => onChange({ ...input, vcpu: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-slate-500">
              <span>1 vCPU</span>
              <span>4 vCPU</span>
              <span>8 vCPU</span>
              <span>16 vCPU</span>
              <span>32 vCPU</span>
            </div>
          </div>

          {/* RAM Slider */}
          <div className="bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
                System Memory (RAM)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0.5"
                  max="512"
                  value={input.ram}
                  onChange={(e) => onChange({ ...input, ram: Math.max(0.5, parseFloat(e.target.value) || 0.5) })}
                  className="w-16 sm:w-20 px-2.5 sm:px-3 py-1 bg-slate-950 border border-slate-700 rounded-xl text-center text-xs sm:text-sm font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[11px] sm:text-xs text-slate-400">GB</span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="128"
              step="1"
              value={input.ram}
              onChange={(e) => onChange({ ...input, ram: parseFloat(e.target.value) })}
              className="w-full"
            />

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] sm:text-[11px] text-slate-400">Quick Select:</span>
              {ramQuickPresets.map(presetRam => (
                <button
                  key={presetRam}
                  type="button"
                  onClick={() => onChange({ ...input, ram: presetRam })}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono rounded-lg border transition-colors ${
                    input.ram === presetRam
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
      </div>

      {/* STEP 5: Security, Monitoring & Cloud Provider */}
      <div className="glass-panel p-4 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 shadow-2xl">
        <div>
          <span className="px-3.5 py-1 text-xs font-extrabold font-mono rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
            STEP 5 OF 5 • SECURITY & PROVIDER
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
            Security, Monitoring & Cloud Provider Preference
          </h2>
        </div>

        <div className="space-y-4">
          
          {/* Q1: Monitoring */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-slate-100">Do you want 24/7 Monitoring & Alarms?</h4>
                <p className="text-xs text-slate-400 mt-0.5">Recommends AWS CloudWatch CPU/Disk alarms & SNS notifications</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setQuestionValue('needMonitoring', true)}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                  input.questions?.needMonitoring === true
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-md font-mono'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setQuestionValue('needMonitoring', false)}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                  input.questions?.needMonitoring !== true
                    ? 'bg-slate-800 text-rose-300 border-rose-500/50 shadow-md font-mono'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                NO
              </button>
            </div>
          </div>

          {/* Q4: Multi-AZ */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-slate-100">Do you need High Availability & Disaster Recovery?</h4>
                <p className="text-xs text-slate-400 mt-0.5">Recommends Multi-AZ Databases & Redundant Subnets</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setQuestionValue('needMultiAZ', true)}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                  input.questions?.needMultiAZ === true
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-md font-mono'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setQuestionValue('needMultiAZ', false)}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                  input.questions?.needMultiAZ !== true
                    ? 'bg-slate-800 text-rose-300 border-rose-500/50 shadow-md font-mono'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                NO
              </button>
            </div>
          </div>

          {/* Q5: KMS Encryption */}
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-extrabold text-slate-100">Do you require Data & Disk Encryption at rest?</h4>
                <p className="text-xs text-slate-400 mt-0.5">Recommends AWS KMS AES-256 Disk Encryption</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setQuestionValue('needEncryption', true)}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                  input.questions?.needEncryption === true
                    ? 'bg-purple-500/20 text-purple-300 border-purple-400 shadow-md font-mono'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setQuestionValue('needEncryption', false)}
                className={`px-6 py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                  input.questions?.needEncryption !== true
                    ? 'bg-slate-800 text-rose-300 border-rose-500/50 shadow-md font-mono'
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                NO
              </button>
            </div>
          </div>

        </div>

        {/* Cloud Provider & Budget */}
        <div className="pt-4 space-y-4 border-t border-slate-800">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {[
              { id: 'all', label: '🌐 All Clouds (Compare)' },
              { id: 'aws', label: 'AWS' },
              { id: 'azure', label: 'Azure' },
              { id: 'gcp', label: 'GCP' }
            ].map(prov => (
              <button
                key={prov.id}
                type="button"
                onClick={() => onChange({ ...input, provider: prov.id })}
                className={`py-4 px-4 rounded-2xl text-xs sm:text-sm font-extrabold border-2 transition-all ${
                  input.provider === prov.id
                    ? 'bg-slate-800 text-emerald-300 border-emerald-400 shadow-xl'
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                {prov.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {[
              { id: 'cost', label: '💵 Lowest Monthly Bill' },
              { id: 'balanced', label: '⚖️ Balanced Performance' },
              { id: 'performance', label: '🚀 Max Power' }
            ].map(bp => (
              <button
                key={bp.id}
                type="button"
                onClick={() => onChange({ ...input, budgetPriority: bp.id })}
                className={`p-4 rounded-2xl text-center border-2 font-extrabold text-xs sm:text-sm transition-all ${
                  input.budgetPriority === bp.id
                    ? 'bg-amber-500/15 text-amber-200 border-amber-400 shadow-xl'
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {bp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Action Button */}
      <div className="pt-2 pb-8">
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-6 px-8 rounded-3xl font-extrabold text-lg sm:text-xl bg-gradient-to-r from-emerald-500 via-blue-600 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white shadow-2xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          <Sparkles className="w-6 h-6" />
          <span>Get Recommended Server Suggestion</span>
        </button>
      </div>

    </div>
  );
}
