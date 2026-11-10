import { createContext, useContext, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Icon } from '@iconify/react';

/* =========================================================================
   TopicVisual: escenas SVG/HTML animadas (tipo GIF) para las diapositivas.
   Todas usan las variables del tema (--app-primary, --app-surface, ...),
   por lo que se adaptan a los temas claro, oscuro, rosa y sandbox.
   ========================================================================= */

export type VisualNode = { icon: string; label: string; sub?: string };

export type VisualSpec =
  | { kind: 'flow'; nodes: VisualNode[] }
  | { kind: 'layers'; layers: VisualNode[] }
  | { kind: 'network'; topology: 'star' | 'bus' | 'ring' | 'mesh'; center?: string; node?: string }
  | { kind: 'scheduler' }
  | { kind: 'memory' }
  | { kind: 'binary'; char?: string }
  | { kind: 'bus' }
  | { kind: 'hypervisor'; type: 1 | 2 }
  | { kind: 'terminal'; title?: string; prompt?: string; lines: Array<{ cmd: string; out?: string[] }> }
  | { kind: 'filetree'; items?: Array<{ name: string; depth: number; icon?: string }> }
  | { kind: 'waves' }
  | { kind: 'media'; medium: 'twisted' | 'fiber' | 'wireless' }
  | { kind: 'scopes' }
  | { kind: 'osi' }
  | { kind: 'client-server'; request?: string; response?: string; server?: string }
  | { kind: 'dhcp' }
  | { kind: 'dns' }
  | { kind: 'ping'; target?: string }
  | { kind: 'ipv4'; ip?: string; prefix?: number }
  | { kind: 'bits'; value?: number }
  | { kind: 'subnet'; base?: string; prefix?: number }
  | { kind: 'units'; value?: number; unit?: string }
  | { kind: 'orbit'; center: string; satellites: string[]; label?: string }
  | { kind: 'shield'; label?: string }
  | { kind: 'gauge'; value: number; label: string; unit?: string }
  | { kind: 'tasks'; mode: 'mono' | 'multi' }
  | { kind: 'users'; mode: 'mono' | 'multi' };

const TONES = ['var(--app-primary)', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#f43f5e'];

/* ---------- Contexto de movimiento (reducido / pausado) ---------- */

const MotionContext = createContext({ reduced: false, paused: false });

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/* ---------- Primitivas SVG ---------- */

function Svg({ children, h = 240, label }: { children: ReactNode; h?: number; label?: string }) {
  return (
    <svg viewBox={`0 0 400 ${h}`} className="tv-svg" role="img" aria-label={label}>
      <defs>
        <filter id="tv-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {children}
    </svg>
  );
}

function SvgIcon({ icon, x, y, size = 22, color }: { icon: string; x: number; y: number; size?: number; color?: string }) {
  return <Icon icon={icon} x={x - size / 2} y={y - size / 2} width={size} height={size} style={{ color: color || 'var(--app-primary)' }} />;
}

function Card({ x, y, w = 76, h = 52, icon, label, sub, delay, cycle, color }: { x: number; y: number; w?: number; h?: number; icon?: string; label?: string; sub?: string; delay?: number; cycle?: number; color?: string }) {
  const style = delay !== undefined ? ({ animationDelay: `${delay}s`, animationDuration: `${cycle}s` } as CSSProperties) : undefined;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={12} className={`tv-card ${delay !== undefined ? 'tv-card-seq' : ''}`} style={style} />
      {icon && <SvgIcon icon={icon} x={x} y={label ? y - 7 : y} size={22} color={color} />}
      {label && <text x={x} y={y + 16} className="tv-label">{label}</text>}
      {sub && <text x={x} y={y + h / 2 + 13} className="tv-sub">{sub}</text>}
    </g>
  );
}

/** Paquete que recorre un camino en bucle (offset negativo => ya está en movimiento al iniciar). */
function Packet({ path, dur = 3, offset = 0, r = 5, color = 'var(--app-secondary)', label }: { path: string; dur?: number; offset?: number; r?: number; color?: string; label?: string }) {
  const { reduced } = useContext(MotionContext);
  if (reduced) return null;
  return (
    <g>
      <circle r={r} style={{ fill: color }} filter="url(#tv-glow)" />
      {label && <text y={-9} className="tv-tag" style={{ fill: color }}>{label}</text>}
      <animateMotion dur={`${dur}s`} begin={`-${offset}s`} repeatCount="indefinite" path={path} />
    </g>
  );
}

/** Paquete que solo se mueve dentro de una ventana [start, end] (0..1) de un ciclo total. */
function SlotPacket({ path, total, start, end, color = 'var(--app-secondary)', label }: { path: string; total: number; start: number; end: number; color?: string; label?: string }) {
  const { reduced } = useContext(MotionContext);
  if (reduced) return null;
  const s = start.toFixed(3);
  const e = end.toFixed(3);
  const s2 = Math.min(start + 0.01, end).toFixed(3);
  const e2 = Math.min(end + 0.04, 0.999).toFixed(3);
  return (
    <g opacity="0">
      <circle r={6} style={{ fill: color }} filter="url(#tv-glow)" />
      {label && <text y={-11} className="tv-tag" style={{ fill: color }}>{label}</text>}
      <animateMotion dur={`${total}s`} repeatCount="indefinite" path={path} keyPoints="0;0;1;1" keyTimes={`0;${s};${e};1`} calcMode="linear" />
      <animate attributeName="opacity" dur={`${total}s`} repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes={`0;${s};${s2};${e};${e2};1`} />
    </g>
  );
}

/* ---------- Escenas ---------- */

function FlowScene({ nodes }: { nodes: VisualNode[] }) {
  const n = nodes.length;
  const gap = 340 / Math.max(1, n - 1);
  const xs = nodes.map((_, i) => (n === 1 ? 200 : 30 + i * gap));
  const w = Math.min(72, gap - 8);
  const cycle = n * 0.9;
  const path = `M${xs[0]} 110 L${xs[n - 1]} 110`;
  return (
    <Svg h={200} label={nodes.map((nd) => nd.label).join(' → ')}>
      <line x1={xs[0]} y1={110} x2={xs[n - 1]} y2={110} className="tv-line tv-dash" />
      {nodes.map((nd, i) => (
        <Card key={i} x={xs[i]} y={110} w={w} h={60} icon={nd.icon} label={nd.label} sub={nd.sub} delay={i * 0.9} cycle={cycle} />
      ))}
      <Packet path={path} dur={cycle} r={6} />
      <Packet path={path} dur={cycle} offset={cycle / 2} r={4} color="var(--app-primary)" />
    </Svg>
  );
}

