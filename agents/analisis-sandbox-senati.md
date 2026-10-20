# Análisis del proyecto Sandbox SENATI

Fecha: 2026-10-20
Ruta: `D:\dlp_project\dlp_project\dlc_react\sandbox-senati`
Rama: `main` (limpia; solo `agents/` sin seguimiento)

## 1. Propósito

Aplicación web académica de SENATI. Presenta cursos organizados por semanas. Cada semana ofrece cuatro recursos:

1. Plan de sesión teórico (documento).
2. Plan de sesión de taller (documento).
3. Presentación interactiva teórica.
4. Presentación interactiva de taller.

Además incluye una sección complementaria "Otros cursos" con una presentación sobre IA en la educación.

No hay backend, autenticación, API ni persistencia remota. Todo el contenido es estático y local. El único estado persistido es el tema visual en `localStorage`.

## 2. Stack

- React 19.2 + TypeScript ~6.0.
- Vite 8.2 con `@vitejs/plugin-react` y `@tailwindcss/vite`.
- Tailwind CSS 4 (sin `tailwind.config`; configuración en `src/index.css` con `@theme`).
- React Router 7 en modo declarativo (`BrowserRouter` + `<Routes>`).
- Iconify (`@iconify/react`) para iconos.
- `react-syntax-highlighter` (Prism, tema Monokai) para bloques de código.
- Gestor de paquetes: pnpm (`pnpm-lock.yaml`).
- ESLint 10 + typescript-eslint + plugins de hooks y fast refresh.

Comandos:

```bash
pnpm dev
pnpm build
pnpm lint
pnpm preview
```

## 3. Punto de entrada y composición

`src/main.tsx`:

```tsx
<StrictMode>
  <ThemeProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </ThemeProvider>
</StrictMode>
```

`src/App.tsx` es el scaffold inicial de Vite (contador, iconos). No está importado por ninguna ruta. Es código muerto.

## 4. Rutas (`src/router/AppRouter.tsx`)

### Layout con navegación (`AppLayout`: sidebar + header + `<Outlet/>`)

| Ruta | Componente | Función |
|---|---|---|
| `/` | `Home` | Portada, tarjetas de cursos y acceso a "Otros cursos" |
| `/courses` | `Courses` | Listado de cursos |
| `/ai-education` | `AiEducationList` | Listado complementario |
| `/ai-education/:videoId` | `AiEducationDetail` | Detalle del análisis de IA |
| `/courses/:courseId` | `CourseRedirect` | Redirige a la primera semana del curso |
| `/courses/:courseId/week/:weekId` | `WeekDetail` | Recursos de la semana |
| `/courses/:courseId/week/:weekId/session-plan/theory/view` | `SessionPlanDocument` | Documento teórico |
| `/courses/:courseId/week/:weekId/session-plan/workshop/view` | `SessionPlanDocument` | Documento de taller |
| `/settings` | inline | Texto "en construcción" |

### Layout de presentación (`PresentationLayout`: pantalla completa, sin sidebar)

| Ruta | Componente |
|---|---|
| `/ai-education/:videoId/present` | `AiEducationPresentation` |
| `/courses/:courseId/week/:weekId/theory/present` | `Presentation` |
| `/courses/:courseId/week/:weekId/workshop/present` | `Presentation` |

Ruta desconocida: `*` redirige a `/`.

`SessionPlanDocument` y `Presentation` distinguen teoría/taller leyendo `location.pathname.includes('/theory')`. No usan un parámetro de ruta.

## 5. Modelo de datos

`src/data/mockCourses.ts` exporta `mockCourses` con cuatro cursos importados:

- `piad-221.ts` — PIAD-221 Algoritmos y Programación (semanas 01–04).
- `piad-222.ts` — PIAD-222 Frontend Developer Web (semanas 05–08).
- `piad-223.ts` — PIAD-223 Database Foundations Oracle (semanas 09–12).
- `piad-224.ts` — PIAD-224 Sistemas Operativos y Comunicación de Datos (semanas 13–14).

Estructura observada:

