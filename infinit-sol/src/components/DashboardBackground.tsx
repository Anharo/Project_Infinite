// src/components/DashboardBackground.tsx
export default function DashboardBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Dot grid, fades out toward the edges */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle,rgb(100_116_139/0.25)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)] dark:bg-[radial-gradient(circle,rgb(148_163_184/0.18)_1px,transparent_1px)]"
      />

      {/* Drifting aurora blobs */}
      <div className="animate-drift-1 absolute -top-40 -left-32 h-130 w-130 rounded-full bg-indigo-500/25 blur-3xl dark:bg-indigo-600/25" />
      <div className="animate-drift-2 absolute top-1/3 -right-40 h-120 w-120 rounded-full bg-fuchsia-500/20 blur-3xl dark:bg-fuchsia-600/20" />
      <div className="animate-drift-3 absolute -bottom-40 left-1/3 h-110 w-110 rounded-full bg-sky-500/20 blur-3xl dark:bg-sky-600/20" />
    </div>
  );
}