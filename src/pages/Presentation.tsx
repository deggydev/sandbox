import { useParams, useLocation, Navigate } from 'react-router-dom';
import { PresentationPlayer } from '../components/presentation/PresentationPlayer';
import { mockCourses } from '../data/mockCourses';

export function Presentation() {
  const { courseId, weekId } = useParams();
  const location = useLocation();
  
  const isTheory = location.pathname.includes('/theory');

  const course = mockCourses.find(c => c.id === (courseId || 'piad-221')) as any;

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  let slides: any[] = [];
  let contextTitle = '';

  if (weekId) {
    const week = course.weeks.find((w: any) => w.id === weekId);
    if (week) {
      const section = isTheory ? week.theory : week.workshop;
      contextTitle = `${week.title} | ${isTheory ? 'Conocimiento teórico' : 'Taller / Práctica'}`;
      slides = section.slides || [];
    }
  }

  return (
    <PresentationPlayer 
      slides={slides} 
      courseCode={course.code} 
      contextTitle={contextTitle} 
    />
  );
}
