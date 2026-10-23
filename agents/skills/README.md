# Skills para diapositivas

Esta carpeta conserva skills reutilizables para crear, reconstruir y validar diapositivas.

## Prioridad de uso

Cuando usuario entregue un PDF curricular, usa esta cadena:

1. `agents/skills/planificacion-semanal-clase/SKILL.md`.
2. `senati-planes-pdf/SKILL.md`.
3. `senati-presentaciones-interactivas/SKILL.md`.
4. `image-to-editable-ppt/SKILL.md`, solo como apoyo especializado.
5. `bs-paper-cutout-story-video/SKILL.md`, solo para storyboard o video papercut.

## Skills disponibles

### `bs-paper-cutout-story-video`

Skill para crear historias visuales con estilo de recortes de papel.

Incluye:

- Instrucciones principales en `SKILL.md`.
- Referencias de escritura, props, musica y storyboard.
- Ejemplos de storyboards.
- Motor visual con CSS, fuentes y nodos Lucide.
- Scripts para servir, construir, renderizar, validar y agregar musica.

### `image-to-editable-ppt`

Skill para reconstruir imagenes, PDFs o presentaciones visuales como PowerPoint editable.

Incluye:

- Instrucciones principales en `SKILL.md`.
- Flujo `prepare`, `dispatch`, `record` y `finalize`.
- Referencias de decisiones visuales y esquema de manifiestos.
- Prompts para agentes de pagina.
- Script para construir prompts de agentes.
- Runtime local `editppt` dentro de `cli/`.

### Skills propias de Sandbox SENATI

#### `senati-presentaciones-interactivas`

Genera los dos bloques de cada semana:

- Presentación teórica.
- Presentación práctica o de taller.

Conserva tipos de diapositiva, temas, navegación, responsive y estructura de datos actuales.

#### `senati-planes-pdf`

Genera los dos documentos de cada semana:

- Plan teórico de conocimientos tecnológicos.
- Plan práctico o de taller.

Conserva plantillas A4, logo, datos dinámicos, publicación directa y validación de una sola página.

## Regla de uso

Lee el `SKILL.md` correspondiente antes de ejecutar una skill.
Conserva archivos generados fuera de esta carpeta, salvo que usuario solicite guardarlos aqui.
