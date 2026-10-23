import { Icon } from '@iconify/react';
import { IconButton } from '../ui/IconButton';
import { useFullscreen } from '../../hooks/useFullscreen';

interface PresentationControlsProps {
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  onOverview: () => void;
  onGoTo: (index: number) => void;
  currentIndex: number;
  totalSlides: number;
  isVisible: boolean;
}

export function PresentationControls({
  onNext,
  onPrev,
  onExit,
  onOverview,
  onGoTo,
  currentIndex,
  totalSlides,
  isVisible
}: PresentationControlsProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <>
    <div
      className={`fixed bottom-[4.25rem] sm:bottom-24 left-1/2 -translate-x-1/2 w-[min(88vw,640px)] z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="presentation-progress flex items-center gap-1 h-4" role="progressbar" aria-valuemin={1} aria-valuemax={totalSlides} aria-valuenow={currentIndex + 1} aria-label={`Diapositiva ${currentIndex + 1} de ${totalSlides}`}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onGoTo(i)}
            aria-label={`Ir a diapositiva ${i + 1}`}
            title={`Diapositiva ${i + 1}`}
            className={`flex-1 h-1.5 rounded-full transition-all duration-200 hover:h-3 hover:bg-[var(--color-app-primary)] ${
              i < currentIndex
                ? 'bg-[var(--color-app-primary)]/60'
                : i === currentIndex
                ? 'bg-[var(--color-app-primary)] h-3'
                : 'bg-[var(--color-app-border)]'
            }`}
          />
        ))}
      </div>
    </div>

    <div 
      className={`presentation-controls fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 bg-[var(--color-app-surface)]/90 backdrop-blur-md border border-[var(--color-app-border)] p-1.5 sm:p-2 rounded-full shadow-2xl transition-all duration-300 z-50 scale-90 sm:scale-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
       <IconButton onClick={onExit} aria-label="Salir" title="Salir (Esc)">
        <Icon icon="mdi:close" className="text-lg sm:text-xl" />
      </IconButton>
      
      <div className="w-px h-5 sm:h-6 bg-[var(--color-app-border)] mx-0.5 sm:mx-1" />
      
       <IconButton onClick={onOverview} aria-label="Vista general" title="Vista general (G)">
        <Icon icon="mdi:view-grid-outline" className="text-lg sm:text-xl" />
      </IconButton>
      
      <div className="w-px h-5 sm:h-6 bg-[var(--color-app-border)] mx-0.5 sm:mx-1" />

      <IconButton 
        onClick={onPrev} 
        disabled={currentIndex === 0}
         aria-label="Anterior"
        title="Anterior (Flecha Izquierda)"
      >
        <Icon icon="mdi:chevron-left" className="text-xl sm:text-2xl" />
      </IconButton>

      <span className="text-xs sm:text-sm font-bold min-w-[2.75rem] sm:min-w-[3.5rem] text-center text-[var(--color-app-text)] select-none">
        {currentIndex + 1} / {totalSlides}
      </span>

      <IconButton 
        onClick={onNext} 
        disabled={currentIndex === totalSlides - 1}
         aria-label="Siguiente"
        title="Siguiente (Flecha Derecha)"
      >
        <Icon icon="mdi:chevron-right" className="text-xl sm:text-2xl" />
      </IconButton>
      
      <div className="w-px h-5 sm:h-6 bg-[var(--color-app-border)] mx-0.5 sm:mx-1" />

       <IconButton onClick={toggleFullscreen} aria-label="Pantalla completa" title="Pantalla completa (F)">
        <Icon icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} className="text-lg sm:text-xl" />
      </IconButton>
    </div>
    </>
  );
}