```ts
Course {
  id, name, code, description, imageUrl,
  weeks: Week[]
}

Week {
  id: "week-01",
  number: 1,
  title: "Semana 01",
  sessionPlan: {
    theory: { slides: Slide[] },
    workshop: { slides: Slide[] }
  },
  theory: { slides: Slide[] },    // presentación
  workshop: { slides: Slide[] }   // presentación
}
```

Tipos de diapositiva soportados por `SlideRenderer` / `src/components/slides/index.tsx`:

- `cover`, `title`, `text`, `image`, `code`, `exercise`, `callout`, `interactive-list`, `quiz`, `solution`, `closing`.

Campos usados según tipo: `title`, `subtitle`, `content`, `image`, `code`, `language`, `items`, `calloutType` (`info|warning|tip`), `question`, `options`, `answer`, `explanation`, `functionsToUse`, `citations`, `notes`.

Volumen de contenido medido:

| Archivo | Semanas | Diapositivas | Distribución principal |
|---|---|---|---|
| `piad-221.ts` | 4 | 142 | text 46, exercise 24, cover 16, title 16, callout 10, list 9, closing 8, code 7, quiz 6 |
| `piad-222.ts` | 4 | 147 | text 55, exercise 26, cover 16, title 16, callout 11, closing 8, list 8, quiz 7 |
| `piad-223.ts` | 4 | 142 | text 50, exercise 18, cover 16, title 16, callout 14, quiz 11, list 9, closing 8 |
| `piad-224.ts` | 2 | 82 | text 27, exercise 17, callout 8, cover 8, title 8, list 6, quiz 4, closing 4 |

Cada semana con contenido tiene 4 secciones (plan teórico, plan taller, presentación teórica, presentación taller) y 4 portadas. Los cursos con 4 semanas tienen `cover: 16`; PIAD-224 tiene `cover: 4`.

Los archivos de datos completos son grandes (73–77 kB) y contienen HTML embebido en `content`, `items`, `question` y `explanation`. `piad-221.ts` inicia con `// @ts-nocheck`. No existe un archivo de tipos compartido; los componentes usan `any` en varios puntos.

## 6. Flujo de navegación

1. `Home` muestra `mockCourses` y enlaces.
2. `Courses` enlaza a `/courses/:id/week/week-01`.
3. `WeekDetail` busca curso y semana; si no existe, redirige.
4. Los planes abren `SessionPlanDocument`, que renderiza `week.sessionPlan.<sección>.slides` omitiendo la portada.
5. Las presentaciones abren `Presentation`, que toma `week.theory.slides` o `week.workshop.slides` y las pasa a `PresentationPlayer`.

Redirecciones relevantes:

- `CourseRedirect` envía a `week/${course.weeks[0].id}`; si el curso no existe o no tiene semanas, envía a `/courses`.
- `WeekDetail` usa `courseId || 'piad-221'` y `Navigate` si no encuentra curso o semana.
- `Presentation` y `SessionPlanDocument` repiten el patrón de fallback a `piad-221`.

## 7. Reproducción de presentaciones

`PresentationPlayer`:

- Estado de índice en `usePresentation` (sin URL; recargar vuelve a la diapositiva 1).
- `useKeyboardNavigation`: flechas, espacio, PageUp/PageDown, `f` para pantalla completa, `Esc` para salir. Ignora `INPUT` y `TEXTAREA`.
- Controles flotantes que se ocultan a los 3.5 s de inactividad (`mousemove`/`touchstart`).
- Gestos táctiles: swipe horizontal mayor a 50 px cambia de diapositiva.
- Bloquea menú contextual y copia con `preventDefault` (disuasión, no seguridad).
- `SlideOverview` muestra cuadrícula, permite saltar y hace scroll a la diapositiva activa.
- `PresentationFrame` mantiene proporción 16:9 en escritorio (`index.css`, `.presentation-frame`) y pantalla completa en móvil.
- `PresentationControls` usa `useFullscreen` (Fullscreen API del navegador).

## 8. Temas y estilos

`ThemeContext` define `light | dark | rose | sandbox`. Guarda en `localStorage` con clave `senati-theme` y aplica `theme-<nombre>` en `<html>`. `light` es el valor base sin clase.

`index.html` incluye un script previo al render que aplica la clase del tema para evitar parpadeo.

`src/index.css`:

