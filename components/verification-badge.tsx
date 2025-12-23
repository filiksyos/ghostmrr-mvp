'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, TrendingUp, Users, DollarSign, RotateCcw, Sparkles } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { VerificationData } from '@/lib/types';
import { AIInsights } from '@/components/ai-insights';

interface VerificationBadgeProps {
  data: VerificationData;
  onReset: () => void;
}

export function VerificationBadge({ data, onReset }: VerificationBadgeProps) {
  const { metrics, aiInsights, timestamp } = data;
  const arpu = metrics.mrr / metrics.customers;

  return (
    <div className="space-y-6">
      {/* Verification Badge */}
      <Card className="w-full max-w-2xl mx-auto shadow-xl border-2 border-green-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-6 h-6" />
              Verified Startup
            </CardTitle>
            <span className="text-sm text-muted-foreground">{metrics.tier}</span>
          </div>
          <CardDescription>Cryptographically verified on {formatDate(timestamp)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">MRR</span>
              </div>
              <p className="text-2xl font-bold">{formatCurrency(metrics.mrr)}</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Customers</span>
              </div>
              <p className="text-2xl font-bold">{metrics.customers}</p>
              <p className="text-xs text-muted-foreground mt-1">ARPU: {formatCurrency(arpu)}</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Growth</span>
              </div>
              <p className="text-2xl font-bold">{metrics.growthRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">per month</p>
            </div>
          </div>

          {/* Verification Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h4 className="text-sm font-semibold">Cryptographic Verification</h4>
            <div className="text-xs space-y-1 font-mono">
              <p className="truncate">
                <span className="text-muted-foreground">DID:</span> {data.did}
              </p>
              <p className="truncate">
                <span className="text-muted-foreground">Public Key:</span> {data.publicKey.slice(0, 32)}...
              </p>
              <p className="truncate">
                <span className="text-muted-foreground">Signature:</span> {data.signature.slice(0, 32)}...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>Growth analysis and recommendations powered by AI</CardDescription>
        </CardHeader>
        <CardContent>
          <AIInsights insights={aiInsights} />
        </CardContent>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button onClick={onReset} variant="outline">
          <RotateCcw className="w-4 h-4" />
          Verify Another Startup
        </Button>
      </div>
    </div>
  );
}
