import { Icon } from '@iconify/react';
import { IconButton } from '../ui/IconButton';
import { useFullscreen } from '../../hooks/useFullscreen';

interface PresentationControlsProps {
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  onOverview: () => void;
  currentIndex: number;
  totalSlides: number;
  isVisible: boolean;
}

export function PresentationControls({
  onNext,
  onPrev,
  onExit,
  onOverview,
  currentIndex,
  totalSlides,
  isVisible
}: PresentationControlsProps) {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  return (
    <div 
      className={`fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 bg-[var(--color-app-surface)]/90 backdrop-blur-md border border-[var(--color-app-border)] p-1.5 sm:p-2 rounded-full shadow-2xl transition-all duration-300 z-50 scale-90 sm:scale-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <IconButton onClick={onExit} aria-label="Exit" title="Salir (Esc)">
        <Icon icon="mdi:close" className="text-lg sm:text-xl" />
      </IconButton>
      
      <div className="w-px h-5 sm:h-6 bg-[var(--color-app-border)] mx-0.5 sm:mx-1" />
      
      <IconButton onClick={onOverview} aria-label="Overview" title="Vista General">
        <Icon icon="mdi:view-grid-outline" className="text-lg sm:text-xl" />
      </IconButton>
      
      <div className="w-px h-5 sm:h-6 bg-[var(--color-app-border)] mx-0.5 sm:mx-1" />

      <IconButton 
        onClick={onPrev} 
        disabled={currentIndex === 0}
        aria-label="Previous"
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
        aria-label="Next"
        title="Siguiente (Flecha Derecha)"
      >
        <Icon icon="mdi:chevron-right" className="text-xl sm:text-2xl" />
      </IconButton>
      
      <div className="w-px h-5 sm:h-6 bg-[var(--color-app-border)] mx-0.5 sm:mx-1" />

      <IconButton onClick={toggleFullscreen} aria-label="Fullscreen" title="Pantalla Completa (F)">
        <Icon icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} className="text-lg sm:text-xl" />
      </IconButton>
    </div>
  );
}

