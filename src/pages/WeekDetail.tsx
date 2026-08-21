import { Link, useParams, Navigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button } from '../components/ui/Button';
import { mockCourses } from '../data/mockCourses';

const SingleSheetCard = ({ title, subtitle, linkTo }: { title: string, subtitle: string, linkTo: string }) => (
  <div 
    className="group relative border border-[var(--color-app-border)] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full rounded"
    style={{
      background: 'linear-gradient(225deg, transparent 24px, var(--color-app-surface) 0)'
    }}
  >
    {/* Flawless Fold effect top-right */}
    <div 
      className="absolute top-[-1px] right-[-1px] shadow-[-2px_2px_4px_rgba(0,0,0,0.1)] rounded-bl border-b border-l border-[var(--color-app-border)] transition-all duration-300 group-hover:shadow-[-4px_4px_6px_rgba(0,0,0,0.1)]"
      style={{
        width: '34px',
        height: '34px',
        background: 'linear-gradient(225deg, transparent 50%, var(--color-app-surface-sec) 50%)'
      }}
    ></div>
    
    <div className="p-6 border-b border-[var(--color-app-border)] flex-1 pt-8">
      <h2 className="text-lg font-bold mb-2 uppercase text-[var(--color-app-text)] pr-6">{title}</h2>
      <p className="text-sm text-[var(--color-app-muted)] leading-relaxed">{subtitle}</p>
    </div>
    <div className="p-5 bg-[var(--color-app-surface-sec)] flex items-center justify-between rounded-b">
      <span className="text-xs font-semibold text-[var(--color-app-muted)] uppercase tracking-wider flex items-center gap-1">
        <Icon icon="mdi:file-document-outline" className="text-lg" /> Documento
      </span>
      <Link to={linkTo}>
        <Button variant="primary" className="shadow-sm">Abrir</Button>
      </Link>
    </div>
  </div>
);

const StackedSheetsCard = ({ title, subtitle, linkTo }: { title: string, subtitle: string, linkTo: string }) => (
  <div className="relative group mt-2 h-full flex flex-col cursor-default">
    {/* Background sheet 2 */}
    <div className="absolute inset-0 bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-xl shadow-sm transform translate-y-2 translate-x-2 rotate-2 transition-transform duration-300 group-hover:translate-y-4 group-hover:translate-x-4 group-hover:rotate-6 opacity-50"></div>
    {/* Background sheet 1 */}
    <div className="absolute inset-0 bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-xl shadow-sm transform translate-y-1 translate-x-1 rotate-1 transition-transform duration-300 group-hover:translate-y-2 group-hover:translate-x-2 group-hover:rotate-3 opacity-80"></div>
    
    {/* Main Card */}
    <div className="relative bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-1 flex flex-col h-full z-10">
      <div className="p-6 border-b border-[var(--color-app-border)] flex-1 pt-8">
        <h2 className="text-lg font-bold mb-2 uppercase text-[var(--color-app-text)]">{title}</h2>
        <p className="text-sm text-[var(--color-app-muted)] leading-relaxed">{subtitle}</p>
      </div>
      <div className="p-5 bg-[var(--color-app-surface-sec)] flex items-center justify-between rounded-b-xl">
        <span className="text-xs font-semibold text-[var(--color-app-muted)] uppercase tracking-wider flex items-center gap-1">
          <Icon icon="mdi:presentation-play" className="text-lg" /> Presentación
        </span>
        <Link to={linkTo}>
          <Button variant="primary" className="shadow-sm">Abrir</Button>
        </Link>
      </div>
    </div>
  </div>
);

export function WeekDetail() {
  const { courseId, weekId } = useParams();

  const course = mockCourses.find(c => c.id === (courseId || 'piad-221')) as any;
  if (!course) return <Navigate to="/courses" replace />;

  const week = course.weeks.find((w: any) => w.id === weekId) as any;
  if (!week) return <Navigate to={`/courses/${course.id}`} replace />;

  const hasTheoryPresentation = week.theory?.slides?.length > 0;
  const hasWorkshopPresentation = week.workshop?.slides?.length > 0;
  const hasPresentations = hasTheoryPresentation || hasWorkshopPresentation;

  return (
    <div className="max-w-5xl mx-auto space-y-10 mt-6 pb-12">
      <div className="border-b border-[var(--color-app-border)] pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--color-app-primary)]/10 flex items-center justify-center text-[var(--color-app-primary)]">
            <Icon icon="mdi:calendar-week" className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold uppercase">{week.title}</h1>
        </div>
        <p className="text-[var(--color-app-muted)] text-lg pl-13">
          Seleccione el contenido o plan de sesión que desea visualizar.
        </p>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icon icon="mdi:clipboard-text-outline" className="text-[var(--color-app-primary)]" /> 
          Planes de Sesión
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <SingleSheetCard 
            title="Plan de sesión teórico" 
            subtitle="Lineamientos, temas y objetivos teóricos de la semana."
            linkTo={`/courses/${courseId}/week/${weekId}/session-plan/theory/view`}
          />
          <SingleSheetCard 
            title="Plan de sesión taller" 
            subtitle="Indicaciones, ejercicios y objetivos prácticos de la semana."
            linkTo={`/courses/${courseId}/week/${weekId}/session-plan/workshop/view`}
          />
        </div>
      </div>

      {hasPresentations && (
        <div className="space-y-6 pt-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Icon icon="mdi:projector-screen-outline" className="text-[var(--color-app-primary)]" /> 
            Presentaciones Interactivas
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {hasTheoryPresentation && (
              <StackedSheetsCard 
                title="Conocimiento teórico" 
                subtitle="Diapositivas y material visual para la clase teórica."
                linkTo={`/courses/${courseId}/week/${weekId}/theory/present`}
              />
            )}
            {hasWorkshopPresentation && (
              <StackedSheetsCard 
                title="Taller / Práctica" 
                subtitle="Casos de uso, código y ejercicios prácticos."
                linkTo={`/courses/${courseId}/week/${weekId}/workshop/present`}
              />
            )}
          </div>
        </div>
      )}

      {!hasPresentations && (
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-[var(--color-app-muted)]">
            <Icon icon="mdi:projector-screen-outline" /> 
            Presentaciones Interactivas
          </h3>
          <div className="border border-dashed border-[var(--color-app-border)] rounded-xl p-10 text-center text-[var(--color-app-muted)]">
            <Icon icon="mdi:clock-outline" className="text-4xl mx-auto mb-3 opacity-40" />
            <p className="font-medium">Las presentaciones interactivas de esta semana aún están en construcción.</p>
            <p className="text-sm mt-1 opacity-70">Vuelve pronto.</p>
          </div>
        </div>
      )}
    </div>
  );
}
