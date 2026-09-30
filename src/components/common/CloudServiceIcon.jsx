import React from 'react';
import {
  Server,
  Database,
  HardDrive,
  Cpu,
  Zap,
  Globe,
  Shield,
  ShieldCheck,
  Lock,
  Activity,
  BarChart3,
  Bell,
  Layers,
  Network,
  Radio,
  FileCode,
  Box,
  Key,
  FolderGit2,
  RefreshCw,
  Archive,
  Cloud,
  Terminal,
  Bot,
  Flame,
  RadioTower,
  Eye,
  CheckCircle2,
} from 'lucide-react';

/**
 * Cloud Service SVG Icons with authentic cloud branding colors and vector icons.
 */
export default function CloudServiceIcon({ serviceId, provider = 'aws', className = 'w-6 h-6', size = 24 }) {
  const id = (serviceId || '').toLowerCase();
  const prov = (provider || 'aws').toLowerCase();

  // Custom branded SVG icons for major cloud services
  if (id.includes('ec2') || id === 'compute_vm') {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 p-2 shadow-xs ${className}`}>
        <Server className="w-full h-full text-amber-600" />
      </div>
    );
  }

  if (id.includes('lambda') || id === 'serverless_functions') {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 border border-orange-500/20 p-2 shadow-xs ${className}`}>
        <Zap className="w-full h-full text-orange-500 fill-orange-500/20" />
      </div>
    );
  }

  if (id.includes('fargate') || id.includes('ecs') || id.includes('gke') || id.includes('k8s') || id.includes('kubernetes')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 p-2 shadow-xs ${className}`}>
        <Box className="w-full h-full text-blue-600" />
      </div>
    );
  }

  if (id.includes('app_runner') || id.includes('cloud_run') || id.includes('render') || id.includes('app_service')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 border border-teal-500/20 p-2 shadow-xs ${className}`}>
        <Flame className="w-full h-full text-teal-600" />
      </div>
    );
  }

  if (id.includes('aurora') || id.includes('rds') || id.includes('postgres') || id.includes('mysql') || id.includes('cloud_sql')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 p-2 shadow-xs ${className}`}>
        <Database className="w-full h-full text-indigo-600" />
      </div>
    );
  }

  if (id.includes('dynamodb') || id.includes('cosmos') || id.includes('firestore') || id.includes('mongodb')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 p-2 shadow-xs ${className}`}>
        <Layers className="w-full h-full text-emerald-600" />
      </div>
    );
  }

  if (id.includes('redis') || id.includes('elasticache') || id.includes('upstash') || id.includes('memcached')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20 p-2 shadow-xs ${className}`}>
        <Activity className="w-full h-full text-rose-600" />
      </div>
    );
  }

  if (id.includes('s3') || id.includes('gcs') || id.includes('blob') || id.includes('r2') || id.includes('object_storage')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 border border-sky-500/20 p-2 shadow-xs ${className}`}>
        <HardDrive className="w-full h-full text-sky-600" />
      </div>
    );
  }

  if (id.includes('ebs') || id.includes('disk') || id.includes('block_storage')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-slate-700/10 text-slate-700 border border-slate-700/20 p-2 shadow-xs ${className}`}>
        <HardDrive className="w-full h-full text-slate-700" />
      </div>
    );
  }

  if (id.includes('efs') || id.includes('filestore') || id.includes('nfs')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-700 border border-blue-600/20 p-2 shadow-xs ${className}`}>
        <FolderGit2 className="w-full h-full text-blue-700" />
      </div>
    );
  }

  if (id.includes('cloudfront') || id.includes('cdn') || id.includes('cloudflare')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 p-2 shadow-xs ${className}`}>
        <Globe className="w-full h-full text-amber-600" />
      </div>
    );
  }

  if (id.includes('vpc') || id.includes('network') || id.includes('subnet') || id.includes('nat')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/20 p-2 shadow-xs ${className}`}>
        <Network className="w-full h-full text-purple-600" />
      </div>
    );
  }

  if (id.includes('alb') || id.includes('elb') || id.includes('load_balancer')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 p-2 shadow-xs ${className}`}>
        <Radio className="w-full h-full text-cyan-600" />
      </div>
    );
  }

  if (id.includes('route53') || id.includes('dns') || id.includes('ip')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 p-2 shadow-xs ${className}`}>
        <RadioTower className="w-full h-full text-indigo-600" />
      </div>
    );
  }

  if (id.includes('waf') || id.includes('shield') || id.includes('ddos') || id.includes('security')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-red-500/10 text-red-600 border border-red-500/20 p-2 shadow-xs ${className}`}>
        <ShieldCheck className="w-full h-full text-red-600" />
      </div>
    );
  }

  if (id.includes('secret') || id.includes('vault') || id.includes('kms') || id.includes('encryption')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-700 border border-yellow-500/20 p-2 shadow-xs ${className}`}>
        <Key className="w-full h-full text-yellow-600" />
      </div>
    );
  }

  if (id.includes('backup') || id.includes('snapshot') || id.includes('recovery')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 p-2 shadow-xs ${className}`}>
        <RefreshCw className="w-full h-full text-emerald-600" />
      </div>
    );
  }

  if (id.includes('cloudwatch') || id.includes('datadog') || id.includes('prometheus') || id.includes('grafana') || id.includes('monitoring')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 border border-violet-500/20 p-2 shadow-xs ${className}`}>
        <BarChart3 className="w-full h-full text-violet-600" />
      </div>
    );
  }

  if (id.includes('sentry') || id.includes('tracing') || id.includes('opentelemetry') || id.includes('logging')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-pink-500/10 text-pink-600 border border-pink-500/20 p-2 shadow-xs ${className}`}>
        <Eye className="w-full h-full text-pink-600" />
      </div>
    );
  }

  if (id.includes('pagerduty') || id.includes('alert') || id.includes('notification')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 p-2 shadow-xs ${className}`}>
        <Bell className="w-full h-full text-amber-600" />
      </div>
    );
  }

  if (id.includes('ai') || id.includes('bedrock') || id.includes('vertex') || id.includes('openai')) {
    return (
      <div className={`flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/20 p-2 shadow-xs ${className}`}>
        <Bot className="w-full h-full text-purple-600" />
      </div>
    );
  }

  // Fallback cloud service icon
  return (
    <div className={`flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20 p-2 shadow-xs ${className}`}>
      <Cloud className="w-full h-full text-blue-600" />
    </div>
  );
}
