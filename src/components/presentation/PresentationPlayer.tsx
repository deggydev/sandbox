import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PresentationFrame } from './PresentationFrame';
import { PresentationControls } from './PresentationControls';
import { SlideRenderer } from './SlideRenderer';
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

  // Auto-hide controls logic
  useEffect(() => {
    let timeoutId: number;
    
    const handleMouseMove = () => {
      setControlsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setControlsVisible(false);
      }, 3000); // hide after 3s of inactivity
    };

    window.addEventListener('mousemove', handleMouseMove);
    // Initial hide
    timeoutId = window.setTimeout(() => setControlsVisible(false), 3000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

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
      className="relative w-full h-full flex items-center justify-center cursor-default select-none"
      onContextMenu={(e) => e.preventDefault()} // Disable right click
      onCopy={(e) => e.preventDefault()} // Disable copying
    >
      <PresentationFrame
        headerRight={contextTitle}
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
