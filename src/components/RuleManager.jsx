import React, { useState } from 'react';
import { ShieldCheck, ToggleLeft, ToggleRight, Plus, Info, Sparkles, Code2, X } from 'lucide-react';

export default function RuleManager({ rules, onToggleRule, onAddCustomRule }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCategory, setNewRuleCategory] = useState('Custom Rule');
  const [newRuleDesc, setNewRuleDesc] = useState('');
  const [newRuleWeight, setNewRuleWeight] = useState(25);
  const [newRuleTargetFamily, setNewRuleTargetFamily] = useState('memory');

  const handleAddRuleSubmit = (e) => {
    e.preventDefault();
    if (!newRuleName || !newRuleDesc) return;

    const customRule = {
      id: `custom-rule-${Date.now()}`,
      name: newRuleName,
      category: newRuleCategory,
      enabled: true,
      severity: 'info',
      description: newRuleDesc,
      condition: () => true,
      applyWeight: (instance) => {
        if (instance.familyCategory === newRuleTargetFamily) return newRuleWeight;
        return 0;
      },
      reason: `Custom User Rule Triggered: ${newRuleDesc}`
    };

    onAddCustomRule(customRule);
    setShowAddModal(false);
    setNewRuleName('');
    setNewRuleDesc('');
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 space-y-6 shadow-sm">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            Backend Recommendation Rule Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Turn recommendation rules on or off, or create your own custom heuristic rule logic.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Rule</span>
        </button>
      </div>

      {/* Rules List */}
      <div className="space-y-3.5">
        {rules.map(rule => (
          <div
            key={rule.id}
            className={`p-5 rounded-2xl border transition-all ${
              rule.enabled
                ? 'bg-slate-50/70 border-slate-200 hover:border-blue-300'
                : 'bg-slate-50/30 border-slate-200/60 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">{rule.name}</h3>
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-white text-slate-700 border border-slate-200 shadow-xs font-semibold">
                    {rule.category}
                  </span>
                  {rule.severity === 'important' && (
                    <span className="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-bold">
                      HIGH PRIORITY
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{rule.description}</p>
                <div className="pt-1 flex items-center gap-1.5 text-xs font-mono text-blue-600">
                  <Code2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Rule Logic: {rule.reason}</span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => onToggleRule(rule.id)}
                className="p-1 text-blue-600 hover:text-blue-700 transition-colors shrink-0 cursor-pointer"
                aria-label={`Toggle ${rule.name}`}
              >
                {rule.enabled ? (
                  <ToggleRight className="w-8 h-8 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-400" />
                )}
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Define New Custom Rule
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddRuleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Prefer Memory-Heavy Clusters"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Instance Family</label>
                <select
                  value={newRuleTargetFamily}
                  onChange={(e) => setNewRuleTargetFamily(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                >
                  <option value="general">General Purpose (AWS M6i/T3, Azure D/B, GCP E2/N2)</option>
                  <option value="memory">Memory Optimized (AWS R6i, Azure E, GCP N2 HighMem)</option>
                  <option value="compute">Compute Optimized (AWS C6i, Azure F, GCP C2)</option>
                  <option value="storage">Storage / NVMe SSD (AWS gp3/io2, Azure L, GCP N2D SSD)</option>
                  <option value="gpu">GPU / Accelerated AI (AWS G4dn, Azure NC, GCP G2)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Score Boost (+Score)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={newRuleWeight}
                  onChange={(e) => setNewRuleWeight(parseInt(e.target.value) || 25)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono text-blue-700 font-bold focus:outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rule Explanation</label>
                <textarea
                  placeholder="Explain why this rule applies to your server recommendation..."
                  value={newRuleDesc}
                  onChange={(e) => setNewRuleDesc(e.target.value)}
                  rows="3"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-extrabold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                >
                  Save Custom Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
