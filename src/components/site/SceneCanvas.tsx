import { useEffect, useRef, useState } from "react";
import { useMotion } from "./motion";
import type { LivingSystem } from "@/lib/living-system";

const CHAPTERS = [
  { name: "Cosmos", scale: "10²¹ m", line: "A spiral galaxy, 100,000 light-years across" },
  { name: "Earth", scale: "10⁷ m", line: "One small, living planet" },
  { name: "Code of life", scale: "10⁻⁹ m", line: "A double helix of instructions" },
  { name: "Growth", scale: "10⁻¹ m", line: "Golden-angle patterns in a bloom" },
  { name: "Atom", scale: "10⁻¹⁰ m", line: "Almost entirely empty space" },
  { name: "Singularity", scale: "∞", line: "Where everything begins again" },
];

/** Single fixed WebGL canvas; scroll position plays the "film" through six worlds. */
export function SceneCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const hudNum = useRef<HTMLSpanElement>(null);
  const hudName = useRef<HTMLSpanElement>(null);
  const hudScale = useRef<HTMLSpanElement>(null);
  const hudLine = useRef<HTMLSpanElement>(null);
  const hudBar = useRef<HTMLSpanElement>(null);
  const sys = useRef<LivingSystem | null>(null);
  const [failed, setFailed] = useState(false);
  const { reduced } = useMotion();

  useEffect(() => {
    let disposed = false;
    let last = -1;
    const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const sceneOf = (el?: HTMLElement) => Number(el?.dataset["scene"] ?? 0);

    const compute = () => {
      const c = scrollY + innerHeight * 0.5;
      let p = sceneOf(secs[0]);
      for (let k = 0; k < secs.length; k++) {
        const el = secs[k]!;
        const rect = el.getBoundingClientRect();
        const top = rect.top + scrollY, h = rect.height;
        if (c >= top && c < top + h) {
          const s = sceneOf(el), n = k + 1 < secs.length ? sceneOf(secs[k + 1]) : s;
          const t = Math.min(1, Math.max(0, (c - (top + h * 0.6)) / (h * 0.4)));
          p = s + (n - s) * t;
          break;
        }
        if (k === secs.length - 1 && c >= top + h) p = sceneOf(el);
      }
      sys.current?.setProgress(p);
      const ch = Math.round(p);
      if (hudBar.current) hudBar.current.style.transform = `scaleX(${Math.max(0.02, p / 5)})`;
      if (ch !== last) {
        last = ch;
        const d = CHAPTERS[ch]!;
        if (hudNum.current) hudNum.current.textContent = `0${ch + 1}`;
        if (hudName.current) hudName.current.textContent = d.name;
        if (hudScale.current) hudScale.current.textContent = d.scale;
        if (hudLine.current) hudLine.current.textContent = d.line;
      }
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; compute(); });
    };

    import("@/lib/living-system")
      .then(({ createLivingSystem }) => {
        if (disposed || !ref.current) return;
        try {
          sys.current = createLivingSystem(ref.current);
          sys.current.setReducedMotion(document.documentElement.classList.contains("reduce-motion"));
          compute();
        } catch {
          setFailed(true);
        }
      })
      .catch(() => setFailed(true));

    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    compute();
    return () => {
      disposed = true;
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      sys.current?.dispose();
      sys.current = null;
    };
  }, []);

  useEffect(() => sys.current?.setReducedMotion(reduced), [reduced]);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        {failed ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,var(--primary)_0%,transparent_45%)] opacity-30" />
        ) : (
          <canvas ref={ref} className="h-full w-full opacity-70 md:opacity-100" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_50%,var(--graphite)_0%,transparent_50%)] opacity-60" />
      </div>
      <div aria-hidden className="pointer-events-none fixed bottom-5 right-5 z-40 hidden w-72 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground md:block">
        <div className="flex items-baseline justify-between">
          <span>
            <span ref={hudNum} className="text-foreground">01</span> / 06 · <span ref={hudName} className="text-foreground">Cosmos</span>
          </span>
          <span ref={hudScale} className="text-amber">10²¹ m</span>
        </div>
        <span className="mt-2 block h-px w-full bg-rule">
          <span ref={hudBar} className="block h-px origin-left bg-primary transition-transform duration-300" style={{ transform: "scaleX(0.02)" }} />
        </span>
        <span ref={hudLine} className="mt-2 block normal-case tracking-normal">A spiral galaxy, 100,000 light-years across</span>
      </div>
    </>
  );
}
