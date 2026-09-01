import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { scrollToSection } from '../../hooks/useScrollReveal';
import ScrollReveal from './ScrollReveal';

export default function CallToAction() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-[#0a0f18] to-emerald-600/5 p-10 sm:p-16 text-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Free & Open Source
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
                Ready to size your next cloud deployment?
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto">
                No sign-up. No API keys. Open the calculator, define your workload, and get
                ranked recommendations with Terraform exports in seconds.
              </p>

              <button
                onClick={() => scrollToSection('product')}
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold bg-emerald-500 hover:bg-emerald-400 text-[#07090e] transition-all hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5"
              >
                Open InfraSense Calculator
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
