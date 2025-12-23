export interface RevenueMetrics {
  mrr: number;
  customers: number;
  growthRate: number;
  tier: string;
}

export interface AIInsights {
  summary: string;
  strengths: string[];
  recommendations: string[];
  riskFactors: string[];
}

export interface VerificationData {
  did: string;
  publicKey: string;
  signature: string;
  timestamp: string;
  metrics: RevenueMetrics;
  aiInsights: AIInsights;
  verified: boolean;
}
