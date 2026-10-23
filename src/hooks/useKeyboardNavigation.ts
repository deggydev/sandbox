import { useEffect } from 'react';

interface KeyboardNavProps {
  onNext: () => void;
  onPrev: () => void;
  onFullscreenToggle: () => void;
  onOverview: () => void;
  onExit: () => void;
}

export function useKeyboardNavigation({ onNext, onPrev, onFullscreenToggle, onOverview, onExit }: KeyboardNavProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName) || target.isContentEditable) return;

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
        case 'g':
        case 'G':
          e.preventDefault();
          onOverview();
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
