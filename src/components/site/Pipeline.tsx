/** Explanatory illustration of the delayed-notification pipeline. */
export function Pipeline() {
  const stages = [
    { label: "Schedule", sub: "delay window" },
    { label: "Retry", sub: "backoff" },
    { label: "Dedupe", sub: "suppress" },
    { label: "Deliver", sub: "realtime" },
  ];
  return (
    <figure className="rounded-sm border border-border bg-card/60 p-5 md:p-6">
      <svg viewBox="0 0 520 120" className="w-full" aria-hidden>
        <line x1="30" y1="60" x2="490" y2="60" className="stroke-rule" strokeWidth="1" />
        <line x1="30" y1="60" x2="490" y2="60" className="stroke-primary dash-flow" strokeWidth="1.5" />
        {stages.map((s, i) => {
          const x = 60 + i * 133;
          return (
            <g key={s.label}>
              <circle cx={x} cy="60" r="16" className="fill-background stroke-foreground" strokeWidth="1" />
              <circle cx={x} cy="60" r="4" className={i === 3 ? "fill-amber" : "fill-primary"} />
              <text x={x} y="30" textAnchor="middle" className="fill-foreground font-mono" fontSize="11">{s.label}</text>
              <text x={x} y="98" textAnchor="middle" className="fill-muted-foreground font-mono" fontSize="9">{s.sub}</text>
            </g>
          );
        })}
        <path d="M193 44 C210 10, 176 10, 193 44" fill="none" className="stroke-amber dash-flow" strokeWidth="1" />
        <g className="animate-pulse">
          <line x1="316" y1="76" x2="340" y2="100" className="stroke-destructive" strokeWidth="1" />
          <circle cx="344" cy="104" r="3" className="fill-destructive" />
        </g>
      </svg>
      <figcaption className="label-mono mt-3">Illustration — simplified, not production architecture</figcaption>
    </figure>
  );
}
