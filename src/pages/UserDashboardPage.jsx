import React, { useState, useEffect, useMemo } from 'react';
import {
  Bookmark,
  FolderKanban,
  Trash2,
  Download,
  ExternalLink,
  Sparkles,
  Server,
  DollarSign,
  Zap,
  Wrench,
  Clock,
  Search,
  CheckCircle2,
  FileCode,
  Copy,
  Check,
  ArrowRight,
  Shield,
  Layers,
  Calendar,
  Eye,
  Plus,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { TABS } from '../hooks/useAppTabs';
import { getUserReports, deleteUserReport, clearAllUserReports } from '../utils/reportStorage';
import CloudServiceIcon from '../components/common/CloudServiceIcon';

export default function UserDashboardPage({ onNavigate, onLoadReport }) {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'services' | 'compute'
  const [previewTerraformReport, setPreviewTerraformReport] = useState(null);
  const [copiedTf, setCopiedTf] = useState(false);

  const userId = user?._id || user?.username || 'demo_user';

  const loadReports = () => {
    const list = getUserReports(userId);
    setReports(list);
  };

  useEffect(() => {
    loadReports();
  }, [userId]);

  const handleDelete = (reportId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this saved report?')) {
      const updated = deleteUserReport(userId, reportId);
      setReports(updated);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all your saved reports?')) {
      clearAllUserReports(userId);
      setReports([]);
    }
  };

  const handleCopyTerraform = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedTf(true);
    setTimeout(() => setCopiedTf(false), 2000);
  };

  const handleDownloadReport = (report, e) => {
    e.stopPropagation();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `infrasense-report-${report.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleOpenReportInConsole = (report) => {
    if (onLoadReport) {
      onLoadReport(report);
    }
    if (report.type === 'compute') {
      onNavigate(TABS.CONSOLE);
    } else {
      onNavigate(TABS.SERVICES);
    }
  };

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesSearch =
        (r.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.strategyName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.summary || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType =
        filterType === 'all' ||
        (filterType === 'services' && r.type !== 'compute') ||
        (filterType === 'compute' && r.type === 'compute');

      return matchesSearch && matchesType;
    });
  }, [reports, searchQuery, filterType]);

  // Aggregate statistics
  const totalCostEstimate = useMemo(() => {
    return reports.reduce((sum, r) => sum + (Number(r.estimatedMonthlyCost) || 0), 0);
  }, [reports]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f8faff] pb-16">
      
      {/* Dashboard Top Banner */}
      <div className="border-b border-slate-200/80 bg-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-100 uppercase">
                  USER DASHBOARD
                </span>
                <span className="text-xs text-slate-400">· Private Cloud Repository</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Recently Saved Reports & Results
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-2xl">
                Manage, review, and reload your saved infrastructure architectures, sizing blueprints, and Terraform IaC configurations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate(TABS.SERVICES)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Architecture Blueprint</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">SAVED REPORTS</span>
              <p className="text-2xl font-black text-slate-900">{reports.length}</p>
              <span className="text-[11px] text-slate-500">Stored in your account</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">COMBINED RUN RATE</span>
              <p className="text-2xl font-black text-emerald-600">~${totalCostEstimate}<span className="text-xs text-slate-500 font-normal"> /mo</span></p>
              <span className="text-[11px] text-slate-500">Across all saved blueprints</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">PRIMARY TARGET</span>
              <p className="text-2xl font-black text-slate-900">Multi-Cloud</p>
              <span className="text-[11px] text-slate-500">AWS / GCP / Azure</span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">ACCOUNT TYPE</span>
              <p className="text-lg font-black text-slate-900 truncate max-w-[130px]">@{user?.username || 'guest'}</p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Active Session
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Filter and Search Controls */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved reports by title, strategy or stack..."
              className="w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Type Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/70">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({reports.length})
            </button>
            <button
              onClick={() => setFilterType('services')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'services'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Infra Architect ({reports.filter((r) => r.type !== 'compute').length})
            </button>
            <button
              onClick={() => setFilterType('compute')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterType === 'compute'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              VM Sizing ({reports.filter((r) => r.type === 'compute').length})
            </button>
          </div>

          {reports.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 self-end sm:self-auto cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}

        </div>

        {/* Saved Reports Grid */}
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Bookmark className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                {searchQuery ? 'No matching reports found' : 'No Saved Reports Yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchQuery
                  ? 'Try searching with different keywords or clear the filter.'
                  : 'Generate a recommendation in the Cloud Services Architect or VM Sizing Console, then click "Save Report to Dashboard".'}
              </p>
            </div>
            <button
              onClick={() => onNavigate(TABS.SERVICES)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Services Architect</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => {
              const isPerf = report.strategyId === 'performance';
              const isCost = report.strategyId === 'cost_efficient';
              const isOverhead = report.strategyId === 'minimum_overhead';

              return (
                <div
                  key={report.id}
                  onClick={() => handleOpenReportInConsole(report)}
                  className="p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4 cursor-pointer group"
                >
                  <div className="space-y-3">
                    
                    {/* Header Row: Type Badge & Date */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase border ${
                          isPerf
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : isCost
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isOverhead
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {report.strategyName || (report.type === 'compute' ? 'VM SIZING' : 'INFRA ARCHITECT')}
                      </span>

                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.dateFormatted}
                      </span>
                    </div>

                    {/* Title & Summary */}
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                        {report.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {report.summary || 'Custom cloud infrastructure configuration.'}
                      </p>
                    </div>

                    {/* Cost Box */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Estimated Cost:</span>
                      <span className="text-lg font-black text-slate-900">
                        ~${report.estimatedMonthlyCost}
                        <span className="text-xs text-slate-400 font-normal"> /mo</span>
                      </span>
                    </div>

                    {/* Services Chips */}
                    {report.services && report.services.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                          Included Services ({report.services.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {report.services.slice(0, 4).map((svc, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-700 truncate max-w-[140px]"
                            >
                              {svc.name ? svc.name.split(' ')[0] : 'Service'}
                            </span>
                          ))}
                          {report.services.length > 4 && (
                            <span className="px-1.5 py-0.5 rounded-lg text-[10px] font-medium bg-slate-100 text-slate-500">
                              +{report.services.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {report.terraformCode && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewTerraformReport(report);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Preview Terraform code"
                        >
                          <FileCode className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={(e) => handleDownloadReport(report, e)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Download JSON Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(report.id, e)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete report"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Load in Console <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Terraform Code Modal Preview */}
      {previewTerraformReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Terraform IaC — {previewTerraformReport.title}
                </h3>
                <p className="text-xs text-slate-500">Ready to deploy with HashiCorp Terraform CLI</p>
              </div>
              <button
                onClick={() => setPreviewTerraformReport(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-100 font-mono text-xs">
              <pre>{previewTerraformReport.terraformCode}</pre>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <button
                onClick={() => handleCopyTerraform(previewTerraformReport.terraformCode)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
              >
                {copiedTf ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTf ? 'Copied Code!' : 'Copy Terraform Code'}</span>
              </button>

              <button
                onClick={() => setPreviewTerraformReport(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
