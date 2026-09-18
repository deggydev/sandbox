import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';

export function Home() {
  const totalWeeks = mockCourses.reduce((total, course) => total + (course.weeks?.length || 0), 0);

  return (
    <div className="min-h-screen bg-[var(--color-app-bg)] text-[var(--color-app-text)] transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--color-app-surface)] border-b border-[var(--color-app-border)] transition-colors duration-200">
        <div className="absolute -top-10 right-[8%] w-32 h-32 rounded-full border-[24px] border-[var(--color-app-primary)]/5" />
        <div className="absolute bottom-10 left-[48%] w-5 h-5 bg-[var(--color-app-secondary)]/20 rotate-12" />
        <div className="max-w-6xl mx-auto px-6 py-14 md:px-8 md:py-20 relative z-10">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-[var(--color-app-border)] rounded-full bg-[var(--color-app-surface-sec)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-app-muted)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-app-primary)] opacity-40 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-app-primary)]" />
                </span>
                Plataforma académica
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight text-[var(--color-app-text)] leading-[1.08]">
                Bienvenido a <span className="text-[var(--color-app-primary)]">Sandbox SENATI</span>
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-app-muted)] max-w-2xl leading-relaxed">
                Accede a cursos, planes de sesión y presentaciones interactivas diseñadas para acompañar tu formación profesional.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/courses" className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[var(--color-app-primary)] text-white font-semibold hover:bg-[var(--color-app-secondary)] hover:-translate-y-0.5 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-app-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-app-surface)]">
                  Explorar cursos
                  <Icon icon="lucide:arrow-right" className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/ai-education" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-[var(--color-app-border)] bg-[var(--color-app-surface)] text-[var(--color-app-text)] font-semibold hover:border-[var(--color-app-primary)] hover:text-[var(--color-app-primary)] hover:-translate-y-0.5 transition-all">
                  IA en la educación
                </Link>
              </div>
            </div>

            <div className="relative hidden sm:block">
              <div className="absolute -top-4 -right-4 w-full h-full rounded-xl border-2 border-[var(--color-app-primary)]/15 rotate-2" />
              <div className="relative bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-xl shadow-xl p-5 md:p-6">
                <div className="flex items-center justify-between pb-4 border-b border-[var(--color-app-border)]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-app-muted)]">Aula digital</p>
                    <p className="font-bold mt-1">Tu formación, organizada</p>
                  </div>
                  <div className="w-11 h-11 rounded-lg bg-[var(--color-app-primary)] text-white flex items-center justify-center shadow-md">
                    <Icon icon="lucide:presentation" className="text-xl" />
                  </div>
                </div>
                <div className="space-y-3 mt-5">
                  {[
                    { icon: 'lucide:book-open', label: 'Cursos profesionales', detail: `${mockCourses.length} disponibles` },
                    { icon: 'lucide:clipboard-list', label: 'Planes de sesión', detail: 'Teoría y taller' },
                    { icon: 'lucide:monitor-play', label: 'Presentaciones', detail: 'Contenido interactivo' },
                  ].map((item, index) => (
                    <div key={item.label} className="group flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-[var(--color-app-border)] hover:bg-[var(--color-app-surface-sec)] hover:translate-x-1 transition-all">
                      <div className="w-10 h-10 rounded-md bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] flex items-center justify-center group-hover:bg-[var(--color-app-primary)] group-hover:text-white transition-colors">
                        <Icon icon={item.icon} className="text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold">{item.label}</p>
                        <p className="text-xs text-[var(--color-app-muted)] mt-0.5">{item.detail}</p>
                      </div>
                      <span className="text-xs font-bold text-[var(--color-app-muted)]">0{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-12 border border-[var(--color-app-border)] rounded-lg overflow-hidden bg-[var(--color-app-border)]">
            <div className="group bg-[var(--color-app-surface)] px-5 py-4 hover:bg-[var(--color-app-surface-sec)] transition-colors">
              <p className="text-2xl font-bold text-[var(--color-app-primary)] group-hover:scale-105 origin-left transition-transform">{mockCourses.length}</p>
              <p className="text-sm text-[var(--color-app-muted)]">Cursos disponibles</p>
            </div>
            <div className="group bg-[var(--color-app-surface)] px-5 py-4 hover:bg-[var(--color-app-surface-sec)] transition-colors">
              <p className="text-2xl font-bold text-[var(--color-app-primary)] group-hover:scale-105 origin-left transition-transform">{totalWeeks}</p>
              <p className="text-sm text-[var(--color-app-muted)]">Semanas académicas</p>
            </div>
            <div className="group bg-[var(--color-app-surface)] px-5 py-4 hover:bg-[var(--color-app-surface-sec)] transition-colors">
              <p className="text-2xl font-bold text-[var(--color-app-primary)] group-hover:scale-105 origin-left transition-transform">2</p>
              <p className="text-sm text-[var(--color-app-muted)]">Modalidades de sesión</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16 space-y-16">
        {/* Mis Cursos Section */}
        <section aria-labelledby="courses-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-app-primary)] mb-2">Formación académica</p>
              <h2 id="courses-title" className="text-2xl md:text-3xl font-bold text-[var(--color-app-text)]">Mis cursos</h2>
              <p className="mt-2 text-[var(--color-app-muted)]">Material organizado por semanas, sesiones teóricas y talleres prácticos.</p>
            </div>
            <Link to="/courses" className="text-[var(--color-app-primary)] font-semibold inline-flex items-center gap-2 hover:underline underline-offset-4 shrink-0">
              Ver todos los cursos <Icon icon="lucide:arrow-right" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockCourses.map((course) => (
              <article key={course.id} className="bg-[var(--color-app-surface)] rounded-lg border border-[var(--color-app-border)] overflow-hidden hover:border-[var(--color-app-primary)]/50 hover:shadow-lg transition-all group">
                <div className="h-44 relative overflow-hidden bg-[var(--color-app-surface-sec)]">
                  {course.imageUrl ? (
                    <img src={course.imageUrl} alt={`Portada del curso ${course.name}`} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon icon="lucide:book-open" className="text-[var(--color-app-muted)] text-5xl" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[var(--color-app-primary)]" />
                  <span className="absolute top-4 left-4 bg-[var(--color-app-surface)] text-[var(--color-app-primary)] text-xs font-bold px-3 py-1.5 rounded shadow-sm border border-[var(--color-app-border)]">
                    {course.code}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-app-muted)] mb-3">
                    <Icon icon="lucide:calendar-range" className="text-base" />
                    {course.weeks?.length || 0} {(course.weeks?.length || 0) === 1 ? 'semana disponible' : 'semanas disponibles'}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[var(--color-app-text)] leading-snug line-clamp-2">{course.name}</h3>
                  <p className="text-sm text-[var(--color-app-muted)] mt-3 line-clamp-3 leading-relaxed">{course.description}</p>
                  <div className="mt-6 pt-4 border-t border-[var(--color-app-border)]">
                    <Link to={`/courses/${course.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-app-primary)] hover:underline underline-offset-4">
                      Ingresar al curso <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* IA en la Educación Section */}
        <section aria-labelledby="ai-title" className="border border-[var(--color-app-border)] rounded-lg bg-[var(--color-app-surface)] overflow-hidden">
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(280px,0.7fr)]">
            <div className="p-7 md:p-10 flex flex-col justify-center">
              <div className="w-11 h-11 rounded-md bg-[var(--color-app-primary)]/10 text-[var(--color-app-primary)] flex items-center justify-center mb-5">
                <Icon icon="lucide:brain-circuit" className="text-2xl" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-app-primary)] mb-2">Análisis y reflexión</p>
              <h2 id="ai-title" className="text-2xl md:text-3xl font-bold text-[var(--color-app-text)]">IA en la educación</h2>
              <h3 className="text-lg font-semibold mt-4 text-[var(--color-app-text)]">¿Vale la pena estudiar en la era de ChatGPT?</h3>
              <p className="text-[var(--color-app-muted)] mt-3 leading-relaxed max-w-2xl">
                Un análisis sobre cómo la inteligencia artificial transforma el aprendizaje, la evaluación y el desarrollo del pensamiento crítico.
              </p>
              <Link to="/ai-education/video-1" className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-[var(--color-app-primary)] hover:underline underline-offset-4 w-fit">
                Ver presentación y análisis <Icon icon="lucide:arrow-right" />
              </Link>
            </div>
            <div className="relative min-h-64 md:min-h-full bg-[var(--color-app-surface-sec)]">
              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=85"
                alt="Representación visual de inteligencia artificial aplicada a la educación"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
