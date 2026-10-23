import { useId, type CSSProperties } from 'react';

const PALETTES = [
  { head: '#fde68a', line: '#ca8a04' },
  { head: '#bbf7d0', line: '#16a34a' },
  { head: '#bfdbfe', line: '#2563eb' },
];

type Field = { name: string; key?: string };

function Grid({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width={24} height={24} patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="var(--color-app-border)" strokeWidth={1} opacity={0.32} />
      </pattern>
    </defs>
  );
}

function TableCard({
  x,
  y,
  w,
  title,
  fields,
  color,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  fields: Field[];
  color: number;
  delay?: number;
}) {
  const palette = PALETTES[color % PALETTES.length];
  const headerH = 42;
  const rowH = 31;
  const badgeW = 62;
  const h = headerH + fields.length * rowH;

  return (
    <g className="er-pop" style={{ '--d': delay } as CSSProperties}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill="var(--color-app-surface)" stroke={palette.line} strokeWidth={2} />
      <rect x={x} y={y} width={w} height={headerH} rx={8} fill={palette.head} />
      <rect x={x} y={y + headerH - 8} width={w} height={8} fill={palette.head} />
      <line x1={x} y1={y + headerH} x2={x + w} y2={y + headerH} stroke={palette.line} strokeWidth={2} />
      <text x={x + 16} y={y + 27} fontSize={15} fontWeight={800} fill="#1f2937">
        {title}
      </text>
      {fields.map((field, index) => {
        const rowY = y + headerH + index * rowH;
        return (
          <g key={field.name} className="stagger-item" style={{ '--i': index + delay } as CSSProperties}>
            {index > 0 && <line x1={x} y1={rowY} x2={x + w} y2={rowY} stroke={palette.line} strokeWidth={1} opacity={0.3} />}
            {field.key && (
              <text x={x + 12} y={rowY + 21} fontSize={10.5} fontWeight={800} fill={palette.line}>
                {field.key}
              </text>
            )}
            <text x={x + badgeW} y={rowY + 21} fontSize={13} fontWeight={field.key ? 700 : 500} fill="#1f2937">
              {field.name}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Relation({
  x1,
  x2,
  y,
  label,
  leftCardinality,
  rightCardinality,
  delay = 0,
}: {
  x1: number;
  x2: number;
  y: number;
  label?: string;
  leftCardinality: string;
  rightCardinality: string;
  delay?: number;
}) {
  const mid = (x1 + x2) / 2;
  const offset = Math.min(42, Math.max(24, (x2 - x1) / 4));
  const leftCardX = x1 + offset;
  const rightCardX = x2 - offset;
  const leftMany = leftCardinality === 'N';
  const rightMany = rightCardinality === 'N';

  return (
    <g>
      <path
        className="er-link"
        style={{ '--d': delay } as CSSProperties}
        pathLength={100}
        d={`M${x1} ${y} H${x2}`}
        fill="none"
        stroke="var(--color-app-primary)"
        strokeWidth={2}
      />
      {leftMany ? (
        <g stroke="var(--color-app-primary)" strokeWidth={2} fill="none">
          <line x1={x1 + 10} y1={y} x2={x1 + 24} y2={y - 8} />
          <line x1={x1 + 10} y1={y} x2={x1 + 24} y2={y} />
          <line x1={x1 + 10} y1={y} x2={x1 + 24} y2={y + 8} />
        </g>
      ) : (
        <line x1={x1 + 10} y1={y - 10} x2={x1 + 10} y2={y + 10} stroke="var(--color-app-primary)" strokeWidth={2} />
      )}
      {rightMany ? (
        <g stroke="var(--color-app-primary)" strokeWidth={2} fill="none">
          <line x1={x2 - 10} y1={y} x2={x2 - 24} y2={y - 8} />
          <line x1={x2 - 10} y1={y} x2={x2 - 24} y2={y} />
          <line x1={x2 - 10} y1={y} x2={x2 - 24} y2={y + 8} />
        </g>
      ) : (
        <line x1={x2 - 10} y1={y - 10} x2={x2 - 10} y2={y + 10} stroke="var(--color-app-primary)" strokeWidth={2} />
      )}
      <g className="er-pop" style={{ '--d': delay + 1 } as CSSProperties}>
        <rect x={leftCardX - 14} y={y - 29} width={28} height={20} rx={10} fill="var(--color-app-surface)" stroke="var(--color-app-primary)" />
        <text x={leftCardX} y={y - 15} textAnchor="middle" fontSize={11} fontWeight={800} fill="var(--color-app-primary)">
          {leftCardinality}
        </text>
        <rect x={rightCardX - 14} y={y - 29} width={28} height={20} rx={10} fill="var(--color-app-surface)" stroke="var(--color-app-primary)" />
        <text x={rightCardX} y={y - 15} textAnchor="middle" fontSize={11} fontWeight={800} fill="var(--color-app-primary)">
          {rightCardinality}
        </text>
        {label && (
          <text x={mid} y={y - 40} textAnchor="middle" fontSize={12} fontWeight={800} fill="var(--color-app-muted)">
            {label}
          </text>
        )}
      </g>
    </g>
  );
}

function SectionLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} fontSize={13} fontWeight={900} letterSpacing={1.8} fill="var(--color-app-primary)">
      {children}
    </text>
  );
}

export function LogicalModelDiagram() {
  const gridId = useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 1160 720"
      width="100%"
      role="img"
      aria-label="Modelo logico con relaciones uno a muchos y muchos a muchos"
      className="block"
    >
      <Grid id={`logical-grid-${gridId}`} />
      <rect width="1160" height="720" fill={`url(#logical-grid-${gridId})`} />

      <SectionLabel x={30} y={30}>MODELO LOGICO | SIN DETALLES TECNICOS</SectionLabel>
      <text x={30} y={55} fontSize={13} fill="var(--color-app-muted)">
        Tablas, atributos, relaciones y cardinalidades
      </text>

      <Relation x1={355} x2={805} y={155} label="realiza" leftCardinality="1" rightCardinality="N" delay={2} />
      <TableCard
        x={70}
        y={88}
        w={285}
        title="CLIENTE"
        color={0}
        delay={1}
        fields={[{ name: 'IdCliente', key: 'PK' }, { name: 'Nombre' }, { name: 'Correo' }]}
      />
      <TableCard
        x={805}
        y={72}
        w={285}
        title="PEDIDO"
        color={1}
        delay={1}
        fields={[{ name: 'IdPedido', key: 'PK' }, { name: 'Fecha' }, { name: 'Estado' }, { name: 'IdCliente', key: 'FK' }]}
      />

      <SectionLabel x={30} y={290}>RELACION MUCHOS A MUCHOS (N:M)</SectionLabel>
      <text x={30} y={315} fontSize={13} fill="var(--color-app-muted)">
        Se resuelve con una tabla intermedia
      </text>

      <Relation x1={300} x2={438} y={414} leftCardinality="1" rightCardinality="N" delay={4} />
      <Relation x1={722} x2={860} y={414} leftCardinality="N" rightCardinality="1" delay={5} />
      <TableCard x={40} y={350} w={260} title="PEDIDO" color={0} delay={3} fields={[{ name: 'IdPedido', key: 'PK' }, { name: 'Fecha' }]} />
      <TableCard
        x={438}
        y={334}
        w={284}
        title="DETALLE_PEDIDO"
        color={1}
        delay={3}
        fields={[
          { name: 'IdPedido', key: 'PK/FK' },
          { name: 'IdProducto', key: 'PK/FK' },
          { name: 'Cantidad' },
          { name: 'Precio' },
        ]}
      />
      <TableCard
        x={860}
        y={350}
        w={260}
        title="PRODUCTO"
        color={2}
        delay={3}
        fields={[{ name: 'IdProducto', key: 'PK' }, { name: 'Nombre' }, { name: 'Precio' }]}
      />

      <g className="er-pop" style={{ '--d': 7 } as CSSProperties}>
        <rect x={40} y={585} width={1080} height={74} rx={12} fill="var(--color-app-surface)" stroke="var(--color-app-border)" />
        <circle cx={70} cy={622} r={13} fill="#bbf7d0" stroke="#16a34a" />
        <path d="M64 622l4 4 8-9" fill="none" stroke="#166534" strokeWidth={2.5} />
        <text x={96} y={627} fontSize={14} fontWeight={700} fill="var(--color-app-text)">
          N:M se transforma en dos relaciones 1:N mediante DETALLE_PEDIDO.
        </text>
        <text x={96} y={648} fontSize={12.5} fill="var(--color-app-muted)">
          El modelo logico aun no define NUMBER, VARCHAR2, DATE ni almacenamiento fisico.
        </text>
      </g>
    </svg>
  );
}
