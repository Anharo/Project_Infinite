// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ToolPage from "./pages/ToolPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthed } from "./lib/auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthed() ? <Navigate to="/dashboard" replace /> : <SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tools/:toolId"
          element={
            <ProtectedRoute>
              <ToolPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}