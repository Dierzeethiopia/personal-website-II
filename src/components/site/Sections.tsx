import { useRef, useState, type ReactNode } from "react";
import { community, experience, links, metrics, profile, programs, projects, skills, supporting, type Project } from "@/data/profile";
import { Magnetic, Mask } from "./motion";
import { ProjectArt } from "./ProjectArt";

const wrap = "relative z-10 mx-auto max-w-[1680px] px-5 md:px-10";

function SectionHead({ index, label, title }: { index: string; label: string; title?: ReactNode }) {
  return (
    <header data-reveal className="mb-12 md:mb-20">
      <div className="flex items-center gap-4">
        <span className="label-mono">{index}</span>
        <span className="rule-draw h-px flex-1 bg-rule" />
        <span className="label-mono">{label}</span>
      </div>
      {title && <h2 className="text-display mt-8 max-w-5xl">{title}</h2>}
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" data-scene="0" className={`${wrap} relative flex min-h-[100svh] flex-col justify-center pb-20 pt-28`}>
      <img
        src="/profile-photo.jpe"
        alt="Dires Abatieneh"
        className="absolute right-5 top-[calc(7rem-0.5cm)] hidden h-72 w-56 rounded-sm border border-border object-cover opacity-90 md:block lg:right-10 lg:h-96 lg:w-72"
      />
      <div data-reveal className="max-w-4xl">
        <p className="label-mono mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-primary" />
          <span lang="am">{profile.greeting}</span>
        </p>
        <h1 className="text-mega">
          <Mask>Dires</Mask>
          <Mask>Abatieneh</Mask>
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground">{profile.tagline}</p>
        <dl className="mt-8 grid max-w-xl gap-x-8 gap-y-2 border-t border-border pt-5 sm:grid-cols-2">
          <div><dt className="label-mono">Study</dt><dd className="text-sm">{profile.school}</dd></div>
          <div><dt className="label-mono">Experience</dt><dd className="text-sm">{profile.previously}</dd></div>
        </dl>
        <div className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <a href="#work" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-primary px-7 font-medium text-primary-foreground transition-transform duration-200 hover:scale-[1.03]">
              Explore my work <span aria-hidden>↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="inline-flex min-h-12 items-center rounded-full border border-rule px-7 transition-colors duration-200 hover:border-foreground">
              Get in touch
            </a>
          </Magnetic>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-10 items-center gap-3 rounded-full border border-border px-4 text-sm transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-foreground text-[0.65rem] font-bold text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">in</span>
            LinkedIn <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-10 items-center gap-3 rounded-full border border-border px-4 text-sm transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-foreground text-[0.65rem] font-bold text-background transition-colors group-hover:bg-primary group-hover:text-primary-foreground">GH</span>
            GitHub <span aria-hidden className="transition-transform group-hover:translate-x-0.5">↗</span>
          </a>
        </div>
      </div>
      <a href="#strip" className="label-mono absolute bottom-8 left-5 flex items-center gap-3 md:left-10" aria-label="Scroll to content">
        <span className="relative block h-10 w-px overflow-hidden bg-rule">
          <span className="absolute inset-x-0 top-0 h-3 animate-[scrollcue_1.8s_ease-in-out_infinite] bg-primary" />
        </span>
        Scroll
      </a>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(400%)}}`}</style>
    </section>
  );
}

export function Strip() {
  const items = [
    ["Slack / Salesforce", "Infra SWE Intern ’26"],
    ["Guba Technologies", "SWE · Full Stack Intern · Summer 2025"],
    ["Williams Student Online", "Ops & Backend Developer · Student-run website at Williams College"],
    ["Arada Academy", "Founder · 2024"],
  ];
  return (
    <section id="strip" data-scene="0" className="relative z-10 border-y border-border bg-background/60 backdrop-blur-sm">
      <div data-reveal className={`${wrap} grid grid-cols-2 md:grid-cols-4`}>
        {items.map(([a, b], i) => (
          <div key={a} className="fade border-border py-7 pr-4 md:border-l md:pl-6 md:first:border-l-0 md:first:pl-0" style={{ transitionDelay: `${i * 80}ms` }}>
            <p className="font-display text-xl md:text-2xl">{a}</p>
            <p className="label-mono mt-1">{b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" data-scene="1" className={`${wrap} py-28 md:py-40`}>
      <SectionHead index="01" label="Experience" />
      <ol className="relative mt-24 border-l border-border pl-8 md:ml-[33%]">
        {experience.map((e, i) => (
          <li key={e.org + e.role} data-reveal className="relative pb-12 last:pb-0">
            <span className={`absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full ${e.current ? "bg-amber" : "bg-primary"} fade`} />
            <div className="fade" style={{ transitionDelay: `${i * 40}ms` }}>
              {e.meta && <p className="label-mono">{e.meta}</p>}
              <h3 className="mt-2 font-display text-2xl">{e.org}</h3>
              <p className="text-muted-foreground">{e.role}</p>
              {e.points.length > 0 && (
                <ul className="mt-3 max-w-2xl space-y-1 text-[0.95rem]">
                  {e.points.map((p) => <li key={p}>— {p}</li>)}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProjectCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (p: Project, el: HTMLElement) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const big = i === 0 || i === 3;
  const tilt = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  };
  return (
    <article data-reveal className={`${big ? "lg:col-span-7" : "lg:col-span-5"} ${i === 1 ? "lg:mt-32" : ""}`}>
      <button
        onClick={(e) => onOpen(p, e.currentTarget)}
        className="group block w-full text-left"
        aria-haspopup="dialog"
        aria-label={`${p.title} — open details`}
      >
        <div
          ref={ref}
          onPointerMove={tilt}
          onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
          className="depth aspect-[400/260] overflow-hidden rounded-sm border border-border bg-card/70 transition-[transform,border-color] duration-500 ease-out-expo group-hover:border-primary"
        >
          <ProjectArt kind={p.art} />
        </div>
        <div className="fade mt-6 flex items-start justify-between gap-6">
          <div>
            <p className="label-mono">{String(i + 1).padStart(2, "0")} · {p.status}</p>
            <h3 className="text-title mt-2">{p.title}</h3>
            <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
          </div>
          <span className="mt-8 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:text-primary" aria-hidden>↗</span>
        </div>
        <p className="fade mt-3 max-w-xl text-[0.95rem]">{p.summary}</p>
        <ul className="fade mt-4 flex flex-wrap gap-2">
          {p.tech.map((t) => <li key={t} className="label-mono rounded-full border border-border px-3 py-1">{t}</li>)}
        </ul>
      </button>
    </article>
  );
}

export function Work() {
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<Project | null>(null);
  const open = (p: Project, el: HTMLElement) => {
    opener.current = el;
    setActive(p);
    requestAnimationFrame(() => dlg.current?.showModal());
  };
  const close = () => dlg.current?.close();
  return (
    <section id="work" data-scene="2" className={`${wrap} py-28 md:py-40`}>
      <SectionHead index="02" label="Selected work" title={<>Making AI output <span className="text-primary">checkable</span>, and systems trustworthy.</>} />
      <div className="grid gap-x-12 gap-y-24 lg:grid-cols-12">
        {projects.map((p, i) => <ProjectCard key={p.id} p={p} i={i} onOpen={open} />)}
      </div>
      <dialog
        ref={dlg}
        onClose={() => opener.current?.focus()}
        onClick={(e) => e.target === dlg.current && close()}
        aria-labelledby="dlg-title"
        className="m-auto max-h-[90svh] w-[min(56rem,94vw)] overflow-y-auto rounded-sm border border-border bg-card p-0 text-card-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in-0 open:zoom-in-95"
      >
        {active && (
          <div>
            <div className="aspect-[400/180] overflow-hidden border-b border-border"><ProjectArt kind={active.art} /></div>
            <div className="p-6 md:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label-mono">{active.status}</p>
                  <h3 id="dlg-title" className="text-display mt-2">{active.title}</h3>
                  <p className="mt-2 text-muted-foreground">{active.subtitle}</p>
                </div>
                <button onClick={close} autoFocus className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rule hover:border-foreground" aria-label="Close details">✕</button>
              </div>
              <p className="mt-6 max-w-2xl">{active.summary}</p>
              <div className="mt-8 grid gap-8 md:grid-cols-3">
                {active.details.map((d) => (
                  <div key={d.heading} className="border-t border-border pt-4">
                    <p className="label-mono">{d.heading}</p>
                    <ul className="mt-3 space-y-2 text-[0.95rem]">{d.items.map((x) => <li key={x}>{x}</li>)}</ul>
                  </div>
                ))}
              </div>
              <ul className="mt-8 flex flex-wrap gap-2">{active.tech.map((t) => <li key={t} className="label-mono rounded-full border border-border px-3 py-1">{t}</li>)}</ul>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

export function Ventures() {
  return (
    <section id="ventures" data-scene="3" className={`${wrap} py-28 md:py-40`}>
      <SectionHead index="03" label="Ventures & community" title={<>Engineering for <span className="text-amber">access</span> to education.</>} />
      <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
        <article data-reveal className="bg-background/85 p-8 backdrop-blur-sm md:p-12">
          <p className="label-mono fade">Founded July 2024</p>
          <h3 className="text-title fade mt-3">Arada Academy</h3>
          <p className="fade mt-4 max-w-lg text-muted-foreground">Supporting students navigating international education through resources, mentorship, application guidance and essay support — the help I wished was easier to find.</p>
        </article>
        <article data-reveal className="bg-background/85 p-8 backdrop-blur-sm md:p-12">
          <p className="label-mono fade">Planned · pilot Oct 28 – Dec 30, 2026</p>
          <h3 className="text-title fade mt-3">OpportunityOS Ethiopia</h3>
          <p className="fade mt-4 max-w-lg text-muted-foreground">A student-powered, AI-assisted network for discovering and pursuing scholarships, internships, fellowships, research and mentorship.</p>
          <div className="fade mt-8 flex gap-10">
            <div><p className="font-display text-4xl text-amber">{metrics.opportunityUniversitiesTarget}</p><p className="label-mono">Universities · target</p></div>
            <div><p className="font-display text-4xl text-amber">{metrics.opportunityStudentsTarget}</p><p className="label-mono">Students · target</p></div>
          </div>
        </article>
      </div>
      <div data-reveal className="mt-16 grid gap-8 md:grid-cols-12">
        <p className="label-mono fade md:col-span-3">Community leadership</p>
        <ul className="md:col-span-9">
          {community.map((c, i) => (
            <li key={c.org} className="fade grid grid-cols-1 gap-1 border-t border-border py-5 sm:grid-cols-2" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="font-display text-xl">{c.role}</span>
              <span className="text-muted-foreground">{c.org}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Story() {
  const cities = [
    { x: 60, y: 210, name: "Addis Ababa", am: "አዲስ አበባ" },
    { x: 330, y: 70, name: "Williamstown", am: "" },
    { x: 560, y: 160, name: "San Francisco", am: "" },
  ];
  return (
    <section id="about" data-scene="3" className="theme-ivory relative z-10 py-28 md:py-40">
      <div className={wrap}>
        <SectionHead index="04" label="About" title={<>Addis Ababa <span className="text-primary">→</span> Williamstown <span className="text-primary">→</span> San Francisco</>} />
        <div className="grid gap-16 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-7">
            <svg viewBox="0 0 640 280" className="w-full" role="img" aria-label="Route from Addis Ababa to Williamstown to San Francisco">
              <path d="M60 210 C160 40, 250 40, 330 70 S 500 220, 560 160" fill="none" className="stroke-rule" strokeWidth="1" />
              <path d="M60 210 C160 40, 250 40, 330 70 S 500 220, 560 160" fill="none" pathLength={1} className="draw-path stroke-primary" strokeWidth="2" />
              {cities.map((c, i) => (
                <g key={c.name} className="fade" style={{ transitionDelay: `${400 + i * 500}ms` }}>
                  <circle cx={c.x} cy={c.y} r="14" fill="none" className="stroke-amber" />
                  <circle cx={c.x} cy={c.y} r="5" className="fill-foreground" />
                  <text x={c.x} y={c.y + 36} textAnchor="middle" className="fill-foreground font-display" fontSize="16">{c.name}</text>
                  {c.am && <text x={c.x} y={c.y + 54} textAnchor="middle" className="fill-muted-foreground" fontSize="12" lang="am">{c.am}</text>}
                </g>
              ))}
            </svg>
          </div>
          <div data-reveal className="space-y-5 text-lg lg:col-span-5">
            <p className="fade">I grew up in Ethiopia and now study Computer Science and Mathematics at Williams College. I like understanding systems all the way down, why a scheduler retries, why a proof holds.</p>
            <p className="fade" style={{ transitionDelay: "100ms" }}>That same curiosity is why I care about access to education: the right resource at the right time changed my path, and I want to build the infrastructure that makes that ordinary.</p>
          </div>
        </div>
        <div data-reveal className="mt-20 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
          <div className="fade md:col-span-5">
            <p className="label-mono">Education</p>
            <h3 className="text-title mt-3">Williams College</h3>
            <p className="mt-2">B.A. Computer Science & Mathematics</p>
            <p className="label-mono mt-2">Expected May 2028 · Dean’s List</p>
          </div>
          <div className="fade md:col-span-7">
            <p className="label-mono">Relevant study</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["Distributed Systems", "Algorithms", "Computer Organization", "Probability", "AI", "NLP"].map((c) => (
                <li key={c} className="rounded-full border border-rule px-4 py-1.5 text-sm">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Index() {
  return (
    <section id="index" data-scene="4" className={`${wrap} py-28 md:py-40`}>
      <SectionHead index="05" label="Index" title="More projects & tools." />
      <div className="grid gap-16 lg:grid-cols-12">
        <ul data-reveal className="lg:col-span-7">
          {supporting.map((s, i) => (
            <li key={s.title} className="fade grid gap-2 border-t border-border py-6 md:grid-cols-[3rem_1fr_1fr]" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl">{s.title}</span>
              <span><span className="label-mono block">{s.tech}</span><span className="text-sm text-muted-foreground">{s.note}</span></span>
            </li>
          ))}
        </ul>
        <div data-reveal className="space-y-6 lg:col-span-5">
          {skills.map((s) => (
            <div key={s.area} className="fade">
              <p className="label-mono">{s.area}</p>
              <p className="mt-1">{s.items.join(" · ")}</p>
            </div>
          ))}
          <div className="fade border-t border-border pt-6">
            <p className="label-mono">Programs</p>
            <p className="mt-1 text-muted-foreground">{programs.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  return (
    <section id="ethiopia" className={`${wrap} py-28 md:py-40`}>
      <SectionHead index="06" label="Ethiopia" title="A place that stays with me." />
      <div className="grid gap-6 md:grid-cols-3">
        <figure data-reveal className="fade overflow-hidden rounded-sm border border-border bg-card/70">
          <img
            src="/ethiopian-baskets.png"
            alt="Colorful handwoven Ethiopian baskets"
            className="h-56 w-full object-cover md:h-72"
          />
        </figure>
        <figure data-reveal className="fade overflow-hidden rounded-sm border border-border bg-card/70">
          <img
            src="/ethiopian-lalibela.png"
            alt="Nighttime candlelight celebration at a historic Ethiopian church"
            className="h-56 w-full object-cover md:h-72"
          />
        </figure>
        <figure data-reveal className="fade overflow-hidden rounded-sm border border-border bg-card/70">
          <img
            src="/invincible-poster.png"
            alt="Invincible animated series poster"
            className="h-56 w-full object-cover md:h-72"
          />
        </figure>
      </div>
    </section>
  );
}

export function Contact() {
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setState("ok");
    } catch {
      setState("err");
    }
    setTimeout(() => setState("idle"), 2200);
  };
  return (
    <section id="contact" data-scene="5" className={`${wrap} flex min-h-[90svh] flex-col justify-center py-28`}>
      <p className="label-mono">07 · Contact</p>
      <h2 data-reveal className="text-mega mt-8">
        <Mask>Let’s build</Mask>
        <Mask>something</Mask>
        <Mask><span className="text-primary">thoughtful.</span></Mask>
      </h2>
      <div className="mt-14 flex flex-col gap-6 md:flex-row md:items-center">
        <Magnetic>
          <a href={`mailto:${links.email}`} className="link-u font-display text-2xl md:text-4xl">{links.email}</a>
        </Magnetic>
        <button
          onClick={copy}
          className={`relative inline-flex min-h-12 w-fit items-center gap-3 overflow-hidden rounded-full border px-6 transition-colors duration-300 ${state === "ok" ? "border-primary text-primary" : state === "err" ? "border-destructive text-destructive" : "border-rule hover:border-foreground"}`}
        >
          <span className={`absolute inset-0 origin-left bg-primary/15 transition-transform duration-500 ease-out-expo ${state === "ok" ? "scale-x-100" : "scale-x-0"}`} />
          <span className="relative">{state === "ok" ? "✓ Copied" : state === "err" ? "Couldn’t copy — select it instead" : "Copy email"}</span>
        </button>
        <span className="sr-only" aria-live="polite">{state === "ok" ? "Email copied to clipboard" : state === "err" ? "Copy failed" : ""}</span>
      </div>
      <div className="mt-16 flex flex-wrap gap-8 border-t border-border pt-8">
        <a href={links.linkedin} target="_blank" rel="noreferrer" className="link-u label-mono">LinkedIn ↗</a>
        <a href={links.github} target="_blank" rel="noreferrer" className="link-u label-mono">GitHub ↗</a>
        <span className="label-mono ml-auto">© 2026 Dires Abatieneh</span>
      </div>
    </section>
  );
}
