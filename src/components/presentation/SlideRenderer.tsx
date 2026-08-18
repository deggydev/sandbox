import { 
  CoverSlide, 
  TitleSlide, 
  TextSlide, 
  ImageSlide, 
  CodeSlide, 
  ClosingSlide, 
  CalloutSlide,
  InteractiveListSlide,
  QuizSlide,
  SolutionSlide,
  ExerciseSlide
} from '../slides';

interface SlideRendererProps {
  slide: any; // Using any for mock simplicity, should type this properly
}

export function SlideRenderer({ slide }: SlideRendererProps) {
  switch (slide.type) {
    case 'cover':
      return <CoverSlide {...slide} />;
    case 'title':
      return <TitleSlide {...slide} />;
    case 'text':
      return <TextSlide {...slide} />;
    case 'image':
      return <ImageSlide {...slide} />;
    case 'code':
      return <CodeSlide {...slide} />;
    case 'exercise':
      return <ExerciseSlide {...slide} />;
    case 'callout':
      return <CalloutSlide {...slide} />;
    case 'interactive-list':
      return <InteractiveListSlide {...slide} />;
    case 'quiz':
      return <QuizSlide {...slide} />;
    case 'solution':
      return <SolutionSlide {...slide} />;
    case 'closing':
      return <ClosingSlide {...slide} />;
    default:
      return (
        <div className="flex-1 flex items-center justify-center p-10 text-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Slide Type Not Found</h2>
            <p className="text-[var(--color-app-muted)]">Type: {slide.type}</p>
          </div>
        </div>
      );
  }
}
