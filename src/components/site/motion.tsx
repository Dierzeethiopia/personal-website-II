import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const MotionCtx = createContext<{ reduced: boolean; toggle: () => void }>({ reduced: false, toggle: () => {} });
export const useMotion = () => useContext(MotionCtx);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("motion");
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(stored ? stored === "off" : mq);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
  }, [reduced]);
  const toggle = () =>
    setReduced((r) => {
      localStorage.setItem("motion", r ? "on" : "off");
      return !r;
    });
  return <MotionCtx.Provider value={{ reduced, toggle }}>{children}</MotionCtx.Provider>;
}

/** Adds `.in` to every [data-reveal] element when it enters the viewport. */
export function useRevealAll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    };
    const leave = () => (el.style.transform = "");
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <span ref={ref} className={`inline-block transition-transform duration-300 ease-out-expo ${className}`}>
      {children}
    </span>
  );
}

export function Mask({ children }: { children: ReactNode }) {
  return (
    <span className="mask">
      <span>{children}</span>
    </span>
  );
}
