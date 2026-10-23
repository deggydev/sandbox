import { useId, useMemo, useState, type CSSProperties } from 'react';
import { Icon } from '@iconify/react';
import { ErConceptDiagram, ErSymbolsDiagram, ErTemplateDiagram } from './ErDiagram';
import { LogicalModelDiagram } from './LogicalModelDiagram';

type Block =
  | { kind: 'heading'; text: string }
  | { kind: 'note'; text: string }
  | { kind: 'task'; text: string }
  | { kind: 'text'; text: string }
  | { kind: 'table'; columns: string[]; rows: string[][] }
  | { kind: 'boxes'; tables: TableData[]; arrows: ArrowDir[]; labels: string[] }
  | { kind: 'flow'; chains: string[][] }
  | { kind: 'ascii'; lines: string[] };

type TableData = { header: string[]; rows: string[][] };
type ArrowDir = 'right' | 'left' | 'none';

const BORDER_RE = /^[\s+\-]+$/;
const DIAGRAM_CHAR_RE = /[+\-|/\\<>.'()`_[\]]/;
const UPPER_RE = /^[A-ZÁÉÍÓÚÑÜ0-9_\s—–\-…:()/.]+$/;

const isBorderLine = (l: string) => l.includes('-') && BORDER_RE.test(l);
const isDashRule = (l: string) => /^\s*-{3,}\s*$/.test(l);
const looksProse = (l: string) => !DIAGRAM_CHAR_RE.test(l) && /[a-záéíóúñ]/.test(l);
const looksHeading = (t: string) => t.length >= 3 && UPPER_RE.test(t) && /[A-ZÁÉÍÓÚÑ]/.test(t);

const splitRow = (l: string) => {
  const parts = l.split('|');
  if (parts.length && parts[0].trim() === '') parts.shift();
  if (parts.length && parts[parts.length - 1].trim() === '') parts.pop();
  return parts.map((p) => p.trim());
};

const countPlus = (l: string) => (l.match(/\+/g) || []).length;

function isTableStart(lines: string[], i: number): boolean {
  const line = lines[i];
  if (!isBorderLine(line)) return false;
  const next = lines[i + 1];
  if (!next || !next.trimStart().startsWith('|')) return false;
  return splitRow(next).length === countPlus(line) - 1;
}

function isDashTableStart(lines: string[], i: number): boolean {
  return isDashRule(lines[i]) && !!lines[i + 1] && lines[i + 1].includes('|');
}

const FLOW_SEP_RE = /-{2,}>|={2,}>|→|-{3,}/;

function splitFlowLine(line: string): string[] | null {
  const cleaned = line.replace(/\s+/g, ' ').trim();
  if (/^[\s+\-=|]+$/.test(cleaned)) return null;
  if (!FLOW_SEP_RE.test(cleaned)) return null;
  const steps = cleaned
    .split(FLOW_SEP_RE)
    .map((p) => p.trim().replace(/^[-•]\s*/, '').replace(/^\[(.*)\]$/, '$1').trim())
    .filter(Boolean);
  return steps.length >= 2 ? steps : null;
}

function boxRanges(border: string): [number, number][] {
  const plus: number[] = [];
  for (let i = 0; i < border.length; i++) if (border[i] === '+') plus.push(i);
  const ranges: [number, number][] = [];
  for (let k = 0; k + 1 < plus.length; k += 2) {
    const a = plus[k];
    const b = plus[k + 1];
    if (!/^-+$/.test(border.slice(a + 1, b))) return [];
    if (k + 2 < plus.length && !/^\s+$/.test(border.slice(b + 1, plus[k + 2]))) return [];
    ranges.push([a, b]);
  }
  return ranges;
}

function isMultiBoxStart(lines: string[], i: number): boolean {
  return boxRanges(lines[i]).length >= 2 && !!lines[i + 1] && lines[i + 1].includes('|');
}

const cleanGap = (s: string) => s.replace(/[-<>|+]/g, ' ').replace(/\s+/g, ' ').trim();

function parseBoxes(run: string[], ranges: [number, number][]): Block {
  const tables: TableData[] = ranges.map(([a, b]) => {
    const rowLines = run
      .map((l) => l.slice(a, b + 1))
      .filter((l) => l.includes('|'));
    const header = rowLines.length ? splitRow(rowLines[0]) : [];
    const rows = rowLines.slice(1).map(splitRow).map((r) => header.map((_, ci) => r[ci] ?? ''));
    return { header, rows };
  });

  const arrows: ArrowDir[] = [];
  const labels: string[] = [];
  for (let k = 0; k + 1 < ranges.length; k++) {
    const a = ranges[k][1] + 1;
    const b = ranges[k + 1][0];
    const seg = run.map((l) => l.slice(a, b)).join('\n');
    arrows.push(/-{2,}>|→/.test(seg) ? 'right' : /<{2,}-/.test(seg) ? 'left' : 'none');
    labels.push(cleanGap(seg.split('\n').find((s) => cleanGap(s)) ?? ''));
  }

  return { kind: 'boxes', tables, arrows, labels };
}

function verticalFlowAt(lines: string[], i: number): string[][] | null {
  const chains: string[][] = [];
  let j = i;
  while (j + 3 < lines.length) {
    const a = lines[j].trim();
    const bar = lines[j + 1].trim();
    const v = lines[j + 2].trim();
    const b = lines[j + 3].trim();
    if (a && /^\|+$/.test(bar) && /^v$/i.test(v) && b) {
      chains.push([a, b]);
      j += 4;
    } else break;
  }
  return chains.length ? chains : null;
}

function parseAscii(code: string): Block[] {
  const lines = code.replace(/\r/g, '').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    if (t === '') {
      i++;
      continue;
    }

    if (isMultiBoxStart(lines, i)) {
      const ranges = boxRanges(lines[i]);
      const run: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        (lines[i].includes('|') || /^\s*\+[\s\-+]+\+/.test(lines[i]))
      ) {
        run.push(lines[i]);
        i++;
      }
      if (run.length) blocks.push(parseBoxes(run, ranges));
      continue;
    }

    if (isTableStart(lines, i) || isDashTableStart(lines, i)) {
      const run: string[] = [];
      while (i < lines.length && (isBorderLine(lines[i]) || lines[i].includes('|'))) {
        run.push(lines[i]);
        i++;
      }
      const rowLines = run.filter((r) => r.includes('|'));
      if (rowLines.length) {
        const columns = splitRow(rowLines[0]);
        const rows = rowLines
          .slice(1)
          .map(splitRow)
          .map((r) => columns.map((_, ci) => r[ci] ?? ''));
        blocks.push({ kind: 'table', columns, rows });
      }
      continue;
    }

    if (/^[\s=\-]+$/.test(line) && /[-=]/.test(line)) {
      i++;
      continue;
    }

    const vertical = verticalFlowAt(lines, i);
    if (vertical) {
      blocks.push({ kind: 'flow', chains: vertical });
      i += vertical.length * 4;
      continue;
    }

    const flow = splitFlowLine(line);
    if (flow) {
      const chains = [flow];
      i++;
      while (i < lines.length) {
        const next = splitFlowLine(lines[i]);
        if (!next) break;
        chains.push(next);
        i++;
      }
      blocks.push({ kind: 'flow', chains });
      continue;
    }

    if (/^\[\s?\]/.test(t)) {
      blocks.push({ kind: 'task', text: t.replace(/^\[\s?\]\s*/, '') });
      i++;
      continue;
    }

    if (/^(\/\/|--|#|✓|✗|•)/.test(t)) {
      blocks.push({ kind: 'note', text: t });
      i++;
      continue;
    }

    if (looksHeading(t)) {
      blocks.push({ kind: 'heading', text: t });
      i++;
      continue;
    }

    if (looksProse(t)) {
      blocks.push({ kind: 'text', text: t });
      i++;
      continue;
    }

    const acc: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      const lt = l.trim();
      if (lt === '') break;
      if (isMultiBoxStart(lines, i)) break;
      if (isTableStart(lines, i) || isDashTableStart(lines, i)) break;
      if (/^[\s=\-]+$/.test(l) && /[-=]/.test(l)) break;
      if (splitFlowLine(l)) break;
      if (/^\[\s?\]/.test(lt)) break;
      if (/^(\/\/|--|#|✓|✗|•)/.test(lt)) break;
      if (looksHeading(lt)) break;
      if (looksProse(lt)) break;
      acc.push(l);
      i++;
    }
    if (acc.length) blocks.push({ kind: 'ascii', lines: acc });
  }

  return blocks;
}

const CHAR_W = 8.6;

const TABLE_PALETTES = [
  { head: '#fde68a', line: '#ca8a04' },
  { head: '#bbf7d0', line: '#16a34a' },
  { head: '#bfdbfe', line: '#2563eb' },
  { head: '#fecaca', line: '#dc2626' },
  { head: '#e9d5ff', line: '#9333ea' },
];
const DB_INK = '#1f2937';

function parseCell(cell: string): { name: string; key?: string } {
  const m = cell.match(/^(.*?)\s*\((PK\/FK|PK|FK)\)\s*$/i);
  const parsed = m ? { name: m[1].trim(), key: m[2].toUpperCase() } : { name: cell };
  return { ...parsed, name: parsed.name.replace(/[│]/g, ' ').replace(/[├└]─/g, '• ').trim() };
}

function AsciiTableSvg({
  columns,
  rows,
  index = 0,
}: {
  columns: string[];
  rows: string[][];
  index?: number;
}) {
  const gridId = useId().replace(/:/g, '');
  const palette = TABLE_PALETTES[index % TABLE_PALETTES.length];
  const padX = 14;
  const rowH = 30;
  const headH = 34;
  const badgeW = 52;
  const margin = 14;

  const parsedHeader = columns.map(parseCell);
  const parsedRows = rows.map((r) => columns.map((_, ci) => parseCell((r[ci] ?? '').trim())));

  const widths = columns.map((_, ci) => {
    const cells = [parsedHeader[ci], ...parsedRows.map((r) => r[ci])];
    const w = Math.max(...cells.map((c) => (c.key ? badgeW + 6 : 0) + c.name.length * CHAR_W + padX * 2));
    return Math.max(w, 64);
  });
  const totalW = Math.round(widths.reduce((a, b) => a + b, 0));
  const totalH = headH + rows.length * rowH;
  const outerW = totalW + margin * 2;
  const outerH = totalH + margin * 2;
  const xs: number[] = [];
  let acc = 0;
  for (const w of widths) {
    xs.push(acc);
    acc += w;
  }

  return (
    <div className="shrink-0" style={{ width: outerW }}>
      <svg viewBox={`0 0 ${outerW} ${outerH}`} width="100%" role="img" className="block">
        <defs>
        <pattern id={`grid-${gridId}`} width={24} height={24} patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="var(--color-app-border)" strokeWidth={1} opacity={0.35} />
        </pattern>
      </defs>
      <rect width={outerW} height={outerH} fill={`url(#grid-${gridId})`} />
      <g transform={`translate(${margin} ${margin})`}>
        <rect x={0} y={0} width={totalW} height={totalH} rx={8} fill="var(--color-app-surface)" stroke={palette.line} strokeWidth={1.8} />
        <rect x={0} y={0} width={totalW} height={headH} rx={8} fill={palette.head} stroke={palette.line} strokeWidth={1.5} />
        <rect x={0} y={headH - 8} width={totalW} height={8} fill={palette.head} />
        {parsedHeader.map((c, ci) => (
          <text
            key={ci}
            x={xs[ci] + padX}
            y={headH / 2 + 5}
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize={13}
            fontWeight={800}
            fill={DB_INK}
          >
            {c.name}
          </text>
        ))}
        {parsedRows.map((r, ri) => {
          const y = headH + ri * rowH;
          return (
            <g key={ri} className="stagger-item" style={{ '--i': ri } as CSSProperties}>
              {ri > 0 && <line x1={0} y1={y} x2={totalW} y2={y} stroke={palette.line} strokeWidth={1} opacity={0.3} />}
              {r.map((c, ci) => {
                const x = xs[ci];
                const blank = /^_+$/.test(c.name) || c.name === '';
                return (
                  <g key={ci}>
                    {ci > 0 && <line x1={x} y1={y} x2={x} y2={y + rowH} stroke={palette.line} strokeWidth={1} opacity={0.3} />}
                    {c.key && (
                      <text x={x + padX} y={y + rowH / 2 + 4} fontSize={10.5} fontWeight={800} fill={palette.line}>
                        {c.key}
                      </text>
                    )}
                    {blank ? (
                      <line
                        x1={x + padX + (c.key ? badgeW : 0)}
                        y1={y + rowH - 9}
                        x2={x + widths[ci] - padX}
                        y2={y + rowH - 9}
                        stroke={palette.line}
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        opacity={0.6}
                      />
                    ) : (
                      <text
                        x={x + padX + (c.key ? badgeW : 0)}
                        y={y + rowH / 2 + 5}
                        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                        fontSize={12.5}
                        fontWeight={c.key ? 700 : 500}
                        fill={DB_INK}
                         textDecoration={c.key?.includes('PK') ? 'underline' : undefined}
                      >
                        {c.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        <rect x={0.5} y={0.5} width={totalW - 1} height={totalH - 1} rx={8} fill="none" stroke={palette.line} strokeWidth={1} />
      </g>
      </svg>
    </div>
  );
}

function ArrowBetween({ dir, label }: { dir: ArrowDir; label: string }) {
  const uid = useId().replace(/:/g, '');
  const w = 68;
  const h = 46;
  const cy = 18;

  return (
    <div className="flex flex-col items-center justify-center shrink-0 px-1" style={{ width: w }}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
        <defs>
          <marker
            id={`box-arrow-${uid}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="var(--color-app-primary)" />
          </marker>
        </defs>
        <line
          x1={8}
          y1={cy}
          x2={w - 8}
          y2={cy}
          stroke="var(--color-app-primary)"
          strokeWidth={1.8}
          markerEnd={dir === 'right' ? `url(#box-arrow-${uid})` : undefined}
          markerStart={dir === 'left' ? `url(#box-arrow-${uid})` : undefined}
          className="er-link"
        />
      </svg>
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--color-app-primary)] leading-none">
          {label}
        </span>
      )}
    </div>
  );
}

function BoxesDiagram({
  tables,
  arrows,
  labels,
}: {
  tables: TableData[];
  arrows: ArrowDir[];
  labels: string[];
}) {
  return (
    <div className="flex items-center gap-1">
      {tables.map((t, i) => (
        <div key={i} className="flex items-center">
          {i > 0 && <ArrowBetween dir={arrows[i - 1] ?? 'none'} label={labels[i - 1] ?? ''} />}
          <AsciiTableSvg columns={t.header} rows={t.rows} index={i} />
        </div>
      ))}
    </div>
  );
}

function FlowChain({ steps }: { steps: string[] }) {
  const uid = useId().replace(/:/g, '');
  const margin = 14;
  const boxH = 46;
  const gap = 38;
  const padX = 16;
  const fontSize = 13;
  const charW = 7.1;

  const widths = steps.map((s) => Math.max(96, s.length * charW + padX * 2));
  const totalW = widths.reduce((a, b) => a + b, 0) + gap * (steps.length - 1);
  const w = totalW + margin * 2;
  const h = boxH + margin * 2;
  const cy = margin + boxH / 2;

  const xs: number[] = [];
  let acc = margin;
  for (const width of widths) {
    xs.push(acc);
    acc += width + gap;
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ maxWidth: w }} role="img" className="block">
      <defs>
        <marker id={`flow-arrow-${uid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--color-app-primary)" />
        </marker>
      </defs>
      {steps.map((step, i) => {
        const palette = TABLE_PALETTES[i % TABLE_PALETTES.length];
        return (
          <g key={i} className="er-pop" style={{ '--i': i } as CSSProperties}>
            <rect
              x={xs[i]}
              y={margin}
              width={widths[i]}
              height={boxH}
              rx={9}
              fill={palette.head}
              stroke={palette.line}
              strokeWidth={1.5}
            />
            <text
              x={xs[i] + widths[i] / 2}
              y={cy + 4.5}
              textAnchor="middle"
              fontSize={fontSize}
              fontWeight={700}
              fill={DB_INK}
            >
              {step}
            </text>
            {i < steps.length - 1 && (
              <line
                x1={xs[i] + widths[i] + 5}
                y1={cy}
                x2={xs[i] + widths[i] + gap - 7}
                y2={cy}
                stroke="var(--color-app-primary)"
                strokeWidth={2}
                markerEnd={`url(#flow-arrow-${uid})`}
                className="er-link"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function renderBlanks(text: string) {
  return text.split(/(_{2,})/g).map((part, i) =>
    /^_{2,}$/.test(part) ? (
      <span
        key={i}
        className="inline-block border-b-2 border-dashed border-[var(--color-app-primary)]/50 align-baseline"
        style={{ width: Math.min(part.length * 7, 220) }}
      >
        &nbsp;
      </span>
    ) : (
      part
    ),
  );
}

function PlainLines({ lines }: { lines: string[] }) {
  const rows = lines.map((l) => l.trimEnd());
  const indents = rows.filter((l) => l.trim()).map((l) => l.match(/^\s*/)?.[0].length ?? 0);
  const indent = Math.min(8, ...indents);

  return (
    <div className="rounded-lg border border-[var(--color-app-border)] bg-[var(--color-app-surface-sec)]/40 px-4 py-4 overflow-x-auto">
      <div className="space-y-1.5 min-w-max">
        {rows.map((line, i) => (
          <div
            key={i}
            className="text-[12.5px] sm:text-[13.5px] leading-relaxed text-[var(--color-app-text)]/90 whitespace-pre font-mono"
          >
            {renderBlanks(line.slice(indent))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskItem({ text }: { text: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setChecked((v) => !v)}
      aria-pressed={checked}
      className="flex items-center gap-2.5 text-left text-xs sm:text-sm font-medium text-[var(--color-app-text)]/90 hover:opacity-80 transition-opacity"
    >
      <span
        className={`w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
          checked ? 'bg-[var(--color-app-primary)] border-[var(--color-app-primary)]' : 'border-[var(--color-app-muted)]'
        }`}
      >
        {checked && <Icon icon="mdi:check" className="text-white text-[11px]" />}
      </span>
      <span className={checked ? 'line-through opacity-50' : ''}>{text}</span>
    </button>
  );
}

function BlockView({ block, index }: { block: Block; index: number }) {
  switch (block.kind) {
    case 'heading':
      return (
        <p className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[var(--color-app-primary)]">
          {renderBlanks(block.text)}
        </p>
      );
    case 'note':
      return (
        <p className="text-xs sm:text-sm text-[var(--color-app-muted)] italic">
          {renderBlanks(block.text.replace(/^\/\/\s*/, ''))}
        </p>
      );
    case 'text':
      return (
        <p className="text-xs sm:text-sm text-[var(--color-app-text)]/85">{renderBlanks(block.text)}</p>
      );
    case 'task':
      return <TaskItem text={block.text} />;
    case 'table':
      return <AsciiTableSvg columns={block.columns} rows={block.rows} index={index} />;
    case 'boxes':
      return <BoxesDiagram tables={block.tables} arrows={block.arrows} labels={block.labels} />;
    case 'flow':
      return (
        <div className="flex flex-col gap-4">
          {block.chains.map((chain, i) => (
            <FlowChain key={i} steps={chain} />
          ))}
        </div>
      );
    case 'ascii':
      return <PlainLines lines={block.lines} />;
  }
}

export function isAsciiDiagram(code?: string, language?: string): boolean {
  if (!code || !code.trim()) return false;
  if (language === 'text') return true;
  if (language !== 'sql') return false;
  const lines = code.replace(/\r/g, '').split('\n');
  return lines.some((_, i) => isTableStart(lines, i) || isDashTableStart(lines, i));
}

type ErVariant = 'symbols' | 'template' | null;

function detectErVariant(code: string): ErVariant {
  if (/S[IÍ]MBOLOS B[AÁ]SICOS/i.test(code)) return 'symbols';
  if (/Plantilla conceptual/i.test(code)) return 'template';
  return null;
}

function isLogicalModelDiagram(code: string): boolean {
  return /SIN DETALLES T[ÉE]CNICOS/i.test(code) && /MUCHOS A MUCHOS/i.test(code);
}

export function AsciiDiagram({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);
  const blocks = useMemo(() => parseAscii(code), [code]);
  const erVariant = useMemo(() => detectErVariant(code), [code]);
  const logicalModel = useMemo(() => isLogicalModelDiagram(code), [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-app-border)] bg-[var(--color-app-surface)] flex flex-col shrink-0">
      <div className="bg-[var(--color-app-surface-sec)] px-3.5 sm:px-5 py-2 border-b border-[var(--color-app-border)] flex items-center justify-between gap-2 shrink-0">
        <span className="text-xs sm:text-sm font-bold text-[var(--color-app-text)] uppercase tracking-wider flex items-center gap-1.5">
          <Icon icon="mdi:vector-polyline" className="text-base text-[var(--color-app-primary)]" />
          {title || 'Diagrama'}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            title="Copiar"
            className="px-2 py-1 rounded-md text-xs font-medium text-[var(--color-app-muted)] hover:text-[var(--color-app-text)] bg-white/5 hover:bg-white/10 transition-all flex items-center gap-1 border border-[var(--color-app-border)]"
          >
            <Icon icon={copied ? 'mdi:check' : 'mdi:content-copy'} className={copied ? 'text-emerald-400' : ''} />
            <span className="text-[11px] hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
        </div>
      </div>
      <div className="p-3.5 sm:p-5 overflow-x-auto">
        {erVariant === 'symbols' ? (
          <div className="flex flex-col gap-8">
            <ErSymbolsDiagram />
            <ErConceptDiagram />
          </div>
        ) : erVariant === 'template' ? (
          <ErTemplateDiagram />
        ) : logicalModel ? (
          <LogicalModelDiagram />
        ) : (
          <div className="flex flex-col gap-4">
            {blocks.map((b, i) => (
              <BlockView key={i} block={b} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
