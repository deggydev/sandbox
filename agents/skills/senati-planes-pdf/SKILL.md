---
name: senati-planes-pdf
description: Usa esta skill dentro de Sandbox SENATI para crear, maquetar, generar y publicar PDFs de planes de sesión de taller y conocimientos tecnológicos, manteniendo las plantillas A4 actuales.
nivel: completo
compat: [claude, codex, gpt, deepseek, glm, nemotron, ollama-pequeno]
---

# PDFs de planes de sesión Sandbox SENATI

## Cuándo usar

Usa esta skill cuando el usuario solicite:

- Crear PDF de plan de sesión.
- Actualizar plan teórico.
- Actualizar plan de taller o práctica.
- Integrar una semana nueva en el visor PDF.
- Regenerar PDFs después de modificar contenido.
- Ajustar tamaño, alineación, logo o distribución de una hoja.
- Publicar PDFs dentro de la aplicación.

La aplicación muestra PDFs directamente dentro de un `iframe`.
Los archivos publicados deben estar disponibles desde `public/session-plans`.

## Objetivo de la skill

Crear un PDF por combinación de:

- Curso.
- Semana.
- Tipo de plan.

Cada documento debe:

1. Usar una sola página A4.
2. Mantener la plantilla correcta según tipo.
3. Usar el logo SENATI del proyecto.
4. Extraer datos dinámicos del plan semanal.
5. Mantener textos fijos del modelo aprobado.
6. Servirse desde la aplicación.
7. Verificarse visual y estructuralmente.

Cada semana debe contemplar dos documentos independientes:

- Plan teórico de conocimientos tecnológicos.
- Plan práctico o de taller.

No generes solo uno de los dos documentos salvo que el usuario lo solicite explícitamente.

## Archivos responsables

Revisa estos archivos antes de cambiar la implementación:

- `src/pages/SessionPlanDocument.tsx`: visor PDF y previsualización HTML.
- `src/index.css`: estilos A4, impresión y plantillas.
- `src/assets/senati.png`: logo usado en la cabecera.
- `src/data/courses/piad-*.ts`: cursos, semanas y planes.
- `src/data/mockCourses.ts`: registro de cursos.
- `src/router/AppRouter.tsx`: rutas de teoría y taller.
- `public/session-plans/`: PDFs servidos por Vite.
- `exports/session-plans/`: copias generadas para revisión.

No modifiques `src/data/courses/*.ts` para corregir un problema de maquetación.
No reemplaces datos del plan por texto inventado.

## Nombres de archivos

Usa siempre este formato:

```text
[course-id]-[week-id]-theory.pdf
[course-id]-[week-id]-workshop.pdf
```

Ejemplos:

```text
piad-221-week-01-theory.pdf
piad-221-week-01-workshop.pdf
piad-224-week-14-theory.pdf
piad-224-week-14-workshop.pdf
```

Mantén el mismo archivo en:

```text
exports/session-plans/
public/session-plans/
```

## Fuente de datos dinámica

### Datos comunes

Busca el curso por `courseId` y la semana por `weekId`.
Usa el bloque correcto:

```ts
week.sessionPlan.theory.slides
week.sessionPlan.workshop.slides
```

No uses las diapositivas completas de presentación para llenar el plan PDF.
Usa el bloque `sessionPlan`, que contiene resumen de sesión.

### Datos de taller

Extrae:

- Tarea: diapositiva con `title: "Tareas"`.
- Objetivo general: diapositiva con `title: "Objetivo General"`.
- Objetivos específicos: diapositiva con `title: "Objetivos Específicos"`.
- Prácticas: diapositiva con `title: "Prácticas y Actividades"`.

El código HT debe aparecer en:

- `TAREA/PROYECTO`.
- Cabecera de `HOJA DE TAREA`.

