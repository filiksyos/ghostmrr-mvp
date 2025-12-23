import OpenAI from 'openai';

interface RevenueMetrics {
  mrr: number;
  customers: number;
  growthRate: number;
}

interface AIInsights {
  summary: string;
  strengths: string[];
  recommendations: string[];
  riskFactors: string[];
}

/**
 * Generate AI-powered insights using OpenAI
 */
export async function generateAIInsights(
  metrics: RevenueMetrics
): Promise<AIInsights> {
  // Check if API key is available
  if (!process.env.OPENAI_API_KEY) {
    // Return mock insights if no API key
    return generateMockInsights(metrics);
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Analyze this startup's revenue metrics and provide insights:

Monthly Recurring Revenue (MRR): $${metrics.mrr.toLocaleString()}
Total Customers: ${metrics.customers}
Monthly Growth Rate: ${metrics.growthRate}%

Provide a JSON response with:
1. A brief summary (2-3 sentences)
2. Key strengths (2-3 bullet points)
3. Growth recommendations (3-4 actionable items)
4. Risk factors to watch (2-3 items)

Format: {"summary": "...", "strengths": [...], "recommendations": [...], "riskFactors": [...]}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a startup growth advisor with expertise in SaaS metrics and revenue analysis.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      return generateMockInsights(metrics);
    }

    // Parse JSON response
    const insights = JSON.parse(content);
    return insights;
  } catch (error) {
    console.error('AI insights generation error:', error);
    return generateMockInsights(metrics);
  }
}

/**
 * Generate mock insights when OpenAI is unavailable
 */
function generateMockInsights(metrics: RevenueMetrics): AIInsights {
  const { mrr, customers, growthRate } = metrics;
  const arpu = mrr / customers;

  return {
    summary: `Your startup shows ${growthRate > 10 ? 'strong' : 'steady'} growth momentum with $${mrr.toLocaleString()} MRR across ${customers} customers. ${arpu > 100 ? 'Your ARPU is healthy' : 'Focus on increasing ARPU'} at $${arpu.toFixed(2)} per customer.`,
    strengths: [
      growthRate > 10
        ? `Exceptional ${growthRate}% monthly growth rate`
        : 'Stable revenue base with room for acceleration',
      customers > 50
        ? 'Strong customer base providing revenue stability'
        : 'Early traction with growth potential',
      arpu > 100
        ? 'Healthy average revenue per user (ARPU)'
        : 'Foundation set for ARPU optimization',
    ],
    recommendations: [
      'Focus on reducing churn through better onboarding and customer success',
      growthRate < 10
        ? 'Implement referral programs to accelerate customer acquisition'
        : 'Double down on current growth channels',
      arpu < 100
        ? 'Introduce premium tiers to increase ARPU'
        : 'Test value-based pricing to capture more value',
      'Build a content marketing engine for organic growth',
    ],
    riskFactors: [
      customers < 20
        ? 'Small customer base increases revenue volatility'
        : 'Monitor churn closely to maintain growth trajectory',
      'Ensure product-market fit is validated before scaling',
      growthRate < 5
        ? 'Growth rate needs acceleration for venture scale'
        : 'Maintain sustainable growth without burning resources',
    ],
  };
}
