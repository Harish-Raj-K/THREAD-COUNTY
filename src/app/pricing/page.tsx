"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { pricingPlans } from "@/lib/mockData";
import { Check } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [subscribed, setSubscribed] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1 className="text-4xl font-extrabold">Simple, transparent pricing</h1>
          <p className="mt-3 opacity-70">Choose the plan that fits your fabric analysis needs.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`card p-6 flex flex-col ${plan.highlighted ? "ring-2 ring-brand scale-[1.02]" : ""}`}
            >
              {plan.highlighted && (
                <span className="self-start mb-3 text-xs font-semibold px-3 py-1 rounded-full bg-brand text-white">Most popular</span>
              )}
              <h3 className="font-bold text-lg">{plan.name}</h3>
              <p className="text-sm opacity-60 mt-1 mb-4">{plan.description}</p>
              <div className="mb-6">
                {plan.price === -1 ? (
                  <span className="text-3xl font-extrabold">Custom</span>
                ) : (
                  <>
                    <span className="text-3xl font-extrabold">₹{plan.price}</span>
                    <span className="text-sm opacity-60">/{plan.period}</span>
                  </>
                )}
              </div>
              <ul className="space-y-2.5 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={15} className="text-brand mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSubscribed(plan.name)}
                className={`w-full py-2.5 rounded-full font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-brand text-white hover:bg-brand-dark"
                    : "border border-brand/30 hover:bg-brand/10"
                }`}
              >
                {subscribed === plan.name ? "Selected ✓" : plan.cta}
              </button>
            </div>
          ))}
        </div>

        {subscribed && (
          <p className="text-center text-sm text-brand font-medium mt-8">
            You selected the {subscribed} plan. (Payment integration not wired up in this demo build.)
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
