import { useId } from "react";

const label = (p) =>
  `Architecture de ${p.name} : ` +
  p.layers.map((l) => `${l.label} (${l.nodes.join(", ")})`).join(" → ") +
  (p.infra?.length ? ` ; infrastructure : ${p.infra.join(", ")}` : "");

function Defs({ id, fs }) {
  return (
    <defs>
      <pattern id={`${id}d`} width={fs * 1.6} height={fs * 1.6} patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r=".9" className="fill-border-strong" />
      </pattern>
      <marker
        id={`${id}m`}
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth={fs * 0.55}
        markerHeight={fs * 0.55}
        orient="auto"
      >
        <path d="M0 0L8 4L0 8z" className="fill-muted" />
      </marker>
    </defs>
  );
}

const Bg = ({ id, W, H }) => (
  <>
    <rect width={W} height={H} className="fill-surface" />
    <rect width={W} height={H} fill={`url(#${id}d)`} opacity=".7" />
  </>
);

const layerStyle = (i) => ({ animation: `enter 560ms var(--ease-out-quint) ${i * 120}ms both` });

function Horizontal({ p, W, H, fs, id }) {
  const n = p.layers.length;
  const pad = W * 0.06;
  const gap = W * 0.055;
  const infH = p.infra?.length ? fs * 3.2 : 0;
  const colW = (W - 2 * pad - (n - 1) * gap) / n;
  const bh = fs * 2.6;
  const bs = fs * 0.9;
  const lblY = pad + fs;
  const cy = (lblY + fs * 2 + H - pad - infH - (infH ? fs * 1.2 : 0)) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label(p)} className="block size-full font-mono">
      <Defs id={id} fs={fs} />
      <Bg id={id} W={W} H={H} />
      {p.layers.map((l, i) => {
        const x = pad + i * (colW + gap);
        const y0 = cy - (l.nodes.length * bh + (l.nodes.length - 1) * bs) / 2;
        return (
          <g key={l.label} style={layerStyle(i)}>
            <text x={x} y={lblY} fontSize={fs * 0.78} letterSpacing=".06em" className="fill-muted">
              {String(i + 1).padStart(2, "0")} {l.label.toUpperCase()}
            </text>
            {l.nodes.map((t, j) => {
              const y = y0 + j * (bh + bs);
              const f = Math.min(fs, (colW - fs) / (t.length * 0.62));
              return (
                <g key={t}>
                  <rect x={x} y={y} width={colW} height={bh} rx={fs * 0.45} className="fill-bg stroke-border-strong" />
                  <text
                    x={x + colW / 2}
                    y={y + bh / 2 + f * 0.36}
                    fontSize={f}
                    textAnchor="middle"
                    className="fill-heading"
                  >
                    {t}
                  </text>
                </g>
              );
            })}
            {i < n - 1 && (
              <path
                d={`M${x + colW + fs * 0.5} ${cy}H${x + colW + gap - fs * 0.6}`}
                strokeWidth="1.2"
                markerEnd={`url(#${id}m)`}
                className="fill-none stroke-muted"
              />
            )}
          </g>
        );
      })}
      {infH > 0 && (
        <g style={layerStyle(n)}>
          <rect
            x={pad}
            y={H - pad - infH}
            width={W - 2 * pad}
            height={infH}
            rx={fs * 0.45}
            strokeDasharray="4 4"
            className="fill-none stroke-border-strong"
          />
          <text x={pad + fs} y={H - pad - infH / 2 + fs * 0.32} fontSize={fs * 0.78} className="fill-muted">
            INFRA · {p.infra.join("  ·  ")}
          </text>
        </g>
      )}
    </svg>
  );
}

function Vertical({ p, W = 340, fs = 13, id }) {
  const pad = fs * 1.4;
  const bh = fs * 2.5;
  const g = fs * 0.6;
  let y = pad;
  const parts = [];

  p.layers.forEach((l, i) => {
    const items = [
      <text key="l" x={pad} y={y + fs * 0.8} fontSize={fs * 0.78} className="fill-muted">
        {String(i + 1).padStart(2, "0")} {l.label.toUpperCase()}
      </text>,
    ];
    y += fs * 1.6;
    let x = pad;
    l.nodes.forEach((t) => {
      const w = t.length * fs * 0.62 + fs * 1.6;
      if (x + w > W - pad) {
        x = pad;
        y += bh + g;
      }
      items.push(
        <g key={t}>
          <rect x={x} y={y} width={w} height={bh} rx={fs * 0.45} className="fill-bg stroke-border-strong" />
          <text x={x + w / 2} y={y + bh / 2 + fs * 0.36} fontSize={fs} textAnchor="middle" className="fill-heading">
            {t}
          </text>
        </g>,
      );
      x += w + g;
    });
    y += bh;
    if (i < p.layers.length - 1) {
      items.push(
        <path
          key="a"
          d={`M${pad + fs} ${y + fs * 0.4}V${y + fs * 2.2}`}
          strokeWidth="1.2"
          markerEnd={`url(#${id}m)`}
          className="fill-none stroke-muted"
        />,
      );
      y += fs * 2.8;
    }
    parts.push(
      <g key={l.label} style={layerStyle(i)}>
        {items}
      </g>,
    );
  });

  const H = y + pad;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label(p)} className="block h-auto w-full font-mono">
      <Defs id={id} fs={fs} />
      <Bg id={id} W={W} H={H} />
      {parts}
    </svg>
  );
}

export default function ArchSchematic({ project, W = 880, H = 550, fs = 15, variant = "auto" }) {
  const id = useId().replace(/:/g, "");
  if (variant === "horizontal") return <Horizontal p={project} W={W} H={H} fs={fs} id={id} />;
  if (variant === "vertical") return <Vertical p={project} id={id} />;
  return (
    <>
      <div className="hidden size-full sm:block">
        <Horizontal p={project} W={W} H={H} fs={fs} id={`${id}h`} />
      </div>
      <div className="sm:hidden">
        <Vertical p={project} id={`${id}v`} />
      </div>
    </>
  );
}
