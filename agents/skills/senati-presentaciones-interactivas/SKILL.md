---
name: senati-presentaciones-interactivas
description: Usa esta skill dentro de Sandbox SENATI para crear o ampliar presentaciones interactivas teóricas y de taller, manteniendo estructura, temas, navegación, tipos de diapositiva y lenguaje visual existentes.
nivel: completo
compat: [claude, codex, gpt, deepseek, glm, nemotron, ollama-pequeno]
---

# Presentaciones interactivas Sandbox SENATI

## Cuándo usar

Usa esta skill cuando el usuario solicite crear o actualizar diapositivas de un curso, semana, tema teórico, taller o práctica dentro del proyecto Sandbox SENATI.

También úsala cuando solicite:

- Crear presentación teórica de una semana.
- Crear presentación práctica o de taller.
- Agregar una semana o curso nuevo.
- Mantener el mismo estilo visual de presentaciones existentes.
- Convertir contenidos de planificación semanal en diapositivas.
- Corregir una diapositiva sin cambiar la estructura del proyecto.

La aplicación es estática y local. El contenido vive principalmente en `src/data/courses/piad-*.ts`.

## Objetivo de la skill

Crear presentaciones que:

1. Mantengan la estructura de datos existente.
2. Usen los tipos de diapositiva ya soportados.
3. Conservan los cuatro temas visuales.
4. Funcionen con navegación, teclado, táctil, vista general y pantalla completa.
5. Sean legibles en escritorio y móvil.
6. Mantengan una sola gramática visual para teoría y taller.
7. Se integren con las rutas actuales sin duplicar componentes.

Cada semana debe contemplar dos bloques independientes:

- Presentación teórica.
- Presentación práctica o de taller.

No generes solo uno de los dos bloques salvo que el usuario lo solicite explícitamente.

## Fuente de verdad del proyecto

Antes de editar, revisa estos archivos:

- `src/data/courses/piad-*.ts`: contenido de cursos y semanas.
- `src/data/mockCourses.ts`: registro de cursos.
- `src/components/slides/index.tsx`: componentes visuales de diapositivas.
- `src/components/presentation/SlideRenderer.tsx`: registro de tipos.
- `src/components/presentation/PresentationPlayer.tsx`: reproducción e interacción.
- `src/components/presentation/PresentationFrame.tsx`: marco 16:9.
- `src/components/presentation/PresentationControls.tsx`: controles flotantes.
- `src/components/presentation/SlideOverview.tsx`: vista general.
- `src/index.css`: temas, variables, animaciones, responsive y layout.
- `src/router/AppRouter.tsx`: rutas de presentación.

No cambies datos existentes solo para evitar un problema visual. Corrige el componente responsable.

## Modelo de datos

La estructura semanal es:

```ts
{
  id: "week-01",
  number: 1,
  title: "Semana 01",
  theory: { slides: [] },
  workshop: { slides: [] },
  sessionPlan: {
    theory: { slides: [] },
    workshop: { slides: [] }
  }
}
```

Las presentaciones usan `week.theory.slides` o `week.workshop.slides`.
Los planes de sesión usan `week.sessionPlan` y no deben mezclarse con las presentaciones.

Cada diapositiva debe tener un `id` único dentro de su presentación y un `type` soportado.

## Tipos de diapositiva soportados

`SlideRenderer` y `src/components/slides/index.tsx` deben soportar simultáneamente estos tipos:

- `cover`: portada de presentación.
- `title`: separador o título de sección.
- `text`: explicación principal.
- `image`: contenido con imagen.
- `code`: bloque de código.
- `exercise`: actividad guiada.
- `callout`: aviso, tip, warning o información.
- `interactive-list`: lista visual.
- `quiz`: pregunta con opciones y respuesta.
- `solution`: solución o retroalimentación.
- `closing`: cierre de presentación.

Campos disponibles según el tipo:

```ts
{
  id,
  type,
  title,
  subtitle,
  content,
  image,
  code,
  language,
  items,
  calloutType,
  question,
  options,
  answer,
  explanation,
  functionsToUse,
  citations,
  notes
}
```

No inventes un tipo nuevo para una variación pequeña.
Usa `text`, `callout`, `interactive-list` o `exercise` cuando el contenido ya encaje.

Si realmente hace falta un tipo nuevo, actualiza en conjunto:

1. `src/components/slides/index.tsx`.
2. `src/components/presentation/SlideRenderer.tsx`.
3. `src/components/presentation/SlideOverview.tsx`.
4. Tipos o datos relacionados, si existen.
5. Estilos específicos en `src/index.css`.

## Estructura obligatoria por semana

### Presentación teórica

Usa este orden recomendado:

