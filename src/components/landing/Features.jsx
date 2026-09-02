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
    tag: 'Compute',
  },
  {
    icon: Database,
    title: 'Database Advisor',
    description: 'RDS, Aurora Serverless v2, DynamoDB, and Redis recommendations based on connections and IOPS.',
    tag: 'Database',
  },
  {
    icon: HardDrive,
    title: 'Storage Optimizer',
    description: 'S3 tiering (Standard, Intelligent, Glacier) and EBS volume sizing with gp3 vs io2 comparison.',
    tag: 'Storage',
  },
  {
    icon: Zap,
    title: 'Serverless Calculator',
    description: 'Lambda vs ECS Fargate vs App Runner vs Cloud Run — matched to your concurrency and execution.',
    tag: 'Serverless',
  },
  {
    icon: ShieldCheck,
    title: 'Rule Engine',
    description: 'Customizable heuristic rules with real-time toggling. Add your own conditions and scoring weights.',
    tag: 'Rules',
  },
  {
    icon: FileCode2,
    title: 'Terraform Generator',
    description: 'One-click HCL export for VPC, subnets, security groups, ALB, Auto Scaling, and RDS blocks.',
    tag: 'IaC',
  },
  {
    icon: BarChart3,
    title: 'Health Scores',
    description: 'Radar-style scoring for cost, performance, reliability, security, and scalability dimensions.',
    tag: 'Health',
  },
  {
    icon: Network,
    title: 'Architecture Diagrams',
    description: 'Visual topology showing Route 53 → ALB → Auto Scaling → Multi-AZ RDS → CloudWatch flow.',
    tag: 'Topology',
  },
  {
    icon: Settings2,
    title: 'Instance Catalog',
    description: 'Searchable table of 50+ cloud instance specs with family, vCPU, RAM, network, and pricing data.',
    tag: 'Catalog',
  },
  {
    icon: Sparkles,
    title: 'Quick Presets',
    description: 'Pre-configured profiles for E-Commerce, Microservice API, AI/ML Inference, and Low-Cost MVP workloads.',
    tag: 'Presets',
  },
];

export default function Features() {
  return (
    <section className="relative py-20 sm:py-28 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold font-mono text-blue-600 uppercase tracking-widest block mb-2">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need to make infrastructure decisions
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              A comprehensive toolkit for cloud architects, developers, and DevOps engineers.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={(i % 5) * 60}>
              <div
                className="group relative p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 h-full hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-100">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
