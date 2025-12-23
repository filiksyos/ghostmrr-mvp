'use client';

import { useState } from 'react';
import { VerificationForm } from '@/components/verification-form';
import { VerificationBadge } from '@/components/verification-badge';
import { Ghost } from 'lucide-react';
import type { VerificationData } from '@/lib/types';

export default function Home() {
  const [verification, setVerification] = useState<VerificationData | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Ghost className="w-16 h-16 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            GhostMRR MVP
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Verify your startup revenue with AI-powered insights and growth recommendations
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!verification ? (
            <VerificationForm onVerified={setVerification} />
          ) : (
            <VerificationBadge data={verification} onReset={() => setVerification(null)} />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400">
          <p>Built with 👻 by indie hackers, for indie hackers</p>
          <p className="mt-2">Inspired by <a href="https://github.com/filiksyos/ghostmrr" className="text-purple-600 hover:underline" target="_blank" rel="noopener noreferrer">filiksyos/ghostmrr</a></p>
        </div>
      </div>
    </main>
  );
}
