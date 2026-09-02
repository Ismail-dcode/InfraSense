import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, Sparkles, Server, Loader2 } from 'lucide-react';

const EVALUATION_STEPS = [
  '🔍 Analyzing vCPU cores, RAM memory & storage specs...',
  '🛡️ Testing inputs against active backend rules across AWS, Azure & GCP...',
  '⚡ Evaluating hardware ratios across AWS EC2, Azure & GCP...',
  '📊 Calculating monthly cost estimates and match fit scores...',
  '✨ Finalizing optimal cloud server recommendation...'
];

export default function RuleEvaluationLoader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < EVALUATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 220);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white border-2 border-blue-400 rounded-3xl p-10 sm:p-12 text-center space-y-6 shadow-xl shadow-blue-500/10 animate-fadeIn">
      
      {/* High-tech pulsing loader spinner */}
      <div className="relative w-18 h-18 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-indigo-100 border-b-indigo-600 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.4s' }} />
        <div className="w-full h-full rounded-full flex items-center justify-center bg-blue-50">
          <Cpu className="w-7 h-7 text-blue-600 animate-pulse" />
        </div>
      </div>

      <div className="space-y-1.5">
        <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
          RULE ENGINE IN PROGRESS
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Evaluating Backend Rules & Datasets...
        </h3>
        <p className="text-xs sm:text-sm font-mono text-blue-600 h-6 transition-all font-semibold">
          {EVALUATION_STEPS[currentStep]}
        </p>
      </div>

      {/* Animated step dots */}
      <div className="flex items-center justify-center gap-2 pt-2">
        {EVALUATION_STEPS.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx <= currentStep ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
