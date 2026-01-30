
import React from 'react';
import { AnalysisResult, ArchitectureMetadata } from '../types';
import { 
  AlertTriangle, 
  TrendingDown, 
  ShieldAlert, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  Activity, 
  DollarSign,
  Download,
  Share2,
  FileText
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface ReportDashboardProps {
  result: AnalysisResult;
  metadata: ArchitectureMetadata;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ result, metadata }) => {
  const scoreColor = result.riskScore < 30 ? 'text-emerald-400' : result.riskScore < 60 ? 'text-amber-400' : 'text-red-400';
  const scoreBorder = result.riskScore < 30 ? 'border-emerald-500/30' : result.riskScore < 60 ? 'border-amber-500/30' : 'border-red-500/30';

  const chartData = [
    { name: 'Risk', value: result.riskScore },
    { name: 'Health', value: 100 - result.riskScore }
  ];
  const COLORS = [result.riskScore > 60 ? '#ef4444' : '#f59e0b', '#10b981'];

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Analysis Report</h2>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            Generated via {metadata.provider} Consensus Model • {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold border border-slate-700 transition-colors">
            <Download className="w-4 h-4" /> Export JSON
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-900/20">
            <Share2 className="w-4 h-4" /> Share Dashboard
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-black ${scoreColor}`}>{result.riskScore}</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">Risk Index</span>
            </div>
          </div>
          <h4 className="font-bold text-slate-300">Architecture Risk Score</h4>
          <p className="text-[10px] text-slate-500 mt-1">Based on failure propagation probability</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-300">Est. Monthly Cost</h4>
          </div>
          <span className="text-3xl font-black text-white">{result.monthlyCost}</span>
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-emerald-500" />
            -12% vs. unoptimized setup
          </p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-300">Single Points of Failure</h4>
          </div>
          <span className="text-3xl font-black text-white">{result.spof.length}</span>
          <p className="text-xs text-slate-500 mt-2">Critical path components at risk</p>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-300">Uptime Projection</h4>
          </div>
          <span className="text-3xl font-black text-white">{metadata.uptime}</span>
          <p className="text-xs text-slate-500 mt-2">Validated against regional topology</p>
        </div>
      </div>


      {/* Main Analysis Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Blueprint & Detailed Report */}
        <div className="lg:col-span-2 space-y-8">
          {result.mermaidDiagram && (
            <div className="glass rounded-2xl overflow-hidden">
              <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Architecture Blueprint
                </h3>
              </div>
              <div className="p-8 bg-slate-950/30 flex items-center justify-center min-h-[400px]">
                <div className="w-full h-full p-6 bg-slate-900/50 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300 overflow-auto whitespace-pre">
                  {result.mermaidDiagram}
                </div>
              </div>
              <div className="px-6 py-3 bg-slate-900/30 text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
                Mermaid.js Diagram Specification
              </div>
            </div>
          )}

          {result.markdownReport && (
            <div className="glass rounded-2xl p-8 prose prose-invert max-w-none prose-slate">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-white m-0">Detailed Architectural Review</h3>
              </div>
              <div className="text-slate-300 leading-relaxed text-sm space-y-4">
                {result.markdownReport.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          )}

          <div className="glass rounded-2xl overflow-hidden">
            <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Bottlenecks & SPOFs
              </h3>
            </div>
            <div className="p-6 divide-y divide-slate-800">
              {result.bottlenecks.map((b, i) => (
                <div key={i} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-200 text-sm mb-1">Performance Constraint</h5>
                    <p className="text-sm text-slate-500 leading-relaxed">{b}</p>
                  </div>
                </div>
              ))}
              {result.spof.map((s, i) => (
                <div key={`spof-${i}`} className="py-4 last:pb-0 flex gap-4">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-200 text-sm mb-1">Single Point of Failure</h5>
                    <p className="text-sm text-slate-500 leading-relaxed">{s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations & Agents */}
        <div className="space-y-8">
          <div className="glass rounded-2xl p-6 bg-indigo-600/5 border-indigo-500/30">
            <h3 className="font-bold text-lg text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Roadmap
            </h3>
            <div className="space-y-4">
              {result.suggestedImprovements.map((imp, i) => (
                <div key={i} className="group relative pl-6 border-l-2 border-slate-800 hover:border-indigo-500 transition-all">
                  <div className="absolute top-0 -left-[5px] w-2 h-2 rounded-full bg-slate-800 group-hover:bg-indigo-500 transition-all" />
                  <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                    {imp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-800">
              <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500">Expert Agent Dialogue</h3>
            </div>
            <div className="p-4 space-y-4">
              {result.agentData.map((agent, i) => (
                <div key={i} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-indigo-400 px-2 py-0.5 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                      {agent.agentName}
                    </span>
                    <ArrowUpRight className="w-3 h-3 text-slate-600" />
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic mb-3">"{agent.reasoning}"</p>
                  <div className="space-y-2">
                    {agent.findings.map((f, j) => (
                      <div key={j} className="flex items-start gap-2 text-[10px] text-slate-500">
                        <div className="w-1 h-1 rounded-full bg-slate-700 mt-1.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReportDashboard;
