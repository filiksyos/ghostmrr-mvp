import { CheckCircle, AlertCircle, Lightbulb, TrendingUp } from 'lucide-react';
import type { AIInsights as AIInsightsType } from '@/lib/types';

interface AIInsightsProps {
  insights: AIInsightsType;
}

export function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-purple-600" />
          Summary
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{insights.summary}</p>
      </div>

      {/* Strengths */}
      <div>
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          Key Strengths
        </h4>
        <ul className="space-y-2">
          {insights.strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-green-600 mt-0.5">✓</span>
              <span>{strength}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div>
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-yellow-600" />
          Growth Recommendations
        </h4>
        <ul className="space-y-2">
          {insights.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-yellow-600 mt-0.5">→</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Risk Factors */}
      <div>
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          Risk Factors to Monitor
        </h4>
        <ul className="space-y-2">
          {insights.riskFactors.map((risk, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="text-orange-600 mt-0.5">!</span>
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
