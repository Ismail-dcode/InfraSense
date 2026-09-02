import React from 'react';
import { WORKLOAD_PROFILES } from '../data/cloudDatabase';
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
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      
      {/* STEP 1: Application Profile */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 sm:pb-5">
          <div>
            <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
              STEP 1 OF 5
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2">
              What kind of workload are you hosting?
            </h2>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors shrink-0 border border-slate-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {WORKLOAD_PROFILES.map(profile => {
            const isSelected = input.workload === profile.id;
            return (
              <div
                key={profile.id}
                onClick={() => handleWorkloadSelect(profile.id)}
                className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-md shadow-blue-500/10 scale-[1.01]'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">
                    {profile.name}
                  </h3>
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm shadow-blue-500/30 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-300 shrink-0" />
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {profile.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 2: Target Server Instance Quantity */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-sm">
        <div>
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
            STEP 2 OF 5 • INSTANCE QUANTITY
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            How many server instances do you plan to run?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Running 3+ instances will unlock dedicated Load Balancing & Auto Scaling configuration in Step 3.
          </p>
        </div>

        <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              Target Server Nodes
            </span>
            <span className="text-sm sm:text-base font-mono font-extrabold text-blue-700 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-xs">
              {instanceCount} {instanceCount === 1 ? 'Instance' : 'Instances'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { count: 1, label: '1 Node (Single)' },
              { count: 2, label: '2 Nodes (Dual)' },
              { count: 4, label: '3-5 Nodes (Multi)' },
              { count: 8, label: '5+ Nodes (Cluster)' }
            ].map(item => (
              <button
                key={item.count}
                type="button"
                onClick={() => handleInstanceCountChange(item.count)}
                className={`py-3 px-2.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${
                  instanceCount === item.count || (item.count === 4 && instanceCount >= 3 && instanceCount <= 5) || (item.count === 8 && instanceCount > 5)
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
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
        <div className="bg-white border-2 border-blue-400 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-md animate-fadeIn">
          <div>
            <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
              STEP 3 OF 5 • MULTI-NODE TRAFFIC & AUTO SCALING
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
              Load Balancer & Capacity Scaling Configuration
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Unlocked for multi-instance deployments (3+ servers).</p>
          </div>

          <div className="space-y-4">
            
            {/* Dedicated Load Balancer Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-blue-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Network className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Does your app get unexpected high traffic or spiky load?</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Recommends AWS Application Load Balancer (ALB) to distribute requests evenly.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuestionValue('needLoadBalancer', true)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      input.questions?.needLoadBalancer === true
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    YES
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionValue('needLoadBalancer', false)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      input.questions?.needLoadBalancer !== true
                        ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>

            {/* Dedicated Auto Scaling Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-amber-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Does your app require automatic capacity scaling?</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Recommends AWS Auto Scaling Group (ASG) to dynamically scale server nodes.</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuestionValue('needAutoScaling', true)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      input.questions?.needAutoScaling === true
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    YES
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionValue('needAutoScaling', false)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      input.questions?.needAutoScaling !== true
                        ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
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
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-sm">
        <div>
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            STEP 4 OF 5 • CPU & MEMORY POWER
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            Processor Cores (vCPU) & System Memory (RAM)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Adjust capacity sliders to customize CPU and RAM requirements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* vCPU Slider */}
          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                Processor Cores (vCPU)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="64"
                  value={input.vcpu}
                  onChange={(e) => onChange({ ...input, vcpu: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-xl text-center text-xs sm:text-sm font-mono font-bold text-blue-700 focus:outline-none focus:border-blue-500"
                />
                <span className="text-xs text-slate-500">cores</span>
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
            <div className="flex justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
              <span>1 vCPU</span>
              <span>4 vCPU</span>
              <span>8 vCPU</span>
              <span>16 vCPU</span>
              <span>32 vCPU</span>
            </div>
          </div>

          {/* RAM Slider */}
          <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                System Memory (RAM)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0.5"
                  max="512"
                  value={input.ram}
                  onChange={(e) => onChange({ ...input, ram: Math.max(0.5, parseFloat(e.target.value) || 0.5) })}
                  className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-xl text-center text-xs sm:text-sm font-mono font-bold text-indigo-700 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-500">GB</span>
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
              <span className="text-[10px] sm:text-[11px] text-slate-500">Quick Select:</span>
              {ramQuickPresets.map(presetRam => (
                <button
                  key={presetRam}
                  type="button"
                  onClick={() => onChange({ ...input, ram: presetRam })}
                  className={`px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono rounded-lg border transition-colors cursor-pointer ${
                    input.ram === presetRam
                      ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
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
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-sm">
        <div>
          <span className="px-3 py-1 text-[10px] sm:text-xs font-extrabold font-mono rounded-full bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wider">
            STEP 5 OF 5 • SECURITY & PROVIDER
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            Security, Monitoring & Cloud Provider Preference
          </h2>
        </div>

        <div className="space-y-3.5">
          
          {/* Q1: Monitoring */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Do you want 24/7 Monitoring & Alarms?</h4>
                <p className="text-xs text-slate-500 mt-0.5">Recommends AWS CloudWatch CPU/Disk alarms & SNS notifications</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setQuestionValue('needMonitoring', true)}
                className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  input.questions?.needMonitoring === true
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setQuestionValue('needMonitoring', false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  input.questions?.needMonitoring !== true
                    ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                NO
              </button>
            </div>
          </div>

          {/* Q4: Multi-AZ */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Do you need High Availability & Disaster Recovery?</h4>
                <p className="text-xs text-slate-500 mt-0.5">Recommends Multi-AZ Databases & Redundant Subnets</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setQuestionValue('needMultiAZ', true)}
                className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  input.questions?.needMultiAZ === true
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setQuestionValue('needMultiAZ', false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  input.questions?.needMultiAZ !== true
                    ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                NO
              </button>
            </div>
          </div>

          {/* Q5: KMS Encryption */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Do you require Data & Disk Encryption at rest?</h4>
                <p className="text-xs text-slate-500 mt-0.5">Recommends AWS KMS AES-256 Disk Encryption</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setQuestionValue('needEncryption', true)}
                className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  input.questions?.needEncryption === true
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setQuestionValue('needEncryption', false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  input.questions?.needEncryption !== true
                    ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                NO
              </button>
            </div>
          </div>

        </div>

        {/* Cloud Provider & Budget */}
        <div className="pt-4 space-y-4 border-t border-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'all', label: '🌐 All Clouds' },
              { id: 'aws', label: 'AWS EC2' },
              { id: 'azure', label: 'Azure VM' },
              { id: 'gcp', label: 'Google Cloud' }
            ].map(prov => (
              <button
                key={prov.id}
                type="button"
                onClick={() => onChange({ ...input, provider: prov.id })}
                className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold border-2 transition-all cursor-pointer ${
                  input.provider === prov.id
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {prov.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {[
              { id: 'cost', label: '💵 Lowest Monthly Bill' },
              { id: 'balanced', label: '⚖️ Balanced Performance' },
              { id: 'performance', label: '🚀 Maximum Power' }
            ].map(bp => (
              <button
                key={bp.id}
                type="button"
                onClick={() => onChange({ ...input, budgetPriority: bp.id })}
                className={`p-3.5 rounded-2xl text-center border-2 font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  input.budgetPriority === bp.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {bp.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate Action Button */}
      <div className="pt-2 pb-4">
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-5 px-8 rounded-2xl font-extrabold text-base sm:text-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>Get Recommended Server Suggestion</span>
        </button>
      </div>

    </div>
  );
}
