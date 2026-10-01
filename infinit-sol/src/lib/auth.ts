// src/lib/auth.ts
export type Method = "email" | "companyId";

const KEY = "infinit_session";

const DEMO_USERS = [
  { method: "email" as Method, identifier: "demo@infinit.com", password: "password123" },
  { method: "companyId" as Method, identifier: "INF-1001", password: "password123" },
];

export async function login(method: Method, identifier: string, password: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 800));
  const ok = DEMO_USERS.some(
    (u) =>
      u.method === method &&
      u.identifier.toLowerCase() === identifier.trim().toLowerCase() &&
      u.password === password,
  );
  if (!ok) throw new Error("Invalid credentials.");
  localStorage.setItem(KEY, JSON.stringify({ identifier: identifier.trim(), method }));
}

export function logout(): void {
  localStorage.removeItem(KEY);
}

export function getSession(): { identifier: string; method: Method } | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const isAuthed = (): boolean => getSession() !== null;