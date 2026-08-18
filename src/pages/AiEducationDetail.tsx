import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button } from '../components/ui/Button';

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

export function AiEducationDetail() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-10 mt-6 pb-12">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate('/ai-education')} className="flex items-center gap-2">
          <Icon icon="mdi:arrow-left" /> Volver a lista
        </Button>
      </div>

      <div className="border-b border-[var(--color-app-border)] pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-[var(--color-app-primary)]/10 flex items-center justify-center text-[var(--color-app-primary)]">
            <Icon icon="mdi:youtube" className="text-2xl" />
          </div>
          <h1 className="text-3xl font-bold uppercase">¿Vale la pena estudiar en la era de ChatGPT?</h1>
        </div>
        <p className="text-[var(--color-app-muted)] text-lg pl-13">
          Seleccione el contenido o presentación que desea visualizar.
        </p>
      </div>
      
      <div className="space-y-6 pt-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icon icon="mdi:projector-screen-outline" className="text-[var(--color-app-primary)]" /> 
          Presentaciones Interactivas
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <StackedSheetsCard 
            title="Análisis del Video" 
            subtitle="Diapositivas con el desglose detallado de los conceptos presentados por Santiago Bilinkis."
            linkTo="/ai-education/video-1/present"
          />
        </div>
      </div>
    </div>
  );
}
