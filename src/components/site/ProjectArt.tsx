import type { Project } from "@/data/profile";

/** Procedural SVG illustrations per project. Layers shift on hover via group-hover. */
export function ProjectArt({ kind }: { kind: Project["art"] }) {
  const layer = "transition-transform duration-500 ease-out-expo";
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" role="img" aria-label="Abstract illustration">
      <defs>
        <pattern id={`g-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" className="stroke-border" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill={`url(#g-${kind})`} />
      {kind === "lattice" && (
        <>
          <g className={`${layer} group-hover:-translate-x-2`} opacity="0.35">
            {Array.from({ length: 9 }).map((_, i) => (
              <rect key={i} x={30 + (i * 37) % 120} y={40 + i * 20} width={40 + ((i * 23) % 50)} height="6" className="fill-muted-foreground" />
            ))}
          </g>
          <g className={`${layer} group-hover:translate-x-2`}>
            {[0, 1, 2, 3].map((c) =>
              [0, 1, 2, 3].map((r) => {
                const x = 220 + c * 44, y = 50 + r * 50;
                return (
                  <g key={`${c}-${r}`}>
                    {c < 3 && <line x1={x} y1={y} x2={x + 44} y2={y + ((r + c) % 2 ? 50 : 0)} className={(c + r) % 3 === 0 ? "stroke-primary dash-flow" : "stroke-rule"} strokeWidth="1" />}
                    {r < 3 && <line x1={x} y1={y} x2={x} y2={y + 50} className="stroke-rule" strokeWidth="1" />}
                    <circle cx={x} cy={y} r={(c + r) % 3 === 0 ? 5 : 3} className={(c + r) % 3 === 0 ? "fill-primary" : "fill-foreground"} />
                  </g>
                );
              }),
            )}
          </g>
          <path d="M175 130h30" className="stroke-amber" strokeWidth="1.5" markerEnd="" />
          <path d="M198 124l7 6-7 6" fill="none" className="stroke-amber" strokeWidth="1.5" />
        </>
      )}
      {kind === "funnel" && (
        <>
          <g className={`${layer} group-hover:-translate-y-1`}>
            {Array.from({ length: 14 }).map((_, i) => (
              <circle key={i} cx={40 + ((i * 53) % 110)} cy={40 + ((i * 71) % 180)} r={2 + (i % 3)} className="fill-muted-foreground" opacity="0.7" />
            ))}
          </g>
          <path d="M160 40 L230 110 L230 150 L160 220" fill="none" className="stroke-rule" strokeWidth="1" />
          <g className={`${layer} group-hover:translate-x-2`}>
            {["intent", "amount", "risk", "owner"].map((f, i) => (
              <g key={f} transform={`translate(250 ${62 + i * 36})`}>
                <rect width="110" height="24" fill="none" className="stroke-primary" strokeWidth="1" />
                <text x="8" y="16" className="fill-foreground font-mono" fontSize="10">{f}</text>
                <circle cx="98" cy="12" r="3" className={i === 2 ? "fill-amber" : "fill-primary"} />
              </g>
            ))}
          </g>
          <path d="M230 130 H250" className="stroke-primary dash-flow" strokeWidth="1.5" />
        </>
      )}
      {kind === "channel" && (
        <>
          {[60, 340].map((x, i) => (
            <g key={x} className={`${layer} ${i ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"}`}>
              <rect x={x - 26} y="70" width="52" height="100" rx="8" fill="none" className="stroke-foreground" strokeWidth="1.2" />
              <rect x={x - 16} y={90 + i * 30} width="32" height="10" rx="3" className={i ? "fill-amber" : "fill-primary"} />
            </g>
          ))}
          <path id="ch" d="M90 120 C160 40, 240 200, 310 120" fill="none" className="stroke-rule" strokeWidth="14" opacity="0.4" />
          <path d="M90 120 C160 40, 240 200, 310 120" fill="none" className="stroke-primary dash-flow" strokeWidth="1.5" />
          {Array.from({ length: 6 }).map((_, i) => (
            <text key={i} x={130 + i * 26} y={Math.round(128 + Math.sin(i) * 18)} className="fill-muted-foreground font-mono" fontSize="9">{"#$%&@*"[i]}</text>
          ))}
        </>
      )}
      {kind === "gather" && (
        <>
          <g className={`${layer} group-hover:scale-[0.97]`} style={{ transformOrigin: "200px 130px" }}>
            {Array.from({ length: 10 }).map((_, i) => {
              const a = (i / 10) * Math.PI * 2;
              const x = Math.round(200 + Math.cos(a) * 140), y = Math.round(130 + Math.sin(a) * 90);
              return (
                <g key={i}>
                  <line x1={x} y1={y} x2="200" y2="130" className="stroke-rule" strokeWidth="0.8" />
                  <rect x={x - 12} y={y - 8} width="24" height="16" transform={`rotate(${i * 17} ${x} ${y})`} fill="none" className={i % 3 ? "stroke-foreground" : "stroke-amber"} strokeWidth="1" />
                </g>
              );
            })}
          </g>
          <rect x="160" y="100" width="80" height="60" className="fill-card stroke-amber" strokeWidth="1.2" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="170" y={112 + i * 14} width={60 - i * 14} height="5" className="fill-amber" opacity={1 - i * 0.25} />
          ))}
        </>
      )}
    </svg>
  );
}
