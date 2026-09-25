import { NavLink, useParams, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { AppLogo } from './AppLogo';
import { mockCourses } from '../../data/mockCourses';

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  end?: boolean;
  badge?: string;
  onClick?: () => void;
}

function NavItem({ to, icon, label, end, badge, onClick }: NavItemProps) {
  const location = useLocation();
  const isActive = end ? location.pathname === to : location.pathname.startsWith(to) || (to === '/' && location.pathname === '/');

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg overflow-hidden transition-all duration-200 font-medium ${
        isActive
          ? 'bg-[var(--color-app-primary)] text-white shadow-md'
          : 'text-[var(--color-app-muted)] hover:text-[var(--color-app-text)]'
      }`}
    >
      {/* Fondo tipo agua que sube al hacer hover */}
      {!isActive && (
        <span className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-[var(--color-app-primary)]/10 transition-all duration-500 ease-out" />
      )}

      {/* Barra brillante que cruza al pasar el mouse */}
      <span className="absolute top-0 -left-1/2 h-full w-1/2 -skew-x-12 bg-white/25 translate-x-[-150%] group-hover:translate-x-[300%] transition-transform duration-700 ease-in-out" />

      <span className="relative z-10 flex items-center gap-3 w-full">
        <span className={`flex items-center justify-center w-7 h-7 rounded-md transition-all duration-300 ${
          isActive ? 'bg-white/20 scale-110' : 'bg-[var(--color-app-primary)]/0 group-hover:bg-[var(--color-app-primary)]/10 group-hover:scale-110'
        }`}>
          <Icon icon={icon} className={`text-xl transition-transform duration-300 ${isActive ? 'group-hover:rotate-6' : 'group-hover:scale-110'}`} />
          {isActive && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white/90 animate-ping" />
          )}
        </span>

        <span className="flex-1 text-sm transition-transform duration-200 group-hover:translate-x-0.5 truncate">{label}</span>

        {badge && (
          <span className={`text-[10px] font-black transition-all duration-300 ${isActive ? 'text-white/80' : 'text-[var(--color-app-primary)] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'}`}>
            {badge}
          </span>
        )}
      </span>
    </NavLink>
  );
}

export function AppSidebar() {
  const { courseId } = useParams();
  const location = useLocation();
  const isCourseContext = Boolean(courseId) || location.pathname.includes('/courses/');
  const currentCourseId = courseId || 'piad-221';
  const currentCourse = mockCourses.find(c => c.id === currentCourseId) || mockCourses[0];

  return (
    <aside className="w-64 border-r border-[var(--color-app-border)] bg-[var(--color-app-surface)] h-full hidden md:flex flex-col overflow-hidden transition-colors duration-200">
      <div className="h-16 flex items-center px-6 border-b border-[var(--color-app-border)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 border-l border-b border-[var(--color-app-primary)]/10 rounded-bl-[2rem]" />
        <AppLogo />
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-app-muted)] mb-3 px-4">General</p>
          <div className="space-y-1.5">
            <NavItem to="/" icon="mdi:home-outline" label="Inicio" end />
            <NavItem to="/courses" icon="mdi:book-open-page-variant-outline" label="Cursos" end />
            <NavItem to="/ai-education" icon="mdi:layers-triple-outline" label="Otros cursos" end />
            <NavItem to="/settings" icon="mdi:cog-outline" label="Configuración" end />
          </div>
        </div>

        {isCourseContext && currentCourse && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-app-muted)] mb-3 px-4">Curso Actual</p>
            <div className="px-4 py-3 rounded-lg bg-[var(--color-app-surface-sec)] mb-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-[var(--color-app-primary)]/10 rounded-bl-[1.25rem]" />
              <p className="text-xs font-bold text-[var(--color-app-primary)] truncate">{currentCourse.code}</p>
              <p className="text-xs text-[var(--color-app-muted)] line-clamp-2 mt-1 leading-snug">{currentCourse.name}</p>
            </div>
            <div className="space-y-1.5">
              {currentCourse.weeks.map((week, index) => (
                <NavItem
                  key={week.id}
                  to={`/courses/${currentCourse.id}/week/${week.id}`}
                  icon="mdi:calendar-week"
                  label={week.title}
                  badge={String(index + 1).padStart(2, '0')}
                />
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="relative mt-auto px-4 py-6 border-t border-[var(--color-app-border)]/60 flex flex-col items-center justify-center text-center gap-4 select-none overflow-hidden">
        <div className="absolute -right-5 -bottom-8 text-[5.5rem] text-[var(--color-app-primary)] opacity-[0.025] rotate-12 pointer-events-none select-none font-mono font-black">
          {'{;)}'}
        </div>

        <div className="relative z-10 group w-full">
          <div className="absolute -inset-1 bg-[var(--color-app-primary)]/5 rounded-2xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out" />
          <div className="relative flex flex-col items-center gap-1 px-5 py-4 rounded-xl bg-[var(--color-app-surface-sec)]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-[var(--color-app-text)] tracking-tight truncate">Ing. Diego Lipa</span>
              <Icon icon="mdi:check-decagram" className="text-emerald-500 text-base shrink-0" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-app-muted)]">Instructor SENATI</p>
            <p className="text-[10px] text-[var(--color-app-muted)]/70 font-mono">Diego Lipa • DEGGY</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-2.5 text-xs text-[var(--color-app-muted)]">
          <a
            href="https://github.com/deggydev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-medium hover:text-[var(--color-app-primary)] transition-colors group"
            title="GitHub @deggydev"
          >
            <Icon icon="mdi:github" className="text-sm text-[var(--color-app-text)] group-hover:text-[var(--color-app-primary)] group-hover:scale-110 transition-all" />
            <span>deggydev</span>
            <Icon icon="mdi:open-in-new" className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <span className="text-[var(--color-app-muted)]/40">•</span>
          <span className="font-mono text-[11px] text-[var(--color-app-muted)] font-medium">v2.1.2</span>
        </div>

        <div className="relative z-10 group overflow-hidden pt-2 w-full flex items-center justify-center gap-1.5 text-xs text-[var(--color-app-muted)]">
          <span>Hecho con</span>
          <Icon icon="mdi:heart" className="text-rose-500 text-xs inline animate-pulse" />
          <span className="relative font-extrabold tracking-wider text-[var(--color-app-primary)] uppercase">
            D E G G Y
            <span className="pointer-events-none absolute top-0 left-[-50%] h-full w-1/2 -skew-x-12 bg-white/40 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
          </span>
        </div>
      </div>
    </aside>
  );
}
