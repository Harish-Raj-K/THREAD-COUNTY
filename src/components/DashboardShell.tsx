"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import {
  LayoutDashboard, Upload, History, User, Settings, LogOut, Scissors, ShieldCheck, Bell,
} from "lucide-react";
import { useAuth } from "@/lib/authContext";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/history", label: "History", icon: History },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export function DashboardShell({ children, requireAuth = true }: { children: ReactNode; requireAuth?: boolean }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      router.push("/login");
    }
  }, [loading, user, requireAuth, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm opacity-60">
        Loading...
      </div>
    );
  }

  if (requireAuth && !user) return null;

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-60 shrink-0 border-r border-brand/10 flex-col p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8 px-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-accent flex items-center justify-center text-white">
            <Scissors size={16} />
          </span>
          ThreadCounty
        </Link>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? "bg-brand text-white" : "hover:bg-brand/10 opacity-80"
                }`}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={() => { signOut(); router.push("/"); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium opacity-80 hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut size={17} /> Log out
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-brand/10 flex items-center justify-between px-4 sm:px-6 sticky top-0 bg-background/90 backdrop-blur z-30">
          <div className="md:hidden flex items-center gap-2 font-bold">
            <Scissors size={18} className="text-brand" /> ThreadCounty
          </div>
          <div className="hidden md:block text-sm opacity-60">
            {navItems.find((n) => n.href === pathname)?.label ?? ""}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-brand/10" aria-label="Notifications">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
            </button>
            <ThemeToggle />
            {user && (
              <div className="w-9 h-9 rounded-full bg-brand/15 text-brand flex items-center justify-center font-semibold text-sm">
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>

        <nav className="md:hidden border-t border-brand/10 flex justify-around py-2 sticky bottom-0 bg-background/95 backdrop-blur">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 text-[10px] px-2 py-1 ${active ? "text-brand" : "opacity-60"}`}>
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
