import { Link, useParams, Navigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { mockCourses } from '../data/mockCourses';

interface ContentCardProps {
  title: string;
  subtitle: string;
  linkTo: string;
  icon: string;
  label: string;
}

const SingleSheetCard = ({ title, subtitle, linkTo, icon, label }: ContentCardProps) => (
  <Link
    to={linkTo}
    className="group relative bg-[var(--color-app-surface)] border border-[var(--color-app-border)] hover:border-[var(--color-app-primary)]/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-app-primary)]"
  >
    {/* Flawless Fold effect top-right */}
    <div className="absolute top-0 right-0 w-14 h-14 bg-[var(--color-app-surface-sec)] border-l border-b border-[var(--color-app-border)] rounded-bl-[2rem] transition-all duration-300 group-hover:w-16 group-hover:h-16" />

    <div className="p-6 md:p-7 flex-1 relative">
      <div className="w-12 h-12 rounded-lg bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-app-primary)] group-hover:text-white group-hover:rotate-6 group-hover:scale-125 group-hover:shadow-lg transition-all duration-300 origin-left">
        <Icon icon={icon} className="text-2xl group-hover:scale-110 transition-transform duration-300" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-app-primary)]">{label}</span>
      <h2 className="text-lg font-bold mt-2 mb-3 uppercase text-[var(--color-app-text)] pr-8 leading-snug">{title}</h2>
      <p className="text-sm text-[var(--color-app-muted)] leading-relaxed">{subtitle}</p>
    </div>
    <div className="px-6 py-4 bg-[var(--color-app-surface-sec)] flex items-center justify-between border-t border-[var(--color-app-border)]">
      <span className="text-xs font-semibold text-[var(--color-app-muted)] uppercase tracking-wider flex items-center gap-2">
        <Icon icon="mdi:file-document-outline" className="text-lg" /> Documento
      </span>
      <span className="w-9 h-9 rounded-full border border-[var(--color-app-border)] bg-[var(--color-app-surface)] flex items-center justify-center text-[var(--color-app-primary)] group-hover:bg-[var(--color-app-primary)] group-hover:text-white group-hover:border-[var(--color-app-primary)] transition-all">
        <Icon icon="lucide:arrow-up-right" className="group-hover:rotate-12 transition-transform" />
      </span>
    </div>
  </Link>
);

