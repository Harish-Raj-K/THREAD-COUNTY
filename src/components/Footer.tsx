import Link from "next/link";
import { Scissors, Globe, AtSign, Link2, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-brand/10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center text-white">
              <Scissors size={16} />
            </span>
            ThreadCounty
          </Link>
          <p className="text-sm opacity-70 max-w-xs">
            AI-powered fabric analysis for designers, mills, and quality teams — instant thread density, weave, and fabric type reports.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Twitter / X" className="opacity-70 hover:opacity-100 hover:text-brand"><AtSign size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="opacity-70 hover:opacity-100 hover:text-brand"><Link2 size={18} /></a>
            <a href="#" aria-label="GitHub" className="opacity-70 hover:opacity-100 hover:text-brand"><Globe size={18} /></a>
            <a href="#" aria-label="Instagram" className="opacity-70 hover:opacity-100 hover:text-brand"><MessageCircle size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Product</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href="/#features" className="hover:text-brand">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-brand">Pricing</Link></li>
            <li><Link href="/upload" className="hover:text-brand">Upload</Link></li>
            <li><Link href="/history" className="hover:text-brand">History</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Company</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href="/about" className="hover:text-brand">About</Link></li>
            <li><Link href="/contact" className="hover:text-brand">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-brand">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Account</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link href="/login" className="hover:text-brand">Log in</Link></li>
            <li><Link href="/signup" className="hover:text-brand">Sign up</Link></li>
            <li><Link href="/dashboard" className="hover:text-brand">Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand/10 py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} ThreadCounty. Built for the ThreadCounty Hackathon.
      </div>
    </footer>
  );
}
