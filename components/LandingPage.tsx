
import React from 'react';
import { ArrowRight, Upload, Zap, BarChart3, Database, Shield } from 'lucide-react';

interface LandingPageProps {
  onCtaClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCtaClick }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          NEXT-GEN SYSTEM ANALYSIS
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Upload your backend architecture. <br />
          <span className="text-white">Predict failure before you build.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-12 leading-relaxed">
          High-fidelity reasoning engine for modern cloud architectures. Get instant reviews for 
          cost efficiency, security risks, reliability bottlenecks, and multi-region scalability.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button 
            onClick={onCtaClick}
            className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02]"
          >
            Analyze My Architecture
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center gap-2 border border-slate-700 hover:bg-slate-800 text-slate-300 px-8 py-4 rounded-xl font-bold transition-all">
            View Sample Report
          </button>
        </div>

        {/* 3-Step Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-800 -z-10 hidden md:block"></div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-6 text-indigo-400">
              <Upload className="w-7 h-7" />
            </div>
            <h3 className="font-bold mb-2">1. Upload Diagram</h3>
            <p className="text-slate-500 text-sm">Upload PNG, PDF or paste a system description of your stack.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-6 text-emerald-400">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-bold mb-2">2. AI Agents Analyze</h3>
            <p className="text-slate-500 text-sm">Specialist agents stress-test cost, reliability, and security.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center mb-6 text-amber-400">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="font-bold mb-2">3. System Report</h3>
            <p className="text-slate-500 text-sm">Review bottlenecks and detailed remediation steps.</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-slate-800/50 bg-slate-900/30 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mb-8">Trusted by Architects at</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale contrast-125">
             <span className="text-2xl font-black italic tracking-tighter">CLOUDCORE</span>
             <span className="text-2xl font-black italic tracking-tighter">DATASTRAT</span>
             <span className="text-2xl font-black italic tracking-tighter">SYSTEMATIC</span>
             <span className="text-2xl font-black italic tracking-tighter">NETFLOW</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
