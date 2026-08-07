import React, { useState, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import RequirementForm from './components/RequirementForm';
import RecommendationResult from './components/RecommendationResult';
import RuleEvaluationLoader from './components/RuleEvaluationLoader';
import DatabaseRecommendationView from './components/DatabaseRecommendationView';
import StorageRecommendationView from './components/StorageRecommendationView';
import ServerlessRecommendationView from './components/ServerlessRecommendationView';
import RuleManager from './components/RuleManager';
import InstanceCatalog from './components/InstanceCatalog';
import PresetSelector from './components/PresetSelector';
import { DEFAULT_RULES } from './data/defaultRules';
import { evaluateCloudRequirements } from './engine/ruleEngine';
import { Sparkles, Cpu, Database, HardDrive, Zap, CheckCircle2 } from 'lucide-react';

const INITIAL_INPUT = {
  vcpu: 2,
  ram: 8,
  storageGB: 100,
  storageType: 'gp3',
  iops: 3000,
  workload: 'general_web',
  provider: 'aws',
  budgetPriority: 'balanced',
  trafficPattern: 'burstable',
  instanceCount: 1,
  questions: {
    needMonitoring: false, // Default NO
    needLoadBalancer: false, // Default NO
    needAutoScaling: false, // Default NO
    needMultiAZ: false, // Default NO
    needEncryption: false // Default NO
  }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('compute'); // 'compute' | 'database' | 'storage' | 'serverless'
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator' | 'rules' | 'catalog'
  const [userInput, setUserInput] = useState(INITIAL_INPUT);
  const [activeRules, setActiveRules] = useState(DEFAULT_RULES);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  const resultRef = useRef(null);

  // Compute recommendations dynamically
  const recommendationResult = useMemo(() => {
    return evaluateCloudRequirements(userInput, activeRules);
  }, [userInput, activeRules]);

  // Handle rule toggling
  const handleToggleRule = (ruleId) => {
    setActiveRules(prev =>
      prev.map(r => (r.id === ruleId ? { ...r, enabled: !r.enabled } : r))
    );
  };

  // Add custom user rule
  const handleAddCustomRule = (newRule) => {
    setActiveRules(prev => [newRule, ...prev]);
  };

  // Handle form submit with loader delay
  const handleSubmitForm = () => {
    setIsCalculating(true);
    setHasCalculated(false);

    setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1200);
  };

  const handleResetForm = () => {
    setUserInput(INITIAL_INPUT);
    setHasCalculated(false);
    setIsCalculating(false);
  };

  const serviceCategories = [
    {
      id: 'compute',
      title: '🖥️ Virtual Servers (EC2 / VMs)',
      desc: 'EC2 instance sizing, vCPU cores, RAM memory & IOPS',
      icon: Cpu,
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-400',
      textColor: 'text-cyan-300'
    },
    {
      id: 'database',
      title: '🗄️ Managed Databases',
      desc: 'AWS RDS, Aurora Serverless, Redis Cache & DynamoDB',
      icon: Database,
      color: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-400',
      textColor: 'text-indigo-300'
    },
    {
      id: 'storage',
      title: '📦 Cloud Storage & S3',
      desc: 'S3 buckets, EBS SSD hard drives & Glacier archives',
      icon: HardDrive,
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-400',
      textColor: 'text-emerald-300'
    },
    {
      id: 'serverless',
      title: '⚡ Serverless & Docker',
      desc: 'AWS Lambda, Fargate containers, App Runner & Cloud Run',
      icon: Zap,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400',
      textColor: 'text-purple-300'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-grid-pattern pb-32">
      
      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPresets={() => setIsPresetModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-10 pt-6 sm:pt-10">
        
        {/* Preset Selector Modal */}
        <PresetSelector
          isOpen={isPresetModalOpen}
          onClose={() => setIsPresetModalOpen(false)}
          onSelectPreset={(presetInput) => {
            setActiveCategory('compute');
            setUserInput(prev => ({ ...prev, ...presetInput }));
            handleSubmitForm();
          }}
        />

        {activeTab === 'calculator' && (
          <div className="space-y-8 sm:space-y-12">
            
            {/* Hero Banner Header Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5 pt-2 sm:pt-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] sm:text-xs font-bold font-mono">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                AI CLOUD RESOURCE RECOMMENDATION SYSTEM
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight px-2">
                Find the <span className="gradient-text">Perfect Cloud Resource</span> for Your Workload
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-medium px-2">
                Select a cloud service category below to calculate exact server sizes, managed database specs, object storage costs, and serverless architectures.
              </p>
            </div>

            {/* PROMINENT SERVICE SELECTOR CARDS (Placed directly after Hero section) */}
            <div className="space-y-4 pt-2">
              <div className="text-center space-y-1">
                <span className="text-[10px] sm:text-xs font-mono font-extrabold text-cyan-400 uppercase tracking-widest block">
                  STEP 1 • SELECT CLOUD SERVICE TYPE
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">What cloud resource do you need help with?</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {serviceCategories.map(cat => {
                  const isSelected = activeCategory === cat.id;
                  const IconComponent = cat.icon;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between space-y-3 sm:space-y-4 ${
                        isSelected
                          ? `bg-gradient-to-br ${cat.color} ${cat.borderColor} shadow-2xl scale-[1.01]`
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-950 border border-slate-800 ${cat.textColor}`}>
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        {isSelected && (
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-extrabold text-sm sm:text-base text-white">{cat.title}</h3>
                        <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed font-medium">{cat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Category 1: Virtual Compute Servers */}
            {activeCategory === 'compute' && (
              <div className="space-y-12 pt-4">
                <RequirementForm
                  input={userInput}
                  onChange={setUserInput}
                  onSubmit={handleSubmitForm}
                  onReset={handleResetForm}
                />

                {/* Result Showcase Section */}
                <div ref={resultRef} className="pt-4">
                  {isCalculating && (
                    <RuleEvaluationLoader />
                  )}

                  {!isCalculating && hasCalculated && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                          RECOMMENDATION RESULT
                        </span>
                        <h2 className="text-3xl font-extrabold text-white">Suggested Server Instance Architecture</h2>
                      </div>

                      <RecommendationResult
                        result={recommendationResult}
                        userInput={userInput}
                      />
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Category 2: Managed Cloud Databases */}
            {activeCategory === 'database' && (
              <div className="pt-4">
                <DatabaseRecommendationView />
              </div>
            )}

            {/* Category 3: Cloud Storage & S3 */}
            {activeCategory === 'storage' && (
              <div className="pt-4">
                <StorageRecommendationView />
              </div>
            )}

            {/* Category 4: Serverless & Containers */}
            {activeCategory === 'serverless' && (
              <div className="pt-4">
                <ServerlessRecommendationView />
              </div>
            )}

          </div>
        )}

        {activeTab === 'rules' && (
          <RuleManager
            rules={activeRules}
            onToggleRule={handleToggleRule}
            onAddCustomRule={handleAddCustomRule}
          />
        )}

        {activeTab === 'catalog' && (
          <InstanceCatalog />
        )}

      </main>
    </div>
  );
}
