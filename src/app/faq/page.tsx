"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { faqData } from "@/lib/mockData";
import { Search } from "lucide-react";

export default function FAQPage() {
  const [query, setQuery] = useState("");

  const filtered = faqData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (i) => i.q.toLowerCase().includes(query.toLowerCase()) || i.a.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-3">Frequently asked questions</h1>
          <p className="opacity-70">Everything you need to know about ThreadCounty.</p>
        </div>

        <div className="relative mb-10">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full pl-9 pr-3 py-3 rounded-lg border border-brand/20 bg-transparent outline-none focus:border-brand text-sm"
          />
        </div>

        {filtered.map((cat) => (
          <div key={cat.category} className="mb-10">
            <h2 className="text-lg font-bold mb-4 text-brand">{cat.category}</h2>
            <div className="space-y-3">
              {cat.items.map((item) => (
                <details key={item.q} className="card p-5 group">
                  <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                    {item.q}
                    <span className="text-brand group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm opacity-70 mt-3">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center opacity-60 text-sm">No results found for &ldquo;{query}&rdquo;.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
