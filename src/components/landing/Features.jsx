import React from 'react';
import {
  Cpu,
  Database,
  HardDrive,
  Zap,
  ShieldCheck,
  FileCode2,
  BarChart3,
  Network,
  Settings2,
  Sparkles,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const FEATURES = [
  {
    icon: Cpu,
    title: 'Compute Sizing',
    description: 'EC2, Azure VMs, and GCP Compute Engine instance matching with vCPU, RAM, and IOPS analysis.',
    accent: 'from-emerald-500/10 to-emerald-600/5',
  },
  {
    icon: Database,
    title: 'Database Advisor',
    description: 'RDS, Aurora Serverless v2, DynamoDB, and Redis recommendations based on connections and read/write ratios.',
    accent: 'from-emerald-400/10 to-teal-500/5',
  },
  {
    icon: HardDrive,
    title: 'Storage Optimizer',
    description: 'S3 tiering (Standard, Intelligent-Tiering, Glacier) and EBS volume sizing with gp3 vs io2 comparison.',
    accent: 'from-teal-500/10 to-emerald-500/5',
  },
  {
    icon: Zap,
    title: 'Serverless Calculator',
    description: 'Lambda vs ECS Fargate vs App Runner vs Cloud Run — matched to your concurrency and execution duration.',
    accent: 'from-emerald-500/10 to-green-500/5',
  },
  {
    icon: ShieldCheck,
    title: 'Rule Engine',
    description: 'Customizable heuristic rules with real-time toggling. Add your own conditions and scoring weights.',
    accent: 'from-emerald-600/10 to-emerald-400/5',
  },
  {
    icon: FileCode2,
    title: 'Terraform Generator',
    description: 'One-click HCL export for VPC, subnets, security groups, ALB, Auto Scaling, and RDS blocks.',
    accent: 'from-green-500/10 to-emerald-500/5',
  },
  {
    icon: BarChart3,
    title: 'Health Scores',
    description: 'Radar-style scoring for cost, performance, reliability, security, and scalability dimensions.',
    accent: 'from-emerald-400/10 to-emerald-600/5',
  },
  {
    icon: Network,
    title: 'Architecture Diagrams',
    description: 'Visual topology showing Route 53 → ALB → Auto Scaling → Multi-AZ RDS → CloudWatch flow.',
    accent: 'from-teal-400/10 to-emerald-500/5',
  },
  {
    icon: Settings2,
    title: 'Instance Catalog',
    description: 'Searchable table of 50+ cloud instance specs with family, vCPU, RAM, network, and pricing data.',
    accent: 'from-emerald-500/10 to-emerald-700/5',
  },
  {
    icon: Sparkles,
    title: 'Quick Presets',
    description: 'Pre-configured profiles for E-Commerce, Microservice API, AI/ML Inference, and Low-Cost MVP workloads.',
    accent: 'from-emerald-400/10 to-green-400/5',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              Features
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything you need to make infrastructure decisions
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={(i % 5) * 60}>
              <div
                className={`group relative p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br ${feature.accent} hover:border-emerald-500/25 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5`}
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
