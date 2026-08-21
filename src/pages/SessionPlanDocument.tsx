import { useParams, useLocation, Navigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { mockCourses } from '../data/mockCourses';
import { Button } from '../components/ui/Button';

export function SessionPlanDocument() {
  const { courseId, weekId } = useParams();
  const location = useLocation();
  const isTheory = location.pathname.includes('/theory');
  
  const course = mockCourses.find(c => c.id === (courseId || 'piad-221')) as any;
  if (!course) return <Navigate to="/courses" replace />;

  const week = course.weeks.find((w: any) => w.id === weekId);
  if (!week) return <Navigate to={`/courses/${course.id}`} replace />;

  const section = isTheory ? week.sessionPlan.theory : week.sessionPlan.workshop;
  const slides = section.slides || [];
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-4 pb-20">
      <div className="flex items-center gap-4 border-b border-[var(--color-app-border)] pb-4">
        <Link to={`/courses/${course.id}/week/${week.id}`}>
          <Button variant="ghost" className="px-2">
            <Icon icon="mdi:arrow-left" className="text-2xl" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold uppercase text-[var(--color-app-text)]">
            Plan de Sesión: {isTheory ? 'Conocimiento Teórico' : 'Taller / Práctica'}
          </h1>
          <p className="text-[var(--color-app-muted)] font-medium">
            {course.name} - {week.title}
          </p>
        </div>
      </div>

      <div className="bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded shadow-sm p-10 md:p-16 min-h-[800px] text-[var(--color-app-text)]">
        {slides.map((slide: any, index: number) => {
          if (slide.type === 'cover') return null;

          return (
            <div key={index} className="mb-6 border-b border-[var(--color-app-border)]/30 pb-6 last:border-0 last:pb-0">
              {slide.title && <h2 className="text-xl font-bold mb-3">{slide.title}</h2>}
              {slide.content && (
                <div 
                  className="text-base leading-relaxed whitespace-pre-wrap mb-4"
                  dangerouslySetInnerHTML={{ __html: slide.content }}
                />
              )}
              {slide.code && (
                <div className="mt-4 bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg border border-gray-800">
                  <div className="flex items-center px-4 py-2 bg-[#2D2D2D] border-b border-gray-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <span className="ml-4 text-xs text-gray-400 font-mono uppercase tracking-wider">{slide.language || 'code'}</span>
                  </div>
                  <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {slide.code}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