Las operaciones de la tarea deben alimentar `HOJA DE OPERACIONES`.
Usa códigos exactos provenientes del currículum o de la skill de planificación semanal.
No uses `H1, H2` como sustituto si ya existen códigos `HO-01`, `HO-02`, etc.

### Datos teóricos

Extrae:

- Objetivo general: diapositiva con `title: "Objetivo General"`.
- Objetivos específicos: diapositiva con `title: "Objetivos Específicos"`.
- Temas: diapositiva con `title: "Temas Teóricos a Tratar"`.

## Datos fijos actuales

Estos valores pertenecen al modelo aprobado y solo cambian con solicitud explícita:

- Dirección zonal: `AREQUIPA - PUNO`.
- CFP/UCO/Escuela: `PUNO`.
- Instructor/facilitador: `DIEGO FRANK LIPA CHOQUE`.
- Carrera: `ING. DE SOFTWARE CON INTELIGENCIA ARTFICIAL` si se conserva texto exacto del modelo actual.
- Semestre/módulo: `II`.
- Logo: `src/assets/senati.png`.

El código PIAD y NRC puede variar por curso.
Usa el dato proporcionado por el usuario o el metadato correcto del curso.
No inventes NRC ni mezcles NRC teórico con NRC de taller.

## Plantilla de taller

El título debe ser:

```text
PLAN DE SESIÓN – (PRÁCTICA DE TALLER)
```

### Cabecera

Orden obligatorio:

1. Logo SENATI y título.
2. Dirección zonal y CFP/UCO/Escuela.
3. Instructor/facilitador.
4. Carrera y semestre/módulo.
5. Materia/curso.
6. Tarea/proyecto.
7. Objetivo general.

### Tabla principal

Columnas:

1. Tiempo en minutos.
2. Actividades / pasos a seguir.
3. Prevención de recursos.

Filas:

1. Motivación, 15 minutos.
2. Demostración de operaciones nuevas, 90 minutos.
3. Aplicaciones, 125 minutos.
4. Evaluación, 15 minutos.

### Motivación

Incluye tres cuadros internos:

- Hoja de tarea.
- Hoja de operaciones.
- Procesos de ejecución.

El código de tarea va debajo de `HOJA DE TAREA`.
Los códigos de operaciones van debajo de `HOJA DE OPERACIONES`.
No escribas palabras de relleno como `y siguientes`.

El cuadro de tarea conserva:

```text
Plano
Esquema
Croquis
Modelo
Instrucciones
```

El contenido inferior de operaciones conserva:

```text
Operaciones nuevas
Habilidades a desarrollar
```

El cuadro de procesos conserva:

```text
Procesos específicos de la tarea programada
```

### Demostración

Usa objetivos específicos del taller.
Cada objetivo va en una línea independiente.

Para mantener una página, la plantilla actual limita esta lista a 8 ítems.
Si el usuario solicita conservar todos, reduce redacción antes de eliminar contenido.
No ocultes texto con `overflow: hidden` sin una regla de reducción aprobada.

### Aplicaciones

Usa prácticas y actividades del taller.
Cada actividad va en una línea independiente.

La plantilla actual limita esta lista a 12 ítems.
Prioriza operaciones centrales y actividades de la misma tarea.
No agregues actividades nuevas para llenar espacio.

### Evaluación

Conserva estas seis líneas:

```text
4.1Proceso Operacional
4.2Precisión y Acabado aplicación de normas técnicas
4.3Funcionalidad y aptitud de uso
4.4Orden, Seguridad, cuidado del ambiente
4.5Manejo de recursos y materiales
4.6Tiempo de ejecución
```

### Recursos de taller

Mantén esta lista salvo solicitud explícita:

Materiales:

- Diapositivas.
- Pizarra interactiva.
- Miro.
- Sandbox.
- Scalidraw.

Herramientas:

- Windows 10.
- Visual Studio Code.
- Draw.io.
- Miro.
- Github.

Maquinarias: vacío.

Equipos:

- PCs OnlyOne.

