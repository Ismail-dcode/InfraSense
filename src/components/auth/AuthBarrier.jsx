import React from 'react';
import {
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Terminal,
  LogIn,
  UserPlus,
  Layers,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function AuthBarrier({ onOpenAuth }) {
  const { openAuthModal } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="relative p-[2px] rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400 shadow-2xl shadow-blue-500/15">
        <div className="bg-white rounded-[22px] p-8 sm:p-14 text-center">
          
          {/* Lock & Sparkle Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-6 border border-blue-100 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sign In to Access the <br className="hidden sm:inline" />
            <span className="gradient-text-blue">InfraSense Cloud Console</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Create an account or sign in with your username / email to access the full decision engine, live pricing algorithms, multi-cloud cost benchmarks, and instant Terraform IaC generation.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-8 mb-8 text-left">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instance Matcher</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Ranked compute specs for AWS, Azure & GCP with real-time score ranking.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Terraform Export</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Production-ready HCL infrastructure code generated for your exact stack.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900 mb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Multi-Cloud Sizing</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                Database, compute, storage, and serverless architectural sizing.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openAuthModal('register')}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs sm:text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 shadow-sm transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Database className="w-3.5 h-3.5 text-blue-500" />
            <span>MongoDB Atlas Secured · Rotating Key Support · Quick Setup</span>
          </div>

        </div>
      </div>
    </div>
  );
}
