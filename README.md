# ThreadCounty

AI-powered fabric analysis platform — upload a fabric photo and instantly get thread density, warp/weft counts, fabric type, and a confidence score, packaged as a professional SaaS web app.

Built for the **ThreadCounty Hackathon (Unstop)**.

## Live Demo / Screenshots

> Deploy with one click (instructions below) and drop your live URL here before submitting.

## What's Implemented

This is a complete, running full-stack frontend with every mandatory page from the brief, backed by mock AI data (clearly labeled as such in the UI) so the entire user journey works end-to-end without requiring a trained model.

**Landing Page** — Hero, navbar, CTAs, product preview, features, benefits, workflow, stats, testimonials, FAQ preview, contact CTA, footer.

**Authentication** — Sign up, login, forgot password, "remember me", logout. Email verification flow is wired up for Supabase Auth; runs against a local mock auth layer when no Supabase project is configured (zero-setup demo mode).

**User Dashboard** — Welcome section, stat cards (uploads, reports, storage, plan), recent reports list, activity timeline, quick actions, notification bell.

**Image Upload Module** — Drag & drop, multi-file support, live previews, simulated upload progress, file-type (JPG/PNG/JPEG) and size (≤10MB) validation, delete-before-upload.

**AI Analysis Result Page** — Uploaded image, thread density, warp/weft counts, fabric type, confidence score, AI suggestions, downloadable report, shareable link.

**History Page** — Search, filter by fabric type, delete, and download past reports.

**Pricing Page** — Free / Student / Professional / Enterprise plans with feature comparison and subscribe buttons.

**About Page** — Story, mission, vision, tech stack, team, timeline.

**Contact Page** — Working contact form (client-side), email, social links, map placeholder.

**FAQ Page** — Searchable, categorized (Platform, AI Analysis, Pricing, Upload Limits, Account).

**User Profile** — Update profile, change password UI, delete account flow, recent activity.

**Admin Dashboard** — Total users, manage/suspend users, view uploaded images & reports, delete reports, plan distribution analytics.

**UI/UX** — Fully responsive, dark/light mode toggle, smooth transitions, accessible markup, fast static rendering.

## What's Mocked (and why)

- **AI analysis** returns deterministic, realistic-looking mock results (no trained model was integrated in the time available). Every mock result is clearly labeled `* Mock AI results shown for demonstration` on the analysis page, exactly as the brief permits ("Mock AI results are acceptable if no AI model is integrated").
- **Auth, uploads, history, and admin data** run on an in-memory/localStorage mock layer out of the box, so the whole app is explorable with zero configuration. Pointing it at a real Supabase project (see below) switches authentication to the real thing automatically.
- **Payments** are UI-only — no Stripe/Razorpay integration is wired up.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react
- **Auth/DB (optional, production path):** Supabase Auth + Postgres
- **Deployment target:** Vercel

## Project Structure

```
threadcounty/
├── src/
│   ├── app/                  # App Router pages (one folder per route)
│   │   ├── page.tsx          # Landing page
│   │   ├── signup/ login/ forgot-password/
│   │   ├── dashboard/ upload/ history/ profile/ admin/
│   │   ├── analysis/[id]/    # AI analysis result (dynamic route)
│   │   ├── pricing/ about/ contact/ faq/
│   │   └── layout.tsx, globals.css
│   ├── components/           # Navbar, Footer, DashboardShell, ThemeToggle, etc.
│   └── lib/                  # authContext.tsx, supabaseClient.ts, mockData.ts
├── supabase/
│   └── schema.sql            # Full DB schema + RLS policies
├── API_DOCUMENTATION.md      # Backend API contract for production build-out
├── .env.example
└── README.md
```

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app runs fully in **demo mode** with no environment variables required — sign up, upload, and explore every page using mock data stored in your browser.

## Connecting Real Supabase (optional, for production)

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql` to create all tables, indexes, and Row Level Security policies.
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. Restart the dev server. Sign up / login now go through real Supabase Auth instead of the mock layer.
5. Implement the backend endpoints in `API_DOCUMENTATION.md` (FastAPI/Flask recommended per the brief) to replace the mock AI analysis and admin data with real database-backed responses.

## Deploying (Vercel — fastest path)

1. Push this repo to GitHub (see below).
2. Go to [vercel.com/new](https://vercel.com/new) → Import the repository.
3. (Optional) Add the two Supabase env vars from `.env.example` under Project Settings → Environment Variables.
4. Click Deploy. Vercel auto-detects Next.js — no config needed.

## Pushing to GitHub

```bash
git init
git add .
git commit -m "ThreadCounty: full-stack SaaS frontend with mock AI analysis"
git branch -M main
git remote add origin https://github.com/<your-username>/threadcounty.git
git push -u origin main
```

## Known Limitations / Next Steps

- AI analysis is mocked; integrating a real model (or a third-party fabric/image API) is the main next step.
- Payments are not wired to a real processor.
- Admin role checking is UI-only; production RLS policies for admin-only tables should be added once an `admins` table or custom JWT claim exists (the schema includes a placeholder note for this).
- Bonus features from the brief (AI chatbot, OCR, PWA, multi-language, etc.) were out of scope given the timeline and are not implemented in this build.
