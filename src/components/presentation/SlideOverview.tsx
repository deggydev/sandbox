import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

interface SlideOverviewProps {
  slides: any[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

const typeLabels: Record<string, { icon: string; label: string }> = {
  cover: { icon: 'mdi:image-filter-center-focus-strong-outline', label: 'Portada' },
  title: { icon: 'mdi:format-title', label: 'Título' },
  text: { icon: 'mdi:text-box-outline', label: 'Texto' },
  image: { icon: 'mdi:image-outline', label: 'Imagen' },
  code: { icon: 'mdi:code-braces', label: 'Código' },
  exercise: { icon: 'mdi:pencil-outline', label: 'Ejercicio' },
  callout: { icon: 'mdi:information-outline', label: 'Destacado' },
  'interactive-list': { icon: 'mdi:format-list-bulleted', label: 'Lista' },
  quiz: { icon: 'mdi:help-circle-outline', label: 'Quiz' },
  solution: { icon: 'mdi:lightbulb-on-outline', label: 'Solución' },
  closing: { icon: 'mdi:flag-checkered', label: 'Cierre' }
};

export function SlideOverview({ slides, currentIndex, onSelect, onClose }: SlideOverviewProps) {
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentIndex]);

  return (
    <div
      className="overview-backdrop fixed inset-0 z-[60] bg-[var(--color-app-bg)]/95 backdrop-blur-md flex flex-col p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label="Vista general de diapositivas"
      onClick={onClose}
    >
      {/* Decorative watermark */}
      <div className="absolute -right-10 -bottom-14 text-[8rem] sm:text-[12rem] text-[var(--color-app-primary)] opacity-[0.03] rotate-12 pointer-events-none select-none font-mono font-black">
        {'{;)}'}
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6 md:mb-8 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 rounded-lg bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] group hover:scale-110 transition-transform">
            <Icon icon="mdi:view-grid-outline" className="text-xl sm:text-2xl" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[var(--color-app-text)]">
              Vista general
            </h2>
            <p className="text-[10px] sm:text-xs text-[var(--color-app-muted)] font-medium mt-0.5">
              {slides.length} diapositivas • Diapositiva actual: {currentIndex + 1}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[10px] sm:text-xs text-[var(--color-app-muted)] font-medium">
            Esc para cerrar
          </span>
          <button
            onClick={onClose}
            className="group flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[var(--color-app-surface-sec)] text-[var(--color-app-text)] hover:bg-[var(--color-app-primary)] hover:text-white transition-all duration-200 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <Icon icon="mdi:close" className="text-base group-hover:rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">Cerrar</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="relative z-10 flex-1 overflow-y-auto custom-slide-scroll px-2 -mx-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto pb-10 pt-2">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            const meta = typeLabels[slide.type] || { icon: 'mdi:slide', label: 'Diapositiva' };
            const title = slide.title || slide.question || meta.label;

            return (
              <button
                ref={isActive ? activeRef : null}
                key={slide.id || index}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(index);
                }}
                className={`overview-card group relative flex flex-col items-start text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-app-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-app-bg)] my-1 ${
                  isActive
                    ? 'overview-active-ring bg-[var(--color-app-primary)] text-white border-[var(--color-app-primary)] scale-[1.02]'
                    : 'bg-[var(--color-app-surface)] border-[var(--color-app-border)] hover:border-[var(--color-app-primary)] hover:bg-[var(--color-app-surface-sec)]'
                }`}
              >
                <span className={`overview-number inline-flex items-center justify-center text-[10px] sm:text-xs font-black uppercase tracking-wider mb-2 px-2 py-1 rounded-md ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] group-hover:bg-[var(--color-app-primary)]/20'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`flex items-center gap-1.5 mb-2 ${isActive ? 'text-white/90' : 'text-[var(--color-app-muted)] group-hover:text-[var(--color-app-primary)]'}`}>
                  <Icon icon={meta.icon} className="overview-icon text-base sm:text-lg" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide">{meta.label}</span>
                </div>
                <span className={`text-xs sm:text-sm font-bold line-clamp-3 ${isActive ? 'text-white' : 'text-[var(--color-app-text)]'}`}>
                  {title}
                </span>

                {isActive && (
                  <span className="absolute top-2 right-2 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <p className="relative z-10 text-center text-xs sm:text-sm text-[var(--color-app-muted)] mt-2 shrink-0">
        Haz clic en una diapositiva para ir directamente a ella
      </p>
    </div>
  );
}
