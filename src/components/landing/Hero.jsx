import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Server,
  Database,
  HardDrive,
  Zap,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Search,
  Code2,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const PROMPT_SUGGESTIONS = [
  {
    label: '🚀 High-Traffic Web App',
    text: 'Production Next.js & Node.js API with 50k visitors/day and load balancing',
    preset: { vcpu: 4, ram: 16, workload: 'general_web', provider: 'aws', budgetPriority: 'balanced' },
  },
  {
    label: '🐘 PostgreSQL Database',
    text: 'Mission-critical database with 64GB RAM, 20,000 IOPS and Multi-AZ replication',
    preset: { vcpu: 8, ram: 64, workload: 'relational_db', provider: 'aws', budgetPriority: 'performance' },
  },
  {
    label: '🧠 AI / ML Inference',
    text: 'PyTorch deep learning model server with GPU acceleration and high NVMe storage',
    preset: { vcpu: 4, ram: 16, workload: 'ai_ml_inference', provider: 'aws', budgetPriority: 'performance' },
  },
  {
    label: '💵 Low-Cost MVP',
    text: 'Cost-optimized starter server under $20/month for development & testing',
    preset: { vcpu: 2, ram: 4, workload: 'general_web', provider: 'all', budgetPriority: 'cost' },
  },
];

const ROTATING_PROMPTS = [
  'Size a high-availability microservices cluster on AWS with Multi-AZ...',
  'Find the best PostgreSQL database server for 20,000 IOPS...',
  'Recommend the cheapest 8-core, 32GB RAM VM across AWS, Azure, and GCP...',
  'Generate Terraform code for an Auto Scaling web tier behind an ALB...',
  'Compare AWS Lambda vs ECS Fargate for background worker jobs...',
];

export default function Hero({ onLaunchConsole }) {
  const [promptText, setPromptText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter effect for prompt placeholder
  useEffect(() => {
    const currentTarget = ROTATING_PROMPTS[placeholderIndex];
    let charIndex = 0;
    setDisplayedPlaceholder('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (charIndex <= currentTarget.length) {
        setDisplayedPlaceholder(currentTarget.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
        }, 2400);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [placeholderIndex]);

  const handleLaunch = (preset) => {
    if (onLaunchConsole) {
      onLaunchConsole(preset);
    }
  };

  return (
    <section className="relative pt-8 pb-20 sm:pt-14 sm:pb-28 overflow-hidden">
      {/* Background Soft Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-1/4 w-[500px] h-[350px] bg-blue-400/15 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute top-[-5%] right-1/4 w-[450px] h-[350px] bg-indigo-400/15 rounded-full blur-[100px] animate-float-slow-reverse" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Floating Pill Badge */}
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blue-200/80 shadow-sm text-blue-700 text-xs font-semibold mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>AI-Powered Cloud Infrastructure Decision Engine</span>
          </div>
        </ScrollReveal>

        {/* Hero Main Headline */}
        <ScrollReveal delay={80}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] tracking-tight max-w-4xl mx-auto">
            Let AI size your next <br className="hidden sm:block" />
            <span className="gradient-text-blue">cloud architecture</span> with InfraSense
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={140}>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Describe your workload requirements. InfraSense evaluates vCPU, memory, database, and storage specs across AWS, Azure & GCP — returning ranked instance matches with instant Terraform IaC.
          </p>
        </ScrollReveal>

        {/* Interactive Prompt Search Card (Taplio Style) */}
        <ScrollReveal delay={200}>
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 shadow-xl shadow-blue-500/10">
              <div className="bg-white rounded-[22px] p-4 sm:p-5 text-left space-y-4">
                
                {/* Input Area */}
                <div className="relative min-h-[56px] flex items-start">
                  <textarea
                    rows="2"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder={displayedPlaceholder || 'Describe your cloud workload...'}
                    className="w-full text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none bg-transparent"
                  />
                  {isTyping && !promptText && (
                    <span className="inline-block w-0.5 h-4 bg-blue-600 animate-blink ml-0.5 mt-0.5" />
                  )}
                </div>

                {/* Bottom Row Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 text-slate-600 text-xs font-semibold border border-slate-200/60">
                      <Cpu className="w-3.5 h-3.5 text-blue-600" />
                      <span>Workload Sizing</span>
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                      <Code2 className="w-3 h-3 text-blue-600" />
                      <span>Terraform HCL</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunch()}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Generate Architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              {PROMPT_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setPromptText(sug.text);
                    handleLaunch(sug.preset);
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white/90 hover:bg-white hover:text-blue-600 border border-slate-200/80 shadow-sm transition-all hover:border-blue-300 hover:shadow"
                >
                  {sug.label}
                </button>
              ))}
            </div>

            {/* Micro Trust Guarantee */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 mt-6">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% Free & Open Source · No credit card required · Instant Terraform Export</span>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
