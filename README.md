# Sandbox SENATI

Plataforma web para dictar clases en **SENATI** (Ing. de Software con Inteligencia Artificial). Reúne en un solo lugar, por curso y por semana:

- **Planes de sesión** (teoría y taller) en PDF y en una hoja de texto copiable.
- **Presentaciones interactivas** a pantalla completa, con animaciones, fondo interactivo, quizzes y temporizador de ejercicios.

Construida con **React 19 + TypeScript + Vite + Tailwind CSS 4**.

---

## Cursos incluidos

| Código | Curso | Semanas |
| --- | --- | --- |
| PIAD-221 | Algoritmos y Programación para Desarrollo de Software | 1 – 4 |
| PIAD-222 | Frontend Developer Web | 5 – 8 |
| PIAD-223 | Database Foundations (Oracle) | 9 – 12 |
| PIAD-224 | Sistemas Operativos y Comunicación de Datos | 13 – 16 |

Cada semana tiene: plan de sesión teórico, plan de sesión de taller, presentación teórica y presentación de taller.

---

## Inicio rápido

Requisitos: **Node.js 20+** y **pnpm** (o npm).

```bash
pnpm install     # instalar dependencias
pnpm dev         # servidor de desarrollo → http://localhost:5173
pnpm build       # compilar para producción (carpeta dist/)
pnpm preview     # previsualizar la compilación
pnpm lint        # revisar el código con ESLint
```

> Los íconos se cargan desde Iconify en tiempo de ejecución, así que se necesita conexión a Internet.

---

## Funcionalidades

### Planes de sesión
Ruta: `/courses/:courseId/week/:weekId/session-plan/{theory|workshop}/view`

- Pestaña **PDF**: muestra el plan oficial desde `public/session-plans/<curso>-<semana>-<tipo>.pdf`.
- Pestaña **Hoja**: objetivos, objetivos específicos, temas y actividades en texto, con botón **Copiar contenido** (copia texto y formato para pegar en Word o Docs).
- Con `?preview=html` se renderiza la plantilla HTML con la que se generan los PDF.

### Presentaciones interactivas
Ruta: `/courses/:courseId/week/:weekId/{theory|workshop}/present`

- **Fondo interactivo**: red de partículas que se conectan, siguen al mouse y reaccionan al clic.
- **Animaciones tipo GIF** (SVG animado) de cada tema: capas del SO, planificador de procesos, memoria RAM, buses, hipervisores, topologías de red, modelo OSI, DHCP, DNS, ping, IPv4…
- **Visuales manipulables**: bits binarios, calculadora de subredes (/24 a /30) y conversor de unidades.
- **Temas**: claro, oscuro, rosa y sandbox. Todo (incluidas las animaciones) usa las variables del tema.
- Respeta `prefers-reduced-motion`.

**Atajos de teclado**

| Tecla | Acción |
| --- | --- |
| `→` / `Espacio` / `PageDown` | Siguiente diapositiva |
| `←` / `PageUp` | Diapositiva anterior |
| `F` | Pantalla completa |
| `G` | Vista general de diapositivas |
| `Esc` | Salir |

---

## Tipos de diapositiva

Las diapositivas se definen como datos en `src/data/courses/`. Cada una tiene un `type`:

| Tipo | Uso |
| --- | --- |
| `cover` / `closing` | Portada y cierre (aceptan `visual`) |
| `title`, `text`, `image`, `code` | Contenido básico |
| `visual` | Animación + ideas clave que se resaltan al tocarlas |
| `flow` | Recorrido paso a paso con botones Anterior / Siguiente / Reproducir |
| `compare` | Tarjetas con animación que se abren para ver detalles |
| `interactive-list` | Lista para marcar avances |
| `callout` | Destacado (`info`, `tip`, `warning`), acepta `visual` |
| `exercise` | Ejercicio con `minutes` (temporizador), `visual` y plantilla en `code` |
| `quiz` | Pregunta con opciones y respuesta revelable |
| `solution` | Solución oculta que se revela |

Ejemplo:

```ts
{
  id: 'w13-t-4',
  type: 'visual',
  title: 'Gestión de procesos',
  content: 'Un <b>proceso</b> es un programa en ejecución.',
  points: ['La CPU atiende un proceso a la vez.', 'El planificador decide el turno.'],
  visual: { kind: 'scheduler' },
  caption: 'Planificación round-robin',
}
```

Escenas disponibles para `visual.kind`: `flow`, `layers`, `network` (`star`, `bus`, `ring`, `mesh`), `scheduler`, `memory`, `binary`, `bus`, `hypervisor`, `terminal`, `filetree`, `waves`, `media`, `scopes`, `osi`, `client-server`, `dhcp`, `dns`, `ping`, `ipv4`, `bits`, `subnet`, `units`, `orbit`, `shield`, `gauge`, `tasks`, `users`. Los parámetros de cada una están tipados en `VisualSpec` (`src/components/visuals/TopicVisual.tsx`).

---

## Estructura del proyecto

```
src/
├── components/
│   ├── app/            # Header, sidebar, logo, selector de tema
│   ├── presentation/   # Reproductor, marco, controles, vista general
│   ├── slides/         # Tipos de diapositiva (index.tsx + interactive.tsx)
│   ├── visuals/        # Fondo de partículas y animaciones SVG por tema
│   └── ui/             # Botones, bloques de código, diagramas ASCII / ER
├── data/courses/       # Contenido de cada curso (piad-221 … piad-224)
├── pages/              # Inicio, cursos, semana, plan de sesión, presentación
├── context/ hooks/     # Tema, navegación por teclado, pantalla completa
└── router/             # Rutas de la aplicación
public/session-plans/   # PDF de los planes de sesión
agents/                 # Guías y skills para generar contenido con IA
```

## Agregar o editar contenido

1. Abre el archivo del curso en `src/data/courses/` (en PIAD-224 las presentaciones están en `piad-224-decks.ts`).
2. Edita `sessionPlan` para el plan de sesión y `theory` / `workshop` para las presentaciones.
3. Para el PDF, coloca el archivo en `public/session-plans/` con el nombre `<curso>-<semana>-<theory|workshop>.pdf`.
4. Recomendación: máximo **10–12 diapositivas** por presentación, poco texto y una animación por idea.

---

Autor: **Diego Frank Lipa Choque** · Instructor SENATI – Dirección Zonal Arequipa-Puno.