- Importa Tailwind 4 y mapea variables CSS a tokens `--color-app-*` dentro de `@theme`.
- Define paletas de los cuatro temas en `:root` y `.theme-*`.
- Define clases de resaltado (`hl-amber`, `hl-cyan`, `hl-purple`, `hl-rose`, `hl-blue`, `hl-emerald`, `hl-underline`, `hl-badge`).
- Define `.presentation-frame`, scrollbars personalizados, animaciones de `SlideOverview` y `deggy-mirror-shine`.
- Respeta `prefers-reduced-motion`.

Los componentes usan exclusivamente variables `var(--color-app-*)`, lo que permite cambiar de tema sin tocar componentes.

## 9. Componentes reutilizables

- `ui/Button`: variantes `primary`, `secondary`, `outline`, `ghost`; `fullWidth`.
- `ui/IconButton`: variantes y tamaños.
- `ui/Card`: contenedor con hover; `interactive` opcional.
- `ui/CodeBlock`: Prism + Monokai, botón de copiado, tamaños `sm|md|lg`, título y números de línea.
- `ui/Drawer`: panel lateral con bloqueo de scroll del body; se usa para el menú móvil.
- `app/AppSidebar`: navegación general, curso actual y semanas; reutilizado dentro del drawer móvil.
- `app/AppHeader`: breadcrumbs, menú móvil y selector de tema.
- `app/AppLogo`: logos Sandbox/SENATI/Oracle; variante de presentación.
- `app/Breadcrumbs`: construye migas desde la URL con un mapa hardcodeado.
- `presentation/*`: marco, controles, reproductor, renderizador y vista general.
- `slides/index.tsx`: implementación de los 11 tipos de diapositiva.

## 10. Estado verificado

- `pnpm build`: pasa. Genera `dist` de ~2.08 MB; JS principal de 1,220.47 kB (394.39 kB gzip) y CSS de 82.58 kB.
- `tsc -b`: pasa sin errores.
- `pnpm lint`: falla con 73 errores.

Errores de lint agrupados:

1. `check_braces.js:19` — error de parseo: `Expecting Unicode escape sequence \uXXXX`.
2. `@typescript-eslint/no-explicit-any` — `PresentationPlayer`, `SlideOverview`, `SlideRenderer`, `Presentation`, `SessionPlanDocument`, `WeekDetail`.
3. `@typescript-eslint/ban-ts-comment` — `piad-221.ts:1` (`@ts-nocheck`).
4. `no-useless-escape` — 57 casos en `piad-222.ts` (líneas 461–489), escapes `\"` innecesarios dentro de plantillas.
5. `react-refresh/only-export-components` — `ThemeContext.tsx:44` exporta `useTheme` junto al componente.

## 11. Hallazgos y riesgos

### Navegación

- `Courses.tsx:43` enlaza siempre a `week-01`. En PIAD-222 y PIAD-223 no existe `week-01`; la navegación encadena dos redirecciones hasta la primera semana real. En PIAD-224 también redirige a `week-13` mediante `CourseRedirect`.
- `CourseRedirect` funciona como respaldo, pero el enlace directo correcto debería usar `course.weeks[0]?.id`.
- `Breadcrumbs.tsx:11-17` hardcodea el nombre de `piad-221` y solo traduce `week-01`. Las semanas 02–12 y los demás cursos muestran el identificador crudo (`week-05`, `piad-222`).
- `WeekDetail`, `Presentation` y `SessionPlanDocument` asumen la forma `any`; si una semana no tiene `sessionPlan`, `SessionPlanDocument` lanza error (`week.sessionPlan.theory`).

### Presentación

- `useKeyboardNavigation` maneja `Esc` como salida. Cuando `SlideOverview` está abierto, `Esc` cierra la presentación completa en lugar de cerrar la vista general, pese a que la interfaz indica "Esc para cerrar".
- El índice de diapositiva no se refleja en la URL; no hay enlaces profundos ni restauración tras recargar.
- `onCopy` y `onContextMenu` solo dificultan la copia; no protegen el contenido.

### Seguridad y datos