const StackedSheetsCard = ({ title, subtitle, linkTo, icon, label }: ContentCardProps) => (
  <Link to={linkTo} className="relative group mt-2 h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-[var(--color-app-primary)] rounded-xl">
    {/* Background sheet 2 */}
    <div className="absolute inset-0 bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-xl shadow-sm translate-y-2 translate-x-2 rotate-2 transition-transform duration-300 group-hover:translate-y-3 group-hover:translate-x-3 group-hover:rotate-3 opacity-50" />
    {/* Background sheet 1 */}
    <div className="absolute inset-0 bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-xl shadow-sm translate-y-1 translate-x-1 rotate-1 transition-transform duration-300 group-hover:translate-y-2 group-hover:translate-x-2 group-hover:rotate-2 opacity-80" />

    {/* Main Card */}
    <div className="relative bg-[var(--color-app-surface)] border border-[var(--color-app-border)] group-hover:border-[var(--color-app-primary)]/60 rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1.5 flex flex-col h-full z-10 overflow-hidden">
      <div className="p-6 md:p-7 flex-1 relative overflow-hidden">
        <Icon icon="mdi:code-braces" className="absolute -right-5 -bottom-7 text-[110px] text-[var(--color-app-primary)] opacity-[0.04] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" />
        <div className="w-12 h-12 rounded-lg bg-[var(--color-app-primary)] text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-125 group-hover:-rotate-6 group-hover:shadow-lg transition-all duration-300 origin-left">
          <Icon icon={icon} className="text-2xl group-hover:scale-110 transition-transform duration-300" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-app-primary)]">{label}</span>
        <h2 className="text-lg font-bold mt-2 mb-3 uppercase text-[var(--color-app-text)] leading-snug">{title}</h2>
        <p className="text-sm text-[var(--color-app-muted)] leading-relaxed relative z-10">{subtitle}</p>
      </div>
      <div className="px-6 py-4 bg-[var(--color-app-surface-sec)] flex items-center justify-between border-t border-[var(--color-app-border)]">
        <span className="text-xs font-semibold text-[var(--color-app-muted)] uppercase tracking-wider flex items-center gap-2">
          <Icon icon="mdi:presentation-play" className="text-lg" /> Presentación
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-app-primary)]">
          Iniciar <Icon icon="lucide:play" className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  </Link>
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
  const availableResources = 2 + Number(hasTheoryPresentation) + Number(hasWorkshopPresentation);

  return (
    <div className="max-w-6xl mx-auto space-y-12 mt-4 pb-12">
      <div className="relative bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-xl p-6 md:p-8 overflow-hidden shadow-sm">
        <Icon icon="mdi:code-tags" className="absolute -right-5 -bottom-10 text-[170px] text-[var(--color-app-primary)] opacity-[0.035]" />
        <div className="relative flex flex-col md:flex-row md:items-center gap-5">
          <div className="w-14 h-14 rounded-xl bg-[var(--color-app-primary)] text-white flex items-center justify-center shadow-md shrink-0">
            <Icon icon="mdi:calendar-week" className="text-3xl" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-app-primary)] mb-2">
              <span>{course.code}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-app-muted)]" />
              <span>Contenido académico</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">{week.title}</h1>
            <p className="text-[var(--color-app-muted)] mt-2 leading-relaxed">
              Selecciona un plan de sesión o inicia una presentación interactiva para desarrollar la clase.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <div className="px-4 py-3 rounded-lg bg-[var(--color-app-surface-sec)] border border-[var(--color-app-border)] text-center">
              <p className="text-xl font-bold text-[var(--color-app-primary)]">{availableResources}</p>
              <p className="text-[10px] uppercase tracking-wider text-[var(--color-app-muted)]">Recursos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] flex items-center justify-center">
            <Icon icon="mdi:clipboard-text-outline" className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Planes de sesión</h3>
            <p className="text-sm text-[var(--color-app-muted)]">Objetivos, contenidos y actividades para organizar la clase.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <SingleSheetCard
            title="Plan de sesión teórico"
            subtitle="Lineamientos, temas y objetivos teóricos de la semana."
            linkTo={`/courses/${courseId}/week/${weekId}/session-plan/theory/view`}
            icon="lucide:book-open-check"
            label="Conocimiento"
          />
          <SingleSheetCard
            title="Plan de sesión taller"
            subtitle="Indicaciones, ejercicios y objetivos prácticos de la semana."
            linkTo={`/courses/${courseId}/week/${weekId}/session-plan/workshop/view`}
            icon="lucide:clipboard-check"
            label="Aplicación práctica"
          />
        </div>
      </div>

      {hasPresentations && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-app-primary)] text-white flex items-center justify-center shadow-sm">
              <Icon icon="mdi:projector-screen-outline" className="text-xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Presentaciones interactivas</h3>
              <p className="text-sm text-[var(--color-app-muted)]">Material visual preparado para acompañar la exposición.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 pb-2">
            {hasTheoryPresentation && (
              <StackedSheetsCard
                title="Conocimiento teórico"
                subtitle="Diapositivas y material visual para la clase teórica."
                linkTo={`/courses/${courseId}/week/${weekId}/theory/present`}
                icon="lucide:presentation"
                label={`${week.theory.slides.length} diapositivas`}
              />
            )}
            {hasWorkshopPresentation && (
              <StackedSheetsCard
                title="Taller / Práctica"
                subtitle="Casos de uso, código y ejercicios prácticos."
                linkTo={`/courses/${courseId}/week/${weekId}/workshop/present`}
                icon="lucide:code-xml"
                label={`${week.workshop.slides.length} diapositivas`}
              />
            )}
          </div>
        </div>
      )}

      {!hasPresentations && (
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold flex items-center gap-2 text-[var(--color-app-muted)]">
            <Icon icon="mdi:projector-screen-outline" />
            Presentaciones interactivas
          </h3>
          <div className="border border-dashed border-[var(--color-app-border)] rounded-xl p-10 text-center text-[var(--color-app-muted)] bg-[var(--color-app-surface)]">
            <Icon icon="mdi:clock-outline" className="text-4xl mx-auto mb-3 opacity-40" />
            <p className="font-medium">Las presentaciones interactivas de esta semana aún están en construcción.</p>
            <p className="text-sm mt-1 opacity-70">Vuelve pronto.</p>
          </div>
        </div>
      )}
    </div>
  );
}
