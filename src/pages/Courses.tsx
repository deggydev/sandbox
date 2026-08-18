import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockCourses } from '../data/mockCourses';

export function Courses() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-4">
      <h1 className="text-3xl font-bold">Cursos</h1>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id} className="flex flex-col group h-full">
            {/* Image Header */}
            <div className="h-40 w-full relative overflow-hidden bg-gray-100">
              <img 
                src={course.imageUrl || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'} 
                alt={course.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-3 left-4">
                <span className="px-2.5 py-1 text-xs font-bold bg-[var(--color-app-primary)] text-white rounded-md shadow-sm">
                  {course.code}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-lg font-bold leading-tight mb-2 line-clamp-2 text-[var(--color-app-text)]">
                {course.name}
              </h2>
              
              {course.description && (
                <p className="text-sm text-[var(--color-app-muted)] mb-5 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>
              )}

              {/* Action */}
              <div className="mt-auto pt-4 border-t border-[var(--color-app-border)]">
                <Link to={`/courses/${course.id}/week/week-01`} className="block">
                  <Button fullWidth variant="outline" className="group-hover:bg-[var(--color-app-primary)] group-hover:text-white transition-colors">
                    Entrar al Curso
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
