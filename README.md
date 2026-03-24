# FORGE — AI-Powered Training Programs

A professional workout program generator powered by Claude AI. Users fill in their goals, experience level, available equipment, and schedule — and get a fully personalized training program.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet_4-blueviolet)

## Features

- **3-step wizard** — Goal → Profile → Training Setup
- **AI-generated programs** — Powered by Claude Sonnet 4 via Anthropic API
- **Strength & Cardio** — Supports pure strength, pure cardio, and hybrid programs
- **Smart personalization** — Adapts to injuries, equipment, experience level
- **Professional output** — Warm-ups, exercise prescriptions with sets/reps/tempo, cool-downs, coach notes

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Anthropic API key

Copy the example env file and add your key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at [console.anthropic.com](https://console.anthropic.com/)

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option A: One-click (recommended)

1. Push this project to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo
4. Add environment variable: `ANTHROPIC_API_KEY` = your key
5. Deploy!

### Option B: CLI

```bash
npm i -g vercel
vercel
# Follow prompts, then:
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

**Important:** Always add `ANTHROPIC_API_KEY` in Vercel's Environment Variables settings (Settings → Environment Variables) so your API key stays secure.

## Project Structure

```
forge-app/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.js      # Server-side API route (calls Claude)
│   ├── ForgeApp.js            # Main client component (wizard + UI)
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout with fonts
│   └── page.js                # Home page
├── public/
│   └── favicon.svg
├── .env.example
├── .gitignore
├── next.config.js
├── package.json
└── README.md
```

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **AI:** Anthropic Claude Sonnet 4
- **Styling:** CSS-in-JS (inline styles)
- **Fonts:** Sora + DM Sans (Google Fonts)
- **Deployment:** Vercel

## License

MIT
