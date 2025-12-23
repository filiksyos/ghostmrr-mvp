import { NextRequest, NextResponse } from 'next/server';
import { signMessage, verifySignature } from '@/lib/crypto';
import { generateAIInsights } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mrr, customers, growthRate } = body;

    // Validate input
    if (!mrr || !customers || growthRate === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate cryptographic signature
    const timestamp = new Date().toISOString();
    const message = JSON.stringify({ mrr, customers, growthRate, timestamp });
    const { signature, publicKey, did } = await signMessage(message);

    // Verify signature immediately
    const isValid = await verifySignature(message, signature, publicKey);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Signature verification failed' },
        { status: 500 }
      );
    }

    // Generate AI insights
    const aiInsights = await generateAIInsights({ mrr, customers, growthRate });

    // Calculate tier
    let tier = 'Starting Out';
    if (mrr >= 100000) tier = '$100k+ Club';
    else if (mrr >= 10000) tier = '$10k+ Club';
    else if (mrr >= 1000) tier = '$1k+ Club';

    return NextResponse.json({
      verification: {
        did,
        publicKey,
        signature,
        timestamp,
        metrics: {
          mrr,
          customers,
          growthRate,
          tier,
        },
        aiInsights,
        verified: true,
      },
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
