
import { ArchitectureMetadata, AnalysisResult } from "../types";

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/analyze-architecture';

export async function analyzeArchitectureWithN8N(metadata: ArchitectureMetadata): Promise<AnalysisResult> {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error(`n8n Analysis failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data as AnalysisResult;
  } catch (error) {
    console.error("Error calling n8n webhook:", error);
    throw error;
  }
}