1. `cover` con tema, curso y semana.
2. `interactive-list` con objetivos o ruta de aprendizaje.
3. `callout` introductorio cuando aporte contexto.
4. `text`, `code`, `image` o `callout` para cada concepto.
5. `quiz` después de conceptos que requieran comprobación.
6. `solution` cuando la respuesta necesite explicación.
7. `closing` con cierre y transición al taller.

La teoría debe explicar conceptos, vocabulario, reglas, ejemplos y errores comunes.
No conviertas toda la teoría en una lista de texto.

### Ejemplos visuales obligatorios

Cada bloque teórico y práctico debe incluir ejemplos concretos, no solo definiciones.

- Añade al menos un ejemplo aplicado por concepto principal.
- Prefiere diagramas de flujo, tablas, mapas de componentes, comparaciones antes/después y casos breves.
- Usa `code` con `language: "text"` para activar `AsciiDiagram` cuando el ejemplo tenga relaciones, pasos o estructura.
- Aprovecha animaciones existentes de flujos, nodos, tablas y resaltados.
- Relaciona cada ejemplo con una situación que el estudiante pueda observar, medir o reproducir.
- En talleres, muestra una muestra guiada antes de dejar campos o pasos para completar.
- No dejes una secuencia completa de diapositivas basada solo en párrafos o listas.
- Mantén `prefers-reduced-motion`; movimiento debe apoyar lectura, no distraer.

### Presentación de taller

Usa este orden recomendado:

1. `cover` con tarea y semana.
2. `interactive-list` con actividades del taller.
3. `callout` para advertencias o recordatorios operativos.
4. `exercise` para cada práctica principal.
5. `code` solo cuando el código sea parte real de la explicación.
6. `quiz` o comprobación cuando ayude a validar el resultado.
7. `closing` con entrega, repositorio o siguiente paso, solo si está respaldado por la planificación.

El taller debe aplicar los contenidos de la teoría.
No agregues proyectos, librerías, plataformas o entregables no respaldados por la fuente.

## Reglas de contenido

1. La planificación o currículum es fuente de verdad.
2. Conserva códigos HT, nombres de tareas y nombres técnicos.
3. Separa teoría y taller aunque compartan tema.
4. Deriva ejercicios de las operaciones de la tarea.
5. Incluye conocimientos complementarios solo cuando apoyen el tema central.
6. No repitas el mismo texto en muchas diapositivas.
7. Divide contenido largo en varias diapositivas.
8. Mantén una idea principal por diapositiva.
9. Usa títulos concretos y orientados al aprendizaje.
10. No llenes una diapositiva con párrafos largos.
11. No uses emojis.
12. No agregues conclusiones artificiales.
13. No uses citas falsas ni referencias inventadas.
14. Si el contenido incluye HTML, usa solo HTML estático controlado por el proyecto.
15. Si el contenido proviene de usuario, CMS o API, sanitízalo antes de `dangerouslySetInnerHTML`.

## Lenguaje visual obligatorio

Conserva la identidad visual actual:

- Marco de presentación 16:9.
- Fondo dinámico con gradientes y formas suaves.
- Jerarquía tipográfica clara.
- Tarjetas y paneles con bordes suaves.
- Código en panel oscuro con alto contraste.
- Resaltados semánticos `hl-cyan`, `hl-amber`, `hl-purple`, `hl-rose`, `hl-blue` y `hl-emerald`.
- Variables de tema `var(--color-app-*)`.
- Logo y marca Sandbox/SENATI según el componente existente.
- Animaciones cortas y no invasivas.
- Respeto de `prefers-reduced-motion`.

No introduzcas una paleta fija dentro de una diapositiva si el componente puede usar variables del tema.
No conviertas todo en tarjetas idénticas.
Usa `callout`, `code`, `exercise`, `quiz`, diagramas y listas según la función del contenido.

## Temas visuales

Deben seguir funcionando:

- `light`.
- `dark`.
- `rose`.
- `sandbox`.

El tema se guarda con la clave `senati-theme`.
Los componentes deben usar `--color-app-bg`, `--color-app-surface`, `--color-app-text`, `--color-app-muted`, `--color-app-border`, `--color-app-primary` y `--color-app-secondary`.

Prueba cada cambio al menos en `light` y `sandbox`.
Prueba texto y código también en `dark`.

## Interacción que no se debe romper

La presentación actual incluye:

- Flechas izquierda y derecha.
- Espacio.
- `PageUp` y `PageDown`.
- `f` para pantalla completa.
- `Esc` para salir.
- Swipe horizontal mayor a 50 px en móvil.
- Controles flotantes.
- Ocultamiento de controles después de 3.5 segundos.
- Vista general de diapositivas.
- Salto directo desde la vista general.
- Indicador de diapositiva actual.
- Selector de tema.

No reemplaces `PresentationPlayer` por navegación independiente dentro de una diapositiva.
No agregues scroll vertical dentro de una diapositiva salvo que el contenido no pueda reducirse sin perder información.

