import { useParams, useLocation, useSearchParams, Navigate, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { mockCourses } from '../data/mockCourses';
import { Button } from '../components/ui/Button';
import senatiLogo from '../assets/senati.png';

type SessionSlide = {
  title?: string;
  content?: string;
};

const workshopResources = [
  { title: '1) MATERIALES', items: ['Diapositivas', 'Pizarra interactiva', 'Miro', 'Sandbox', 'Scalidraw'] },
  { title: '2) HERRAMIENTAS', items: ['Windows 10', 'Visual Studio Code', 'Draw.io', 'Miro', 'Github'] },
  { title: '3) MÁQUINARIAS', items: [] },
  { title: '4) EQUIPOS', items: ['PCs OnlyOne'] },
  { title: '5) INSTRUMENTOS', items: [] },
  { title: '6) OTROS', items: ['Internet', 'Cuenta institucional'] },
];

const evaluationItems = [
  '4.1Proceso Operacional',
  '4.2Precisión y Acabado aplicación de normas técnicas',
  '4.3Funcionalidad y aptitud de uso',
  '4.4Orden, Seguridad, cuidado del ambiente',
  '4.5Manejo de recursos y materiales',
  '4.6Tiempo de ejecución',
];

const theoryStrategies: Array<[string, boolean]> = [
  ['Experiencia directa', false],
  ['Experiencia figurada', false],
  ['Demostraciones', true],
  ['Investigativa', true],
  ['Otros', true],
];

const theoryMedia: Array<[string, boolean]> = [
  ['Pizarra Virtual', true],
  ['Diapositivas', true],
  ['Manuales (MDE)', false],
  ['Manuel del fabricante', true],
  ['Materiales Escritos', false],
  ['Videos', false],
  ['Enlaces de Interés', true],
  ['Foros', false],
  ['Chat', false],
  ['Plataformas Externas', true],
  ['Software aplicativo', true],
  ['Software de Simulación', true],
  ['Otros', true],
];

const theoryMethodology: Array<[string, boolean]> = [
  ['Expositiva', true],
  ['Interrogativa', false],
  ['Dinámica grupal', true],
  ['Debate/Discusión', true],
  ['Trabajo individual', true],
  ['Trabajo grupal', true],
  ['Otras (dos pasos)', true],
];

const operationCodesByCourseWeek: Record<string, Record<string, string>> = {
  'piad-224': {
    'week-13': 'HO-01, HO-02, HO-03, HO-04',
    'week-14': 'HO-05, HO-06, HO-07, HO-08, HO-09',
    'week-15': 'HO-10, HO-11, HO-12, HO-13, HO-14',
    'week-16': 'HO-15, HO-16, HO-17, HO-18, HO-19, HO-20, HO-21',
  },
};

function richText(value: string | undefined) {
  return { __html: value || '—' };
}

function findSlide(slides: SessionSlide[], title: string) {
  return slides.find((slide) => slide.title?.toLowerCase() === title.toLowerCase());
}

function limitBulletItems(value: string | undefined, limit: number) {
  return (value || '—').split(/\r?\n/).filter(Boolean).slice(0, limit).join('\n');
}

function WorkshopSessionTemplate({ course, week }: { course: any; week: any }) {
  const slides = (week.sessionPlan?.workshop?.slides || []) as SessionSlide[];
  const task = findSlide(slides, 'Tareas')?.content || 'Tarea por definir';
  const objective = findSlide(slides, 'Objetivo General')?.content || 'Objetivo general por definir';
  const objectives = limitBulletItems(findSlide(slides, 'Objetivos Específicos')?.content || 'Objetivos específicos por definir', 8);
  const activities = limitBulletItems(findSlide(slides, 'Prácticas y Actividades')?.content || 'Prácticas y actividades por definir', 12);
  const taskCode = task.match(/HT-\d+/)?.[0] || 'HT-__';
  const taskName = task.replace(/^HT-\d+\s*/, '');
  const courseCode = course.id === 'piad-221' ? '202620-PIAD-221-TAL-NRC_42000' : course.code;
  const operationSheet = operationCodesByCourseWeek[course.id]?.[week.id] || '—';

  return (
    <article className="workshop-template">
      <header className="workshop-template-header">
        <img className="workshop-brand" src={senatiLogo} alt="SENATI" />
        <h1>PLAN DE SESIÓN – (PRÁCTICA DE TALLER)</h1>
      </header>

      <div className="workshop-location-row">
        <strong>DIRECCIÓN ZONAL:</strong><span>AREQUIPA - PUNO</span>
        <strong>CFP/UCO/ESCUELA:</strong><span>PUNO</span>
      </div>

      <section className="workshop-meta">
        <div className="workshop-meta-row"><strong>INSTRUCTOR / FACILITADOR:</strong><span>DIEGO FRANK LIPA CHOQUE</span></div>
        <div className="workshop-meta-grid">
          <strong>CARRERA:</strong><span>ING. DE SOFTWARE CON INTELIGENCIA ARTFICIAL</span>
          <strong>SEMESTRE / MODULO:</strong><span>II</span>
          <strong>MATERIA/CURSO:</strong><span>{courseCode}<br />{course.name}</span>
          <strong>TAREA/PROYECTO:</strong><span>{taskCode} {taskName}</span>
        </div>
        <div className="workshop-objective"><strong>OBJETIVOS:</strong><div dangerouslySetInnerHTML={richText(objective)} /></div>
      </section>

      <div className="workshop-table-header">
        <strong>TIEMPO EN<br />MINUTOS</strong>
        <strong>ACTIVIDADES / PASOS A SEGUIR</strong>
        <strong>PREVENCIÓN DE<br />RECURSOS</strong>
      </div>

      <div className="workshop-body">
        <div className="workshop-time">15'</div>
        <section className="workshop-activity workshop-motivation">
          <h2>1) MOTIVACIÓN (PREPARACIÓN)</h2>
          <div className="workshop-motivation-grid">
            <div><h3>HOJA DE TAREA<small>{taskCode}</small></h3><p>Plano<br />Esquema<br />Croquis<br />Modelo<br />Instrucciones</p></div>
            <div><h3>HOJA DE OPERACIONES<small>{operationSheet}</small></h3><p>Operaciones nuevas</p><small>Habilidades a desarrollar</small></div>
            <div><h3>PROCESOS DE EJECUCIÓN</h3><p>Procesos específicos de la tarea programada</p></div>
          </div>
        </section>
        <aside className="workshop-resources workshop-resources-first">{workshopResources.map((resource) => <ResourceBlock key={resource.title} {...resource} />)}</aside>

        <div className="workshop-time">90'</div>
        <section className="workshop-activity workshop-demonstration">
          <h2>2) DEMOSTRACIÓN DE OPERACIONES NUEVAS (INSTRUCTOR)</h2>
          <div className="workshop-rich-text" dangerouslySetInnerHTML={richText(objectives)} />
        </section>

        <div className="workshop-time">125'</div>
        <section className="workshop-activity workshop-application">
          <h2>3) APLICACIONES (EJECUCIÓN DE OPERACIONES REPETIDAS Y NUEVAS POR EL ESTUDIANTE</h2>
          <div className="workshop-rich-text" dangerouslySetInnerHTML={richText(activities)} />
        </section>

        <div className="workshop-time">15'</div>
        <section className="workshop-activity workshop-evaluation">
          <h2>4) EVALUACIÓN (REFORZAMIENTO)</h2>
          {evaluationItems.map((item) => <div className="workshop-evaluation-row" key={item}><span>{item}</span><b>( &nbsp; x &nbsp; )</b></div>)}
        </section>
      </div>

      <footer className="workshop-template-footer">SEMANA {String(week.number).padStart(2, '0')}</footer>
    </article>
  );
}

function ResourceBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="workshop-resource-block"><strong>{title}</strong>{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function TheoryChecklist({ title, items }: { title: string; items: Array<[string, boolean]> }) {
  return <div className="theory-checklist"><strong>{title}</strong>{items.map(([label, checked]) => <div key={label}><span>{label}</span><b>( {checked ? ' x ' : '   '} )</b></div>)}</div>;
}

function TheorySessionTemplate({ course, week }: { course: any; week: any }) {
  const slides = (week.sessionPlan?.theory?.slides || []) as SessionSlide[];
  const objective = findSlide(slides, 'Objetivo General')?.content || 'Objetivo general por definir';
  const objectives = findSlide(slides, 'Objetivos Específicos')?.content || 'Objetivos específicos por definir';
  const topics = findSlide(slides, 'Temas Teóricos a Tratar')?.content || 'Temas teóricos por definir';
  const courseCode = course.id === 'piad-221' ? '202620-PIAD-221-TEC-NRC_41959' : course.code;

  return (
    <article className="theory-template">
      <header className="theory-template-header">
        <img className="workshop-brand" src={senatiLogo} alt="SENATI" />
        <h1>PLAN DE SESIÓN – CONOCIMIENTOS TECNOLÓGICOS</h1>
      </header>

      <div className="workshop-location-row">
        <strong>DIRECCIÓN ZONAL :</strong><span>AREQUIPA - PUNO</span>
        <strong>CFP/UCO/ESCUELA :</strong><span>PUNO</span>
      </div>

      <section className="theory-meta">
        <div className="workshop-meta-row"><strong>INSTRUCTOR / FACILITADOR:</strong><span>DIEGO FRANK LIPA CHOQUE</span></div>
        <div className="theory-meta-grid">
          <strong>CARRERA:</strong><span>ING. DE SOFTWARE CON INTELIGENCIA ARTFICIAL</span>
          <strong>SEMESTRE / MODULO:</strong><span>II</span>
          <strong>MATERIA/CURSO:</strong><span>{courseCode}<br />{course.name}</span>
        </div>
        <div className="theory-objective"><strong>OBJETIVO:</strong><div dangerouslySetInnerHTML={richText(objective)} /></div>
      </section>

      <div className="theory-table-header">
        <strong>TIEMPO EN<br />MINUTOS</strong>
        <strong>ACTIVIDADES / PASOS A SEGUIR</strong>
        <strong>PREVENCIÓN DE AYUDAS</strong>
      </div>

      <div className="theory-body">
        <div className="workshop-time">20'</div>
        <section className="theory-activity">
          <h2>1) MOTIVACIÓN (DAR A CONOCER OBJETIVOS)</h2>
          <div className="workshop-rich-text" dangerouslySetInnerHTML={richText(objectives)} />
        </section>
        <aside className="theory-side theory-strategies"><TheoryChecklist title="ESTRATEGIAS" items={theoryStrategies} /></aside>

        <div className="workshop-time">175'</div>
        <section className="theory-activity">
          <h2>2) DESARROLLO DEL TEMA</h2>
          <div className="workshop-rich-text" dangerouslySetInnerHTML={richText(topics)} />
        </section>
        <aside className="theory-side theory-media"><TheoryChecklist title="MEDIOS DIDÁCTICOS" items={theoryMedia} /></aside>

        <div className="workshop-time">30'</div>
        <section className="theory-activity theory-evaluation">
          <h2>3) EVALUACION - ACCIONES DE REFORZAMIENTO CONCLUSIONES</h2>
          <p>Para fortalecer el aprendizaje, se implementarán evaluaciones orales y preguntas interactivas que fomenten la participación activa de los estudiantes, brindando oportunidades para la aplicación práctica de los conceptos.</p>
          <p>Además, se establecerán acciones de refuerzo personalizadas para abordar las áreas de mejora individualmente identificadas, promoviendo así un ambiente de aprendizaje inclusivo y orientado al crecimiento.</p>
        </section>
        <aside className="theory-side theory-methodology"><TheoryChecklist title="METODOLOGÍA" items={theoryMethodology} /></aside>
      </div>

      <footer className="theory-footer"><span>REVISADO POR EL JEFE CFP/UCP :</span><strong>SEMANA {String(week.number).padStart(2, '0')}</strong></footer>
    </article>
  );
}

