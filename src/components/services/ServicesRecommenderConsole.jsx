import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Sparkles,
  Zap,
  DollarSign,
  Wrench,
  Server,
  Database,
  HardDrive,
  Network,
  ShieldCheck,
  BarChart3,
  Globe,
  RefreshCw,
  Copy,
  Check,
  Download,
  ArrowRight,
  ArrowLeft,
  Layers,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Info,
  SlidersHorizontal,
  FileCode,
  Shield,
  Box,
  RotateCcw,
  Bookmark,
  FolderKanban,
} from 'lucide-react';
import CloudServiceIcon from '../common/CloudServiceIcon';
import { useAuth } from '../../hooks/useAuth';
import { saveUserReport } from '../../utils/reportStorage';
import {
  WORKLOAD_PRESETS,
  APP_TYPES,
  TRAFFIC_SCALES,
  DATABASE_TYPES,
  STORAGE_TYPES,
  NETWORKING_TYPES,
  BACKUP_STRATEGIES,
  SECURITY_LEVELS,
  MONITORING_LEVELS,
  MULTI_REGION_OPTIONS,
  recommendInfrastructureServices,
  generateServicesTerraform,
  generateDockerComposeLocal,
} from '../../engine/infraServicesEngine';

const DEFAULT_INPUT = {
  appType: 'server_api',
  trafficScale: 'growth_medium',
  databaseType: 'sql_postgres',
  storageType: 'object_storage',
  networking: 'custom_vpc',
  needElasticIp: true,
  needLoadBalancer: true,
  backupStrategy: 'pitr_continuous',
  securityLevel: 'secrets_kms_vault',
  monitoringLevel: 'apm_distributed_tracing',
  multiRegion: 'single_region',
  provider: 'aws',
};

const WIZARD_STEPS = [
  { id: 1, title: 'App Workload', desc: 'Type of application' },
  { id: 2, title: 'Data & Storage', desc: 'Databases & media files' },
  { id: 3, title: 'Scale & Region', desc: 'Traffic & geography' },
  { id: 4, title: 'Reliability & Security', desc: 'Backups & monitoring' },
];