- Se usa `dangerouslySetInnerHTML` en `TextSlide`, `ExerciseSlide`, `CalloutSlide`, `InteractiveListSlide`, `QuizSlide` y `SessionPlanDocument`. Hoy el contenido es estático y confiable. Si en el futuro se carga desde CMS, API o entrada de usuario, requiere sanitización.
- No hay validación de rutas ni de datos; los parámetros se comparan directamente.
- Las imágenes de portada son externas (Unsplash). Sin conexión, las tarjetas quedan sin imagen.

### Rendimiento y empaquetado

- Todo el contenido y todas las rutas se incluyen en un único bundle. `vite.config.ts` sube `chunkSizeWarningLimit` a 2000 para ocultar la advertencia.
- `react-syntax-highlighter` con Prism completo es una parte importante del peso. Cargar rutas con `React.lazy` y usar imports ligeros reduciría el bundle.
- Los archivos de datos son grandes y contienen mucho HTML repetido.

### Calidad y limpieza

- `src/App.tsx`, `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg` son restos del scaffold.
- `check_braces.js` está roto (comillas/escapes inválidos) y no se usa en ningún script.
- `fix_braces.py` tiene una ruta absoluta de Windows y fue una herramienta temporal de reparación.
- `ThemeContext.tsx` mezcla componente y hook, lo que rompe la regla de Fast Refresh.
- `mockCourses.ts` contiene un comentario `// trigger reload`.
- No hay tests ni configuración de testing.

## 12. Invariantes a preservar

1. Toda la UI depende de las variables `--color-app-*`; no introducir colores fijos en componentes nuevos sin justificar.
2. Los cuatro temas deben seguir funcionando con la clase en `<html>` y la clave `senati-theme`.
3. Las rutas de plan de sesión y presentación distinguen teoría/taller por la ruta (`/theory` o `/workshop`). Cambiar esto exige tocar ambos componentes.
4. Los tipos de diapositiva deben existir simultáneamente en `SlideRenderer` y en `slides/index.tsx`.
5. `SessionPlanDocument` omite la diapositiva `cover`; las presentaciones sí la muestran.
6. El contenido de las semanas se considera fuente de verdad; los componentes no deben inventar secciones.
7. `piad-224` contiene las semanas 13 y 14; las rutas deben seguir redirigiendo a su primera semana sin romper.

## 13. Dónde cambiar cada cosa

| Necesidad | Lugar |
|---|---|
| Agregar o editar contenido de un curso | `src/data/courses/piad-*.ts` |
| Agregar un curso | Crear archivo en `src/data/courses/` e importarlo en `mockCourses.ts` |
| Agregar un tipo de diapositiva | `src/components/slides/index.tsx` + `SlideRenderer.tsx` + `SlideOverview` (etiqueta) |
| Cambiar navegación o rutas | `src/router/AppRouter.tsx`, `Courses.tsx:43` |
| Cambiar sidebar o breadcrumbs | `src/components/app/AppSidebar.tsx`, `Breadcrumbs.tsx` |
| Cambiar tema o paleta | `src/index.css`, `ThemeContext.tsx`, `ThemeSwitcher.tsx` |
| Cambiar reproducción o atajos | `PresentationPlayer.tsx`, `useKeyboardNavigation.ts`, `PresentationControls.tsx` |
| Cambiar documento de plan de sesión | `src/pages/SessionPlanDocument.tsx` |
| Cambiar el marco visual de diapositivas | `PresentationFrame.tsx`, `.presentation-frame` en `index.css` |

## 14. Próximos pasos sugeridos

1. Corregir el enlace de `Courses.tsx` para usar la primera semana real del curso.
2. Generalizar `Breadcrumbs` con datos de curso/semana en lugar del mapa hardcodeado.
3. Cerrar `SlideOverview` con `Esc` antes de evaluar la salida de la presentación.
4. Tipar el modelo (`Course`, `Week`, `Slide`) y eliminar `any` y `@ts-nocheck`.
5. Resolver los errores de lint o ajustar el alcance de ESLint para excluir scripts temporales y datos.
6. Eliminar `App.tsx`, `App.css`, `check_braces.js`, `fix_braces.py` y assets sin uso.
7. Evaluar `React.lazy` por ruta y un import ligero de Prism para reducir el bundle.
8. Definir una política de sanitización si el contenido deja de ser estático.
