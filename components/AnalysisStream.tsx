
import React, { useState, useEffect } from 'react';
import { Shield, Banknote, Zap, Activity, Maximize2, Loader2, Network } from 'lucide-react';

const AGENTS = [
  { id: 'cost', name: 'FinOps Architect', icon: Banknote, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 'performance', name: 'Performance Specialist', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { id: 'reliability', name: 'SRE Lead', icon: Activity, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { id: 'security', name: 'CISO / Security', icon: Shield, color: 'text-red-400', bg: 'bg-red-400/10' },
  { id: 'scalability', name: 'Solutions Architect', icon: Maximize2, color: 'text-blue-400', bg: 'bg-blue-400/10' },
];

const MOCK_LOGS = [
  "Initializing multi-agent consensus protocol...",
  "FinOps Architect: Analyzing resource allocation for the defined scale...",
  "Security: Evaluating ingress points and IAM policy breadth...",
  "SRE Lead: Stress testing the high-availability constraints...",
  "Solutions Architect: Drafting initial infrastructure plan based on prompt...",
  "DEBATE: Security flags potential data exfiltration risk in proposed VPC peering.",
  "DEBATE: FinOps Architect contests the use of Multi-AZ RDS due to budget cap.",
  "DEBATE: SRE Lead argues that uptime goals require the redundant setup.",
  "Synthesizing debate points... Finding architectural equilibrium...",
  "Consensus Engine: Designing final Mermaid blueprint...",
  "Engine: Drafting comprehensive technical report..."
];


const AnalysisStream: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [activeAgent, setActiveAgent] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < MOCK_LOGS.length) {
        setLogs(prev => [...prev, MOCK_LOGS[i]]);
        setActiveAgent(Math.floor(Math.random() * AGENTS.length));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-8 h-[700px]">
      {/* Live View Sidebar */}
      <div className="w-full md:w-80 flex flex-col gap-4">
        <div className="p-6 glass rounded-2xl flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Active Agents</h3>
          </div>
          <div className="space-y-3">
            {AGENTS.map((agent, idx) => (
              <div 
                key={agent.id}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  activeAgent === idx ? 'bg-slate-800/80 border border-slate-700' : 'opacity-40'
                }`}
              >
                <div className={`p-2 rounded-lg ${agent.bg} ${agent.color}`}>
                  <agent.icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">{agent.name}</span>
                  <span className="text-[10px] text-slate-500 mono">Reasoning...</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 glass rounded-2xl bg-indigo-600/5 border-indigo-500/20 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Network className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-sm text-indigo-100">Consensus Engine</h3>
          </div>
          <p className="text-xs text-indigo-200/60 leading-relaxed">
            Synthesizing multiple agent viewpoints to resolve trade-offs between speed and cost.
          </p>
          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 animate-[loading_5s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>

      {/* Log View Container */}
      <div className="flex-grow glass rounded-3xl overflow-hidden flex flex-col agent-log-gradient border border-slate-800">
        <div className="h-12 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
          </div>
          <div className="flex items-center gap-3">
             <span className="text-[10px] mono text-slate-600 uppercase font-bold tracking-widest">Console Output</span>
             <Loader2 className="w-3 h-3 animate-spin text-slate-700" />
          </div>
        </div>
        
        <div className="p-8 mono text-xs space-y-2 overflow-y-auto font-medium">
          {logs.map((log, i) => {
            const safeLog = log || '';
            const isConsensus = safeLog.includes('Consensus') || safeLog.includes('Engine:');
            const isAgent = safeLog.includes('Agent');
            
            return (
              <div key={i} className={`flex gap-4 animate-fade-in ${isConsensus ? 'text-indigo-400 font-bold' : isAgent ? 'text-slate-300' : 'text-slate-500'}`}>
                <span className="text-slate-700 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                <span className="break-all">{safeLog}</span>
              </div>
            );
          })}
          <div className="flex gap-4 animate-pulse">
            <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
            <span className="w-2 h-4 bg-slate-700 inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisStream;
