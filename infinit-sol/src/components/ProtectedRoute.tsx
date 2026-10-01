// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isAuthed } from "../lib/auth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  return isAuthed() ? <>{children}</> : <Navigate to="/" replace />;
}