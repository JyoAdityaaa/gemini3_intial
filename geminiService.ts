
import { GoogleGenAI, Type } from "@google/genai";
import { ArchitectureMetadata, AnalysisResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    riskScore: { type: Type.NUMBER, description: "A score from 0-100 where 100 is high risk." },
    monthlyCost: { type: Type.STRING, description: "Estimated monthly cost, e.g., '$1,500 - $2,200'" },
    bottlenecks: { type: Type.ARRAY, items: { type: Type.STRING } },
    spof: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Single points of failure identified." },
    securityRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
    scalabilityLimits: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestedImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
    agentData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          agentName: { type: Type.STRING },
          findings: { type: Type.ARRAY, items: { type: Type.STRING } },
          warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
          reasoning: { type: Type.STRING }
        },
        required: ["agentName", "findings", "warnings", "reasoning"]
      }
    }
  },
  required: ["riskScore", "monthlyCost", "bottlenecks", "spof", "securityRisks", "scalabilityLimits", "suggestedImprovements", "agentData"]
};

export async function analyzeArchitecture(metadata: ArchitectureMetadata): Promise<AnalysisResult> {
  const prompt = `
    Act as a Consensus Engine for 5 senior architecture agents (Cost/FinOps, Performance, Reliability/SRE, Security, Scalability).
    Analyze the following backend architecture diagram/description and provide a professional, enterprise-grade engineering review.
    
    Architecture Details:
    - Cloud Provider: ${metadata.provider}
    - Expected Users: ${metadata.users}
    - Monthly Budget: ${metadata.budget}
    - Target Uptime: ${metadata.uptime}
    - Description: ${metadata.description}

    Your review must be critical, serious, and engineering-focused. Avoid fluff. 
    Focus on potential architectural flaws, bottlenecks, and real-world failure modes.
  `;

  const contents: any[] = [{ text: prompt }];
  
  if (metadata.image) {
    // Assuming base64 image data (minus the prefix)
    const base64Data = metadata.image.split(',')[1] || metadata.image;
    contents.push({
      inlineData: {
        mimeType: 'image/png',
        data: base64Data
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
      thinkingConfig: { thinkingBudget: 4000 }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response was returned by the engine. The request may have been blocked or failed.");
  }

  try {
    const data = JSON.parse(text);
    return data as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse Gemini response", e, text);
    throw new Error("Consensus engine failed to generate a valid report. The AI response was malformed.");
  }
}
