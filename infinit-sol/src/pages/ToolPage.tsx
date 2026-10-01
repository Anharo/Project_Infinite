// src/pages/ToolPage.tsx
import { Link, useLocation, useParams } from "react-router-dom";
import { getTool } from "../lib/tools";

export default function ToolPage() {
  const { toolId } = useParams();
  const location = useLocation();
  const tool = getTool(toolId);
  const state = location.state as { fileName?: string; fileSize?: number } | null;

  if (!tool) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-950">
        <p className="text-slate-600 dark:text-slate-300">Tool not found.</p>
        <Link to="/dashboard" className="text-sm font-medium text-indigo-600 hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
        <div
          className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${tool.badge} text-xl font-bold text-white shadow-lg`}
        >
          {tool.name.slice(-1)}
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{tool.name}</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          This feature is currently being built. Check back soon.
        </p>

        {state?.fileName && (
          <div className="mt-6 rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            Received: <span className="font-medium">{state.fileName}</span>
          </div>
        )}

        <Link
          to="/dashboard"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}