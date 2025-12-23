# 👻 GhostMRR MVP - AI-Powered Revenue Verification

**Verify your startup revenue with AI-powered insights and growth recommendations.**

## Features

✨ **Simple Revenue Verification**: Input MRR data directly (no Stripe integration needed)
🔐 **Cryptographic Signing**: Ed25519 signatures for verification integrity
🤖 **AI Revenue Analysis**: OpenAI-powered insights on revenue trends and growth
✅ **Verification Badge**: Display verified status with AI insights
🌙 **Dark Mode Support**: Full dark/light theme switching
🔒 **Privacy-First**: No external data sharing required

## Tech Stack

- **Next.js 16.0.3** with App Router
- **React 19.2.0**
- **TypeScript 5**
- **Tailwind CSS 3.4**
- **OpenAI API** for AI analysis
- **@noble/ed25519** for cryptographic signatures
- **Radix UI** components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/filiksyos/ghostmrr-mvp.git
cd ghostmrr-mvp

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your OpenAI API key to .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## How It Works

1. **Input Revenue Data**: Enter your MRR, customer count, and growth metrics
2. **Generate Signature**: Creates Ed25519 cryptographic signature for verification
3. **AI Analysis**: OpenAI analyzes your metrics and provides insights
4. **Get Verified**: Receive verification badge with AI-powered recommendations

## Environment Variables

```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Project Structure

```
ghostmrr-mvp/
├── app/                 # Next.js App Router
│   ├── api/            # API routes (verification, AI analysis)
│   ├── page.tsx        # Main page
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── verification-form.tsx
│   ├── verification-badge.tsx
│   └── ai-insights.tsx
├── lib/                 # Utilities
│   ├── crypto.ts       # Ed25519 signing
│   ├── ai.ts           # OpenAI integration
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

## License

MIT

## Credits

Inspired by [filiksyos/ghostmrr](https://github.com/filiksyos/ghostmrr)
