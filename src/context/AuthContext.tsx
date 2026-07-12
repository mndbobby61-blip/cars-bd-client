"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { api } from "@/lib/api";
import { AuthUser } from "@/lib/types";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const COOKIE_KEY = "autobazaar_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = Cookies.get(COOKIE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        Cookies.remove(COOKIE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persist = (authUser: AuthUser) => {
    setUser(authUser);
    Cookies.set(COOKIE_KEY, JSON.stringify(authUser), { expires: 7 });
  };

  const login = async (email: string, password: string) => {
    const data = await api.post<AuthUser>("/auth/login", { email, password });
    persist(data);
  };

  const loginWithGoogle = async (credential: string) => {
    const data = await api.post<AuthUser>("/auth/google", { credential });
    persist(data);
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const data = await api.post<AuthUser>("/auth/register", { name, email, password, phone });
    persist(data);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove(COOKIE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}