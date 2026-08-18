import { NavLink, useParams, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { AppLogo } from './AppLogo';

export function AppSidebar() {
  const { courseId } = useParams();
  const location = useLocation();

  const isCourseContext = Boolean(courseId) || location.pathname.includes('/courses/');

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

        {isCourseContext && (
          <>
            <div className="pt-6 pb-2 px-4">
              <p className="text-xs font-bold text-[var(--color-app-muted)] uppercase tracking-wider">
                Curso Actual
              </p>
            </div>

            <NavLink to={`/courses/${courseId || 'piad-221'}/week/week-01`} className={navClass}>
              <Icon icon="mdi:calendar-week" className="text-xl" />
              <span>Semana 01</span>
            </NavLink>
          </>
        )}
      </nav>

      {/* Footer info */}
      <div className="p-4 mt-auto">
        <div className="flex flex-col gap-2 px-2 text-[var(--color-app-muted)] text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium text-xs uppercase tracking-wider">Versión</span>
            <span className="text-xs font-mono">v1.0.0</span>
          </div>
          
          <a 
            href="https://github.com/deggydev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between mt-1 pt-2 border-t border-[var(--color-app-border)]/50 hover:text-[var(--color-app-primary)] transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Icon icon="mdi:github" className="text-lg" />
              <span className="font-medium">deggydev</span>
            </div>
            <Icon icon="mdi:open-in-new" className="text-xs opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </aside>
  );
}