export default function ServicesRecommenderConsole({ loadedReport, onNavigateToDashboard }) {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [userInput, setUserInput] = useState(DEFAULT_INPUT);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStrategyId, setSelectedStrategyId] = useState('performance');
  const [activeOutputTab, setActiveOutputTab] = useState('blueprint'); // blueprint, comparison, terraform, docker
  const [isGenerating, setIsGenerating] = useState(false);
  const [evaluationStage, setEvaluationStage] = useState(0);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const resultsRef = useRef(null);
  const wizardRef = useRef(null);

  // Restore loaded report from dashboard if provided
  useEffect(() => {
    if (loadedReport && loadedReport.config) {
      setUserInput((prev) => ({ ...prev, ...loadedReport.config }));
      if (loadedReport.strategyId) {
        setSelectedStrategyId(loadedReport.strategyId);
      }
      setHasGenerated(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [loadedReport]);

  // Compute recommendation results
  const recommendation = useMemo(() => {
    return recommendInfrastructureServices(userInput);
  }, [userInput]);

  const currentStrategy = recommendation.strategies[selectedStrategyId] || recommendation.strategies.performance;

  const handleApplyPreset = (preset) => {
    setUserInput(preset.config);
    triggerGeneration();
  };

  const triggerGeneration = () => {
    setIsGenerating(true);
    setEvaluationStage(1);

    setTimeout(() => setEvaluationStage(2), 400);
    setTimeout(() => setEvaluationStage(3), 800);

    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1200);
  };

  const handleSaveToDashboard = () => {
    const userId = user?._id || user?.username || 'demo_user';
    const appLabel = APP_TYPES.find((a) => a.id === userInput.appType)?.label || userInput.appType;
    const dbLabel = DATABASE_TYPES.find((d) => d.id === userInput.databaseType)?.label || userInput.databaseType;

    const reportData = {
      type: 'services',
      title: `${appLabel.split('/')[0].trim()} + ${dbLabel.split('(')[0].trim()} Stack`,
      strategyId: selectedStrategyId,
      strategyName: currentStrategy.badge || currentStrategy.title,
      summary: currentStrategy.summary,
      estimatedMonthlyCost: currentStrategy.totalEstimatedMonthlyCost,
      config: userInput,
      services: currentStrategy.services.map((s) => ({
        name: s.name,
        category: s.category,
        tier: s.tier,
        cost: s.estimatedCost,
      })),
      terraformCode,
    };

    saveUserReport(userId, reportData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownload = (filename, content) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleEditConfig = () => {
    setHasGenerated(false);
    wizardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const terraformCode = useMemo(() => {
    return generateServicesTerraform(currentStrategy, userInput);
  }, [currentStrategy, userInput]);

  const dockerComposeCode = useMemo(() => {
    return generateDockerComposeLocal(currentStrategy, userInput);
  }, [currentStrategy, userInput]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top 1-Click Quick Presets Bar */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
              QUICK 1-CLICK ARCHITECTURES
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Pick a common setup or configure step-by-step below
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Pre-fills recommended production specs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {WORKLOAD_PRESETS.map((preset) => {
            const isPresetActive =
              userInput.appType === preset.config.appType &&
              userInput.databaseType === preset.config.databaseType;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 group cursor-pointer ${
                  isPresetActive
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500'
                    : 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform" />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                      {preset.name}
                    </h3>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Guided Configuration Wizard Card */}
      <section
        ref={wizardRef}
        className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8"
      >
        {/* Wizard Header & Step Stepper */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-mono font-bold border border-blue-100">
                GUIDED CLOUD ARCHITECT WIZARD
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Step {currentStep} of 4: {WIZARD_STEPS[currentStep - 1].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                {WIZARD_STEPS[currentStep - 1].desc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setUserInput(DEFAULT_INPUT);
                setCurrentStep(1);
              }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to defaults</span>
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {WIZARD_STEPS.map((step) => {
              const isPassed = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`text-left p-2.5 sm:p-3 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-50 border-blue-500 shadow-xs'
                      : isPassed
                      ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      : 'bg-white/40 border-slate-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {isPassed ? <Check className="w-3 h-3" /> : step.id}
                    </div>
                    <span className="text-xs font-bold text-slate-900 hidden sm:inline">
                      {step.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block truncate">
                    {step.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 1: Application Architecture & Workload */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900">
                What type of application are you hosting?
              </h3>
              <p className="text-xs text-slate-500">
                Pick the primary architecture for your software.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {APP_TYPES.map((app) => {
                const isSelected = userInput.appType === app.id;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setUserInput((prev) => ({ ...prev, appType: app.id }))}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500'
                        : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <CloudServiceIcon serviceId={app.icon} className="w-10 h-10 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-bold text-xs sm:text-sm text-slate-900">{app.label}</p>
                      <p className="text-[11px] text-slate-500 leading-snug">{app.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Database & File Storage */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Database Selection */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900">
                  What database does your workload require?
                </h3>
                <p className="text-xs text-slate-500">
                  Select your persistence and caching strategy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {DATABASE_TYPES.map((db) => {
                  const isSelected = userInput.databaseType === db.id;
                  return (
                    <button
                      key={db.id}
                      type="button"
                      onClick={() => setUserInput((prev) => ({ ...prev, databaseType: db.id }))}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-50/80 border-purple-500 shadow-sm ring-1 ring-purple-500'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <CloudServiceIcon serviceId={db.icon} className="w-8 h-8 shrink-0" />
                      <div>
                        <p className="font-bold text-xs text-slate-900">{db.label}</p>
                        <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{db.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900">
                  Do you need media files or storage?
                </h3>
                <p className="text-xs text-slate-500">
                  Asset uploads, PDFs, static CDN caching, or shared file systems.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {STORAGE_TYPES.map((st) => {
                  const isSelected = userInput.storageType === st.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setUserInput((prev) => ({ ...prev, storageType: st.id }))}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50/80 border-sky-500 shadow-sm ring-1 ring-sky-500'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <CloudServiceIcon serviceId={st.icon} className="w-8 h-8 shrink-0" />
                      <div>
                        <p className="font-bold text-xs text-slate-900">{st.label}</p>
                        <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{st.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Scale & Geographic Location */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Traffic Scale */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900">
                  What is your expected monthly traffic scale?
                </h3>
                <p className="text-xs text-slate-500">
                  Affects CPU reservations, auto-scaling thresholds, and multi-tier pricing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {TRAFFIC_SCALES.map((scale) => {
                  const isSelected = userInput.trafficScale === scale.id;
                  return (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setUserInput((prev) => ({ ...prev, trafficScale: scale.id }))}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-500 shadow-sm ring-1 ring-indigo-500'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <p className="font-bold text-xs sm:text-sm text-slate-900">{scale.label}</p>
                      <p className="text-[11px] text-slate-500 mt-1">{scale.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Geographic Availability */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900">
                  Where are your target users located?
                </h3>
                <p className="text-xs text-slate-500">
                  Single region deployment vs global multi-region routing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MULTI_REGION_OPTIONS.map((mr) => {
                  const isSelected = userInput.multiRegion === mr.id;
                  return (
                    <button
                      key={mr.id}
                      type="button"
                      onClick={() => setUserInput((prev) => ({ ...prev, multiRegion: mr.id }))}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-50/80 border-teal-500 shadow-sm ring-1 ring-teal-500'
                          : 'bg-white border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <p className="font-bold text-xs sm:text-sm text-slate-900">{mr.label}</p>
                      <p className="text-[11px] text-slate-500 leading-snug mt-1">{mr.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Reliability, Security & Monitoring */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900">
                Security, Backups & Observability Requirements
              </h3>
              <p className="text-xs text-slate-500">
                Pre-configured with standard production defaults. Adjust if needed:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Security & WAF Level */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Security & Protection Level</span>
                </h4>
                <div className="space-y-2">
                  {SECURITY_LEVELS.map((sec) => (
                    <label
                      key={sec.id}
                      className={`flex items-start gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        userInput.securityLevel === sec.id
                          ? 'bg-white border-emerald-500 shadow-xs'
                          : 'bg-white/60 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="securityLevel"
                        checked={userInput.securityLevel === sec.id}
                        onChange={() => setUserInput((prev) => ({ ...prev, securityLevel: sec.id }))}
                        className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{sec.label}</p>
                        <p className="text-[10px] text-slate-500">{sec.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Backups Strategy */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4 text-amber-600" />
                  <span>Backup & Disaster Recovery</span>
                </h4>
                <div className="space-y-2">
                  {BACKUP_STRATEGIES.map((bk) => (
                    <label
                      key={bk.id}
                      className={`flex items-start gap-2 p-2.5 rounded-xl border transition-all cursor-pointer ${
                        userInput.backupStrategy === bk.id
                          ? 'bg-white border-amber-500 shadow-xs'
                          : 'bg-white/60 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="backupStrategy"
                        checked={userInput.backupStrategy === bk.id}
                        onChange={() => setUserInput((prev) => ({ ...prev, backupStrategy: bk.id }))}
                        className="mt-0.5 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800">{bk.label}</p>
                        <p className="text-[10px] text-slate-500">{bk.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Networking & IP checkboxes */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <Network className="w-4 h-4 text-blue-600" />
                <span>Networking & Routing Options</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userInput.needLoadBalancer}
                    onChange={(e) => setUserInput((prev) => ({ ...prev, needLoadBalancer: e.target.checked }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Application Load Balancer (ALB)
                  </span>
                </label>
                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={userInput.needElasticIp}
                    onChange={(e) => setUserInput((prev) => ({ ...prev, needElasticIp: e.target.checked }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    Dedicated Elastic IP Address
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Step</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>Next: {WIZARD_STEPS[currentStep].title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={triggerGeneration}
              disabled={isGenerating}
              className="flex items-center gap-2 px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating 28 Rules...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Recommended Stack</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </section>

      {/* Evaluating Animated Status Banner (While Processing) */}
      {isGenerating && (
        <div className="p-6 rounded-3xl bg-blue-50/80 border border-blue-200 text-center space-y-3 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
            <RefreshCw className="w-5 h-5 animate-spin" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {evaluationStage === 1 && 'Step 1/3: Analyzing application architecture & traffic scale...'}
            {evaluationStage === 2 && 'Step 2/3: Calculating database IOPS, caching & storage capacity...'}
            {evaluationStage === 3 && 'Step 3/3: Synthesizing Performance, Cost & Zero-Ops blueprints...'}
          </h3>
          <p className="text-xs text-slate-500">
            Evaluating multi-cloud SKUs against 28 deterministic heuristic rules
          </p>
        </div>
      )}

      {/* Recommendation Results (Shown ONLY AFTER Generation) */}
      {hasGenerated && !isGenerating && (
        <section ref={resultsRef} className="space-y-8 animate-fadeIn">
          
          {/* Header & Strategy Options */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
            <div>
              <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                RECOMMENDATION RESULTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                Recommended Cloud Infrastructures
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Select from the 3 tailored strategic blueprints below:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Save Report to Dashboard Button (Requirement 2) */}
              <button
                type="button"
                onClick={handleSaveToDashboard}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  savedSuccess
                    ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                    : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/25'
                }`}
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{savedSuccess ? 'Saved in Dashboard!' : 'Save Report to Dashboard'}</span>
              </button>

              <button
                type="button"
                onClick={handleEditConfig}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Modify Requirements</span>
              </button>
            </div>
          </div>

          {/* Toast Banner after saving */}
          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800 animate-fadeIn">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Architecture report successfully saved to your private user dashboard!</span>
              </div>
              {onNavigateToDashboard && (
                <button
                  type="button"
                  onClick={onNavigateToDashboard}
                  className="font-bold underline hover:text-emerald-950 cursor-pointer"
                >
                  View in Dashboard →
                </button>
              )}
            </div>
          )}

          {/* The 3 Main Strategy Cards (1. Performance, 2. Cost Efficient, 3. Minimum Overhead) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Option 1: Performance */}
            {(() => {
              const strat = recommendation.strategies.performance;
              const isSelected = selectedStrategyId === 'performance';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedStrategyId('performance')}
                  className={`p-5 sm:p-6 rounded-3xl text-left transition-all relative flex flex-col justify-between space-y-4 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-2 border-amber-500 shadow-xl shadow-amber-500/10 ring-2 ring-amber-500/20'
                      : 'bg-white/90 border border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>1. Performance</span>
                      </span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Performance First
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {strat.subtitle}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-slate-600">Run Rate:</span>
                      <span className="text-2xl font-extrabold text-slate-900">
                        ~${strat.totalEstimatedMonthlyCost}
                        <span className="text-xs text-slate-500 font-normal"> /mo</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-mono text-[10px]">LATENCY</span>
                        <span className="font-bold text-amber-700">{strat.averageLatency}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-mono text-[10px]">RESILIENCE</span>
                        <span className="font-bold text-slate-800">{strat.resilienceScore}/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-amber-700 font-bold">
                    <span>{isSelected ? 'Viewing Stack' : 'Select Option'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })()}

            {/* Option 2: Cost Efficient */}
            {(() => {
              const strat = recommendation.strategies.cost_efficient;
              const isSelected = selectedStrategyId === 'cost_efficient';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedStrategyId('cost_efficient')}
                  className={`p-5 sm:p-6 rounded-3xl text-left transition-all relative flex flex-col justify-between space-y-4 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20'
                      : 'bg-white/90 border border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                        <span>2. Cost Efficient</span>
                      </span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Cost Optimized
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {strat.subtitle}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-slate-600">Run Rate:</span>
                      <span className="text-2xl font-extrabold text-emerald-700">
                        ~${strat.totalEstimatedMonthlyCost}
                        <span className="text-xs text-slate-500 font-normal"> /mo</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-mono text-[10px]">SAVINGS</span>
                        <span className="font-bold text-emerald-700">{strat.costScore}/100</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-mono text-[10px]">MAINTENANCE</span>
                        <span className="font-bold text-slate-800">{strat.maintenanceHoursPerWeek}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                    <span>{isSelected ? 'Viewing Stack' : 'Select Option'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })()}

            {/* Option 3: Minimum Overhead */}
            {(() => {
              const strat = recommendation.strategies.minimum_overhead;
              const isSelected = selectedStrategyId === 'minimum_overhead';
              return (
                <button
                  type="button"
                  onClick={() => setSelectedStrategyId('minimum_overhead')}
                  className={`p-5 sm:p-6 rounded-3xl text-left transition-all relative flex flex-col justify-between space-y-4 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-2 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                      : 'bg-white/90 border border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                        <span>3. Minimum Overhead</span>
                      </span>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Zero-Ops / Serverless
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {strat.subtitle}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-slate-600">Run Rate:</span>
                      <span className="text-2xl font-extrabold text-indigo-700">
                        ~${strat.totalEstimatedMonthlyCost}
                        <span className="text-xs text-slate-500 font-normal"> /mo</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-mono text-[10px]">SIMPLICITY</span>
                        <span className="font-bold text-indigo-700">{strat.simplicityScore}/100</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-slate-400 block font-mono text-[10px]">MAINTENANCE</span>
                        <span className="font-bold text-slate-800">{strat.maintenanceHoursPerWeek}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-indigo-700 font-bold">
                    <span>{isSelected ? 'Viewing Stack' : 'Select Option'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })()}

          </div>

          {/* Detailed Stack Output Tabs */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            
            {/* Sub-tab Navigation */}
            <div className="border-b border-slate-200/80 bg-slate-50/70 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/60">
                <button
                  type="button"
                  onClick={() => setActiveOutputTab('blueprint')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeOutputTab === 'blueprint'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Services Breakdown & Topology
                </button>

                <button
                  type="button"
                  onClick={() => setActiveOutputTab('comparison')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeOutputTab === 'comparison'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  3-Option Comparison Matrix
                </button>

                <button
                  type="button"
                  onClick={() => setActiveOutputTab('terraform')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeOutputTab === 'terraform'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Terraform Code (.tf)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveOutputTab('docker')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeOutputTab === 'docker'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Docker Compose Local
                </button>
              </div>

              <span className="text-xs font-semibold text-slate-500 font-mono">
                Selected: <strong className="text-slate-900 uppercase">{selectedStrategyId.replace('_', ' ')}</strong>
              </span>
            </div>

            {/* TAB 1: Services Breakdown WITH ICONS & Topology */}
            {activeOutputTab === 'blueprint' && (
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Summary Card */}
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30">
                        {currentStrategy.badge}
                      </span>
                      <span className="text-xs text-slate-300">· {currentStrategy.subtitle}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {currentStrategy.title}
                    </h3>
                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                      {currentStrategy.summary}
                    </p>
                  </div>

                  <div className="shrink-0 p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-left md:text-right">
                    <span className="text-[10px] font-mono text-slate-300 uppercase block">Estimated Total</span>
                    <p className="text-2xl font-black text-emerald-400">
                      ~${currentStrategy.totalEstimatedMonthlyCost}
                      <span className="text-xs text-slate-300 font-normal"> / month</span>
                    </p>
                  </div>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                    <h4 className="text-xs font-bold font-mono text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Key Architectural Advantages</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {currentStrategy.pros.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                    <h4 className="text-xs font-bold font-mono text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-amber-600" />
                      <span>Trade-offs & Notes</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {currentStrategy.cons.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">!</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Itemized Services with Rich Cloud Icons (Core Request) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                        ITEMIZED CLOUD SERVICES
                      </span>
                      <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                        Recommended Services & Tiers
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {currentStrategy.services.length} services selected
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {currentStrategy.services.map((svc, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="flex items-start gap-3.5">
                          <CloudServiceIcon serviceId={svc.serviceId} className="w-10 h-10 shrink-0" />
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase px-2 py-0.2 rounded bg-blue-50 border border-blue-100">
                              {svc.category}
                            </span>
                            <h5 className="font-extrabold text-sm text-slate-900">
                              {svc.name}
                            </h5>
                            <p className="text-xs text-indigo-700 font-mono font-semibold">
                              Tier: {svc.tier}
                            </p>
                            <p className="text-xs text-slate-600 font-normal leading-snug pt-0.5">
                              {svc.why}
                            </p>
                          </div>
                        </div>

                        <div className="sm:text-right shrink-0 p-2.5 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent border sm:border-0 border-slate-100">
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">Est. Cost</span>
                          <p className="text-lg font-extrabold text-slate-900">
                            ~${svc.estimatedCost}
                            <span className="text-xs text-slate-500 font-normal"> /mo</span>
                          </p>
                          <span className="text-[10px] text-slate-500 block">{svc.spec}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Comparison Matrix */}
            {activeOutputTab === 'comparison' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900">
                    Side-by-Side Blueprint Comparison
                  </h4>
                  <p className="text-xs text-slate-500">
                    Compare key criteria across the 3 strategic options:
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="p-3 font-bold font-mono text-slate-600 uppercase">Metric</th>
                        <th className="p-3 font-extrabold text-amber-700 bg-amber-50/40">1. Performance</th>
                        <th className="p-3 font-extrabold text-emerald-700 bg-emerald-50/40">2. Cost Efficient</th>
                        <th className="p-3 font-extrabold text-indigo-700 bg-indigo-50/40">3. Minimum Overhead</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold text-slate-800">Monthly Run Rate</td>
                        <td className="p-3 font-extrabold text-sm text-slate-900 bg-amber-50/20">~${recommendation.strategies.performance.totalEstimatedMonthlyCost}/mo</td>
                        <td className="p-3 font-extrabold text-sm text-emerald-700 bg-emerald-50/20">~${recommendation.strategies.cost_efficient.totalEstimatedMonthlyCost}/mo</td>
                        <td className="p-3 font-extrabold text-sm text-indigo-700 bg-indigo-50/20">~${recommendation.strategies.minimum_overhead.totalEstimatedMonthlyCost}/mo</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-800">Average Latency</td>
                        <td className="p-3 font-bold text-amber-700 bg-amber-50/20">{recommendation.strategies.performance.averageLatency}</td>
                        <td className="p-3 text-slate-700 bg-emerald-50/20">{recommendation.strategies.cost_efficient.averageLatency}</td>
                        <td className="p-3 text-slate-700 bg-indigo-50/20">{recommendation.strategies.minimum_overhead.averageLatency}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-800">DevOps Time</td>
                        <td className="p-3 text-slate-700 bg-amber-50/20">{recommendation.strategies.performance.maintenanceHoursPerWeek}</td>
                        <td className="p-3 text-slate-700 bg-emerald-50/20">{recommendation.strategies.cost_efficient.maintenanceHoursPerWeek}</td>
                        <td className="p-3 font-bold text-indigo-700 bg-indigo-50/20">{recommendation.strategies.minimum_overhead.maintenanceHoursPerWeek}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-800">Compute Fleet</td>
                        <td className="p-3 text-slate-700 bg-amber-50/20">Dedicated Nodes</td>
                        <td className="p-3 text-slate-700 bg-emerald-50/20">Burstable ARM / Spot</td>
                        <td className="p-3 text-slate-700 bg-indigo-50/20">Managed Serverless Container</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  <button
                    onClick={() => { setSelectedStrategyId('performance'); setActiveOutputTab('blueprint'); }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 cursor-pointer"
                  >
                    View Performance Stack
                  </button>
                  <button
                    onClick={() => { setSelectedStrategyId('cost_efficient'); setActiveOutputTab('blueprint'); }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 cursor-pointer"
                  >
                    View Cost-Efficient Stack
                  </button>
                  <button
                    onClick={() => { setSelectedStrategyId('minimum_overhead'); setActiveOutputTab('blueprint'); }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-300 hover:bg-indigo-100 cursor-pointer"
                  >
                    View Zero-Ops Stack
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Terraform Code */}
            {activeOutputTab === 'terraform' && (
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      Generated Terraform (IaC) Code
                    </h4>
                    <p className="text-xs text-slate-500">
                      Production-ready HashiCorp HCL configured for <strong>{currentStrategy.title}</strong>.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(terraformCode)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                    <button
                      onClick={() => handleDownload(`infrasense-${selectedStrategyId}-stack.tf`, terraformCode)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .tf</span>
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-slate-950 p-4 sm:p-6 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 max-h-[500px]">
                  <pre>{terraformCode}</pre>
                </div>
              </div>
            )}

            {/* TAB 4: Docker Compose */}
            {activeOutputTab === 'docker' && (
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900">
                      Local Development Stack (docker-compose.yml)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Mirror this architecture on your laptop with Postgres, Redis & LocalStack.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(dockerComposeCode)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => handleDownload('docker-compose.yml', dockerComposeCode)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .yml</span>
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl bg-slate-950 p-4 sm:p-6 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 max-h-[500px]">
                  <pre>{dockerComposeCode}</pre>
                </div>
              </div>
            )}

          </div>

        </section>
      )}

    </div>
  );
}
