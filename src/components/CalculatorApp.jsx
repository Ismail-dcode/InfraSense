import React, { useState, useMemo, useRef, useEffect } from 'react';
import ToolNavbar from './ToolNavbar';
import RequirementForm from './RequirementForm';
import RecommendationResult from './RecommendationResult';
import RuleEvaluationLoader from './RuleEvaluationLoader';
import DatabaseRecommendationView from './DatabaseRecommendationView';
import StorageRecommendationView from './StorageRecommendationView';
import ServerlessRecommendationView from './ServerlessRecommendationView';
import RuleManager from './RuleManager';
import InstanceCatalog from './InstanceCatalog';
import PresetSelector from './PresetSelector';
import { DEFAULT_RULES } from '../data/defaultRules';
import { evaluateCloudRequirements } from '../engine/ruleEngine';
import { Cpu, Database, HardDrive, Zap, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './landing/ScrollReveal';

const INITIAL_INPUT = {
  vcpu: 2,
  ram: 2,
  storageGB: 100,
  storageType: 'gp3',
  iops: 3000,
  workload: 'general_web',
  provider: 'aws',
  budgetPriority: 'balanced',
  trafficPattern: 'burstable',
  instanceCount: 1,
  questions: {
    needMonitoring: false,
    needLoadBalancer: false,
    needAutoScaling: false,
    needMultiAZ: false,
    needEncryption: false,
  },
};

const SERVICE_CATEGORIES = [
  {
    id: 'compute',
    title: 'Virtual Servers',
    subtitle: 'EC2 / VMs',
    desc: 'Instance sizing, vCPU, RAM & IOPS',
    icon: Cpu,
    color: 'from-blue-500/10 to-indigo-500/10',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
  },
  {
    id: 'database',
    title: 'Managed Databases',
    subtitle: 'RDS / Aurora',
    desc: 'RDS, Aurora, Redis & DynamoDB',
    icon: Database,
    color: 'from-indigo-500/10 to-purple-500/10',
    borderColor: 'border-indigo-500',
    textColor: 'text-indigo-600',
  },
  {
    id: 'storage',
    title: 'Cloud Storage',
    subtitle: 'S3 / EBS',
    desc: 'S3 buckets, EBS SSD & Glacier',
    icon: HardDrive,
    color: 'from-sky-500/10 to-blue-500/10',
    borderColor: 'border-sky-500',
    textColor: 'text-sky-600',
  },
  {
    id: 'serverless',
    title: 'Serverless',
    subtitle: 'Lambda / Fargate',
    desc: 'Lambda, Fargate, App Runner & Cloud Run',
    icon: Zap,
    color: 'from-blue-500/10 to-sky-500/10',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
  },
];

export default function CalculatorApp({ initialPreset, onClearInitialPreset }) {
  const [activeCategory, setActiveCategory] = useState('compute');
  const [activeTab, setActiveTab] = useState('calculator');
  const [userInput, setUserInput] = useState(INITIAL_INPUT);
  const [activeRules, setActiveRules] = useState(DEFAULT_RULES);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const resultRef = useRef(null);

  // Handle incoming initial preset from Landing Page
  useEffect(() => {
    if (initialPreset) {
      setUserInput((prev) => ({ ...prev, ...initialPreset }));
      setActiveCategory('compute');
      setActiveTab('calculator');
      handleSubmitForm();
      if (onClearInitialPreset) {
        onClearInitialPreset();
      }
    }
  }, [initialPreset, onClearInitialPreset]);

  const recommendationResult = useMemo(() => {
    return evaluateCloudRequirements(userInput, activeRules);
  }, [userInput, activeRules]);

  const handleToggleRule = (ruleId) => {
    setActiveRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleAddCustomRule = (newRule) => {
    setActiveRules((prev) => [newRule, ...prev]);
  };

  const handleSubmitForm = () => {
    setIsCalculating(true);
    setHasCalculated(false);

    setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1100);
  };

  const handleResetForm = () => {
    setUserInput(INITIAL_INPUT);
    setHasCalculated(false);
    setIsCalculating(false);
  };

  return (
    <div className="relative pb-16">
      <ToolNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPresets={() => setIsPresetModalOpen(true)}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <PresetSelector
          isOpen={isPresetModalOpen}
          onClose={() => setIsPresetModalOpen(false)}
          onSelectPreset={(presetInput) => {
            setActiveCategory('compute');
            setUserInput((prev) => ({ ...prev, ...presetInput }));
            handleSubmitForm();
          }}
        />

        {activeTab === 'calculator' && (
          <div className="space-y-8 sm:space-y-10">
            {/* Service Category Selector */}
            <ScrollReveal>
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest block">
                    Step 1 — Select Cloud Service
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    What cloud resource do you need to size?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {SERVICE_CATEGORIES.map((cat) => {
                    const isSelected = activeCategory === cat.id;
                    const IconComponent = cat.icon;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`p-4 sm:p-5 rounded-2xl text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                          isSelected
                            ? `bg-blue-50/70 border-2 ${cat.borderColor} shadow-lg shadow-blue-500/10 scale-[1.01]`
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className={`p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs ${cat.textColor}`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-sm text-slate-900">{cat.title}</h4>
                          <p className="text-[10px] font-mono font-semibold text-blue-600">{cat.subtitle}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-normal">{cat.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {activeCategory === 'compute' && (
              <div className="space-y-10">
                <RequirementForm
                  input={userInput}
                  onChange={setUserInput}
                  onSubmit={handleSubmitForm}
                  onReset={handleResetForm}
                />

                <div ref={resultRef}>
                  {isCalculating && <RuleEvaluationLoader />}

                  {!isCalculating && hasCalculated && (
                    <div className="space-y-8 animate-fadeIn">
                      <div className="text-center space-y-1">
                        <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
                          RECOMMENDATION RESULT
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                          Optimal Server Instance Blueprint
                        </h3>
                      </div>
                      <RecommendationResult result={recommendationResult} userInput={userInput} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeCategory === 'database' && <DatabaseRecommendationView />}
            {activeCategory === 'storage' && <StorageRecommendationView />}
            {activeCategory === 'serverless' && <ServerlessRecommendationView />}
          </div>
        )}

        {activeTab === 'rules' && (
          <RuleManager
            rules={activeRules}
            onToggleRule={handleToggleRule}
            onAddCustomRule={handleAddCustomRule}
          />
        )}

        {activeTab === 'catalog' && <InstanceCatalog />}
      </div>
    </div>
  );
}
