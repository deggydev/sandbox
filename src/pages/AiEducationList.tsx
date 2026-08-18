import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function AiEducationList() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-4">
      <h1 className="text-3xl font-bold">IA en la Educación</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col group h-full">
          {/* Image Header */}
          <div className="h-40 w-full relative overflow-hidden bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80" 
              alt="Santiago Bilinkis"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute bottom-3 left-4">
              <span className="px-2.5 py-1 text-xs font-bold bg-[var(--color-app-primary)] text-white rounded-md shadow-sm">
                ANÁLISIS
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h2 className="text-lg font-bold leading-tight mb-2 line-clamp-2 text-[var(--color-app-text)]">
              ¿Vale la pena estudiar en la era de ChatGPT?
            </h2>
            
            <p className="text-sm text-[var(--color-app-muted)] mb-5 line-clamp-3 leading-relaxed">
              Un análisis detallado basado en la reflexión de Santiago Bilinkis sobre cómo la IA transforma el propósito del aprendizaje.
            </p>

            {/* Action */}
            <div className="mt-auto pt-4 border-t border-[var(--color-app-border)]">
              <Link to="/ai-education/video-1" className="block">
                <Button fullWidth variant="outline" className="group-hover:bg-[var(--color-app-primary)] group-hover:text-white transition-colors">
                  Ver Detalles
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
