import { useEffect, useState, type MouseEvent } from 'react';
import { Icon } from '@iconify/react';
import { TopicVisual, type VisualSpec } from '../visuals/TopicVisual';
import '../visuals/visuals.css';

const INTERACTIVE_KINDS = new Set(['bits', 'subnet', 'units']);

function isInteractiveVisual(spec?: VisualSpec) {
  return !!spec && INTERACTIVE_KINDS.has(spec.kind);
}

/** Quita el foco tras un clic con el mouse para que las flechas sigan cambiando de diapositiva. */
function blurOnPointer(e: MouseEvent<HTMLElement>) {
  e.currentTarget.blur();
}

/* ---------------- Escenario de la animación (con pausa) ---------------- */

export function VisualStage({ visual, caption, className = '' }: { visual: VisualSpec; caption?: string; className?: string }) {
  const [paused, setPaused] = useState(false);
  const interactive = isInteractiveVisual(visual);
  return (
    <div className={`visual-stage ${className}`}>
      <div className="visual-stage-body">
        <TopicVisual spec={visual} paused={paused} />
      </div>
      {(caption || !interactive) && (
        <div className="visual-stage-toolbar">
          <span className="flex items-center gap-1.5 min-w-0">
            <Icon icon={interactive ? 'mdi:gesture-tap' : 'mdi:motion-play-outline'} className="text-base text-[var(--color-app-primary)] shrink-0" />
            <span className="truncate">{caption || 'Animación del concepto'}</span>
          </span>
          {!interactive && (
            <button type="button" onMouseUp={blurOnPointer} onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
              <Icon icon={paused ? 'mdi:play' : 'mdi:pause'} /> {paused ? 'Reanudar' : 'Pausar'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------- Diapositiva visual: animación + ideas clave ---------------- */

interface VisualSlideProps {
  title?: string;
  kicker?: string;
  icon?: string;
  content?: string;
  points?: string[];
  visual?: VisualSpec;
  caption?: string;
  reverse?: boolean;
}

export function VisualSlide({ title, kicker = 'Concepto clave', icon = 'mdi:lightbulb-on-outline', content, points = [], visual, caption, reverse }: VisualSlideProps) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="slide-shell slide-shell--content flex-1 flex flex-col p-4 sm:p-8 md:p-10 lg:p-14 h-full overflow-y-auto custom-slide-scroll">
      <div className={`flex-1 grid gap-6 lg:gap-10 items-center ${visual ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]' : ''}`}>
        <div className={`flex flex-col gap-4 sm:gap-5 min-w-0 ${reverse ? 'lg:order-2' : ''}`}>
          <div className="slide-kicker"><Icon icon={icon} /> {kicker}</div>
          <h2 className="slide-title text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">{title}</h2>
          {content && (
            <p className="slide-copy slide-rich-text text-base sm:text-lg md:text-xl text-[var(--color-app-muted)] leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
          )}
          {points.length > 0 && (
            <div className="grid gap-1.5 sm:gap-2">
              {points.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseUp={blurOnPointer}
                  onClick={() => setActive(active === i ? null : i)}
                  className={`visual-point stagger-item ${active === i ? 'is-active' : ''}`}
                  style={{ ['--i' as string]: i }}
                  aria-pressed={active === i}
                >
                  <span className="visual-point-dot">{i + 1}</span>
                  <span className="slide-rich-text text-sm sm:text-base md:text-lg leading-snug font-medium pt-0.5" dangerouslySetInnerHTML={{ __html: p }} />
                </button>
              ))}
            </div>
          )}
        </div>
        {visual && (
          <VisualStage visual={visual} caption={caption} className={`h-full max-h-[32rem] min-h-[18rem] ${reverse ? 'lg:order-1' : ''}`} />
        )}
      </div>
    </div>
  );
}

/* ---------------- Recorrido paso a paso ---------------- */

interface FlowStep {
  icon: string;
  label: string;
  detail: string;
}

interface FlowSlideProps {
  title?: string;
  kicker?: string;
  content?: string;
  steps?: FlowStep[];
  visual?: VisualSpec;
}

export function FlowSlide({ title, kicker = 'Paso a paso', content, steps = [], visual }: FlowSlideProps) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const n = steps.length;

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      if (active >= n - 1) setPlaying(false);
      else setActive((a) => a + 1);
    }, 2200);
    return () => window.clearTimeout(t);
  }, [playing, active, n]);

  if (n === 0) return null;
  const current = steps[active];
  const edge = 50 / n;
  const progress = n > 1 ? active / (n - 1) : 1;

  return (
    <div className="slide-shell slide-shell--content flex-1 flex flex-col p-4 sm:p-8 md:p-10 lg:p-14 h-full overflow-y-auto custom-slide-scroll gap-5 sm:gap-8">
      <div className="slide-heading">
        <div className="slide-kicker mb-2"><Icon icon="mdi:transit-connection-variant" /> {kicker}</div>
        <h2 className="slide-title text-2xl sm:text-4xl md:text-5xl font-extrabold">{title}</h2>
        {content && <p className="slide-copy text-base sm:text-lg md:text-xl text-[var(--color-app-muted)] mt-3 max-w-4xl" dangerouslySetInnerHTML={{ __html: content }} />}
      </div>

      <div className="flow-track" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        <div className="flow-rail" style={{ left: `${edge}%`, right: `${edge}%` }}>
          <div className="flow-rail-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="flow-runner" style={{ left: `${edge + progress * (100 - 2 * edge)}%` }} aria-hidden="true" />
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onMouseUp={blurOnPointer}
            onClick={() => { setPlaying(false); setActive(i); }}
            className={`flow-node ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
            aria-current={i === active ? 'step' : undefined}
          >
            <span className="flow-node-icon"><Icon icon={i < active ? 'mdi:check-bold' : s.icon} /></span>
            <span className="flow-node-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className={`grid gap-5 lg:gap-8 flex-1 ${visual ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]' : ''}`}>
        <div key={active} className="flow-detail slide-panel p-5 sm:p-7 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-[var(--color-app-primary)] text-white grid place-items-center text-2xl shrink-0 icon-float">
              <Icon icon={current.icon} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-app-primary)]">Paso {active + 1} de {n}</p>
              <h3 className="text-xl sm:text-2xl font-extrabold">{current.label}</h3>
            </div>
          </div>
          <p className="slide-rich-text text-base sm:text-lg md:text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: current.detail }} />
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            <button type="button" onMouseUp={blurOnPointer} onClick={() => { setPlaying(false); setActive((a) => Math.max(0, a - 1)); }} disabled={active === 0} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--color-app-border)] font-bold text-sm disabled:opacity-40">
              <Icon icon="mdi:chevron-left" /> Anterior
            </button>
            <button type="button" onMouseUp={blurOnPointer} onClick={() => { setPlaying(false); setActive((a) => Math.min(n - 1, a + 1)); }} disabled={active === n - 1} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--color-app-primary)] text-white font-bold text-sm disabled:opacity-40">
              Siguiente <Icon icon="mdi:chevron-right" />
            </button>
            <button
              type="button"
              onMouseUp={blurOnPointer}
              onClick={() => {
                if (!playing && active === n - 1) setActive(0);
                setPlaying((p) => !p);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[var(--color-app-primary)]/50 text-[var(--color-app-primary)] font-bold text-sm"
            >
              <Icon icon={playing ? 'mdi:pause' : 'mdi:play'} /> {playing ? 'Pausar' : 'Reproducir recorrido'}
            </button>
          </div>
        </div>
        {visual && <VisualStage visual={visual} className="min-h-[16rem]" />}
      </div>
    </div>
  );
}

