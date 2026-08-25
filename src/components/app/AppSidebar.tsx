import { NavLink, useParams, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { AppLogo } from './AppLogo';
import { mockCourses } from '../../data/mockCourses';

export function AppSidebar() {
  const { courseId } = useParams();
  const location = useLocation();

  const isCourseContext = Boolean(courseId) || location.pathname.includes('/courses/');
  const currentCourseId = courseId || 'piad-221';
  const currentCourse = mockCourses.find(c => c.id === currentCourseId) || mockCourses[0];

  const navClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
      isActive 
        ? 'bg-[var(--color-app-primary)] text-white' 
        : 'text-[var(--color-app-muted)] hover:bg-[var(--color-app-surface-sec)] hover:text-[var(--color-app-text)]'
    }`;

  return (
    <aside className="w-64 border-r border-[var(--color-app-border)] bg-[var(--color-app-surface)] h-full flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-app-border)]">
        <AppLogo />
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <NavLink to="/" className={navClass} end>
          <Icon icon="mdi:home-outline" className="text-xl" />
          <span>Inicio</span>
        </NavLink>
        <NavLink to="/ai-education" className={navClass}>
          <Icon icon="mdi:robot-education" className="text-xl" />
          <span>IA en la Educación</span>
        </NavLink>
        <NavLink to="/courses" className={navClass} end>
          <Icon icon="mdi:book-open-page-variant-outline" className="text-xl" />
          <span>Cursos</span>
        </NavLink>
        <NavLink to="/settings" className={navClass}>
          <Icon icon="mdi:cog-outline" className="text-xl" />
          <span>Configuración</span>
        </NavLink>

        {isCourseContext && currentCourse && (
          <>
            <div className="pt-6 pb-2 px-4 flex flex-col">
              <p className="text-xs font-bold text-[var(--color-app-muted)] uppercase tracking-wider">
                Curso Actual
              </p>
              <p className="text-xs text-[var(--color-app-text)] font-semibold truncate mt-1">
                {currentCourse.code}
              </p>
            </div>

            {currentCourse.weeks.map(week => (
              <NavLink 
                key={week.id}
                to={`/courses/${currentCourse.id}/week/${week.id}`} 
                className={navClass}
              >
                <Icon icon="mdi:calendar-week" className="text-xl" />
                <span>{week.title}</span>
              </NavLink>
            ))}
          </>
        )}
      </nav>

      {/* Footer / Instructor info (Centrado) */}
      <div className="p-4 mt-auto border-t border-[var(--color-app-border)]/60 flex flex-col items-center justify-center text-center gap-2 select-none">
        {/* Instructor Info */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-bold text-sm text-[var(--color-app-text)] tracking-tight">
              Ing. Diego Lipa
            </span>
            <span title="Verificado" className="inline-flex items-center">
              <Icon icon="mdi:check-decagram" className="text-emerald-500 text-sm shrink-0" />
            </span>
          </div>
          <p className="text-xs text-[var(--color-app-muted)] font-medium">
            Instructor SENATI
          </p>
        </div>

        {/* GitHub link & version */}
        <div className="flex items-center justify-center gap-2.5 text-xs text-[var(--color-app-muted)]">
          <a
            href="https://github.com/deggydev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium hover:text-[var(--color-app-primary)] transition-colors group"
            title="GitHub @deggydev"
          >
            <Icon icon="mdi:github" className="text-sm text-[var(--color-app-text)] group-hover:text-[var(--color-app-primary)] transition-colors" />
            <span>deggydev</span>
            <Icon icon="mdi:open-in-new" className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
          <span className="text-[var(--color-app-muted)]/40">•</span>
          <span className="font-mono text-[11px] text-[var(--color-app-muted)] font-medium">
            v2.0.2
          </span>
        </div>

        {/* Powered by DEGGY al final */}
        <div className="pt-1 border-t border-[var(--color-app-border)]/40 w-full flex items-center justify-center gap-1.5 text-xs text-[var(--color-app-muted)]">
          <span>Hecho con</span>
          <Icon icon="mdi:heart" className="text-rose-500 text-xs inline" />
          <span className="font-extrabold tracking-wider text-[var(--color-app-primary)] uppercase">
            D E G G Y
          </span>
        </div>
      </div>
    </aside>
  );
}
