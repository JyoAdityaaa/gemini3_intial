
export enum AppStep {
  LANDING = 'LANDING',
  UPLOAD = 'UPLOAD',
  ANALYZING = 'ANALYZING',
  REPORT = 'REPORT'
}

export enum CloudProvider {
  AWS = 'AWS',
  GCP = 'GCP',
  AZURE = 'Azure',
  HYBRID = 'Hybrid'
}


export interface ArchitectureMetadata {
  provider: CloudProvider;
  users: string;
  budget: string;
  uptime: string;
  description: string;
}

export interface AgentFindings {
  agentName: string;
  findings: string[];
  warnings: string[];
  reasoning: string;
}

export interface AnalysisResult {
  riskScore: number;
  monthlyCost: string;
  bottlenecks: string[];
  spof: string[];
  securityRisks: string[];
  scalabilityLimits: string[];
  suggestedImprovements: string[];
  agentData: AgentFindings[];
  mermaidDiagram?: string;
  markdownReport?: string;
}

