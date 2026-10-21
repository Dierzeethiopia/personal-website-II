import { useState } from "react";
import { useMotion } from "./motion";

const items = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Mark() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
      <path d="M6 6h9a14 14 0 0 1 0 28H6z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 34 29 6l9 28M23.5 24h11" fill="none" className="stroke-primary" strokeWidth="2" />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { reduced, toggle } = useMotion();
  const MotionBtn = (
    <button
      onClick={toggle}
      aria-pressed={!reduced}
      className="label-mono flex min-h-11 items-center gap-2 rounded-full border border-border px-3 transition-colors duration-200 hover:text-foreground"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${reduced ? "bg-muted-foreground" : "bg-primary animate-pulse"}`} />
      Motion {reduced ? "off" : "on"}
    </button>
  );
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1680px] items-center justify-between px-5 md:px-10" aria-label="Primary">
        <a href="#top" className="flex items-center gap-3 text-foreground" aria-label="Dires Abatieneh — home">
          <Mark />
          <span className="label-mono hidden sm:inline">Dires Abatieneh</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {items.map((i) => (
            <li key={i.href}>
              <a href={i.href} className="link-u text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground">
                {i.label}
              </a>
            </li>
          ))}
          <li>{MotionBtn}</li>
        </ul>
        <button
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 h-px w-6 bg-foreground transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-6 bg-foreground transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background px-5 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col">
            {items.map((i, n) => (
              <li key={i.href} className="border-b border-border">
                <a href={i.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4 font-display text-3xl">
                  {i.label}
                  <span className="label-mono">0{n + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6">{MotionBtn}</div>
        </div>
      )}
    </header>
  );
}
