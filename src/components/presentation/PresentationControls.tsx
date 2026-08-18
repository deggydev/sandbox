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
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[var(--color-app-surface)] border border-[var(--color-app-border)] p-2 rounded-full shadow-lg transition-all duration-300 z-50 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <IconButton onClick={onExit} aria-label="Exit" title="Salir (Esc)">
        <Icon icon="mdi:close" />
      </IconButton>
      
      <div className="w-px h-6 bg-[var(--color-app-border)] mx-1" />
      
      <IconButton onClick={onOverview} aria-label="Overview" title="Vista General">
        <Icon icon="mdi:view-grid-outline" />
      </IconButton>
      
      <div className="w-px h-6 bg-[var(--color-app-border)] mx-1" />

      <IconButton 
        onClick={onPrev} 
        disabled={currentIndex === 0}
        aria-label="Previous"
        title="Anterior (Flecha Izquierda)"
      >
        <Icon icon="mdi:chevron-left" className="text-xl" />
      </IconButton>

      <span className="text-sm font-bold min-w-[3rem] text-center text-[var(--color-app-text)]">
        {currentIndex + 1} / {totalSlides}
      </span>

      <IconButton 
        onClick={onNext} 
        disabled={currentIndex === totalSlides - 1}
        aria-label="Next"
        title="Siguiente (Flecha Derecha)"
      >
        <Icon icon="mdi:chevron-right" className="text-xl" />
      </IconButton>
      
      <div className="w-px h-6 bg-[var(--color-app-border)] mx-1" />

      <IconButton onClick={toggleFullscreen} aria-label="Fullscreen" title="Pantalla Completa (F)">
        <Icon icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} className="text-xl" />
      </IconButton>
    </div>
  );
}
