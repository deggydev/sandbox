import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { PresentationLayout } from '../layouts/PresentationLayout';
import { Home } from '../pages/Home';
import { Courses } from '../pages/Courses';
import { WeekDetail } from '../pages/WeekDetail';
import { Presentation } from '../pages/Presentation';
import { SessionPlanDocument } from '../pages/SessionPlanDocument';
import { AiEducationList } from '../pages/AiEducationList';
import { AiEducationDetail } from '../pages/AiEducationDetail';
import { AiEducationPresentation } from '../pages/AiEducationPresentation';
import { mockCourses } from '../data/mockCourses';

function CourseRedirect() {
  const { courseId } = useParams();
  const course = mockCourses.find(c => c.id === courseId);
  if (!course || course.weeks.length === 0) return <Navigate to="/courses" replace />;
  return <Navigate to={`week/${course.weeks[0].id}`} replace />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        
        {/* Rutas de IA en Educación */}
        <Route path="/ai-education" element={<AiEducationList />} />
        <Route path="/ai-education/:videoId" element={<AiEducationDetail />} />
        
        {/* Redirección para el detalle del curso hacia la primera semana */}
        <Route path="/courses/:courseId" element={<CourseRedirect />} />
        
        <Route path="/courses/:courseId/week/:weekId" element={<WeekDetail />} />
        <Route path="/courses/:courseId/week/:weekId/session-plan/theory/view" element={<SessionPlanDocument />} />
        <Route path="/courses/:courseId/week/:weekId/session-plan/workshop/view" element={<SessionPlanDocument />} />
        
        <Route path="/settings" element={<div className="p-8">Configuración en construcción...</div>} />
      </Route>
      {/* Rutas de Presentación (Full screen, sin AppLayout) */}
      <Route element={<PresentationLayout />}>
        <Route path="/ai-education/:videoId/present" element={<AiEducationPresentation />} />
        <Route path="/courses/:courseId/week/:weekId/theory/present" element={<Presentation />} />
        <Route path="/courses/:courseId/week/:weekId/workshop/present" element={<Presentation />} />
      </Route>

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
