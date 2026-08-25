import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PresentationFrame } from './PresentationFrame';
import { PresentationControls } from './PresentationControls';
import { SlideRenderer } from './SlideRenderer';
import { ThemeSwitcher } from '../app/ThemeSwitcher';
import { usePresentation } from '../../hooks/usePresentation';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface PresentationPlayerProps {
  slides: any[];
  courseCode: string;
  contextTitle: string; // e.g. "Semana 01 | Conocimiento teórico"
}

export function PresentationPlayer({ slides, courseCode, contextTitle }: PresentationPlayerProps) {
  const navigate = useNavigate();
  const [controlsVisible, setControlsVisible] = useState(true);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  
  const { currentIndex, nextSlide, previousSlide, totalSlides } = usePresentation(slides.length);

  const handleExit = () => {
    navigate(-1);
  };

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(console.error);
    }
  };

  useKeyboardNavigation({
    onNext: nextSlide,
    onPrev: previousSlide,
    onFullscreenToggle: handleFullscreenToggle,
    onExit: handleExit
  });

  // Auto-hide controls logic for mouse and touch
  useEffect(() => {
    let timeoutId: number;
    
    const showControlsBriefly = () => {
      setControlsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setControlsVisible(false);
      }, 3500); // hide after 3.5s of inactivity
    };

    window.addEventListener('mousemove', showControlsBriefly);
    window.addEventListener('touchstart', showControlsBriefly, { passive: true });
    
    // Initial hide
    timeoutId = window.setTimeout(() => setControlsVisible(false), 3500);

    return () => {
      window.removeEventListener('mousemove', showControlsBriefly);
      window.removeEventListener('touchstart', showControlsBriefly);
      clearTimeout(timeoutId);
    };
  }, []);

  // Touch swipe handling for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartXRef.current - touchEndX;
    const diffY = touchStartYRef.current - touchEndY;

    // Only trigger if horizontal swipe is significantly stronger than vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swiped Left -> Next slide
        nextSlide();
      } else {
        // Swiped Right -> Previous slide
        previousSlide();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const currentSlideData = slides[currentIndex];

  if (!currentSlideData) {
    return (
      <div className="text-white text-center p-10">
        <h2 className="text-2xl font-bold">No hay diapositivas disponibles</h2>
        <button onClick={handleExit} className="mt-4 px-4 py-2 bg-blue-600 rounded">Volver</button>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full min-h-screen lg:min-h-0 flex items-center justify-center cursor-default select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onContextMenu={(e) => e.preventDefault()} // Disable right click
      onCopy={(e) => e.preventDefault()} // Disable copying
    >
      <PresentationFrame
        headerRight={
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline text-xs sm:text-sm font-semibold text-[var(--color-app-muted)] truncate max-w-[280px]">
              {contextTitle}
            </span>
            <ThemeSwitcher />
          </div>
        }
        footerLeft={courseCode}
        footerRight={`Diapositiva ${currentIndex + 1} de ${totalSlides}`}
      >
        <SlideRenderer slide={currentSlideData} />
      </PresentationFrame>

      <PresentationControls
        onNext={nextSlide}
        onPrev={previousSlide}
        onExit={handleExit}
        onOverview={() => alert('Vista general no implementada todavía')}
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        isVisible={controlsVisible}
      />
    </div>
  );
}

