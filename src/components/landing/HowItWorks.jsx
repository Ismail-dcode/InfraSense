import React from 'react';
import { Cpu, Database, HardDrive, Zap, ArrowRight, Layers, Sliders, FileCode2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const LOOP_CARDS = [
  {
    step: '01',
    icon: Cpu,
    category: 'compute',
    title: 'Compute Sizing',
    description: 'EC2, Azure VMs, and GCP Compute Engine instance matching with vCPU, RAM, and IOPS analysis.',
    tag: 'Virtual Servers',
  },
  {
    step: '02',
    icon: Database,
    category: 'database',
    title: 'Database Advisor',
    description: 'RDS, Aurora Serverless v2, DynamoDB, and Redis recommendations based on connections and IOPS.',
    tag: 'Managed DBs',
  },
  {
    step: '03',
    icon: HardDrive,
    category: 'storage',
    title: 'Storage Optimizer',
    description: 'S3 tiering (Standard, Intelligent, Glacier) and EBS volume sizing with gp3 vs io2 comparison.',
    tag: 'Object & Block',
  },
  {
    step: '04',
    icon: Zap,
    category: 'serverless',
    title: 'Serverless & IaC',
    description: 'Lambda vs ECS Fargate vs App Runner — plus one-click copyable Terraform HCL exports.',
    tag: 'Zero-Server',
  },
];

export default function HowItWorks({ onSelectCategory }) {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Taplio Style) */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest block mb-2">
              ONE ENGINE, THE WHOLE CLOUD STACK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              You bring the requirements. <br className="hidden sm:block" />
              <span className="gradient-text-blue">InfraSense handles the growth.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Most tools hand you a blank form and wish you luck. InfraSense guides you through every step — so sizing cloud infrastructure finally feels easy.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Loop Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {LOOP_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.step} delay={i * 80}>
                <div
                  onClick={() => onSelectCategory && onSelectCategory(card.category)}
                  className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer hover:-translate-y-1"
                >
                  <div>
                    {/* Top Row: Icon & Step Number */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                        {card.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Explore Link */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {card.tag}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
