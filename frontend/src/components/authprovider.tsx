"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { request } from "@/lib/api";

type AuthCtxShape = {
  loading: boolean;
  logout(): Promise<void>;
};

const AuthCtx = createContext<AuthCtxShape | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  // 📡  Ping once on mount to validate the session cookie
  useEffect(() => {
    (async () => {
      try {
        await request("/dashboard"); // returns 200 only if logged-in
      } catch {
        /* ignore */
      }
      setLoading(false);
    })();
  }, []);

  const logout = async () => {
    await request("/logout", { method: "POST" });
    window.location.href = "/"; // flush client state
  };

  return (
    <AuthCtx.Provider value={{ loading, logout }}>{children}</AuthCtx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