Instrumentos: vacío.

Otros:

- Internet.
- Cuenta institucional.

## Plantilla teórica

El título debe ser:

```text
PLAN DE SESIÓN – CONOCIMIENTOS TECNOLÓGICOS
```

El título debe permanecer en una sola línea.
Si no cabe, reduce el tamaño del título, no lo envuelvas en dos líneas.

### Cabecera

Orden obligatorio:

1. Logo SENATI y título.
2. Dirección zonal y CFP/UCO/Escuela.
3. Instructor/facilitador.
4. Carrera y semestre/módulo.
5. Materia/curso.
6. Objetivo general.

Usa `OBJETIVO` en singular.

### Tabla principal

Columnas:

1. Tiempo en minutos.
2. Actividades / pasos a seguir.
3. Prevención de ayudas.

Filas:

1. Motivación, 20 minutos.
2. Desarrollo del tema, 175 minutos.
3. Evaluación, 30 minutos.

### Motivación

Título exacto:

```text
1) MOTIVACIÓN (DAR A CONOCER OBJETIVOS)
```

Usa los objetivos específicos teóricos.

### Desarrollo del tema

Título exacto:

```text
2) DESARROLLO DEL TEMA
```

Usa los temas teóricos a tratar.
Conserva la mayor cantidad de temas posible sin romper una sola página.
Reduce solo si el contenido excede físicamente la hoja.

### Evaluación

Título exacto:

```text
3) EVALUACION - ACCIONES DE REFORZAMIENTO CONCLUSIONES
```

Conserva los dos párrafos fijos del modelo aprobado.

### Prevención de ayudas

Conserva tres bloques:

Estrategias:

- Experiencia directa: vacío.
- Experiencia figurada: vacío.
- Demostraciones: marcado.
- Investigativa: marcado.
- Otros: marcado.

Medios didácticos:

- Pizarra Virtual: marcado.
- Diapositivas: marcado.
- Manuales (MDE): vacío.
- Manuel del fabricante: marcado.
- Materiales Escritos: vacío.
- Videos: vacío.
- Enlaces de Interés: marcado.
- Foros: vacío.
- Chat: vacío.
- Plataformas Externas: marcado.
- Software aplicativo: marcado.
- Software de Simulación: marcado.
- Otros: marcado.

Metodología:

- Expositiva: marcado.
- Interrogativa: vacío.
- Dinámica grupal: marcado.
- Debate/Discusión: marcado.
- Trabajo individual: marcado.
- Trabajo grupal: marcado.
- Otras (dos pasos): marcado.

## Layout y reglas de una página

Ambas plantillas deben usar:

- Tamaño A4 vertical.
- `width: 210mm`.
- `height: 297mm`.
- `@page { size: A4; margin: 0; }` para generación final.
- Fondo blanco.
- Bordes negros de tabla.
- Logo alineado verticalmente con el título.
- Cuerpo de tabla flexible para ocupar el espacio inferior.
- Footer al final de la página.

No permitas que la tabla termine muy arriba dejando un espacio vacío grande.
No permitas que evaluación, footer o recursos salgan de la hoja.

Usa `display: flex` en el documento y `flex: 1` en el cuerpo de tabla cuando sea necesario.
Usa `overflow: hidden` solo después de garantizar que el contenido fue reducido de forma controlada.

Si hay exceso de contenido:

1. Reduce saltos y espacios innecesarios.
2. Acorta redacción sin cambiar significado.
3. Aplica límites de ítems definidos para taller.
4. Para teoría, conserva primero objetivos y temas centrales.
5. Verifica nuevamente la imagen completa.

No reduzcas la tipografía hasta volverla ilegible.

## Visor dentro de la aplicación

La ruta normal no debe mostrar el HTML de impresión.
Debe mostrar el PDF directamente:

```tsx
<iframe
  src={`${pdfUrl}#view=FitH&navpanes=0`}
  title="Plan de sesión PDF"
  className="..."
