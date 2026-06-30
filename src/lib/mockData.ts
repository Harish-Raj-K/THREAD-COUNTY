export type FabricReport = {
  id: string;
  fileName: string;
  imageUrl: string;
  uploadedAt: string;
  threadDensity: number;
  warpCount: number;
  weftCount: number;
  fabricType: string;
  confidenceScore: number;
  suggestions: string[];
  status: "completed" | "processing" | "failed";
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  plan: "Free" | "Student" | "Professional" | "Enterprise";
  uploads: number;
  joined: string;
  status: "active" | "suspended";
};

const fabricTypes = [
  "Cotton Plain Weave",
  "Polyester Twill",
  "Linen Blend",
  "Silk Satin",
  "Denim Twill",
  "Wool Herringbone",
];

const suggestionPool = [
  "Thread density is within standard range for apparel-grade fabric.",
  "Consider higher warp count for improved durability.",
  "Weft tension appears slightly uneven; recommend recalibration.",
  "Fabric suitable for premium garment production.",
  "Density suggests suitability for upholstery applications.",
  "Confidence score indicates reliable classification; manual review optional.",
];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateMockReport(id: string, fileName: string): FabricReport {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const r1 = seededRandom(seed);
  const r2 = seededRandom(seed + 1);
  const r3 = seededRandom(seed + 2);
  const r4 = seededRandom(seed + 3);

  return {
    id,
    fileName,
    imageUrl: `https://picsum.photos/seed/${id}/600/400`,
    uploadedAt: new Date().toISOString(),
    threadDensity: Math.round(120 + r1 * 180),
    warpCount: Math.round(40 + r2 * 80),
    weftCount: Math.round(40 + r3 * 80),
    fabricType: fabricTypes[Math.floor(r4 * fabricTypes.length)],
    confidenceScore: Math.round((85 + r1 * 14) * 10) / 10,
    suggestions: [
      suggestionPool[Math.floor(r1 * suggestionPool.length)],
      suggestionPool[Math.floor(r3 * suggestionPool.length)],
    ],
    status: "completed",
  };
}

export const mockHistory: FabricReport[] = [
  generateMockReport("rep-1001", "cotton_sample_01.jpg"),
  generateMockReport("rep-1002", "denim_swatch.png"),
  generateMockReport("rep-1003", "silk_test.jpeg"),
  generateMockReport("rep-1004", "linen_blend_03.jpg"),
  generateMockReport("rep-1005", "wool_herringbone.png"),
];

export const mockAdminUsers: AdminUser[] = [
  { id: "u1", name: "Aditi Sharma", email: "aditi@example.com", plan: "Professional", uploads: 42, joined: "2026-01-12", status: "active" },
  { id: "u2", name: "Rahul Mehta", email: "rahul@example.com", plan: "Free", uploads: 3, joined: "2026-03-02", status: "active" },
  { id: "u3", name: "Harish Raj K", email: "harish@example.com", plan: "Student", uploads: 17, joined: "2026-02-20", status: "active" },
  { id: "u4", name: "Priya Nair", email: "priya@example.com", plan: "Enterprise", uploads: 128, joined: "2025-11-08", status: "active" },
  { id: "u5", name: "Sam Verma", email: "sam@example.com", plan: "Free", uploads: 1, joined: "2026-06-10", status: "suspended" },
];

export const pricingPlans = [
  {
    name: "Free",
    price: 0,
    period: "forever",
    description: "Try ThreadCounty with limited uploads.",
    features: ["5 uploads / month", "Basic AI analysis", "PDF report download", "Community support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Student",
    price: 199,
    period: "month",
    description: "Affordable plan for students and researchers.",
    features: ["50 uploads / month", "Standard AI analysis", "PDF + CSV export", "Email support", "History up to 90 days"],
    cta: "Subscribe",
    highlighted: false,
  },
  {
    name: "Professional",
    price: 999,
    period: "month",
    description: "For designers and small fabric businesses.",
    features: ["500 uploads / month", "Advanced AI analysis", "Priority processing", "Shareable report links", "Unlimited history"],
    cta: "Subscribe",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: -1,
    period: "custom",
    description: "Custom volume and integrations for large teams.",
    features: ["Unlimited uploads", "Dedicated AI pipeline", "API access", "Team & role management", "Dedicated support manager"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const testimonials = [
  { name: "Ananya Iyer", role: "Textile Designer, Studio Weave", quote: "ThreadCounty cut our manual fabric inspection time by more than half. The reports are clear enough to share directly with clients." },
  { name: "Karthik Subramanian", role: "Production Manager, Coral Mills", quote: "The thread density readings line up closely with our lab tests, and the history dashboard makes audits painless." },
  { name: "Neha Gupta", role: "Founder, Loom & Co.", quote: "As a small studio, having instant fabric analysis without an in-house lab has been a huge unlock for us." },
];

export const faqData = [
  {
    category: "Platform",
    items: [
      { q: "What is ThreadCounty?", a: "ThreadCounty is an AI-powered platform that analyzes fabric images to estimate thread density, warp/weft counts, and fabric type within seconds." },
      { q: "Do I need any special equipment?", a: "No. A clear, well-lit photo of the fabric sample taken with any smartphone or camera is sufficient." },
    ],
  },
  {
    category: "AI Analysis",
    items: [
      { q: "How accurate is the AI analysis?", a: "Our model targets a 90%+ confidence score on clear, close-up fabric images. Confidence scores are shown on every report so you can judge reliability." },
      { q: "What fabric types are supported?", a: "Common weaves including plain, twill, satin, and herringbone across cotton, polyester, linen, silk, wool, and blended fabrics." },
    ],
  },
  {
    category: "Pricing",
    items: [
      { q: "Can I change plans anytime?", a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your billing settings." },
      { q: "Is there a free trial for paid plans?", a: "The Free plan itself acts as an ongoing trial with 5 uploads per month and no time limit." },
    ],
  },
  {
    category: "Upload Limits",
    items: [
      { q: "What file types are supported?", a: "JPG, JPEG, and PNG images up to 10MB per file." },
      { q: "What happens if I hit my monthly upload limit?", a: "You'll be prompted to upgrade your plan; existing reports remain fully accessible." },
    ],
  },
  {
    category: "Account",
    items: [
      { q: "How do I delete my account?", a: "Go to Profile → Delete Account. This permanently removes your data after a 14-day grace period." },
      { q: "I forgot my password, what do I do?", a: "Use the 'Forgot Password' link on the login page to receive a secure reset link via email." },
    ],
  },
];
