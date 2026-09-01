import React from 'react';
import {
  Target,
  Layers,
  Shield,
  FileCode2,
  BarChart3,
  Globe,
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const CAPABILITIES = [
  {
    icon: Target,
    title: 'Workload-Aware Sizing',
    description:
      'Input vCPU, RAM, storage IOPS, and traffic patterns. InfraSense maps your requirements to the right instance families across AWS, GCP, and Azure.',
  },
  {
    icon: Layers,
    title: 'Multi-Category Coverage',
    description:
      'Size virtual servers, managed databases, object storage, and serverless compute from a single platform — no switching between calculators.',
  },
  {
    icon: Shield,
    title: 'Enterprise Hardening Options',
    description:
      'Toggle Multi-AZ, encryption at rest, CloudWatch monitoring, and load balancer requirements to see how they affect your architecture recommendations.',
  },
  {
    icon: FileCode2,
    title: 'Terraform IaC Export',
    description:
      'Generate production-ready HCL configurations for VPC, EC2, ALB, Auto Scaling, and RDS — ready to copy into your infrastructure repo.',
  },
  {
    icon: BarChart3,
    title: 'Infrastructure Health Scores',
    description:
      'Get scored insights on cost efficiency, performance, reliability, security, and scalability before you deploy a single resource.',
  },
  {
    icon: Globe,
    title: 'Multi-Cloud Comparison',
    description:
      'Compare recommendations across AWS, Azure, and GCP with budget priority controls — optimize for lowest cost or maximum performance.',
  },
];

export default function ProductDetails() {
  return (
    <section id="product-details" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">
              What is InfraSense
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              The cloud sizing problem,{' '}
              <span className="gradient-text-emerald">solved systematically</span>
            </h2>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed">
              Choosing the right cloud resources is one of the hardest parts of infrastructure
              design. Over-provision and you waste budget. Under-provision and your app falls
              over. InfraSense applies a heuristic rule engine to your workload inputs and
              returns ranked, justified recommendations — not guesswork.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={i * 80}>
              <div className="glass-panel glass-panel-hover p-6 h-full group">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/15 transition-colors">
                  <cap.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
