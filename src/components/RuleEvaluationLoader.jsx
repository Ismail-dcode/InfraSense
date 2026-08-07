import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, Sparkles, Server, Loader2 } from 'lucide-react';

const EVALUATION_STEPS = [
  '🔍 Analyzing vCPU cores, RAM memory & storage specs...',
  '🛡️ Testing inputs against 6 active backend rules...',
  '⚡ Evaluating hardware ratios across AWS EC2, Azure & GCP...',
  '📊 Calculating monthly cost estimates and match fit scores...',
  '✨ Finalizing optimal cloud server recommendation...'
];

export default function RuleEvaluationLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < EVALUATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 240);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto glass-panel p-12 text-center space-y-8 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-500/10 animate-fadeIn">
      
      {/* High-tech pulsing loader spinner */}
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-indigo-500/20 border-b-indigo-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <div className="w-full h-full rounded-full flex items-center justify-center bg-slate-950">
          <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block">
          RULE ENGINE IN PROGRESS
        </span>
        <h3 className="text-2xl font-extrabold text-white">
          Evaluating Backend Rules & Server Datasets...
        </h3>
        <p className="text-sm font-mono text-cyan-300 h-6 transition-all">
          {EVALUATION_STEPS[currentStep]}
        </p>
      </div>

      {/* Animated step dots */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {EVALUATION_STEPS.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx <= currentStep ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
