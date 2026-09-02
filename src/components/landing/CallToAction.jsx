import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function CallToAction({ onLaunchConsole }) {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-8 sm:p-14 lg:p-16 text-center text-white shadow-2xl shadow-blue-500/25">
            {/* Soft Ambient Shapes */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-sky-400/15 blur-3xl pointer-events-none" />

            <div className="relative max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 text-white text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free & Open Source</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to size your next cloud deployment?
              </h2>

              <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed font-normal">
                No sign-up. No credit card. Open the calculator, define your workload, and get ranked recommendations with Terraform exports in seconds.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onLaunchConsole && onLaunchConsole()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-blue-900 bg-white hover:bg-blue-50 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Open InfraSense Calculator</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 text-xs text-blue-100 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-300" />
                  No Account Required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-300" />
                  Multi-Cloud (AWS/Azure/GCP)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-300" />
                  Instant Terraform HCL
                </span>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
