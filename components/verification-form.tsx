'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, Loader2 } from 'lucide-react';
import type { VerificationData } from '@/lib/types';

interface VerificationFormProps {
  onVerified: (data: VerificationData) => void;
}

export function VerificationForm({ onVerified }: VerificationFormProps) {
  const [mrr, setMrr] = useState('');
  const [customers, setCustomers] = useState('');
  const [growthRate, setGrowthRate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mrr: parseFloat(mrr),
          customers: parseInt(customers),
          growthRate: parseFloat(growthRate),
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      onVerified(data.verification);
    } catch (err) {
      setError('Failed to verify. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-purple-600" />
          Verify Your Revenue
        </CardTitle>
        <CardDescription>
          Enter your startup metrics to get AI-powered insights and cryptographic verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mrr">Monthly Recurring Revenue (MRR)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="mrr"
                type="number"
                placeholder="5000"
                value={mrr}
                onChange={(e) => setMrr(e.target.value)}
                className="pl-7"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customers">Total Customers</Label>
            <Input
              id="customers"
              type="number"
              placeholder="45"
              value={customers}
              onChange={(e) => setCustomers(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="growthRate">Monthly Growth Rate (%)</Label>
            <div className="relative">
              <Input
                id="growthRate"
                type="number"
                placeholder="15"
                value={growthRate}
                onChange={(e) => setGrowthRate(e.target.value)}
                className="pr-7"
                required
                step="0.1"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify & Get AI Insights'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
