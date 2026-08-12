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
    { key: 'aws', name: 'AWS EC2', badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/40', match: providerComparison.aws },
    { key: 'azure', name: 'Azure VM', badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/40', match: providerComparison.azure },
    { key: 'gcp', name: 'Google Cloud Engine', badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40', match: providerComparison.gcp }
  ].filter(p => p.match);

  if (providers.length === 0) return null;

  const highestScore = Math.max(...providers.map(p => p.match.score));
  const lowestCost = Math.min(...providers.map(p => p.match.instance.monthlyEstimate));

  return (
    <div className="glass-panel p-4 sm:p-8 border-2 border-cyan-500/40 space-y-6 shadow-2xl animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
            MULTI-CLOUD COMPARISON MATRIX
          </span>
          <h3 className="text-lg sm:text-2xl font-extrabold text-white flex items-center gap-2 mt-0.5">
            <Scale className="w-5 h-5 text-cyan-400" />
            AWS vs Azure vs GCP Side-by-Side Comparison
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
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
                  ? 'bg-slate-900/90 border-cyan-500/60 shadow-xl shadow-cyan-500/10 scale-[1.01]'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                {/* Header & Badges */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`px-2.5 py-1 text-[11px] font-mono font-extrabold rounded-lg border uppercase ${badgeBg}`}>
                    {inst.provider.toUpperCase()}
                  </span>
                  {isHighestScore && (
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      🏆 Top Score Match
                    </span>
                  )}
                  {isLowestCost && !isHighestScore && (
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      💵 Lowest Price
                    </span>
                  )}
                </div>

                {/* Instance Name & Score */}
                <div className="border-b border-slate-800 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xl font-extrabold font-mono text-white">{inst.name}</h4>
                    <span className="text-xs font-mono font-extrabold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                      {match.score}% Score
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">{inst.family}</p>
                </div>

                {/* Price Display */}
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-mono block">Estimated Monthly Cost</span>
                  <div className="text-2xl font-extrabold font-mono text-cyan-300">
                    ${inst.monthlyEstimate.toFixed(2)}
                    <span className="text-xs text-slate-400 font-sans font-normal ml-1">/mo</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">~${inst.hourlyRate.toFixed(4)} / hour</span>
                </div>

                {/* Hardware Specs Grid */}
                <div className="space-y-2 text-xs font-mono text-slate-300 pt-1">
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> CPU Cores:</span>
                    <span className="font-bold text-white">{inst.vCPU} vCPU</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-indigo-400" /> RAM Memory:</span>
                    <span className="font-bold text-white">{inst.ramGB} GB</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-emerald-400" /> Max IOPS:</span>
                    <span className="font-bold text-white">{inst.maxIops.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/50">
                    <span className="text-slate-400 flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-amber-400" /> Network:</span>
                    <span className="font-bold text-white truncate max-w-[120px] text-right">{inst.networkSpeed}</span>
                  </div>
                </div>

                {/* Key Rule Reason */}
                {match.triggeredRules && match.triggeredRules.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">Key Match Reason:</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                      {match.triggeredRules[0].reason}
                    </p>
                  </div>
                )}
              </div>

              {/* Best Use Cases */}
              <div className="pt-3 border-t border-slate-800/50 flex flex-wrap gap-1">
                {inst.bestUseCases.slice(0, 3).map((uc, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] rounded bg-slate-900 text-slate-400 border border-slate-800">
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
      <div className="max-w-5xl mx-auto glass-panel p-16 text-center text-slate-400 space-y-4">
        <Sparkles className="w-12 h-12 text-cyan-400 mx-auto animate-bounce" />
        <h3 className="text-2xl font-extrabold text-white">Ready to Evaluate Your Request</h3>
        <p className="text-sm text-slate-400">Complete the quick questions above to generate your recommendation dashboard.</p>
      </div>
    );
  }

  const { primary, budgetPick, perfPick, providerComparison, totalEvaluated } = result;
  const instance = primary.instance;
  const userQuestions = userInput.questions || {};

  // Copy summary handler
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
Generated by Infrasence Cloud Recommendation Engine
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download JSON spec sheet
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
      color: 'text-cyan-400',
      reason: 'Why Suggested? You answered YES to 24/7 Monitoring. CloudWatch/Azure Monitor tracks CPU/disk health and triggers instant alerts if load exceeds 80%.'
    },
    {
      key: 'needLoadBalancer',
      name: 'Application Load Balancer',
      icon: Network,
      color: 'text-blue-400',
      reason: 'Why Suggested? You answered YES to spiky load. Load Balancer distributes web requests evenly across server instances to prevent downtime.'
    },
    {
      key: 'needAutoScaling',
      name: 'Auto Scaling Group / Scale Set',
      icon: Zap,
      color: 'text-amber-400',
      reason: 'Why Suggested? You answered YES to automatic capacity scaling. Launches extra servers during traffic spikes and cuts idle servers when traffic drops.'
    },
    {
      key: 'needMultiAZ',
      name: 'Multi-AZ High Availability',
      icon: Layers,
      color: 'text-emerald-400',
      reason: 'Why Suggested? You answered YES to Disaster Recovery. Multi-AZ replicates databases and subnets across physical data centers for 99.99% uptime.'
    },
    {
      key: 'needEncryption',
      name: 'AES-256 Disk Encryption',
      icon: Lock,
      color: 'text-purple-400',
      reason: 'Why Suggested? You answered YES to Encryption. Automatically encrypts all hard drives and storage buckets at rest using AES-256.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Horizontal Navigation Dashboard */}
      <div className="glass-panel p-2 bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveOutputTab('specs')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
              activeOutputTab === 'specs'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span>🎯 Specs & Reasons</span>
          </button>

          {userInput.provider === 'all' && (
            <button
              onClick={() => setActiveOutputTab('compare')}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                activeOutputTab === 'compare'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>⚔️ AWS vs Azure vs GCP</span>
            </button>
          )}

          <button
            onClick={() => setActiveOutputTab('diagram')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
              activeOutputTab === 'diagram'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span>📐 Diagram</span>
          </button>

          <button
            onClick={() => setActiveOutputTab('security')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
              activeOutputTab === 'security'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span>🛡️ Security</span>
          </button>

          <button
            onClick={() => setActiveOutputTab('terraform')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
              activeOutputTab === 'terraform'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span>💻 Terraform</span>
          </button>

          <button
            onClick={() => setActiveOutputTab('checklist')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
              activeOutputTab === 'checklist'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span>📊 Health</span>
          </button>

          <button
            onClick={() => setActiveOutputTab('history')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
              activeOutputTab === 'history'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            <span>🔖 History</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 pr-1">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Primary Specs, Cost & Explicit Architectural Reasons */}
      {activeOutputTab === 'specs' && (
        <div className="space-y-6 sm:space-y-8 animate-fadeIn">
          
          {/* Top Recommendation Result Card */}
          <div className="glass-panel p-4 sm:p-8 lg:p-12 border-2 border-cyan-500/40 relative overflow-hidden shadow-2xl space-y-6 sm:space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 sm:pb-6">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="glow-badge px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold font-mono tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  {primary.score}% MATCH SCORE
                </span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold font-mono uppercase bg-slate-800 text-slate-200 border border-slate-700">
                  {instance.provider} Cloud
                </span>
                {instance.burstable ? (
                  <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40">
                    🌱 Smart Money-Saver
                  </span>
                ) : (
                  <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
                    🛡️ Guaranteed Power
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
              <div className="md:col-span-2 space-y-2 sm:space-y-3">
                <span className="text-[10px] sm:text-xs font-bold text-cyan-400 tracking-wider uppercase font-mono">
                  TOP RECOMMENDED SERVER SIZE
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono tracking-tight break-words">
                  {instance.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-200 font-semibold">{instance.family}</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">{instance.description}</p>
              </div>

              <div className="bg-slate-900/90 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 text-left md:text-left space-y-1 sm:space-y-2 shadow-inner">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block font-mono">
                  Estimated Monthly Bill
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-300">
                  ${instance.monthlyEstimate.toFixed(2)}
                  <span className="text-xs sm:text-sm text-slate-400 font-sans font-normal ml-1">/mo</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 font-mono">~${instance.hourlyRate.toFixed(4)} / hour</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-800/80">
              <div className="bg-slate-900/60 p-3.5 sm:p-5 rounded-2xl border border-slate-800">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                  <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  Cores
                </span>
                <span className="text-lg sm:text-2xl font-mono font-extrabold text-white">{instance.vCPU} Cores</span>
              </div>

              <div className="bg-slate-900/60 p-3.5 sm:p-5 rounded-2xl border border-slate-800">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                  <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                  RAM
                </span>
                <span className="text-lg sm:text-2xl font-mono font-extrabold text-white">{instance.ramGB} GB</span>
              </div>

              <div className="bg-slate-900/60 p-3.5 sm:p-5 rounded-2xl border border-slate-800">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                  <HardDrive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  IOPS
                </span>
                <span className="text-lg sm:text-2xl font-mono font-extrabold text-white">{instance.maxIops.toLocaleString()}</span>
              </div>

              <div className="bg-slate-900/60 p-3.5 sm:p-5 rounded-2xl border border-slate-800">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                  <Wifi className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                  Speed
                </span>
                <span className="text-xs sm:text-base font-mono font-bold text-white leading-tight sm:leading-7">{instance.networkSpeed}</span>
              </div>
            </div>
          </div>

          {/* Prominent Multi-Cloud Comparison Table when Provider is set to 'all' */}
          {userInput.provider === 'all' && (
            <ProviderComparisonTable providerComparison={providerComparison} />
          )}

          {/* EXPLICIT ARCHITECTURAL REASONS ("WHY WAS EACH SERVICE SUGGESTED?") */}
          <div className="glass-panel p-4 sm:p-8 border border-slate-800 space-y-4 sm:space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                WHY WERE THESE SERVICES SUGGESTED?
              </span>
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
                Architectural Reasons & Explanations
              </h3>
            </div>

            <div className="space-y-4">
              {architecturalReasons.map(item => {
                const isRequested = userQuestions[item.key] !== false;
                if (!isRequested) return null;
                const IconComp = item.icon;

                return (
                  <div key={item.key} className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800/80 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <IconComp className={`w-4 h-4 ${item.color}`} />
                      <h4 className="font-extrabold text-sm text-slate-100">{item.name}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium pl-6">
                      {item.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Server Rule Reasons */}
          <div className="glass-panel p-8 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              Why this server size fits your workload:
            </h3>
            <div className="space-y-3">
              {primary.triggeredRules.map((tr, idx) => (
                <div key={idx} className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium">
                  {tr.reason}
                </div>
              ))}
            </div>
          </div>

          {/* Alternatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase text-amber-400">Lowest Cost Fit</span>
              <h4 className="text-2xl font-mono font-extrabold text-white">{budgetPick.instance.name}</h4>
              <p className="text-base font-bold font-mono text-amber-400">${budgetPick.instance.monthlyEstimate.toFixed(2)}/mo</p>
            </div>
            <div className="glass-panel p-6 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase text-indigo-400">Maximum Power Fit</span>
              <h4 className="text-2xl font-mono font-extrabold text-white">{perfPick.instance.name}</h4>
              <p className="text-base font-bold font-mono text-indigo-400">${perfPick.instance.monthlyEstimate.toFixed(2)}/mo</p>
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
        <div className="space-y-8 animate-fadeIn">
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