## Procedimiento paso a paso

### Paso 1. Identificar contexto

Confirma:

- Curso.
- Código del curso.
- Semana.
- Tipo: teoría o taller.
- Tarea HT.
- Fuente de contenido.

Si falta semana, curso o tipo, pide el dato antes de generar contenido.

### Paso 2. Revisar estructura existente

Busca una semana cercana del mismo curso.
Reutiliza su patrón de tipos de diapositiva, densidad y redacción.
No copies errores de contenido ni duplicados.

### Paso 3. Diseñar storyboard

Define antes de editar:

- Propósito de cada diapositiva.
- Tipo de diapositiva.
- Título.
- Contenido principal.
- Código, imagen, interacción o ejercicio.
- Relación con la tarea u operación.

Mantén entre 12 y 20 diapositivas por bloque cuando la semana tenga contenido normal.
Usa más solo si la fuente exige dividir conceptos.

### Paso 4. Cargar datos

Edita el bloque correcto dentro de `src/data/courses/piad-*.ts`.
Mantén `theory.slides` y `workshop.slides` separados.
Usa IDs con prefijo de semana y bloque, por ejemplo `w5-t-1` o `w5-w-4`.

### Paso 5. Verificar renderizado

Comprueba:

- Ningún tipo queda como `Slide Type Not Found`.
- No hay imágenes rotas.
- Código no se sale del panel.
- HTML embebido no rompe el layout.
- Títulos no chocan con controles.
- Quiz muestra opciones y respuesta correctamente.
- Exercise conserva funciones y código.
- Cover y closing se ven completos.

### Paso 6. Verificar navegación

Prueba la ruta:

```text
/courses/:courseId/week/:weekId/theory/present
/courses/:courseId/week/:weekId/workshop/present
```

Verifica flechas, teclado, swipe, overview, fullscreen y salida.

### Paso 7. Verificar proyecto

Ejecuta:

```bash
pnpm build
```

Ejecuta `pnpm lint` cuando el cambio lo permita.
Si falla por errores preexistentes, informa el resultado sin ocultarlo.

## Reglas duras

- Generar teoría y práctica/taller como bloques separados.
- No modificar `src/data/courses/*.ts` sin una fuente de contenido o solicitud explícita.
- No mezclar teoría con taller.
- No eliminar una diapositiva existente sin autorización.
- No cambiar nombres de rutas sin revisar `WeekDetail`, `Presentation` y `AppRouter`.
- No eliminar ninguno de los cuatro temas.
- No usar colores fijos para reemplazar variables de tema.
- No crear una segunda implementación del reproductor.
- No usar una imagen completa como sustituto de contenido editable si el proyecto ya tiene componentes nativos.
- No poner texto pequeño para esconder exceso de contenido.
- No usar más contenido solo para aumentar número de diapositivas.
- No agregar dependencias nuevas para una diapositiva simple.

## Plantilla obligatoria de salida de trabajo

```markdown
# PRESENTACIÓN [TEORÍA|TALLER]
## Curso: [nombre]
## Semana: [número]
## Tarea: [HT y nombre]

### Storyboard
1. [tipo] [título]: [propósito]
2. [tipo] [título]: [propósito]
3. [tipo] [título]: [propósito]

### Cambios
- [archivo y bloque modificado]
- [tipos de diapositiva usados]
- [interacciones conservadas]

### Verificación
- [ ] Build correcto.
- [ ] Ruta teórica o taller responde.
- [ ] Todos los tipos renderizan.
- [ ] Tema claro y sandbox revisados.
- [ ] Navegación y overview revisados.
```

## Integración con skill principal

Esta skill se ejecuta después de `planificacion-semanal-clase` y junto con `senati-planes-pdf`.
Recibe el mismo contrato de curso, semana, tarea, operaciones, objetivos y contenidos.
Debe generar siempre la presentación teórica y la presentación práctica/taller, salvo solicitud explícita de una sola.
`image-to-editable-ppt` y `bs-paper-cutout-story-video` son apoyos posteriores, no sustitutos de esta skill.

## Criterios de calidad

- [ ] La fuente de contenido está identificada.
- [ ] Semana y tarea son correctas.
- [ ] Teoría y taller están separados.
- [ ] Cada diapositiva tiene una función.
- [ ] Los tipos usados existen en el renderer.
- [ ] La presentación mantiene 16:9.
- [ ] Los cuatro temas siguen funcionando.
- [ ] Código, ejercicios y quizzes son legibles.
- [ ] No hay contenido inventado.
- [ ] No hay imágenes rotas.
- [ ] No hay overflow visible.
- [ ] Teclado, swipe, overview y fullscreen funcionan.
- [ ] `pnpm build` pasa.
