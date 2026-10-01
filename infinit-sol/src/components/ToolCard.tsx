// src/components/ToolCard.tsx
import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import type { Tool } from "../lib/tools";

interface Props {
  tool: Tool;
  onExecute: (tool: Tool, file: File) => void;
}

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

export default function ToolCard({ tool, onExecute }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
    e.target.value = "";
  };

  const actionsVisible = file || dragging;

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group relative flex h-56 flex-col overflow-hidden rounded-2xl border bg-white/70 p-5 backdrop-blur-md transition-all duration-200 dark:bg-slate-900/60 ${
        dragging
          ? "scale-[1.02] border-indigo-500 ring-4 ring-indigo-500/20"
          : "border-slate-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:hover:border-indigo-700"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${tool.badge} text-sm font-bold text-white shadow-md`}
        >
          {tool.name.slice(-1)}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white">{tool.name}</h3>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{tool.description}</p>
        </div>
      </div>

      {/* Drop hint / file chip */}
      <div className="mt-auto mb-14">
        {file ? (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
            <div className="min-w-0">
              <p className="truncate font-medium text-slate-800 dark:text-slate-100">{file.name}</p>
              <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              aria-label="Remove file"
              className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 px-3 py-2 text-center text-xs text-slate-400 dark:border-slate-700">
            {dragging ? (
              "Release to attach file"
            ) : (
              <>
                <span className="touch:hidden">Drag & drop a file here</span>
                <span className="hidden touch:inline">Tap Upload to choose a file</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Hover actions (always visible on touch devices) */}
      <div
        className={`absolute inset-x-0 bottom-0 flex gap-2 border-t border-slate-100 bg-white/95 p-3 backdrop-blur transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 touch:translate-y-0 touch:opacity-100 dark:border-slate-800 dark:bg-slate-900/95 ${
          actionsVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="*/*"
          className="hidden"
          onChange={handleSelect}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0-12l-4 4m4-4l4 4" />
          </svg>
          Upload
        </button>
        <button
          type="button"
          disabled={!file}
          onClick={() => file && onExecute(tool, file)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Execute
        </button>
      </div>
    </div>
  );
}