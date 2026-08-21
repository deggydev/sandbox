import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../data/mockCourses';

export function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-app-bg)] text-[var(--color-app-text)] transition-colors duration-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[var(--color-app-surface)] px-8 py-16 md:py-20 border-b border-[var(--color-app-border)] transition-colors duration-200">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[var(--color-app-primary)] rotate-45 transform opacity-10"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-[var(--color-app-secondary)] rotate-12 transform opacity-10"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Montserrat',sans-serif] tracking-tight text-[var(--color-app-text)]">
            Bienvenido a <span className="text-[var(--color-app-primary)]">Sandbox SENATI</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-app-muted)] max-w-2xl mx-auto">
            Plataforma de presentaciones académicas interactiva
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-12 space-y-16">
        
        {/* IA en la Educación Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-['Montserrat',sans-serif] text-[var(--color-app-text)]">
              IA en la Educación
            </h2>
            <Link to="/ai-education" className="text-[var(--color-app-primary)] font-medium flex items-center gap-1 hover:underline text-sm md:text-base">
              Ver todo <Icon icon="lucide:arrow-right" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Card IA Única */}
            <div className="bg-[var(--color-app-surface)] rounded-xl shadow-sm border border-[var(--color-app-border)] overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200 md:w-1/3">
              <div className="h-48 overflow-hidden relative bg-[var(--color-app-surface-sec)]">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" 
                  alt="IA en la Educación" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-4 left-4 bg-[var(--color-app-surface)]/95 px-3 py-1 rounded-full text-xs font-bold text-[var(--color-app-primary)] shadow-sm backdrop-blur">
                  ANÁLISIS
                </div>
              </div>
              <div className="p-6 flex flex-col">
                <h3 className="text-lg font-bold mb-2 text-[var(--color-app-text)] leading-tight">
                  ¿Vale la pena estudiar en la era de ChatGPT?
                </h3>
                <p className="text-[var(--color-app-muted)] text-sm mb-5 line-clamp-3">
                  Un análisis detallado basado en la reflexión de Santiago Bilinkis sobre cómo la IA transforma el propósito del aprendizaje.
                </p>
                <div className="mt-auto">
                  <Link to="/ai-education/video-1" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-app-primary)] hover:opacity-80">
                    Ver Detalles <Icon icon="lucide:chevron-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mis Cursos Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-['Montserrat',sans-serif] text-[var(--color-app-text)]">
              Mis Cursos
            </h2>
            <Link to="/courses" className="text-[var(--color-app-primary)] font-medium flex items-center gap-1 hover:underline text-sm md:text-base">
              Ver todos <Icon icon="lucide:arrow-right" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            {mockCourses.map((course) => (
              <div key={course.id} className="flex flex-col md:flex-row bg-[var(--color-app-surface)] rounded-xl shadow-sm border border-[var(--color-app-border)] overflow-hidden hover:shadow-md transition-shadow group">
                <div className="md:w-1/3 bg-[var(--color-app-primary)] relative overflow-hidden flex items-center justify-center min-h-[160px] md:min-h-[200px]">
                  {course.imageUrl ? (
                    <img src={course.imageUrl} alt={course.name} className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Icon icon="lucide:book-open" className="text-[var(--color-app-surface)]/30 text-6xl absolute z-0 transform group-hover:scale-110 transition-transform duration-300" />
                  )}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="bg-[var(--color-app-secondary)] text-[var(--color-app-surface)] text-xs font-bold px-2 py-1 rounded shadow-sm">
                      {course.code}
                    </span>
                  </div>
                </div>
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-[var(--color-app-text)]">{course.name}</h3>
                    <p className="text-sm text-[var(--color-app-muted)] mb-4 line-clamp-2 md:line-clamp-3">{course.description}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center pt-4 border-t border-[var(--color-app-border)] mt-2">
                      <span className="text-xs text-[var(--color-app-muted)] font-medium">{course.weeks?.length || 0} semanas disponibles</span>
                      <Link to={`/courses/${course.id}`} className="text-sm font-bold text-[var(--color-app-primary)] hover:underline flex items-center gap-1">
                        Ir al Curso <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
