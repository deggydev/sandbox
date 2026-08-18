import { useLocation, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Simplified mapping for the mock structure
  const routeNames: Record<string, string> = {
    'courses': 'Cursos',
    'piad-221': 'ALGORITMOS Y PROGRAMACIÓN PARA DESARROLLO DE SOFTWARE',
    'session-plan': 'Plan de Sesión',
    'week': 'Semanas',
    'week-01': 'Semana 01',
    'theory': 'Conocimiento teórico',
    'workshop': 'Taller / Práctica',
    'settings': 'Configuración'
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-sm font-medium text-[var(--color-app-muted)] overflow-hidden">
      <Link to="/" className="hover:text-[var(--color-app-primary)] flex-shrink-0 transition-colors">
        <Icon icon="mdi:home" className="text-lg" />
      </Link>
      
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        
        // Skip "week" path segment since it's just structural in URL
        if (value === 'week') return null;

        const displayName = routeNames[value] || value;

        return (
          <div key={to} className="flex items-center whitespace-nowrap">
            <Icon icon="mdi:chevron-right" className="mx-1 text-lg flex-shrink-0" />
            {isLast ? (
              <span className="text-[var(--color-app-text)] font-semibold truncate max-w-[150px] sm:max-w-xs">
                {displayName}
              </span>
            ) : (
              <Link to={to} className="hover:text-[var(--color-app-primary)] truncate max-w-[100px] sm:max-w-xs transition-colors">
                {displayName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