function LayersScene({ layers }: { layers: VisualNode[] }) {
  const n = layers.length;
  const h = n * 42 + 24;
  const cycle = n * 0.8;
  return (
    <Svg h={h} label={layers.map((l) => l.label).join(', ')}>
      {layers.map((layer, i) => {
        const y = 14 + i * 42;
        return (
          <g key={i}>
            <rect x={48} y={y} width={280} height={34} rx={10} className="tv-card tv-card-seq" style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${cycle}s` }} />
            <SvgIcon icon={layer.icon} x={70} y={y + 17} size={20} />
            <text x={190} y={y + 21} className="tv-label">{layer.label}</text>
            {layer.sub && <text x={318} y={y + 21} className="tv-sub" textAnchor="end">{layer.sub}</text>}
          </g>
        );
      })}
      <line x1={356} y1={20} x2={356} y2={h - 18} className="tv-line tv-dash" />
      <Packet path={`M356 20 L356 ${h - 18} L356 20`} dur={cycle * 2} r={6} />
      <text x={372} y={h / 2} className="tv-sub" transform={`rotate(90 372 ${h / 2})`}>solicitud ↓ respuesta ↑</text>
    </Svg>
  );
}

function NetworkScene({ topology, center = 'mdi:router-network', node = 'mdi:monitor' }: { topology: 'star' | 'bus' | 'ring' | 'mesh'; center?: string; node?: string }) {
  const cx = 200;
  const cy = 120;
  if (topology === 'bus') {
    const xs = [70, 135, 200, 265, 330];
    return (
      <Svg label="Topología en bus">
        <line x1={30} y1={cy} x2={370} y2={cy} className="tv-line" strokeWidth={4} />
        <rect x={22} y={cy - 8} width={8} height={16} rx={2} style={{ fill: '#f59e0b' }} />
        <rect x={370} y={cy - 8} width={8} height={16} rx={2} style={{ fill: '#f59e0b' }} />
        {xs.map((x, i) => {
          const y = i % 2 === 0 ? 52 : 188;
          return (
            <g key={x}>
              <line x1={x} y1={cy} x2={x} y2={y} className="tv-line" />
              <circle cx={x} cy={y} r={22} className="tv-card" />
              <SvgIcon icon={node} x={x} y={y} />
            </g>
          );
        })}
        <Packet path={`M30 ${cy} L370 ${cy} L30 ${cy}`} dur={5} />
        <Packet path={`M30 ${cy} L370 ${cy} L30 ${cy}`} dur={5} offset={2.5} color="#10b981" />
      </Svg>
    );
  }
  const count = topology === 'mesh' ? 5 : 6;
  const pts = Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(a) * 150, y: cy + Math.sin(a) * 88 };
  });
  const edges: Array<[{ x: number; y: number }, { x: number; y: number }]> = [];
  if (topology === 'star') pts.forEach((p) => edges.push([{ x: cx, y: cy }, p]));
  if (topology === 'ring') pts.forEach((p, i) => edges.push([p, pts[(i + 1) % count]]));
  if (topology === 'mesh') pts.forEach((p, i) => pts.slice(i + 1).forEach((q) => edges.push([p, q])));
  const ringPath = `M${pts.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' L')} Z`;
  return (
    <Svg label={`Topología ${topology}`}>
      {edges.map(([a, b], i) => (
        <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={`tv-line ${topology === 'mesh' ? '' : 'tv-dash'}`} />
      ))}
      {topology === 'star' && (
        <g>
          <circle cx={cx} cy={cy} r={30} className="tv-card tv-pulse-stroke" />
          <SvgIcon icon={center} x={cx} y={cy} size={28} />
        </g>
      )}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={21} className="tv-card" />
          <SvgIcon icon={node} x={p.x} y={p.y} size={20} />
        </g>
      ))}
      {topology === 'star' && pts.map((p, i) => (
        <Packet key={i} path={`M${cx} ${cy} L${p.x.toFixed(1)} ${p.y.toFixed(1)} L${cx} ${cy}`} dur={3} offset={i * 0.5} color={TONES[i % TONES.length]} r={4.5} />
      ))}
      {topology === 'ring' && (
        <>
          <Packet path={ringPath} dur={6} />
          <Packet path={ringPath} dur={6} offset={3} color="#10b981" />
        </>
      )}
      {topology === 'mesh' && edges.filter((_, i) => i % 2 === 0).map(([a, b], i) => (
        <Packet key={i} path={`M${a.x.toFixed(1)} ${a.y.toFixed(1)} L${b.x.toFixed(1)} ${b.y.toFixed(1)}`} dur={2.4} offset={i * 0.4} color={TONES[i % TONES.length]} r={4} />
      ))}
    </Svg>
  );
}

function SchedulerScene() {
  const path = 'M200 46 A150 82 0 1 1 199.9 46 Z';
  const procs = ['Navegador', 'Editor', 'Música', 'Antivirus'];
  const dur = 8;
  const { reduced } = useContext(MotionContext);
  return (
    <Svg label="Planificador de procesos round-robin">
      <ellipse cx={200} cy={128} rx={150} ry={82} className="tv-line tv-dash" />
      <rect x={155} y={20} width={90} height={52} rx={12} className="tv-card tv-pulse-stroke" />
      <SvgIcon icon="mdi:cpu-64-bit" x={200} y={39} size={24} />
      <text x={200} y={64} className="tv-label">CPU</text>
      <text x={200} y={130} className="tv-label">Cola de procesos</text>
      <text x={200} y={146} className="tv-sub">cada uno usa la CPU por turnos</text>
      {procs.map((p, i) => (
        <g key={p} transform={reduced ? `translate(${[60, 340, 340, 60][i]} ${[128, 128, 190, 190][i]})` : undefined}>
          <rect x={-34} y={-12} width={68} height={24} rx={8} style={{ fill: TONES[i] }} />
          <text y={4} className="tv-chip">{p}</text>
          {!reduced && <animateMotion dur={`${dur}s`} begin={`-${(i * dur) / procs.length}s`} repeatCount="indefinite" path={path} />}
        </g>
      ))}
    </Svg>
  );
}

function MemoryScene() {
  const cols = 10;
  const rows = 4;
  const owners = ['Navegador', 'Editor', 'Música'];
  const cellOwner = (i: number) => (i < 12 ? 0 : i < 22 ? 1 : i < 30 ? 2 : -1);
  return (
    <Svg label="Asignación de memoria RAM">
      <text x={40} y={26} className="tv-label" textAnchor="start">Memoria RAM</text>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const owner = cellOwner(i);
        return (
          <rect
            key={i}
            x={40 + c * 32.5}
            y={38 + r * 32}
            width={28}
            height={26}
            rx={5}
            className={owner >= 0 ? 'tv-cell' : 'tv-card'}
            style={owner >= 0 ? ({ '--c': TONES[owner], animationDelay: `${i * 0.07 + owner * 0.4}s` } as CSSProperties) : undefined}
          />
        );
      })}
      {owners.map((o, i) => (
        <g key={o} transform={`translate(${48 + i * 112} 190)`}>
          <rect width={14} height={14} rx={3} style={{ fill: TONES[i] }} />
          <text x={20} y={11} className="tv-sub" textAnchor="start">{o}</text>
        </g>
      ))}
      <g transform="translate(48 214)">
        <rect width={14} height={14} rx={3} className="tv-card" />
        <text x={20} y={11} className="tv-sub" textAnchor="start">Libre: el SO la asigna y la recupera</text>
      </g>
    </Svg>
  );
}

function BinaryScene({ char = 'A' }: { char?: string }) {
  const code = char.charCodeAt(0).toString(2).padStart(8, '0');
  const { reduced } = useContext(MotionContext);
  const dur = 3.2;
  return (
    <Svg label={`La letra ${char} viaja como ${code}`}>
      <rect x={22} y={88} width={64} height={64} rx={12} className="tv-card tv-press" />
      <text x={54} y={130} className="tv-big">{char}</text>
      <text x={54} y={172} className="tv-sub">tecla</text>
      <line x1={90} y1={120} x2={168} y2={120} className="tv-line" />
      <rect x={170} y={92} width={62} height={56} rx={12} className="tv-card tv-pulse-stroke" />
      <SvgIcon icon="mdi:cpu-64-bit" x={201} y={114} size={24} />
      <text x={201} y={140} className="tv-label">CPU</text>
      <line x1={236} y1={120} x2={300} y2={120} className="tv-line tv-dash" />
      <rect x={302} y={82} width={78} height={60} rx={8} className="tv-card" />
      <rect x={334} y={142} width={14} height={12} style={{ fill: 'var(--app-border)' }} />
      <text x={341} y={124} className="tv-big tv-blink">{char}</text>
      <text x={341} y={172} className="tv-sub">pantalla</text>
      <text x={130} y={84} className="tv-code">{code}</text>
      {!reduced && code.split('').map((bit, i) => (
        <text key={i} className="tv-bit" style={{ fill: bit === '1' ? 'var(--app-primary)' : '#10b981' }}>
          {bit}
          <animateMotion dur={`${dur}s`} begin={`-${(i * dur) / 8}s`} repeatCount="indefinite" path="M92 124 L164 124" />
        </text>
      ))}
      <Packet path="M236 120 L300 120" dur={1.6} r={4} />
    </Svg>
  );
}

function BusScene() {
  const top = [{ x: 80, icon: 'mdi:cpu-64-bit', l: 'CPU' }, { x: 200, icon: 'mdi:memory', l: 'RAM' }, { x: 320, icon: 'mdi:harddisk', l: 'Disco' }];
  const bottom = [{ x: 140, icon: 'mdi:keyboard-outline', l: 'Teclado' }, { x: 260, icon: 'mdi:ethernet', l: 'Red' }];
  const lanes = [{ y: 108, c: 'var(--app-primary)', l: 'Datos' }, { y: 122, c: '#10b981', l: 'Direcciones' }, { y: 136, c: '#f59e0b', l: 'Control' }];
  return (
    <Svg label="Buses del sistema">
      {lanes.map((lane, i) => (
        <line key={lane.l} x1={20} y1={lane.y} x2={380} y2={lane.y} className="tv-lane" style={{ stroke: lane.c, animationDirection: i === 1 ? 'reverse' : 'normal' }} />
      ))}
      {top.map((b) => (
        <g key={b.l}><line x1={b.x} y1={74} x2={b.x} y2={108} className="tv-line" /><Card x={b.x} y={48} w={78} h={50} icon={b.icon} label={b.l} /></g>
      ))}
      {bottom.map((b) => (
        <g key={b.l}><line x1={b.x} y1={136} x2={b.x} y2={168} className="tv-line" /><Card x={b.x} y={194} w={84} h={50} icon={b.icon} label={b.l} /></g>
      ))}
      {lanes.map((lane, i) => (
        <g key={lane.l} transform={`translate(${312 + 0} ${172 + i * 18})`}>
          <rect width={12} height={6} y={-3} rx={2} style={{ fill: lane.c }} />
          <text x={17} y={4} className="tv-sub" textAnchor="start">{lane.l}</text>
        </g>
      ))}
    </Svg>
  );
}

function HypervisorScene({ type }: { type: 1 | 2 }) {
  const vms = [{ icon: 'mdi:linux', l: 'Linux' }, { icon: 'mdi:microsoft-windows', l: 'Windows' }, { icon: 'mdi:apple', l: 'macOS' }];
  const base = [
    { l: 'Hardware físico (host)', icon: 'mdi:server', c: 'var(--app-muted)' },
    ...(type === 2 ? [{ l: 'Sistema operativo anfitrión', icon: 'mdi:monitor', c: '#06b6d4' }] : []),
    { l: type === 1 ? 'Hipervisor tipo 1 (bare-metal)' : 'Hipervisor tipo 2 (VirtualBox)', icon: 'mdi:layers-triple', c: 'var(--app-primary)' },
  ];
  return (
    <Svg label={`Hipervisor tipo ${type}`}>
      {base.map((b, i) => {
        const y = 200 - i * 38;
        return (
          <g key={b.l}>
            <rect x={40} y={y} width={320} height={30} rx={9} className="tv-card" style={{ stroke: b.c, strokeWidth: 2 }} />
            <SvgIcon icon={b.icon} x={62} y={y + 15} size={18} color={b.c} />
            <text x={200} y={y + 20} className="tv-label">{b.l}</text>
          </g>
        );
      })}
      {vms.map((vm, i) => {
        const x = 90 + i * 110;
        const y = type === 1 ? 70 : 40;
        return (
          <g key={vm.l} className="tv-bob" style={{ animationDelay: `${i * 0.6}s` }}>
            <rect x={x - 46} y={y} width={92} height={72} rx={12} className="tv-card tv-card-vm" />
            <text x={x} y={y + 14} className="tv-sub">VM {i + 1} · guest</text>
            <SvgIcon icon={vm.icon} x={x} y={y + 36} size={24} color={TONES[i + 1]} />
            <text x={x} y={y + 64} className="tv-label">{vm.l}</text>
          </g>
        );
      })}
    </Svg>
  );
}

function TerminalScene({ title = 'Terminal', prompt = 'estudiante@lubuntu:~$', lines }: { title?: string; prompt?: string; lines: Array<{ cmd: string; out?: string[] }> }) {
  const { reduced, paused } = useContext(MotionContext);
  const [step, setStep] = useState({ line: 0, chars: 0 });

  useEffect(() => {
    if (reduced || paused) return;
    const current = lines[step.line];
    let delay = 55;
    let next = { line: step.line, chars: step.chars + 1 };
    if (!current) {
      delay = 2600;
      next = { line: 0, chars: 0 };
    } else if (step.chars >= current.cmd.length) {
      delay = 900;
      next = { line: step.line + 1, chars: 0 };
    }
    const t = window.setTimeout(() => setStep(next), delay);
    return () => window.clearTimeout(t);
  }, [step, lines, reduced, paused]);

  const visible = reduced ? lines.length : step.line;
  return (
    <div className="tv-terminal" role="img" aria-label={`Terminal: ${lines.map((l) => l.cmd).join(', ')}`}>
      <div className="tv-terminal-bar">
        <span style={{ background: '#ff5f56' }} /><span style={{ background: '#ffbd2e' }} /><span style={{ background: '#27c93f' }} />
        <b>{title}</b>
      </div>
      <div className="tv-terminal-body">
        {lines.slice(0, visible).map((l, i) => (
          <div key={i}>
            <div><span className="tv-prompt">{prompt}</span> {l.cmd}</div>
            {l.out?.map((o, j) => <div key={j} className="tv-out">{o}</div>)}
          </div>
        ))}
        {!reduced && lines[step.line] && (
          <div><span className="tv-prompt">{prompt}</span> {lines[step.line].cmd.slice(0, step.chars)}<span className="tv-caret">▋</span></div>
        )}
      </div>
    </div>
  );
}

function FileTreeScene({ items }: { items?: Array<{ name: string; depth: number; icon?: string }> }) {
  const list = items || [
    { name: '/', depth: 0, icon: 'mdi:folder-network' },
    { name: 'home', depth: 1 },
    { name: 'estudiante', depth: 2, icon: 'mdi:folder-account' },
    { name: 'Documentos', depth: 3 },
    { name: 'informe.txt', depth: 4, icon: 'mdi:file-document-outline' },
    { name: 'etc', depth: 1, icon: 'mdi:folder-cog' },
    { name: 'bin', depth: 1, icon: 'mdi:folder-wrench' },
    { name: 'var', depth: 1 },
  ];
  return (
    <div className="tv-tree" role="img" aria-label="Árbol de directorios">
      {list.map((it, i) => (
        <div key={i} className="tv-tree-row" style={{ paddingLeft: `${it.depth * 1.4}rem`, animationDelay: `${i * 0.35}s` } as CSSProperties}>
          {it.depth > 0 && <span className="tv-tree-branch" />}
          <Icon icon={it.icon || 'mdi:folder'} className="tv-tree-icon" />
          <span>{it.name}</span>
        </div>
      ))}
    </div>
  );
}

function WavesScene() {
  const devices = [{ x: 300, y: 60, icon: 'mdi:laptop' }, { x: 330, y: 130, icon: 'mdi:cellphone' }, { x: 290, y: 200, icon: 'mdi:tablet' }];
  return (
    <Svg label="Señal Wi-Fi">
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={95} cy={130} r={150} className="tv-wave" style={{ animationDelay: `${i}s` }} />
      ))}
      <circle cx={95} cy={130} r={32} className="tv-card tv-pulse-stroke" />
      <SvgIcon icon="mdi:router-wireless" x={95} y={130} size={30} />
      <text x={95} y={182} className="tv-label">Router / AP</text>
      {devices.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r={22} className="tv-card" />
          <SvgIcon icon={d.icon} x={d.x} y={d.y} />
          <Packet path={`M120 130 L${d.x - 22} ${d.y}`} dur={2.2} offset={i * 0.7} r={4} color={TONES[i + 1]} />
        </g>
      ))}
    </Svg>
  );
}

function MediaScene({ medium }: { medium: 'twisted' | 'fiber' | 'wireless' }) {
  if (medium === 'wireless') return <WavesScene />;
  if (medium === 'fiber') {
    const zig = 'M30 120 L80 100 L130 140 L180 100 L230 140 L280 100 L330 140 L370 120';
    return (
      <Svg label="Fibra óptica: la luz rebota dentro del núcleo">
        <rect x={20} y={84} width={360} height={72} rx={36} className="tv-card" style={{ strokeWidth: 3 }} />
        <rect x={20} y={96} width={360} height={48} rx={24} style={{ fill: 'color-mix(in srgb, #06b6d4 14%, transparent)' }} />
        <path d={zig} className="tv-line" style={{ stroke: '#06b6d4', opacity: 0.45 }} />
        <Packet path={zig} dur={2.2} r={6} color="#22d3ee" />
        <Packet path={zig} dur={2.2} offset={1.1} r={6} color="#22d3ee" />
        <text x={200} y={190} className="tv-label">Pulsos de luz · núcleo de vidrio</text>
        <text x={200} y={206} className="tv-sub">Largas distancias, inmune a interferencias</text>
      </Svg>
    );
  }
  const wave = (phase: number) => {
    let d = `M20 ${120 + Math.sin(phase) * 18}`;
    for (let x = 20; x <= 380; x += 10) d += ` L${x} ${(120 + Math.sin(x / 18 + phase) * 18).toFixed(1)}`;
    return d;
  };
  return (
    <Svg label="Par trenzado">
      <path d={wave(0)} className="tv-lane" style={{ stroke: '#f59e0b', strokeWidth: 5 }} />
      <path d={wave(Math.PI)} className="tv-lane" style={{ stroke: 'var(--app-primary)', strokeWidth: 5, animationDirection: 'reverse' }} />
      <rect x={350} y={96} width={36} height={48} rx={6} className="tv-card" />
      <SvgIcon icon="mdi:ethernet" x={368} y={120} size={22} />
      <text x={200} y={180} className="tv-label">Par trenzado (UTP) · conector RJ-45</text>
      <text x={200} y={196} className="tv-sub">El trenzado reduce la interferencia</text>
    </Svg>
  );
}

function ScopesScene() {
  const zones = [
    { r: 104, l: 'WAN · país / mundo', icon: 'mdi:earth', c: '#8b5cf6' },
    { r: 72, l: 'MAN · ciudad', icon: 'mdi:city-variant-outline', c: '#06b6d4' },
    { r: 40, l: 'LAN', icon: 'mdi:home-outline', c: 'var(--app-primary)' },
  ];
  return (
    <Svg label="Alcance de redes LAN, MAN y WAN">
      <circle cx={200} cy={124} r={110} className="tv-wave" style={{ animationDuration: '4s' }} />
      {zones.map((z) => (
        <g key={z.l}>
          <circle cx={200} cy={124} r={z.r} style={{ fill: `color-mix(in srgb, ${z.c} 10%, transparent)`, stroke: z.c, strokeWidth: 2 }} strokeDasharray="5 6" />
          <text x={200} y={124 - z.r + 15} className="tv-sub" style={{ fill: z.c, fontWeight: 800 }}>{z.l}</text>
        </g>
      ))}
      <SvgIcon icon="mdi:home-outline" x={200} y={130} size={26} />
      <SvgIcon icon="mdi:wifi" x={232} y={110} size={14} color="#10b981" />
      <text x={262} y={112} className="tv-sub" style={{ fill: '#10b981' }}>WLAN</text>
    </Svg>
  );
}

function OsiScene() {
  const osi = ['Aplicación', 'Presentación', 'Sesión', 'Transporte', 'Red', 'Enlace de datos', 'Física'];
  const tcp = [{ l: 'Aplicación', from: 0, to: 2 }, { l: 'Transporte', from: 3, to: 3 }, { l: 'Internet', from: 4, to: 4 }, { l: 'Acceso a red', from: 5, to: 6 }];
  const rowH = 30;
  const y0 = 22;
  const cycle = 7 * 0.6;
  return (
    <Svg h={250} label="Modelo OSI y TCP/IP">
      <text x={130} y={14} className="tv-sub" style={{ fontWeight: 800 }}>OSI (7 capas)</text>
      <text x={300} y={14} className="tv-sub" style={{ fontWeight: 800 }}>TCP/IP (4 capas)</text>
      {osi.map((l, i) => (
        <g key={l}>
          <rect x={44} y={y0 + i * rowH} width={172} height={rowH - 5} rx={7} className="tv-card tv-card-seq" style={{ animationDelay: `${i * 0.6}s`, animationDuration: `${cycle}s` }} />
          <text x={58} y={y0 + i * rowH + 17} className="tv-sub" textAnchor="start" style={{ fontWeight: 800 }}>{7 - i}</text>
          <text x={138} y={y0 + i * rowH + 17} className="tv-label">{l}</text>
        </g>
      ))}
      {tcp.map((t, i) => {
        const y = y0 + t.from * rowH;
        const h = (t.to - t.from + 1) * rowH - 5;
        return (
          <g key={t.l}>
            <rect x={236} y={y} width={128} height={h} rx={8} style={{ fill: `color-mix(in srgb, ${TONES[i]} 16%, transparent)`, stroke: TONES[i], strokeWidth: 1.5 }} />
            <text x={300} y={y + h / 2 + 4} className="tv-label">{t.l}</text>
          </g>
        );
      })}
      <line x1={28} y1={y0} x2={28} y2={y0 + 7 * rowH - 5} className="tv-line tv-dash" />
      <Packet path={`M28 ${y0} L28 ${y0 + 7 * rowH - 5}`} dur={cycle} r={6} />
    </Svg>
  );
}

function ClientServerScene({ request = 'Solicitud', response = 'Respuesta', server = 'mdi:server' }: { request?: string; response?: string; server?: string }) {
  const clients = [{ y: 52, icon: 'mdi:laptop' }, { y: 120, icon: 'mdi:monitor' }, { y: 188, icon: 'mdi:cellphone' }];
  return (
    <Svg label="Modelo cliente-servidor">
      {clients.map((c, i) => (
        <g key={i}>
          <line x1={92} y1={c.y} x2={292} y2={120} className="tv-line tv-dash" />
          <Card x={62} y={c.y} w={60} h={46} icon={c.icon} />
          <Packet path={`M92 ${c.y} L292 120`} dur={2.6} offset={i * 0.9} r={5} label={i === 0 ? request : undefined} />
          <Packet path={`M292 120 L92 ${c.y}`} dur={2.6} offset={i * 0.9 + 1.3} r={5} color="#10b981" label={i === 2 ? response : undefined} />
        </g>
      ))}
      <rect x={292} y={70} width={84} height={100} rx={14} className="tv-card tv-pulse-stroke" />
      <SvgIcon icon={server} x={334} y={110} size={34} />
      <text x={334} y={150} className="tv-label">Servidor</text>
      <text x={62} y={228} className="tv-sub">Clientes</text>
    </Svg>
  );
}

function SequenceScene({ left, right, steps, label }: { left: VisualNode; right: VisualNode; steps: Array<{ text: string; dir: 'r' | 'l'; color?: string }>; label: string }) {
  const total = steps.length * 1.6 + 1.2;
  const laneY = (i: number) => 52 + i * (150 / Math.max(1, steps.length - 1 || 1));
  return (
    <Svg label={label}>
      <line x1={70} y1={40} x2={70} y2={224} className="tv-line" strokeDasharray="4 6" />
      <line x1={330} y1={40} x2={330} y2={224} className="tv-line" strokeDasharray="4 6" />
      <Card x={70} y={26} w={96} h={40} icon={left.icon} />
      <Card x={330} y={26} w={96} h={40} icon={right.icon} />
      <text x={70} y={236} className="tv-sub" style={{ fontWeight: 800 }}>{left.label}</text>
      <text x={330} y={236} className="tv-sub" style={{ fontWeight: 800 }}>{right.label}</text>
      {steps.map((s, i) => {
        const y = steps.length === 1 ? 130 : laneY(i);
        const [x1, x2] = s.dir === 'r' ? [76, 324] : [324, 76];
        const color = s.color || TONES[i % TONES.length];
        const start = (i * 1.6) / total;
        const end = (i * 1.6 + 1.2) / total;
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y} style={{ stroke: color, strokeWidth: 2, opacity: 0.35 }} />
            <path d={s.dir === 'r' ? `M${x2 - 8} ${y - 5} L${x2} ${y} L${x2 - 8} ${y + 5}` : `M${x2 + 8} ${y - 5} L${x2} ${y} L${x2 + 8} ${y + 5}`} style={{ stroke: color, strokeWidth: 2, fill: 'none', opacity: 0.6 }} />
            <text x={200} y={y - 7} className="tv-label" style={{ fill: color }}>{`${i + 1}. ${s.text}`}</text>
            <SlotPacket path={`M${x1} ${y} L${x2} ${y}`} total={total} start={start} end={end} color={color} />
          </g>
        );
      })}
    </Svg>
  );
}

function Ipv4Scene({ ip = '192.168.1.10', prefix = 24 }: { ip?: string; prefix?: number }) {
  const octets = ip.split('.').map((o) => Number(o));
  return (
    <Svg h={230} label={`Dirección IPv4 ${ip}/${prefix}`}>
      <path d={`M24 34 H${24 + Math.min(prefix, 32) * 11}`} style={{ stroke: 'var(--app-primary)', strokeWidth: 3 }} />
      <text x={24 + (prefix * 11) / 2} y={26} className="tv-label" style={{ fill: 'var(--app-primary)' }}>Red ({prefix} bits)</text>
      <path d={`M${24 + prefix * 11 + 6} 34 H376`} style={{ stroke: '#10b981', strokeWidth: 3 }} />
      <text x={(24 + prefix * 11 + 376) / 2} y={26} className="tv-label" style={{ fill: '#10b981' }}>Host</text>
      {octets.map((o, i) => {
        const x = 24 + i * 88;
        const isNet = (i + 1) * 8 <= prefix;
        return (
          <g key={i}>
            <rect x={x} y={48} width={80} height={46} rx={10} className="tv-card" style={{ stroke: isNet ? 'var(--app-primary)' : '#10b981', strokeWidth: 2 }} />
            <text x={x + 40} y={79} className="tv-big" style={{ fontSize: 22 }}>{o}</text>
            {i < 3 && <text x={x + 84} y={80} className="tv-big" style={{ fontSize: 22 }}>.</text>}
            {o.toString(2).padStart(8, '0').split('').map((bit, j) => {
              const bitIndex = i * 8 + j;
              return (
                <text key={j} x={x + 5 + j * 10} y={118} className="tv-bit tv-bit-pop" style={{ fill: bitIndex < prefix ? 'var(--app-primary)' : '#10b981', animationDelay: `${bitIndex * 0.06}s`, fontSize: 12 }}>
                  {bit}
                </text>
              );
            })}
          </g>
        );
      })}
      <text x={200} y={150} className="tv-label">Máscara: /{prefix} = {maskFromPrefix(prefix)}</text>
      <text x={200} y={172} className="tv-sub">32 bits en 4 octetos · cada octeto va de 0 a 255</text>
      <g transform="translate(110 188)">
        <rect width={14} height={14} rx={3} style={{ fill: 'var(--app-primary)' }} />
        <text x={20} y={11} className="tv-sub" textAnchor="start">identifica la red</text>
        <rect x={110} width={14} height={14} rx={3} style={{ fill: '#10b981' }} />
        <text x={130} y={11} className="tv-sub" textAnchor="start">identifica el equipo</text>
      </g>
    </Svg>
  );
}

function maskFromPrefix(prefix: number) {
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  return [24, 16, 8, 0].map((s) => (mask >>> s) & 255).join('.');
}

function blurOnPointer(e: React.MouseEvent<HTMLElement>) {
  e.currentTarget.blur();
}

function BitsScene({ value = 192 }: { value?: number }) {
  const [bits, setBits] = useState(() => value.toString(2).padStart(8, '0').split('').map((b) => b === '1'));
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  const total = bits.reduce((sum, on, i) => sum + (on ? weights[i] : 0), 0);
  return (
    <div className="tv-html">
      <p className="tv-html-hint"><Icon icon="mdi:gesture-tap" /> Toca cada bit para encenderlo o apagarlo</p>
      <div className="tv-bits">
        {weights.map((w, i) => (
          <button key={w} type="button" className={`tv-bit-btn ${bits[i] ? 'is-on' : ''}`} onMouseUp={blurOnPointer} onClick={() => setBits((b) => b.map((v, j) => (j === i ? !v : v)))} aria-pressed={bits[i]}>
            <small>{w}</small>
            <b>{bits[i] ? 1 : 0}</b>
          </button>
        ))}
      </div>
      <div className="tv-bits-result">
        <code>{bits.map((b) => (b ? 1 : 0)).join('')}</code>
        <Icon icon="mdi:arrow-right-bold" />
        <strong>{total}</strong>
      </div>
      <p className="tv-html-note">{weights.filter((_, i) => bits[i]).join(' + ') || '0'} = {total}</p>
    </div>
  );
}

function SubnetScene({ base = '192.168.1.0', prefix = 26 }: { base?: string; prefix?: number }) {
  const [p, setP] = useState(prefix);
  const block = 2 ** (32 - p);
  const subnets = 2 ** (p - 24);
  const prefixBase = base.split('.').slice(0, 3).join('.');
  return (
    <div className="tv-html">
      <label className="tv-subnet-label">
        <span>Prefijo: <b>/{p}</b> · máscara <b>{maskFromPrefix(p)}</b></span>
        <input type="range" min={24} max={30} value={p} onChange={(e) => setP(Number(e.target.value))} aria-label="Prefijo de subred" />
      </label>
      <div className="tv-subnet-bar" key={p}>
        {Array.from({ length: subnets }, (_, i) => (
          <span key={i} style={{ background: TONES[i % TONES.length], animationDelay: `${i * 0.03}s` }} title={`${prefixBase}.${i * block}`} />
        ))}
      </div>
      <div className="tv-subnet-stats">
        <div><b>{subnets}</b><small>subredes</small></div>
        <div><b>{block}</b><small>direcciones c/u</small></div>
        <div><b>{block - 2}</b><small>hosts útiles</small></div>
      </div>
      <ul className="tv-subnet-list">
        {Array.from({ length: Math.min(3, subnets) }, (_, i) => (
          <li key={i}><span style={{ background: TONES[i] }} />{prefixBase}.{i * block} <em>→</em> hosts .{i * block + 1} a .{i * block + block - 2} <em>· broadcast .{i * block + block - 1}</em></li>
        ))}
      </ul>
    </div>
  );
}

function UnitsScene({ value = 1, unit = 'GB' }: { value?: number; unit?: string }) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const [v, setV] = useState(value);
  const [u, setU] = useState(Math.max(0, units.indexOf(unit)));
  const bytes = v * 1024 ** u;
  const fmt = (n: number) => (n >= 1e6 || (n > 0 && n < 0.001) ? n.toExponential(2) : Number(n.toFixed(3)).toLocaleString('es-PE'));
  return (
    <div className="tv-html">
      <div className="tv-units-input">
        <input type="number" min={0} value={v} onChange={(e) => setV(Math.max(0, Number(e.target.value)))} aria-label="Cantidad" />
        <select value={u} onChange={(e) => setU(Number(e.target.value))} aria-label="Unidad">
          {units.map((un, i) => <option key={un} value={i}>{un}</option>)}
        </select>
      </div>
      <div className="tv-units-ladder">
        {units.map((un, i) => (
          <div key={un} className={i === u ? 'is-active' : ''} style={{ '--i': i } as CSSProperties}>
            <span>{un}</span>
            <b>{fmt(bytes / 1024 ** i)}</b>
          </div>
        ))}
      </div>
      <p className="tv-html-note">Cada escalón multiplica o divide por <b>1024</b></p>
    </div>
  );
}

function OrbitScene({ center, satellites, label }: { center: string; satellites: string[]; label?: string }) {
  const n = satellites.length;
  return (
    <Svg label={label || 'Componentes conectados'}>
      <ellipse cx={200} cy={120} rx={150} ry={92} className="tv-line tv-dash" />
      <g className="tv-spin" style={{ transformOrigin: '200px 120px' }}>
        {satellites.map((icon, i) => {
          const a = (i / n) * Math.PI * 2;
          const x = 200 + Math.cos(a) * 112;
          const y = 120 + Math.sin(a) * 92;
          return (
            <g key={i}>
              <line x1={200} y1={120} x2={x} y2={y} className="tv-line" style={{ opacity: 0.35 }} />
              <Packet path={`M200 120 L${x.toFixed(1)} ${y.toFixed(1)}`} dur={2.4} offset={i * 0.4} r={3.5} color={TONES[i % TONES.length]} />
              <g className="tv-spin-reverse" style={{ transformOrigin: `${x}px ${y}px` }}>
                <circle cx={x} cy={y} r={22} className="tv-card" />
                <SvgIcon icon={icon} x={x} y={y} size={22} color={TONES[i % TONES.length]} />
              </g>
            </g>
          );
        })}
      </g>
      <circle cx={200} cy={120} r={40} className="tv-card tv-pulse-stroke" style={{ strokeWidth: 3 }} />
      <SvgIcon icon={center} x={200} y={label ? 112 : 120} size={34} />
      {label && <text x={200} y={140} className="tv-sub" style={{ fontWeight: 800 }}>{label}</text>}
    </Svg>
  );
}

function ShieldScene({ label = 'Protección' }: { label?: string }) {
  const threats = [[20, 30], [380, 40], [30, 210], [380, 200], [200, 4]];
  return (
    <Svg label={label}>
      <circle cx={200} cy={120} r={70} className="tv-wave" style={{ animationDuration: '3s' }} />
      <path d="M200 40 L262 64 V118 C262 160 234 188 200 202 C166 188 138 160 138 118 V64 Z" className="tv-card tv-pulse-stroke" style={{ strokeWidth: 3 }} />
      <SvgIcon icon="mdi:lock-check" x={200} y={116} size={44} color="#10b981" />
      <text x={200} y={228} className="tv-label">{label}</text>
      {threats.map(([x, y], i) => (
        <SlotPacket key={i} path={`M${x} ${y} L${200 + (x - 200) * 0.38} ${120 + (y - 120) * 0.38}`} total={3} start={(i * 0.18) % 0.6} end={(i * 0.18) % 0.6 + 0.35} color="#f43f5e" />
      ))}
    </Svg>
  );
}

function GaugeScene({ value, label, unit = '%' }: { value: number; label: string; unit?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  const len = Math.PI * 120;
  return (
    <Svg h={200} label={`${label}: ${value}${unit}`}>
      <path d="M80 160 A120 120 0 0 1 320 160" style={{ fill: 'none', stroke: 'var(--app-border)', strokeWidth: 18, strokeLinecap: 'round' }} />
      <path d="M80 160 A120 120 0 0 1 320 160" className="tv-gauge" style={{ strokeDasharray: len, '--len': len, '--off': len * (1 - pct / 100) } as CSSProperties} />
      <g className="tv-needle" style={{ '--deg': `${(pct / 100) * 180 - 90}deg` } as CSSProperties}>
        <line x1={200} y1={160} x2={200} y2={62} style={{ stroke: 'var(--app-text)', strokeWidth: 4, strokeLinecap: 'round' }} />
      </g>
      <circle cx={200} cy={160} r={9} style={{ fill: 'var(--app-text)' }} />
      <text x={200} y={130} className="tv-big" style={{ fontSize: 26 }}>{value}{unit}</text>
      <text x={200} y={190} className="tv-label">{label}</text>
    </Svg>
  );
}

function TasksScene({ mode }: { mode: 'mono' | 'multi' }) {
  const tasks = ['Navegador', 'Editor', 'Música'];
  const total = 6;
  return (
    <Svg h={190} label={mode === 'mono' ? 'Monotarea' : 'Multitarea'}>
      {tasks.map((t, i) => {
        const y = 30 + i * 46;
        const [s, e] = mode === 'mono' ? [i / 3, (i + 1) / 3 - 0.02] : [0, 0.9];
        return (
          <g key={t}>
            <text x={20} y={y + 17} className="tv-label" textAnchor="start">{t}</text>
            <rect x={110} y={y} width={270} height={26} rx={8} className="tv-card" />
            <rect x={110} y={y} width={0} height={26} rx={8} style={{ fill: TONES[i] }}>
              <animate attributeName="width" dur={`${total}s`} repeatCount="indefinite" values="0;0;270;270;0" keyTimes={`0;${s.toFixed(2)};${e.toFixed(2)};0.97;1`} />
            </rect>
          </g>
        );
      })}
      <text x={200} y={178} className="tv-sub">{mode === 'mono' ? 'Una tarea a la vez: las demás esperan' : 'La CPU alterna rápido: todas avanzan juntas'}</text>
    </Svg>
  );
}

function UsersScene({ mode }: { mode: 'mono' | 'multi' }) {
  if (mode === 'mono') {
    return <FlowScene nodes={[{ icon: 'mdi:account', label: 'Usuario' }, { icon: 'mdi:monitor', label: 'Equipo' }]} />;
  }
  const users = [[70, 50], [70, 190], [330, 50], [330, 190]];
  return (
    <Svg label="Multiusuario">
      {users.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={200} y2={120} className="tv-line tv-dash" />
          <circle cx={x} cy={y} r={22} className="tv-card" />
          <SvgIcon icon="mdi:account" x={x} y={y} color={TONES[i]} />
          <Packet path={`M${x} ${y} L200 120`} dur={2} offset={i * 0.5} r={4} color={TONES[i]} />
        </g>
      ))}
      <rect x={160} y={86} width={80} height={68} rx={14} className="tv-card tv-pulse-stroke" />
      <SvgIcon icon="mdi:server" x={200} y={112} size={28} />
      <text x={200} y={142} className="tv-label">Servidor</text>
    </Svg>
  );
}

/* ---------- Componente público ---------- */

function renderScene(spec: VisualSpec) {
  switch (spec.kind) {
    case 'flow': return <FlowScene nodes={spec.nodes} />;
    case 'layers': return <LayersScene layers={spec.layers} />;
    case 'network': return <NetworkScene topology={spec.topology} center={spec.center} node={spec.node} />;
    case 'scheduler': return <SchedulerScene />;
    case 'memory': return <MemoryScene />;
    case 'binary': return <BinaryScene char={spec.char} />;
    case 'bus': return <BusScene />;
    case 'hypervisor': return <HypervisorScene type={spec.type} />;
    case 'terminal': return <TerminalScene title={spec.title} prompt={spec.prompt} lines={spec.lines} />;
    case 'filetree': return <FileTreeScene items={spec.items} />;
    case 'waves': return <WavesScene />;
    case 'media': return <MediaScene medium={spec.medium} />;
    case 'scopes': return <ScopesScene />;
    case 'osi': return <OsiScene />;
    case 'client-server': return <ClientServerScene request={spec.request} response={spec.response} server={spec.server} />;
    case 'dhcp':
      return (
        <SequenceScene
          label="DHCP: proceso DORA"
          left={{ icon: 'mdi:laptop', label: 'Cliente' }}
          right={{ icon: 'mdi:server-network', label: 'Servidor DHCP' }}
          steps={[{ text: 'Discover: ¿hay un servidor?', dir: 'r' }, { text: 'Offer: te ofrezco 192.168.1.25', dir: 'l' }, { text: 'Request: quiero esa IP', dir: 'r' }, { text: 'Ack: es tuya', dir: 'l' }]}
        />
      );
    case 'dns':
      return (
        <SequenceScene
          label="Consulta DNS"
          left={{ icon: 'mdi:laptop', label: 'Tu PC' }}
          right={{ icon: 'mdi:dns', label: 'Servidor DNS' }}
          steps={[{ text: '¿IP de senati.edu.pe?', dir: 'r' }, { text: 'Es 190.xxx.xxx.xxx', dir: 'l' }, { text: 'Ahora el navegador se conecta', dir: 'r', color: '#10b981' }]}
        />
      );
    case 'ping':
      return (
        <SequenceScene
          label="Ping con ICMP"
          left={{ icon: 'mdi:monitor', label: 'Tu PC' }}
          right={{ icon: 'mdi:monitor-dashboard', label: spec.target || '192.168.1.20' }}
          steps={[{ text: 'Echo Request (¿estás ahí?)', dir: 'r' }, { text: 'Echo Reply: tiempo=3ms', dir: 'l', color: '#10b981' }]}
        />
      );
    case 'ipv4': return <Ipv4Scene ip={spec.ip} prefix={spec.prefix} />;
    case 'bits': return <BitsScene value={spec.value} />;
    case 'subnet': return <SubnetScene base={spec.base} prefix={spec.prefix} />;
    case 'units': return <UnitsScene value={spec.value} unit={spec.unit} />;
    case 'orbit': return <OrbitScene center={spec.center} satellites={spec.satellites} label={spec.label} />;
    case 'shield': return <ShieldScene label={spec.label} />;
    case 'gauge': return <GaugeScene value={spec.value} label={spec.label} unit={spec.unit} />;
    case 'tasks': return <TasksScene mode={spec.mode} />;
    case 'users': return <UsersScene mode={spec.mode} />;
    default: return null;
  }
}

export function TopicVisual({ spec, paused = false, className = '' }: { spec: VisualSpec; paused?: boolean; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const motion = useMemo(() => ({ reduced, paused }), [reduced, paused]);

  useEffect(() => {
    ref.current?.querySelectorAll('svg').forEach((svg) => {
      if (paused) svg.pauseAnimations();
      else svg.unpauseAnimations();
    });
  }, [paused]);

  return (
    <MotionContext.Provider value={motion}>
      <div ref={ref} className={`topic-visual ${paused ? 'tv-paused' : ''} ${className}`}>
        {renderScene(spec)}
      </div>
    </MotionContext.Provider>
  );
}
