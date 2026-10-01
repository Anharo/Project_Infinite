// src/components/CursorHaze.tsx
import { useEffect, useRef } from "react";

export default function CursorHaze() {
  const blobRef = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x1 = tx, y1 = ty;
    let x2 = tx, y2 = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const tick = () => {
      // two blobs trail the cursor at different speeds for a layered haze
      x1 += (tx - x1) * 0.08;
      y1 += (ty - y1) * 0.08;
      x2 += (tx - x2) * 0.035;
      y2 += (ty - y2) * 0.035;
      if (blobRef.current)
        blobRef.current.style.transform = `translate3d(${x1 - 250}px, ${y1 - 250}px, 0)`;
      if (blob2Ref.current)
        blob2Ref.current.style.transform = `translate3d(${x2 - 350}px, ${y2 - 350}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        ref={blob2Ref}
        className="absolute top-0 left-0 h-175 w-175 rounded-full bg-fuchsia-500/25 blur-3xl will-change-transform dark:bg-fuchsia-600/20"
      />
      <div
        ref={blobRef}
        className="absolute top-0 left-0 h-125 w-125 rounded-full bg-indigo-500/35 blur-3xl will-change-transform dark:bg-indigo-500/30"
      />
    </div>
  );
}