import { useEffect } from 'react';

interface KeyboardNavProps {
  onNext: () => void;
  onPrev: () => void;
  onFullscreenToggle: () => void;
  onExit: () => void;
}

export function useKeyboardNavigation({ onNext, onPrev, onFullscreenToggle, onExit }: KeyboardNavProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ': // Space
        case 'PageDown':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          onPrev();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          onFullscreenToggle();
          break;
        case 'Escape':
          if (!document.fullscreenElement) {
            onExit();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onFullscreenToggle, onExit]);
}