export function SessionPlanDocument() {
  const { courseId, weekId } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isTheory = location.pathname.includes('/theory');
  
  const course = mockCourses.find(c => c.id === (courseId || 'piad-221')) as any;
  if (!course) return <Navigate to="/courses" replace />;

  const week = course.weeks.find((w: any) => w.id === weekId);
  if (!week) return <Navigate to={`/courses/${course.id}`} replace />;

  const pdfName = `${course.id}-${week.id}-${isTheory ? 'theory' : 'workshop'}.pdf`;
  const pdfUrl = `/session-plans/${pdfName}`;

  if (isTheory && searchParams.get('preview') === 'html') {
    return <TheorySessionTemplate course={course} week={week} />;
  }

  if (!isTheory && searchParams.get('preview') === 'html') {
    return <WorkshopSessionTemplate course={course} week={week} />;
  }
  
  return (
    <div className="session-plan-page max-w-4xl mx-auto space-y-6 mt-4 pb-20">
      <div className="session-plan-toolbar flex items-center gap-4 border-b border-[var(--color-app-border)] pb-4">
        <Link to={`/courses/${course.id}/week/${week.id}`}>
          <Button type="button" variant="ghost" className="px-2" aria-label="Volver al detalle de la semana">
            <Icon icon="mdi:arrow-left" className="text-2xl" />
          </Button>
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold uppercase text-[var(--color-app-text)]">
            Plan de Sesión: {isTheory ? 'Conocimiento Teórico' : 'Taller / Práctica'}
          </h1>
          <p className="text-[var(--color-app-muted)] font-medium">
            {course.name} - {week.title}
          </p>
        </div>
      </div>

      <div className="session-plan-pdf-viewer bg-[var(--color-app-surface)] border border-[var(--color-app-border)] rounded-xl overflow-hidden shadow-sm">
        <iframe
          src={`${pdfUrl}#view=FitH&navpanes=0`}
          title={`Plan de sesión PDF: ${course.name} - ${week.title}`}
          className="block w-full h-[calc(100vh-10rem)] min-h-[720px] border-0 bg-white"
        />
        <div className="p-4 text-center text-sm text-[var(--color-app-muted)]">
          Si el visor no carga, <a href={pdfUrl} target="_blank" rel="noreferrer" className="font-semibold text-[var(--color-app-primary)] underline">abre el PDF directamente</a>.
        </div>
      </div>
    </div>
  );
}
