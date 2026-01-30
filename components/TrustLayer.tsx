
import React from 'react';
import { Cpu, Users, GitMerge, FileCheck } from 'lucide-react';

const TrustLayer: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto w-full px-6 py-20 border-t border-slate-800/50 mt-12 bg-slate-950/30">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 tracking-tight">Multi-Agent Engineering Consensus</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          We don't just use one large model. We orchestrate specialized AI instances that cross-examine 
          each other to provide reliable architecture reasoning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-bold mb-2">Role Specialization</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Separate agents act as specialized engineers (SRE, FinOps, InfoSec) to ensure deep domain coverage.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="font-bold mb-2">Independent Reasoning</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Agents analyze the graph structure independently before sharing findings to prevent model hallucination bias.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 text-amber-400">
            <GitMerge className="w-5 h-5" />
          </div>
          <h4 className="font-bold mb-2">Consensus Resolution</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            A central engine resolves conflicting priorities (e.g., performance vs cost) using engineering trade-off logic.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/20">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
            <FileCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold mb-2">Policy Validation</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Final results are verified against known AWS/GCP/Azure Best Practices and Well-Architected Frameworks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustLayer;
