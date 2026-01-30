
import React, { useState } from 'react';
import { CloudProvider, ArchitectureMetadata } from '../types';
import { Upload, FileText, ChevronRight, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface UploadFormProps {
  onSubmit: (data: ArchitectureMetadata) => void;
  error: string | null;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, error }) => {

  const [formData, setFormData] = useState<ArchitectureMetadata>({
    provider: CloudProvider.AWS,
    users: '100,000+',
    budget: '$1,000 - $5,000',
    uptime: '99.9%',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) {
      alert("Please provide a system description.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-6 py-12 animate-fade-in-up">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Architecture Definition</h2>
        <p className="text-slate-400 text-lg">Describe your system architecture for the AI expert agents to analyze and debate.</p>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Constraints */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Target Cloud Environment</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.values(CloudProvider).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, provider: p })}
                    className={`px-4 py-4 rounded-2xl border text-sm font-bold transition-all duration-300 ${
                      formData.provider === p 
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_10px_30px_rgba(79,70,229,0.3)]' 
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Scale / Monthly Users</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. 500k concurrent"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                  value={formData.users}
                  onChange={(e) => setFormData({ ...formData, users: e.target.value })}
                />
                <FileText className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Budget Cap</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="$10k/mo"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">SLA Goal</label>
                <input 
                  type="text" 
                  placeholder="99.99%"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                  value={formData.uptime}
                  onChange={(e) => setFormData({ ...formData, uptime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Description */}
          <div className="space-y-4 flex flex-col h-full">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">System Architecture prompt</label>
            <div className="flex-grow">
              <textarea 
                placeholder="Describe your architecture in detail... 
E.g. We have a Next.js frontend on Vercel, a Node/Express API on EKS, and a PostgreSQL database on RDS. We use Redis for caching and S3 for assets."
                className="w-full h-full min-h-[300px] bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium leading-relaxed resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            className="w-full group relative flex items-center justify-center gap-4 bg-white text-slate-950 px-8 py-6 rounded-2xl font-black hover:bg-indigo-50 transition-all text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            Launch Multi-Agent Analysis
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-center text-slate-500 mt-6 text-sm font-medium">
            System will deploy 4 specialized AI architect agents for cross-examination.
          </p>
        </div>
      </form>
    </div>
  );

};

export default UploadForm;
