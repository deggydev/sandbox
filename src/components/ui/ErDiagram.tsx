import { useId, type CSSProperties } from 'react';

const PALETTES = [
  { head: '#fde68a', line: '#ca8a04' },
  { head: '#bbf7d0', line: '#16a34a' },
  { head: '#bfdbfe', line: '#2563eb' },
  { head: '#fecaca', line: '#dc2626' },
  { head: '#e9d5ff', line: '#9333ea' },
];

const HEAD_H = 32;
const ROW_H = 28;
const BADGE_W = 52;
const INK = '#1f2937';
const SUBTLE = '#6b7280';

type Column = { name: string; key?: string };

function Grid({ w, h }: { w: number; h: number }) {
  const id = useId().replace(/:/g, '');
  return (
    <>
      <defs>
        <pattern id={`grid-${id}`} width={24} height={24} patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="var(--color-app-border)" strokeWidth={1} opacity={0.35} />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={`url(#grid-${id})`} />
    </>
  );
}
function EntityBox({
  x,
  y,
  w,
  title,
  columns,
  color = 0,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  columns: Column[];
  color?: number;
  delay?: number;
}) {
  const palette = PALETTES[color % PALETTES.length];
  const h = HEAD_H + columns.length * ROW_H;

  return (
    <g className="er-pop" style={{ ['--d']: delay } as CSSProperties}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="var(--color-app-surface)" stroke={palette.line} strokeWidth={1.8} />
      <path
        d={`M${x} ${y + HEAD_H} V${y + 3} Q${x} ${y} ${x + 3} ${y} H${x + w - 3} Q${x + w} ${y} ${x + w} ${y + 3} V${y + HEAD_H} Z`}
        fill={palette.head}
        stroke={palette.line}
        strokeWidth={1.5}
      />
      <text x={x + 14} y={y + 21} fontSize={13.5} fontWeight={800} fill={INK}>
        {title}
      </text>
      <line x1={x} y1={y + HEAD_H} x2={x + w} y2={y + HEAD_H} stroke={palette.line} strokeWidth={1.5} />
      <line x1={x + BADGE_W} y1={y + HEAD_H} x2={x + BADGE_W} y2={y + h} stroke={palette.line} strokeWidth={1} opacity={0.7} />
      {columns.map((col, i) => {
        const ry = y + HEAD_H + i * ROW_H;
        return (
          <g key={i} className="stagger-item" style={{ ['--i']: i + delay } as CSSProperties}>
            {i > 0 && <line x1={x} y1={ry} x2={x + w} y2={ry} stroke={palette.line} strokeWidth={1} opacity={0.35} />}
            {col.key && (
              <text x={x + BADGE_W / 2} y={ry + 18} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={palette.line}>
                {col.key}
              </text>
            )}
            <text
              x={x + BADGE_W + 10}
              y={ry + 18}
              fontSize={12.5}
              fontWeight={col.key ? 700 : 500}
              fill={INK}
              textDecoration={col.key === 'PK' ? 'underline' : undefined}
            >
              {col.name}
            </text>
          </g>
        );
      })}
    </g>
  );
}
function Connector({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  label,
  card,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  label?: string;
  card?: string;
}) {
  const mid = x1 + Math.max(34, (x2 - x1) / 2);
  const path = `M${x1} ${y1} H${mid} V${y2} H${x2}`;
  const cardParts = card?.split(':') ?? [];
  const leftCard = cardParts.length === 2 ? cardParts[0] : card;
  const rightCard = cardParts.length === 2 ? cardParts[1] : card;
  const cardOffset = Math.min(34, Math.max(24, Math.abs(x2 - x1) / 4));
  const leftCardX = x1 + cardOffset;
  const rightCardX = x2 - cardOffset;
  const leftCardY = y1 - 31;
  const rightCardY = y2 - 31;
  const leftMany = leftCard === 'N';
  const rightMany = rightCard === 'N';
  return (
    <g>
      <path
        className="er-link"
        style={{ ['--d']: delay } as CSSProperties}
        pathLength={100}
        d={path}
        fill="none"
        stroke={INK}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <g className="er-pop" style={{ ['--d']: delay + 2 } as CSSProperties} stroke={INK} strokeWidth={1.8} fill="none">
        {leftMany ? (
          <>
            <line x1={x1 + 10} y1={y1} x2={x1 + 22} y2={y1 - 7} />
            <line x1={x1 + 10} y1={y1} x2={x1 + 22} y2={y1} />
            <line x1={x1 + 10} y1={y1} x2={x1 + 22} y2={y1 + 7} />
          </>
        ) : (
          <line x1={x1 + 10} y1={y1 - 9} x2={x1 + 10} y2={y1 + 9} />
        )}
        {rightMany ? (
          <>
            <line x1={x2 - 10} y1={y2} x2={x2 - 22} y2={y2 - 7} />
            <line x1={x2 - 10} y1={y2} x2={x2 - 22} y2={y2} />
            <line x1={x2 - 10} y1={y2} x2={x2 - 22} y2={y2 + 7} />
          </>
        ) : (
          <line x1={x2 - 10} y1={y2 - 9} x2={x2 - 10} y2={y2 + 9} />
        )}
      </g>
      {card && (
        <g className="er-pop" style={{ ['--d']: delay + 2 } as CSSProperties}>
          <rect x={leftCardX - 14} y={leftCardY - 10} width={28} height={20} rx={10} fill="var(--color-app-surface)" stroke={SUBTLE} strokeWidth={1.2} />
          <text x={leftCardX} y={leftCardY + 4} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={INK}>
            {leftCard}
          </text>
          <rect x={rightCardX - 14} y={rightCardY - 10} width={28} height={20} rx={10} fill="var(--color-app-surface)" stroke={SUBTLE} strokeWidth={1.2} />
          <text x={rightCardX} y={rightCardY + 4} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={INK}>
            {rightCard}
          </text>
        </g>
      )}
      {label && (
        <text
          className="er-pop"
          style={{ ['--d']: delay + 2 } as CSSProperties}
          x={mid}
          y={Math.min(y1, y2) - 49}
          textAnchor="middle"
          fontSize={11.5}
          fontWeight={700}
          fill={SUBTLE}
          fontStyle="italic"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function ErSymbolsDiagram() {
  const colors = [1, 2, 0];
  const captions = [
    { x: 150, title: 'Entidad', sub: 'Rectangulo' },
    { x: 450, title: 'Atributo', sub: 'Ovalo' },
    { x: 760, title: 'Relacion', sub: 'Rombo' },
  ];
  return (
      <svg viewBox="0 0 900 260" width="100%" role="img" aria-label="Simbologia del modelo entidad-relacion">
      <Grid w={900} h={260} />
      <g className="er-pop">
        <text x={20} y={26} fontSize={12} fontWeight={800} letterSpacing={2} fill={SUBTLE}>
          SIMBOLOS DEL MODELO ER
        </text>
      </g>

      <g className="er-pop" style={{ ['--d']: 1 } as CSSProperties}>
        <rect x={70} y={82} width={170} height={64} rx={3} fill="var(--color-app-surface)" stroke={PALETTES[colors[0]].line} strokeWidth={2} />
        <rect x={70} y={82} width={170} height={10} fill={PALETTES[colors[0]].head} />
        <text x={155} y={122} textAnchor="middle" fontSize={14} fontWeight={800} fill={INK}>CLIENTE</text>
      </g>
      <g className="er-pop" style={{ ['--d']: 2 } as CSSProperties}>
        <ellipse cx={450} cy={114} rx={96} ry={34} fill={PALETTES[colors[1]].head} stroke={PALETTES[colors[1]].line} strokeWidth={2} />
        <text x={450} y={119} textAnchor="middle" fontSize={13} fontWeight={800} fill={INK}>Nombre</text>
      </g>
      <g className="er-pop" style={{ ['--d']: 3 } as CSSProperties}>
        <polygon
          points="760,72 852,114 760,156 668,114"
          fill={PALETTES[colors[2]].head}
          stroke={PALETTES[colors[2]].line}
          strokeWidth={2}
        />
        <text x={760} y={119} textAnchor="middle" fontSize={13} fontWeight={800} fill={INK}>REALIZA</text>
      </g>

      {captions.map((c, i) => (
        <g key={i} className="er-pop" style={{ ['--d']: 4 } as CSSProperties}>
          <text x={c.x} y={190} textAnchor="middle" fontSize={13} fontWeight={800} fill={INK}>{c.title}</text>
          <text x={c.x} y={210} textAnchor="middle" fontSize={11} fill={SUBTLE}>{c.sub}</text>
        </g>
      ))}
    </svg>
  );
}

export function ErConceptDiagram() {
  return (
    <svg viewBox="0 0 880 420" width="100%" role="img" aria-label="Ejemplo conceptual relacional">
      <Grid w={880} h={420} />
      <g className="er-pop">
        <text x={20} y={26} fontSize={12} fontWeight={800} letterSpacing={2} fill={SUBTLE}>
          EJEMPLO CONCEPTUAL
        </text>
      </g>

      <Connector x1={330} y1={236} x2={548} y2={250} delay={2} card="1:N" label="realiza" />

      <EntityBox
        x={120}
        y={178}
        w={210}
        title="CLIENTE"
        color={1}
        delay={1}
        columns={[
          { name: 'IdCliente', key: 'PK' },
          { name: 'Nombre' },
          { name: 'Correo' },
        ]}
      />
      <EntityBox
        x={548}
        y={178}
        w={222}
        title="PEDIDO"
        color={0}
        delay={1}
        columns={[
          { name: 'IdPedido', key: 'PK' },
          { name: 'Fecha' },
          { name: 'Estado' },
          { name: 'IdCliente', key: 'FK' },
        ]}
      />

      <g className="er-pop" style={{ ['--d']: 4 } as CSSProperties}>
        <text x={40} y={390} fontSize={13} fontWeight={600} fill={INK}>
          Un CLIENTE realiza muchos PEDIDOS.
        </text>
      </g>
    </svg>
  );
}

export function ErTemplateDiagram() {
  return (
    <svg viewBox="0 0 880 320" width="100%" role="img" aria-label="Plantilla relacional para completar">
      <Grid w={880} h={320} />
      <g className="er-pop">
        <text x={20} y={26} fontSize={12} fontWeight={800} letterSpacing={2} fill={SUBTLE}>
          PLANTILLA - COMPLETA LOS DATOS
        </text>
      </g>

      <Connector x1={330} y1={188} x2={548} y2={188} delay={2} card="?" label="________" />

      <EntityBox
        x={120}
        y={130}
        w={210}
        title="CLIENTE"
        color={1}
        delay={1}
        columns={[{ name: '________', key: 'PK' }, { name: '________' }, { name: '________' }]}
      />
      <EntityBox
        x={548}
        y={130}
        w={222}
        title="PEDIDO"
        color={0}
        delay={1}
        columns={[{ name: '________', key: 'PK' }, { name: '________' }, { name: '________', key: 'FK' }]}
      />

      <g className="er-pop" style={{ ['--d']: 4 } as CSSProperties}>
        <text x={20} y={300} fontSize={11.5} fill={SUBTLE}>
          Completa columnas, PK/FK y cardinalidad de relacion.
        </text>
      </g>
    </svg>
  );
}