/* ---------------- Comparación con tarjetas que se abren ---------------- */

interface CompareCard {
  icon: string;
  title: string;
  text: string;
  tag?: string;
  visual?: VisualSpec;
  details?: string[];
}

interface CompareSlideProps {
  title?: string;
  kicker?: string;
  content?: string;
  cards?: CompareCard[];
}

export function CompareSlide({ title, kicker = 'Compara y diferencia', content, cards = [] }: CompareSlideProps) {
  const [open, setOpen] = useState<number | null>(null);
  const cols = cards.length >= 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : cards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  return (
    <div className="slide-shell slide-shell--content flex-1 flex flex-col p-4 sm:p-8 md:p-10 lg:p-14 h-full overflow-y-auto custom-slide-scroll gap-5 sm:gap-7">
      <div className="slide-heading">
        <div className="slide-kicker mb-2"><Icon icon="mdi:compare-horizontal" /> {kicker}</div>
        <h2 className="slide-title text-2xl sm:text-4xl md:text-5xl font-extrabold">{title}</h2>
        {content && <p className="slide-copy text-base sm:text-lg md:text-xl text-[var(--color-app-muted)] mt-3 max-w-4xl" dangerouslySetInnerHTML={{ __html: content }} />}
      </div>
      <div className={`grid gap-4 sm:gap-5 ${cols} items-start`}>
        {cards.map((card, i) => {
          const isOpen = open === i;
          return (
            <button
              key={i}
              type="button"
              onMouseUp={blurOnPointer}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`compare-card slide-panel stagger-item ${isOpen ? 'is-open' : ''}`}
              style={{ ['--i' as string]: i }}
            >
              <div className="compare-card-visual">
                {card.visual ? (
                  <TopicVisual spec={card.visual} />
                ) : (
                  <Icon icon={card.icon} className="text-6xl sm:text-7xl text-[var(--color-app-primary)] icon-float" style={{ animationDelay: `${i * 0.5}s` }} />
                )}
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-extrabold flex items-center gap-2">
                    {card.visual && <Icon icon={card.icon} className="text-[var(--color-app-primary)]" />}
                    {card.title}
                  </h3>
                  {card.tag && <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-[var(--color-app-primary)]/12 text-[var(--color-app-primary)] shrink-0">{card.tag}</span>}
                </div>
                <p className="slide-rich-text text-sm sm:text-base text-[var(--color-app-muted)] leading-relaxed" dangerouslySetInnerHTML={{ __html: card.text }} />
                {card.details && card.details.length > 0 && (
                  <>
                    <div className="compare-card-details">
                      <div>
                        <ul className="mt-2 grid gap-1.5 border-t border-[var(--color-app-border)] pt-3">
                          {card.details.map((d, j) => (
                            <li key={j} className="flex gap-2 text-sm sm:text-base">
                              <Icon icon="mdi:check-circle" className="text-emerald-500 shrink-0 mt-0.5" />
                              <span className="slide-rich-text" dangerouslySetInnerHTML={{ __html: d }} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--color-app-primary)]">
                      <Icon icon={isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'} /> {isOpen ? 'Ocultar' : 'Ver más'}
                    </span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Temporizador para ejercicios ---------------- */

export function ClassTimer({ minutes }: { minutes: number }) {
  const total = Math.round(minutes * 60);
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  const active = running && left > 0;

  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => setLeft((l) => (l <= 1 ? 0 : l - 1)), 1000);
    return () => window.clearInterval(t);
  }, [active]);

  const mm = String(Math.floor(left / 60)).padStart(2, '0');
  const ss = String(left % 60).padStart(2, '0');
  return (
    <div className={`class-timer ${active ? 'is-running' : ''} ${left === 0 ? 'is-done' : ''}`} aria-live="polite">
      <Icon icon="mdi:timer-outline" className="text-lg" />
      <span className="text-sm sm:text-base">{mm}:{ss}</span>
      <button type="button" onMouseUp={blurOnPointer} onClick={() => setRunning((r) => !r)} aria-label={active ? 'Pausar temporizador' : 'Iniciar temporizador'} disabled={left === 0}>
        <Icon icon={active ? 'mdi:pause' : 'mdi:play'} />
      </button>
      <button type="button" onMouseUp={blurOnPointer} onClick={() => { setRunning(false); setLeft(total); }} aria-label="Reiniciar temporizador">
        <Icon icon="mdi:restart" />
      </button>
    </div>
  );
}
