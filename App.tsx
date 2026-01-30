
import React, { useState, useEffect } from 'react';
import { AppStep, ArchitectureMetadata, AnalysisResult, CloudProvider } from './types';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import UploadForm from './components/UploadForm';
import AnalysisStream from './components/AnalysisStream';
import ReportDashboard from './components/ReportDashboard';
import TrustLayer from './components/TrustLayer';

import { analyzeArchitectureWithN8N } from './services/n8nService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [metadata, setMetadata] = useState<ArchitectureMetadata | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartAnalysis = async (data: ArchitectureMetadata) => {
    setMetadata(data);
    setStep(AppStep.ANALYZING);
    setError(null);
    
    try {
      const analysisResult = await analyzeArchitectureWithN8N(data);
      setResult(analysisResult);
      setStep(AppStep.REPORT);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Could not connect to the n8n reasoning engine.");
      setStep(AppStep.UPLOAD);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Header setStep={setStep} currentStep={step} />
      
      <main className="flex-grow flex flex-col relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>

        {step === AppStep.LANDING && (
          <LandingPage onCtaClick={() => setStep(AppStep.UPLOAD)} />
        )}

        {step === AppStep.UPLOAD && (
          <UploadForm onSubmit={handleStartAnalysis} error={error} />
        )}

        {step === AppStep.ANALYZING && (
          <AnalysisStream />
        )}

        {step === AppStep.REPORT && result && (
          <>
            <ReportDashboard result={result} metadata={metadata!} />
            <TrustLayer />
          </>
        )}
      </main>

      <footer className="py-8 border-t border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2024 Diagram-to-Decision. Enterprise Architecture Intelligence.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300 transition-colors">Documentation</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
