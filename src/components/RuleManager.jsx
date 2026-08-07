import React, { useState } from 'react';
import { ShieldCheck, ToggleLeft, ToggleRight, Plus, Info, Sparkles, Code2 } from 'lucide-react';

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
      condition: () => true, // custom rule active
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
    <div className="glass-panel p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            Backend Recommendation Rule Manager
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Turn recommendation rules on or off, or create your own custom rule logic.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Rule</span>
        </button>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map(rule => (
          <div
            key={rule.id}
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              rule.enabled
                ? 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/40'
                : 'bg-slate-950/40 border-slate-900 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between gap-6">
              
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-base text-slate-100">{rule.name}</h3>
                  <span className="px-3 py-1 text-[11px] font-mono rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                    {rule.category}
                  </span>
                  {rule.severity === 'important' && (
                    <span className="px-3 py-1 text-[11px] font-mono rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">
                      HIGH PRIORITY
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{rule.description}</p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-400/90">
                  <Code2 className="w-4 h-4 text-slate-500" />
                  <span>Rule Logic: {rule.reason}</span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => onToggleRule(rule.id)}
                className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
              >
                {rule.enabled ? (
                  <ToggleRight className="w-9 h-9 text-cyan-400" />
                ) : (
                  <ToggleLeft className="w-9 h-9 text-slate-600" />
                )}
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel w-full max-w-lg p-7 border border-slate-700 shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Define New Custom Rule
            </h3>

            <form onSubmit={handleAddRuleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rule Name</label>
                <input
                  type="text"
                  placeholder="e.g. Prefer High Memory Servers"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Instance Family</label>
                <select
                  value={newRuleTargetFamily}
                  onChange={(e) => setNewRuleTargetFamily(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="general">General Purpose (M6i / T3)</option>
                  <option value="memory">Memory Optimized (R6i / E-series)</option>
                  <option value="compute">Compute Optimized (C6i)</option>
                  <option value="storage">Storage / Local NVMe SSD (I3en)</option>
                  <option value="gpu">GPU / Accelerated AI (G4dn)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Score Boost (+Score)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={newRuleWeight}
                  onChange={(e) => setNewRuleWeight(parseInt(e.target.value) || 25)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rule Explanation</label>
                <textarea
                  placeholder="Explain why this rule applies to your server recommendation..."
                  value={newRuleDesc}
                  onChange={(e) => setNewRuleDesc(e.target.value)}
                  rows="3"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-extrabold bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 transition-colors"
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
