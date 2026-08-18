import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-app-text)]">
          Bienvenido a Sandbox SENATI
        </h1>
        <p className="text-lg text-[var(--color-app-muted)] max-w-2xl mx-auto">
          Plataforma de presentaciones académicas interactiva
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-12">
        <Card className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--color-app-surface-sec)] flex items-center justify-center text-[var(--color-app-primary)] text-3xl">
            <Icon icon="mdi:book-open-variant" />
          </div>
          <h2 className="text-xl font-bold">Mis Cursos</h2>
          <p className="text-[var(--color-app-muted)] text-sm">
            Accede a tus cursos y al contenido de cada semana.
          </p>
          <Link to="/courses" className="w-full mt-4">
            <Button fullWidth>Ir a Cursos</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
