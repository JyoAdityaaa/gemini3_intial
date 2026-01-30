
import React from 'react';
import { AppStep } from '../types';
import { Cpu, ShieldCheck, Activity } from 'lucide-react';

interface HeaderProps {
  setStep: (step: AppStep) => void;
  currentStep: AppStep;
}

const Header: React.FC<HeaderProps> = ({ setStep, currentStep }) => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-800/60 h-16 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setStep(AppStep.LANDING)}
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Diagram-to-Decision
          </span>
          <span className="hidden md:inline px-2 py-0.5 rounded border border-slate-700 bg-slate-800/50 text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Engine v1.0
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button className="hover:text-white transition-colors">Infrastructure</button>
          <button className="hover:text-white transition-colors">Agents</button>
          <button className="hover:text-white transition-colors">Pricing</button>
          <button className="hover:text-white transition-colors">Docs</button>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setStep(AppStep.UPLOAD)}
            className="text-sm px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-800 transition-all"
          >
            Dashboard
          </button>
          <button className="bg-white text-slate-950 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-50 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
