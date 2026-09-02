import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, DollarSign, Cpu, Zap, HardDrive, Wifi, Copy, Check, Download, Layers, Code2, Shield, Bookmark, HelpCircle, Network, Activity, Lock, ArrowRight, Scale } from 'lucide-react';
import ArchitectureDiagram from './ArchitectureDiagram';
import InfrastructureHealthScores from './InfrastructureHealthScores';
import SecurityAndMonitoringAdvisor from './SecurityAndMonitoringAdvisor';
import TerraformGenerator from './TerraformGenerator';
import DeploymentChecklist from './DeploymentChecklist';
import RecommendationHistory from './RecommendationHistory';

function ProviderComparisonTable({ providerComparison }) {
  if (!providerComparison) return null;

  const providers = [
    { key: 'aws', name: 'AWS EC2', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200', match: providerComparison.aws },
    { key: 'azure', name: 'Azure VM', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200', match: providerComparison.azure },
    { key: 'gcp', name: 'Google Cloud Engine', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200', match: providerComparison.gcp }
  ].filter(p => p.match);

  if (providers.length === 0) return null;

  const highestScore = Math.max(...providers.map(p => p.match.score));
  const lowestCost = Math.min(...providers.map(p => p.match.instance.monthlyEstimate));

  return (
    <div className="bg-white border-2 border-blue-400 rounded-3xl p-5 sm:p-8 space-y-6 shadow-md animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
            MULTI-CLOUD COMPARISON MATRIX
          </span>
          <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
            <Scale className="w-5 h-5 text-blue-600" />
            AWS vs Azure vs GCP Side-by-Side Comparison
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Compare top recommended server specs, monthly pricing, and rule match scores side-by-side across all three major cloud providers.
          </p>
        </div>
      </div>

      {/* Grid of 3 side-by-side provider columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {providers.map(({ key, name, badgeBg, match }) => {
          const inst = match.instance;
          const isHighestScore = match.score === highestScore;
          const isLowestCost = inst.monthlyEstimate === lowestCost;

          return (
            <div
              key={key}
              className={`p-5 rounded-2xl border flex flex-col justify-between space-y-5 transition-all ${
                isHighestScore
                  ? 'bg-blue-50/40 border-blue-400 shadow-md scale-[1.01]'
                  : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                {/* Header & Badges */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`px-2.5 py-1 text-[11px] font-mono font-extrabold rounded-lg border uppercase ${badgeBg}`}>
                    {inst.provider.toUpperCase()}
                  </span>
                  {isHighestScore && (
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-blue-100 text-blue-700 border border-blue-200">
                      🏆 Top Score
                    </span>
                  )}
                  {isLowestCost && !isHighestScore && (
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200">
                      💵 Lowest Price
                    </span>
                  )}
                </div>

                {/* Instance Name & Score */}
                <div className="border-b border-slate-200/80 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xl font-extrabold font-mono text-slate-900">{inst.name}</h4>
                    <span className="text-xs font-mono font-extrabold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded border border-blue-200">
                      {match.score}% Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{inst.family}</p>
                </div>

                {/* Price Display */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-0.5 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-mono block">Estimated Monthly Cost</span>
                  <div className="text-2xl font-extrabold font-mono text-blue-600">
                    ${inst.monthlyEstimate.toFixed(2)}
                    <span className="text-xs text-slate-400 font-sans font-normal ml-1">/mo</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">~${inst.hourlyRate.toFixed(4)} / hour</span>
                </div>

                {/* Hardware Specs Grid */}
                <div className="space-y-2 text-xs font-mono text-slate-700 pt-1">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-blue-600" /> CPU Cores:</span>
                    <span className="font-bold text-slate-900">{inst.vCPU} vCPU</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-indigo-600" /> RAM Memory:</span>
                    <span className="font-bold text-slate-900">{inst.ramGB} GB</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-sky-600" /> Max IOPS:</span>
                    <span className="font-bold text-slate-900">{inst.maxIops.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500 flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-amber-600" /> Network:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[120px] text-right">{inst.networkSpeed}</span>
                  </div>
                </div>

                {/* Key Rule Reason */}
                {match.triggeredRules && match.triggeredRules.length > 0 && (
                  <div className="pt-2 border-t border-slate-200/80">
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block mb-1">Key Match Reason:</span>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-medium bg-white p-2.5 rounded-lg border border-slate-200">
                      {match.triggeredRules[0].reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Best Use Cases */}
              <div className="pt-3 border-t border-slate-200/80 flex flex-wrap gap-1">
                {inst.bestUseCases.slice(0, 3).map((uc, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] rounded-md bg-white text-slate-600 border border-slate-200 font-medium">
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RecommendationResult({ result, userInput }) {
  const [copied, setCopied] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState('specs');

  if (!result || !result.primary) {
    return (
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-4 shadow-sm">
        <Sparkles className="w-12 h-12 text-blue-600 mx-auto animate-bounce" />
        <h3 className="text-2xl font-extrabold text-slate-900">Ready to Evaluate Your Request</h3>
        <p className="text-sm text-slate-500">Complete the quick inputs above to generate your recommendation dashboard.</p>
      </div>
    );
  }

  const { primary, budgetPick, perfPick, providerComparison, totalEvaluated } = result;
  const instance = primary.instance;
  const userQuestions = userInput.questions || {};

  const handleCopySummary = () => {
    const text = `
=== CLOUD INSTANCE RECOMMENDATION ===
Suggested Server: ${instance.name} (${instance.provider.toUpperCase()})
Server Family: ${instance.family}
Power: ${instance.vCPU} Cores | ${instance.ramGB} GB RAM | ${instance.networkSpeed} Network
Estimated Cost: $${instance.monthlyEstimate.toFixed(2)}/month ($${instance.hourlyRate}/hr)
Match Fit Score: ${primary.score}%

Why Server Suggested:
${primary.triggeredRules.map(r => `- ${r.reason}`).join('\n')}
-------------------------------------
Generated by InfraSense Cloud Recommendation Engine
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ input: userInput, recommendation: primary, evaluatedCount: totalEvaluated }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `infrasence-server-suggestion-${instance.name}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const architecturalReasons = [
    {
      key: 'needMonitoring',
      name: 'Cloud Monitoring & Alarms',
      icon: Activity,
      color: 'text-blue-600',
      reason: 'Why Suggested? You answered YES to 24/7 Monitoring. CloudWatch/Azure Monitor tracks CPU/disk health and triggers alerts if load exceeds 80%.'
    },
    {
      key: 'needLoadBalancer',
      name: 'Application Load Balancer',
      icon: Network,
      color: 'text-indigo-600',
      reason: 'Why Suggested? You answered YES to spiky load. Load Balancer distributes web requests evenly across server instances to prevent downtime.'
    },
    {
      key: 'needAutoScaling',
      name: 'Auto Scaling Group / Scale Set',
      icon: Zap,
      color: 'text-amber-600',
      reason: 'Why Suggested? You answered YES to automatic capacity scaling. Launches extra servers during traffic spikes and cuts idle servers when traffic drops.'
    },
    {
      key: 'needMultiAZ',
      name: 'Multi-AZ High Availability',
      icon: Layers,
      color: 'text-blue-600',
      reason: 'Why Suggested? You answered YES to Disaster Recovery. Multi-AZ replicates databases and subnets across physical data centers for 99.99% uptime.'
    },
    {
      key: 'needEncryption',
      name: 'AES-256 Disk Encryption',
      icon: Lock,
      color: 'text-purple-600',
      reason: 'Why Suggested? You answered YES to Encryption. Automatically encrypts all hard drives and storage buckets at rest using AES-256.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Horizontal Sub-Navigation Dashboard */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-2 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveOutputTab('specs')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeOutputTab === 'specs'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>🎯 Specs & Reasons</span>
          </button>

          {userInput.provider === 'all' && (
            <button
              onClick={() => setActiveOutputTab('compare')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeOutputTab === 'compare'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>⚔️ AWS vs Azure vs GCP</span>
            </button>
          )}

          <button
            onClick={() => setActiveOutputTab('diagram')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeOutputTab === 'diagram'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>📐 Diagram</span>
          </button>

          <button
            onClick={() => setActiveOutputTab('security')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeOutputTab === 'security'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>🛡️ Security</span>
          </button>

          <button
            onClick={() => setActiveOutputTab('terraform')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeOutputTab === 'terraform'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>💻 Terraform</span>
          </button>

          <button
            onClick={() => setActiveOutputTab('checklist')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeOutputTab === 'checklist'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>📊 Health</span>
          </button>

          <button
            onClick={() => setActiveOutputTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeOutputTab === 'history'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>🔖 History</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 pr-1">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Primary Specs, Cost & Architectural Reasons */}
      {activeOutputTab === 'specs' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Top Recommendation Result Card */}
          <div className="bg-white border-2 border-blue-400 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden space-y-6 sm:space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 sm:pb-5">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  {primary.score}% MATCH SCORE
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold font-mono uppercase bg-slate-100 text-slate-700 border border-slate-200">
                  {instance.provider} Cloud
                </span>
                {instance.burstable ? (
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    🌱 Smart Money-Saver
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    🛡️ Guaranteed Power
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2 space-y-2">
                <span className="text-[10px] sm:text-xs font-bold text-blue-600 tracking-wider uppercase font-mono">
                  TOP RECOMMENDED SERVER SIZE
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-mono tracking-tight break-words">
                  {instance.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-700 font-bold">{instance.family}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">{instance.description}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-left space-y-1 shadow-xs">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider block font-mono">
                  Estimated Monthly Bill
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-blue-600">
                  ${instance.monthlyEstimate.toFixed(2)}
                  <span className="text-xs sm:text-sm text-slate-500 font-sans font-normal ml-1">/mo</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-mono">~${instance.hourlyRate.toFixed(4)} / hour</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-slate-100">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  Cores
                </span>
                <span className="text-lg sm:text-2xl font-mono font-extrabold text-slate-900">{instance.vCPU} Cores</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 text-indigo-600" />
                  RAM
                </span>
                <span className="text-lg sm:text-2xl font-mono font-extrabold text-slate-900">{instance.ramGB} GB</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                  <HardDrive className="w-3.5 h-3.5 text-sky-600" />
                  IOPS
                </span>
                <span className="text-lg sm:text-2xl font-mono font-extrabold text-slate-900">{instance.maxIops.toLocaleString()}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mb-1">
                  <Wifi className="w-3.5 h-3.5 text-amber-600" />
                  Speed
                </span>
                <span className="text-xs sm:text-base font-mono font-bold text-slate-900 leading-tight sm:leading-7">{instance.networkSpeed}</span>
              </div>
            </div>
          </div>

          {/* Prominent Multi-Cloud Comparison Table when Provider is set to 'all' */}
          {userInput.provider === 'all' && (
            <ProviderComparisonTable providerComparison={providerComparison} />
          )}

          {/* Architectural Reasons */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 sm:space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
                WHY WERE THESE SERVICES SUGGESTED?
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Architectural Reasons & Explanations
              </h3>
            </div>

            <div className="space-y-3">
              {architecturalReasons.map(item => {
                const isRequested = userQuestions[item.key] !== false;
                if (!isRequested) return null;
                const IconComp = item.icon;

                return (
                  <div key={item.key} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-2">
                      <IconComp className={`w-4 h-4 ${item.color}`} />
                      <h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal pl-6">
                      {item.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rule Reasons */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              Why this server size fits your workload:
            </h3>
            <div className="space-y-2.5">
              {primary.triggeredRules.map((tr, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium">
                  {tr.reason}
                </div>
              ))}
            </div>
          </div>

          {/* Alternatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-xs font-bold uppercase text-amber-600">Lowest Cost Fit</span>
              <h4 className="text-2xl font-mono font-extrabold text-slate-900">{budgetPick.instance.name}</h4>
              <p className="text-base font-bold font-mono text-amber-600">${budgetPick.instance.monthlyEstimate.toFixed(2)}/mo</p>
            </div>
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-xs font-bold uppercase text-indigo-600">Maximum Power Fit</span>
              <h4 className="text-2xl font-mono font-extrabold text-slate-900">{perfPick.instance.name}</h4>
              <p className="text-base font-bold font-mono text-indigo-600">${perfPick.instance.monthlyEstimate.toFixed(2)}/mo</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Multi-Cloud Comparison */}
      {activeOutputTab === 'compare' && (
        <div className="animate-fadeIn space-y-6">
          <ProviderComparisonTable providerComparison={providerComparison} />
        </div>
      )}

      {/* Tab 2: Visual Topology Diagram */}
      {activeOutputTab === 'diagram' && (
        <div className="animate-fadeIn">
          <ArchitectureDiagram instanceName={instance.name} provider={instance.provider} />
        </div>
      )}

      {/* Tab 3: Security & Monitoring */}
      {activeOutputTab === 'security' && (
        <div className="animate-fadeIn">
          <SecurityAndMonitoringAdvisor userQuestions={userQuestions} />
        </div>
      )}

      {/* Tab 4: Terraform IaC */}
      {activeOutputTab === 'terraform' && (
        <div className="animate-fadeIn">
          <TerraformGenerator instanceName={instance.name} provider={instance.provider} />
        </div>
      )}

      {/* Tab 5: Health & Checklist */}
      {activeOutputTab === 'checklist' && (
        <div className="space-y-6 animate-fadeIn">
          <InfrastructureHealthScores score={primary.score} />
          <DeploymentChecklist />
        </div>
      )}

      {/* Tab 6: Saved History */}
      {activeOutputTab === 'history' && (
        <div className="animate-fadeIn">
          <RecommendationHistory />
        </div>
      )}

    </div>
  );
}
