// src/pages/Dashboard.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToolCard from "../components/ToolCard";
import { tools, type Tool } from "../lib/tools";
import { getSession, logout } from "../lib/auth";
import DashboardBackground from "../components/DashboardBackground";

export default function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => tools.filter((t) => t.name.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  const handleExecute = (tool: Tool, file: File) => {
    navigate(`/tools/${tool.id}`, { state: { fileName: file.name, fileSize: file.size } });
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="relative min-h-screen">
  <DashboardBackground />
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Infinit Sol</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block dark:text-slate-400">
              {session?.identifier}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Tools</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Drag a file onto a tool, or hover and upload, then hit Execute.
            </p>
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter tools..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:w-64 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-500">No tools match "{query}".</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onExecute={handleExecute} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}