/>
```

No agregues un botón propio `Imprimir / Guardar PDF`.
El visor nativo del navegador ya ofrece esas acciones.

El modo de previsualización HTML puede existir únicamente para generar y revisar PDFs.
Usa una marca interna como `?preview=html` y no la muestres como flujo normal al usuario.

## Procedimiento de generación

### Paso 1. Preparar contenido

Confirma curso, semana y tipo.
Extrae datos del plan correcto.
Verifica código HT, objetivo y listas.

### Paso 2. Renderizar previsualización

Abre la ruta HTML de previsualización con el curso y semana correctos.
Revisa visualmente la página completa.

### Paso 3. Generar PDF

Usa un navegador Chromium en modo headless o la herramienta equivalente disponible.
Genera con tamaño A4 y sin encabezado del navegador.
No generes desde una captura de pantalla.

### Paso 4. Copiar archivos

Copia el PDF final a:

```text
exports/session-plans/
public/session-plans/
```

El archivo público debe poder abrirse por URL directa.

### Paso 5. Verificar ruta

Comprueba:

```text
/courses/:courseId/week/:weekId/session-plan/theory/view
/courses/:courseId/week/:weekId/session-plan/workshop/view
/session-plans/[archivo].pdf
```

Las dos rutas de plan deben responder y cargar el PDF correcto.

## Verificación obligatoria

### Visual

- [ ] Logo correcto.
- [ ] Título en una línea.
- [ ] Cabecera alineada.
- [ ] Tabla llega al borde inferior útil.
- [ ] No hay texto cortado.
- [ ] No hay segunda página.
- [ ] No hay salto inesperado de línea en etiquetas críticas.
- [ ] Semana correcta.
- [ ] Curso correcto.
- [ ] Tarea correcta.
- [ ] Operaciones correctas.

### Estructural

- [ ] Cada PDF tiene una sola página.
- [ ] El PDF abre correctamente.
- [ ] La ruta pública responde `HTTP 200`.
- [ ] El archivo existe en `exports/session-plans`.
- [ ] El archivo existe en `public/session-plans`.
- [ ] Teoría usa plantilla teórica.
- [ ] Taller usa plantilla de taller.

### Proyecto

Ejecuta:

```bash
pnpm build
```

Revisa también que no cambien datos de cursos sin autorización.

## Reglas duras

- Generar teoría y práctica/taller como plantillas separadas.
- No mezclar plantilla teórica y plantilla de taller.
- No generar más de una página por plan.
- No usar una captura como sustituto de PDF real.
- No usar el PDF teórico para una ruta de taller.
- No inventar códigos HT, PIAD, NRC u operaciones.
- No modificar datos fuente para corregir CSS.
- No eliminar el logo SENATI.
- No reintroducir botón propio de impresión.
- No dejar la ruta normal mostrando HTML de previsualización.
- No ocultar contenido sin aplicar las reglas de reducción.
- No alterar textos fijos aprobados sin solicitud explícita.

## Plantilla obligatoria de salida de trabajo

```markdown
# PLAN PDF [TEORÍA|TALLER]
## Curso: [nombre]
## Semana: [número]
## Archivo: [nombre].pdf

### Datos usados
- [objetivo, tarea, operaciones o temas]

### Cambios
- [archivo modificado]
- [plantilla aplicada]

### Verificación
- [ ] PDF de una sola página.
- [ ] PDF publicado en `public/session-plans`.
- [ ] Ruta responde.
- [ ] Build correcto.
```

## Integración con skill principal

Esta skill se ejecuta después de `planificacion-semanal-clase`.
Recibe de esa skill tareas, operaciones, semana, objetivo y contenidos ya validados.
Debe generar siempre el plan teórico y el plan práctico/taller, salvo solicitud explícita de uno solo.
`image-to-editable-ppt` y `bs-paper-cutout-story-video` no reemplazan esta plantilla.
