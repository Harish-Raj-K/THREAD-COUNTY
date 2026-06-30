"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase, isSupabaseConfigured } from "./supabaseClient";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  plan: string;
  avatarUrl?: string;
  createdAt: string;
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string, remember: boolean) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<AppUser>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_KEY = "threadcounty_mock_user";
const MOCK_DB_KEY = "threadcounty_mock_users_db";

function readMockDb(): Record<string, { name: string; email: string; password: string; createdAt: string }> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(MOCK_DB_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeMockDb(db: Record<string, unknown>) {
  localStorage.setItem(MOCK_DB_KEY, JSON.stringify(db));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        const u = data.session?.user;
        if (u) {
          setUser({
            id: u.id,
            name: (u.user_metadata?.name as string) || u.email || "User",
            email: u.email || "",
            plan: "Free",
            createdAt: u.created_at,
          });
        }
        setLoading(false);
      });
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        const u = session?.user;
        if (u) {
          setUser({
            id: u.id,
            name: (u.user_metadata?.name as string) || u.email || "User",
            email: u.email || "",
            plan: "Free",
            createdAt: u.created_at,
          });
        } else {
          setUser(null);
        }
      });
      return () => listener.subscription.unsubscribe();
    } else {
      const stored = localStorage.getItem(MOCK_USER_KEY) || sessionStorage.getItem(MOCK_USER_KEY);
      if (stored) setUser(JSON.parse(stored));
      setLoading(false);
    }
  }, []);

  async function signUp(name: string, email: string, password: string) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      return { error: error?.message };
    }
    const db = readMockDb();
    if (db[email]) return { error: "An account with this email already exists." };
    db[email] = { name, email, password, createdAt: new Date().toISOString() };
    writeMockDb(db);
    const newUser: AppUser = { id: email, name, email, plan: "Free", createdAt: db[email].createdAt };
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return {};
  }

  async function signIn(email: string, password: string, remember: boolean) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message };
    }
    const db = readMockDb();
    const record = db[email];
    if (!record || record.password !== password) {
      return { error: "Invalid email or password." };
    }
    const loggedUser: AppUser = { id: email, name: record.name, email, plan: "Free", createdAt: record.createdAt };
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(MOCK_USER_KEY, JSON.stringify(loggedUser));
    setUser(loggedUser);
    return {};
  }

  async function signOut() {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(MOCK_USER_KEY);
    sessionStorage.removeItem(MOCK_USER_KEY);
    setUser(null);
  }

  function updateProfile(data: Partial<AppUser>) {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      const storage = localStorage.getItem(MOCK_USER_KEY) ? localStorage : sessionStorage;
      storage.setItem(MOCK_USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
