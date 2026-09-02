import React, { useState } from 'react';
import { CheckCircle2, Square, CheckSquare, Shield } from 'lucide-react';

export default function DeploymentChecklist() {
  const [checkedItems, setCheckedItems] = useState({
    item1: true,
    item2: true,
    item3: false,
    item4: true,
    item5: false
  });

  const toggleItem = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const items = [
    { id: 'item1', label: 'AWS IAM Role Attached', desc: 'Ensure no root API keys are hardcoded in application source code.' },
    { id: 'item2', label: 'EBS Volume KMS Encryption Enabled', desc: 'Verify all persistent disk devices use AES-256 KMS encryption.' },
    { id: 'item3', label: 'CloudWatch Budget Alarm Configured', desc: 'Set up an automated notification when spending exceeds target forecast.' },
    { id: 'item4', label: 'SSL/TLS HTTPS Certificate Installed', desc: 'Verify TLS 1.3 certificate attached to Application Load Balancer.' },
    { id: 'item5', label: 'Automated Database Snapshot Policy', desc: 'Configure daily automated Multi-AZ backups with 30-day retention.' }
  ];

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
            PRE-LAUNCH READINESS
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
            <Shield className="w-5 h-5 text-blue-600" />
            Production Deployment Readiness Checklist
          </h3>
        </div>

        <span className="px-3.5 py-1 text-xs font-mono rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
          {completedCount} / {items.length} Ready
        </span>
      </div>

      <div className="space-y-3">
        {items.map(item => {
          const isChecked = checkedItems[item.id];
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-blue-50/50 border-blue-300 text-slate-900 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="text-blue-600 shrink-0 mt-0.5">
                {isChecked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-slate-400" />}
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900">{item.label}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 font-normal">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
