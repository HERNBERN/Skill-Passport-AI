import { useCallback, useEffect, useState } from "react";
import { DEMO_ACCOUNTS, type Role } from "@/data/demo";

export interface Session {
  email: string;
  name: string;
  role: Role;
}

const KEY = "skilllens.session";
const EVT = "skilllens:session";

export function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signOut() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVT));
}

export function signIn(email: string, password: string): Session | null {
  const account = DEMO_ACCOUNTS[email.trim().toLowerCase()];
  if (!account || account.password !== password) return null;
  const session: Session = {
    email: email.trim().toLowerCase(),
    name: account.name,
    role: account.role,
  };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(EVT));
  return session;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const sync = useCallback(() => setSession(readSession()), []);

  useEffect(() => {
    sync();
    setReady(true);
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  return { session, ready };
}

const THEME_KEY = "skilllens.theme";

export function useTheme() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  return { dark, toggle };
}
