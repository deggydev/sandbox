---
name: planificacion-semanal-clase
description: Úsalo como skill principal cuando el usuario envía pantallazos o el PDF completo de un sílabo, plan curricular o matriz de contenidos por semana y necesita convertirlo en planificación académica, PDFs y presentaciones teóricas y prácticas. Debe respetar estrictamente los contenidos visibles en Operaciones, Conocimientos Tecnológicos, Conocimientos Complementarios y Formación Virtual. Palabras gatillo: semana, PDF curricular, pantallazo, sílabo, plan de clase, parte teórica, parte práctica, resumen semanal, tarea HT, contenidos de aprendizaje, operaciones, conocimientos tecnológicos, conocimientos complementarios.
nivel: completo
compat: [claude, codex, gpt, deepseek, glm, nemotron, ollama-pequeno]
---

# Planificación semanal de clase desde pantallazos de sílabo

## Cuándo usar

Usa esta skill cuando el usuario proporcione uno o varios pantallazos de un sílabo, plan curricular, matriz de contenidos o cuadro de aprendizaje y solicite desarrollar una semana de clase.

La entrada suele contener:
- Número de semana.
- Código y nombre de una o más tareas HT.
- Columna Operaciones.
- Columna Conocimientos Tecnológicos.
- Columna Conocimientos Complementarios.
- Columna Formación Virtual.
- Horas T, P y V, que sirven como contexto, pero no deben convertirse en contenido adicional si el usuario no lo solicita.

La salida debe transformar esa información en una estructura académica clara, profesional y directamente utilizable para planificación docente.

No inventes contenido que no esté respaldado por los pantallazos. Solo puedes agregar un concepto adicional cuando sea indispensable para comprender correctamente uno de los contenidos visibles.

---

## Objetivo de la skill

Convertir los contenidos semanales del sílabo en una propuesta de clase que mantenga exactamente esta estructura:

1. Semana.
2. Tareas HT en una sola línea.
3. Resumen de la semana.
   - Teoría.
   - Taller y práctica.
4. Parte teórica.
   - Objetivo general.
   - Objetivos específicos.
   - Temas teóricos a tratar.
5. Parte práctica.
   - Objetivo general.
   - Objetivos específicos.
   - Prácticas y actividades.

La salida debe ser suficientemente detallada para servir como guía docente, pero sin ampliar de forma artificial los contenidos del sílabo.

---

## Principios

1. El pantallazo manda. Los contenidos visibles son la fuente principal.
2. No conviertas seis contenidos tecnológicos en quince o veinte temas.
3. La parte teórica se construye principalmente con:
   - Operaciones.
   - Conocimientos Tecnológicos.
   - Conocimientos Complementarios.
4. La parte práctica debe servir para practicar exactamente los contenidos de la teoría.
5. Cada bloque de presentación debe incluir ejemplos visuales aplicados, no solo teoría descriptiva.
6. Usa diagramas, flujos, tablas comparativas y casos guiados cuando el contenido tenga relaciones o procesos.
7. No agregues proyectos, ejercicios o tecnologías que no aparezcan en el material, salvo que sean imprescindibles para aplicar un contenido explícito.
8. Los objetivos específicos deben ser pocos, concretos y alineados con el objetivo general.
9. Usa entre 2 y 4 objetivos específicos por bloque. Lo recomendado es 3 o 4.
10. No uses emojis.
11. No uses viñetas dentro de los objetivos específicos, temas teóricos ni prácticas y actividades.
12. Cada objetivo, tema o actividad debe ir en una línea independiente.
13. Si hay varias tareas HT en una semana, deben aparecer en una sola línea, separadas por coma.
14. Mantén la terminología del sílabo. No reemplaces nombres técnicos por otros distintos si no es necesario.
15. La redacción debe ser académica, clara, natural y fácil de entender.
16. El resumen debe integrar teoría y práctica, pero separadas con subtítulos.
17. No expliques contenidos como si fuera una clase desarrollada. Solo indica qué se va a abordar y qué se va a realizar.
16. No añadas conclusiones, recomendaciones, emojis, frases motivacionales ni comentarios fuera de la estructura solicitada.

---

## Jerarquía de fuentes dentro del pantallazo

Al construir el contenido, usa esta prioridad:

### 1. Tareas de aprendizaje
Determinan la competencia principal de la semana y el nombre de la tarea HT.

### 2. Operaciones
Indican lo que el estudiante debe hacer. Sirven especialmente para:
- Objetivos específicos.
- Prácticas y actividades.
- Taller y práctica del resumen.

### 3. Conocimientos Tecnológicos
Son la fuente principal para:
- Temas teóricos.
- Objetivo general de teoría.
- Resumen teórico.

### 4. Conocimientos Complementarios
Se incluyen solo si aparecen en el pantallazo y si apoyan directamente la semana.
Ejemplos:
- Ética y responsabilidad profesional.
- Matemáticas.
- Seguridad e higiene.
- Medio ambiente.
- Ciencias básicas.

No conviertas estos contenidos complementarios en el foco principal de la semana.

### 5. Formación Virtual
Úsala para enriquecer las prácticas cuando el ejercicio virtual coincide con el contenido central.
No copies todo automáticamente si genera redundancia.

---

## Procedimiento paso a paso

### Paso 1. Identificar la semana
Extrae el número de semana visible.

Formato:
`# SEMANA 9`

No inventes el número.

### Paso 2. Identificar las tareas HT
Busca el código y nombre de la tarea.

Formato obligatorio:
`## Tareas: HT-01 Crea modelo entidad relación conceptual`

Si existen varias:
`## Tareas: HT-01 Nombre tarea uno, HT-02 Nombre tarea dos`

Reglas:
- Una sola línea.
- Separadas por coma.
- Sin viñetas.
- Mantener el código exacto HT-XX.
- Mantener el nombre lo más fiel posible al pantallazo.

### Paso 3. Crear el resumen de la semana

Encabezado:
`# RESUMEN DE LA SEMANA`

Después agrega un título corto que sintetice la semana.

Ejemplo:
`## Introducción a bases de datos y modelado conceptual`

#### Teoría
Extensión recomendada: 65 a 110 palabras.

Debe responder:
- ¿Qué comprenderá el estudiante?
- ¿Cuáles son los conceptos centrales?
- ¿Qué conocimientos del pantallazo se desarrollarán?

No debe listar todos los contenidos.
Debe ser una síntesis académica.

#### Taller y práctica
Extensión recomendada: 65 a 110 palabras.

Debe responder:
- ¿Qué hará el estudiante?
- ¿Qué aplicará?
- ¿Qué producto, ejercicio o práctica desarrollará?

Debe derivarse de Operaciones y Formación Virtual.
No inventes prácticas ajenas.

---

## Parte teórica

Encabezado:
`# PARTE TEÓRICA`

Añade un subtítulo técnico y breve.

Ejemplo:
`## Fundamentos de bases de datos y modelado conceptual`

Usa una tabla de dos columnas:

| SECCIÓN | DETALLE |
|---|---|
| **Objetivo general (Teoría)** | ... |
| **Objetivos específicos** | ... |
| **Temas teóricos a tratar** | ... |

### Objetivo general de teoría

Extensión recomendada: 25 a 45 palabras.

Debe:
- Empezar con un verbo en infinitivo.
- Resumir la competencia conceptual de la semana.
- Estar alineado con la tarea HT y los conocimientos tecnológicos.
- Evitar mencionar demasiadas acciones.

Verbos recomendados:
- Comprender.
- Analizar.
- Reconocer.
- Identificar.
- Interpretar.

Ejemplo:
`Comprender el proceso de normalización y refinamiento de un modelo de datos relacional mediante la aplicación de reglas de negocio, formas normales y criterios de integridad de la información.`

### Objetivos específicos de teoría

Cantidad: 2 a 4.
Recomendado: 3 o 4.

Extensión por objetivo: 10 a 22 palabras.

Reglas:
- Sin viñetas.
- Cada objetivo en una línea independiente.
- En Markdown de tabla, separar con `<br>`.
- Deben estar directamente derivados de los contenidos visibles.
- No desglosar excesivamente un mismo tema.

Ejemplo correcto:
`Identificar reglas de negocio y problemas de redundancia presentes en un modelo relacional.<br>Comprender la aplicación de la primera, segunda y tercera forma normal.<br>Reconocer la importancia de la trazabilidad y documentación de cambios en el modelo.`

Ejemplo incorrecto:
Crear 10 objetivos distintos a partir de 4 contenidos.

### Temas teóricos a tratar

Cantidad recomendada: 5 a 10 temas.
Si el pantallazo tiene menos contenido, usar menos.
No hay obligación de llegar al máximo.

Extensión por tema: 3 a 12 palabras.

Reglas:
- Sin viñetas.
- Una línea por tema.
- Priorizar los Conocimientos Tecnológicos.
- Agregar Conocimientos Complementarios solo si son relevantes.
- No convertir cada palabra del pantallazo en un tema separado.
- No introducir tecnologías, frameworks o conceptos que no aparecen.

Ejemplo:
`Primera forma normal 1FN.<br>Segunda forma normal 2FN.<br>Tercera forma normal 3FN.<br>Redundancia de datos y sus efectos.<br>Trazabilidad y seguimiento de cambios.`

---

## Parte práctica

Encabezado:
`# PARTE PRÁCTICA`

Añade un subtítulo centrado en la aplicación.

Ejemplo:
`## Aplicación de formas normales en un modelo relacional`

Usa esta tabla:

| SECCIÓN | DETALLE |
|---|---|
| **Objetivo general (Práctica)** | ... |
| **Objetivos específicos** | ... |
| **Prácticas y actividades** | ... |

### Objetivo general de práctica

Extensión recomendada: 25 a 45 palabras.

Debe:
- Empezar con un verbo en infinitivo.
- Explicar qué aplicará el estudiante.
- Reflejar directamente la tarea HT y las Operaciones.

Verbos recomendados:
- Aplicar.
- Desarrollar.
- Construir.
- Implementar.
- Diseñar.
- Configurar.

### Objetivos específicos de práctica

Cantidad: 2 a 4.
Recomendado: 3 o 4.

Extensión por objetivo: 10 a 22 palabras.

Reglas:
- Sin viñetas.
- Una línea por objetivo.
- Deben salir de las Operaciones.
- Deben ser prácticos y observables.
- No inventar actividades adicionales.

### Prácticas y actividades

Cantidad recomendada: 5 a 9.
Puede ser menor si el pantallazo tiene poco contenido.

Extensión por actividad: 4 a 18 palabras.

Reglas:
- Sin viñetas.
- Una actividad por línea.
- Deben ser una traducción práctica de las Operaciones y de la Formación Virtual.
- Si el pantallazo dice "crear formulario", la práctica debe ser crear formulario.
- Si dice "aplicar 1FN, 2FN y 3FN", las actividades deben practicar esas formas normales.
- No convertir la práctica en un proyecto diferente.
- No agregar actividades solo para hacer la tabla más larga.
- No introducir tecnologías no mencionadas.

Ejemplo correcto:
`Creación de tablas mediante sentencias DDL.<br>Inserción y modificación de registros mediante DML.<br>Desarrollo de consultas utilizando SELECT.<br>Aplicación de filtros mediante WHERE.<br>Unión de tablas mediante JOIN.`

---

## Reglas de extensión

Mantén estas proporciones:

### Resumen
- Teoría: 65 a 110 palabras.
- Taller y práctica: 65 a 110 palabras.

### Objetivos
- Objetivo general: 25 a 45 palabras.
- Objetivos específicos: 2 a 4 por bloque.
- Cada objetivo específico: 10 a 22 palabras.

### Temas teóricos
- 5 a 10 ítems normalmente.
- Cada tema: 3 a 12 palabras.
- Si el pantallazo muestra solo 5 o 6 temas relevantes, no inventar más.

### Prácticas y actividades
- 5 a 9 actividades normalmente.
- Cada actividad: 4 a 18 palabras.
- Deben corresponder directamente con Operaciones y Formación Virtual.

Estas cifras son límites orientativos. La fidelidad al pantallazo tiene prioridad sobre alcanzar un número determinado.

---

## Reglas duras

- No usar emojis.
- No usar viñetas dentro de las tablas.
- No crear más de 4 objetivos específicos por bloque.
- No ampliar contenidos solo para llenar espacio.
- No agregar teoría que no aparezca en el sílabo.
- No agregar prácticas que no correspondan a la teoría.
- No modificar el código HT.
- No separar las tareas HT en listas.
- No cambiar el número de semana.
- No agregar una sección de conclusión.
- No agregar explicaciones posteriores a las tablas.
- No escribir frases como "cuando quieras seguimos".
- No inventar herramientas o software.
- No asumir que una práctica necesita proyecto final si el pantallazo no lo indica.
- No incluir horas T, P y V en la salida salvo que el usuario lo pida.
- No duplicar el mismo contenido con nombres distintos.
- No usar lenguaje excesivamente técnico si el sílabo es introductorio.
- No convertir conocimientos complementarios en temas principales.

---

## Qué hacer cuando faltan datos

### Si no aparece código HT
No inventarlo.
Escribe:
`## Tareas: [tarea visible en el pantallazo]`

### Si no aparece el número de semana
Pide el número solo si no puede deducirse del contexto anterior.

### Si una imagen está cortada
Trabaja únicamente con lo visible.
No completes el texto por intuición.

### Si hay dos pantallazos de la misma semana
Combina la información y elimina duplicados.

### Si hay varias tareas en la misma semana
Agrúpalas en una sola línea y desarrolla un único resumen y dos bloques: teoría y práctica.

---

## Criterios de calidad antes de responder

Comprueba:

- [ ] El número de semana es correcto.
- [ ] La línea de tareas HT es una sola línea.
- [ ] El resumen tiene Teoría y Taller y práctica.
- [ ] El resumen no introduce contenidos ajenos.
- [ ] La teoría se basa en Conocimientos Tecnológicos.
- [ ] Las Operaciones se reflejan en la práctica.
- [ ] Hay máximo 4 objetivos específicos por bloque.
- [ ] Los objetivos específicos no tienen viñetas.
- [ ] Los temas teóricos no tienen viñetas.
- [ ] Las prácticas y actividades no tienen viñetas.
- [ ] No hay emojis.
- [ ] No hay contenido inventado.
- [ ] No hay repetición innecesaria.
- [ ] La salida puede copiarse directamente a un plan docente.

---

## Plantilla obligatoria de salida

```markdown
# SEMANA [N]
## Tareas: HT-XX [nombre de la tarea], HT-XX [nombre de la tarea si existe otra]

# RESUMEN DE LA SEMANA
## [título general de la semana]

### Teoría
[Resumen de 65 a 110 palabras basado principalmente en los conocimientos tecnológicos.]

### Taller y práctica
[Resumen de 65 a 110 palabras basado principalmente en las operaciones y formación virtual.]

# PARTE TEÓRICA
## [título de la parte teórica]

| SECCIÓN | DETALLE |
|---|---|
| **Objetivo general (Teoría)** | [25 a 45 palabras.] |
| **Objetivos específicos** | [Objetivo 1.]<br>[Objetivo 2.]<br>[Objetivo 3.]<br>[Objetivo 4, solo si es necesario.] |
| **Temas teóricos a tratar** | [Tema 1.]<br>[Tema 2.]<br>[Tema 3.]<br>[Tema 4.]<br>[Tema 5.] |

# PARTE PRÁCTICA
## [título de la parte práctica]

| SECCIÓN | DETALLE |
|---|---|
| **Objetivo general (Práctica)** | [25 a 45 palabras.] |
| **Objetivos específicos** | [Objetivo 1.]<br>[Objetivo 2.]<br>[Objetivo 3.]<br>[Objetivo 4, solo si es necesario.] |
| **Prácticas y actividades** | [Actividad 1.]<br>[Actividad 2.]<br>[Actividad 3.]<br>[Actividad 4.]<br>[Actividad 5.] |
```

---

## Ejemplo de razonamiento interno para transformar un pantallazo

Si el pantallazo contiene:

Tarea:
`HT-04 Gestiona datos mediante sentencias SQL`

Operaciones:
- Acceder a Oracle APEX.
- Crear estructuras mediante DDL.
- Insertar y modificar registros con DML.
- Consultar con SELECT.
- Unir tablas mediante JOIN.

Conocimientos Tecnológicos:
- Oracle APEX.
- DDL.
- DML.
- SELECT y WHERE.
- ORDER BY.
- JOIN.

Entonces:

No agregar:
- PL/SQL.
- Triggers.
- Stored procedures.
- Funciones de agregación.
- Subconsultas.
- Índices.
- Vistas.

Porque no están en el pantallazo.

La práctica debe contener actividades como:
- Acceso a Oracle APEX.
- Creación de tablas con DDL.
- Inserción y modificación con DML.
- Consultas SELECT.
- Filtros WHERE.
- Ordenamiento ORDER BY.
- JOIN.

Ese es el nivel correcto de fidelidad.

---

## Versión corta para modelos pequeños

Recibirás uno o varios pantallazos de un sílabo por semana.

Genera exactamente:

1. `# SEMANA N`
2. Una sola línea de tareas:
   `## Tareas: HT-XX nombre, HT-XX nombre`
3. `# RESUMEN DE LA SEMANA`
   - `### Teoría`
   - `### Taller y práctica`
4. `# PARTE TEÓRICA`
   - Objetivo general.
   - 2 a 4 objetivos específicos.
   - Temas teóricos.
5. `# PARTE PRÁCTICA`
   - Objetivo general.
   - 2 a 4 objetivos específicos.
   - Prácticas y actividades.

Reglas:
- Basarse rígidamente en Operaciones, Conocimientos Tecnológicos y Conocimientos Complementarios.
- La práctica debe aplicar lo mismo que aparece en la teoría.
- No inventar temas.
- No ampliar innecesariamente.
- No usar emojis.
- No usar viñetas dentro de las tablas.
- Objetivos específicos: máximo 4.
- Temas y actividades: una línea por elemento.
- Mantener códigos HT y número de semana exactamente.
- Solo agregar un contenido extra si es imprescindible para comprender uno ya presente.

---

## Orquestación prioritaria de skills del proyecto

Esta skill es punto de entrada cuando usuario entrega un PDF curricular o pantallazos de planificación.
No delegues directamente a una skill genérica antes de extraer y validar el currículo.

### Orden obligatorio

Ejecuta este orden:

1. `planificacion-semanal-clase`
2. `senati-planes-pdf`
3. `senati-presentaciones-interactivas`
4. `image-to-editable-ppt`
5. `bs-paper-cutout-story-video`

La primera skill es esta skill principal.
Las posiciones 2 y 3 son skills propias del proyecto y tienen prioridad máxima para la salida final.
Las posiciones 4 y 5 son skills de apoyo y solo se usan cuando una tarea concreta lo exige.

### Flujo obligatorio después de recibir PDF

1. Leer todas las páginas del PDF.
2. Extraer presentación del curso, Cuadro Programa y Hoja de Programación.
3. Relacionar cada tarea HT con sus operaciones exactas.
4. Construir planificación semanal con teoría y práctica.
5. Ejecutar `senati-planes-pdf` para generar dos planes por semana:
   - Plan teórico.
   - Plan práctico o de taller.
6. Ejecutar `senati-presentaciones-interactivas` para generar dos bloques por semana:
   - Presentación teórica.
   - Presentación práctica o de taller.
7. Usar `image-to-editable-ppt` solo si usuario solicita reconstruir un PDF, imagen o PPT como PowerPoint editable.
8. Usar `bs-paper-cutout-story-video` solo si usuario solicita storyboard visual, historia de recortes, assets papercut o video derivado.
9. Validar que PDF y presentaciones usan la misma tarea, semana, operaciones y contenidos.

No reemplaces las skills SENATI por las skills genéricas.
No uses `image-to-editable-ppt` para crear las presentaciones nativas del proyecto cuando los datos ya pueden vivir en `src/data/courses/piad-*.ts`.
No uses `bs-paper-cutout-story-video` para cambiar la identidad visual de Sandbox SENATI.

### Responsabilidad de cada skill

| Prioridad | Skill | Responsabilidad |
|---|---|---|
| 1 | `planificacion-semanal-clase` | Leer fuente, extraer currículo, relacionar tareas y operaciones, redactar planificación. |
| 2 | `senati-planes-pdf` | Generar planes A4 teórico y práctico/taller de una sola página. |
| 3 | `senati-presentaciones-interactivas` | Generar presentaciones teórica y práctica/taller dentro del proyecto. |
| 4 | `image-to-editable-ppt` | Reconstruir entradas visuales como PowerPoint editable cuando se solicite. |
| 5 | `bs-paper-cutout-story-video` | Crear storyboard, assets papercut o video cuando se solicite. |

### Contrato entre skills

Entrega a `senati-planes-pdf` y `senati-presentaciones-interactivas` estos datos ya validados:

```text
curso:
  id: ...
  nombre: ...
  piad: ...
nrc_teoria: ...
  nrc_taller: ...
semana: ...
tareas:
  - codigo: HT-01
    nombre: ...
    operaciones:
      - codigo: HO-01
        nombre: ...
        tipo: nueva|repetida
objetivo_general: ...
objetivos_especificos: ...
practicas: ...
```

Las dos skills SENATI deben consumir el mismo contrato.
No permitas que PDF y presentación inventen relaciones distintas entre tarea y operación.

### Condiciones de parada

Detén generación final y solicita aclaración si:

- Falta una página del PDF curricular.
- No se puede leer la relación entre tarea y operación.
- PIAD o NRC no fueron proporcionados y no aparecen en la fuente.
- La Hoja de Programación contradice el Cuadro Programa.
- No se puede decidir si un código es `HO` o `H0`.

Puedes continuar con una marca `[ilegible en PDF]` solo cuando usuario autorice trabajar con datos incompletos.

### Verificación final de la cadena

- [ ] Esta skill leyó y validó fuente curricular.
- [ ] Se generó teoría y práctica en planificación.
- [ ] `senati-planes-pdf` generó PDF teórico y práctico.
- [ ] `senati-presentaciones-interactivas` generó presentación teórica y práctica.
- [ ] PDF y presentación comparten tarea y operaciones.
- [ ] Skills genéricas solo se usaron como apoyo solicitado.
- [ ] No se confundió PDF editable con PDF de plan de sesión.

---

## Extensión para currículum completo en PDF

Usa este flujo cuando el usuario entregue el PDF completo del curso, no solo pantallazos.

El PDF puede tener varias páginas y normalmente contiene tres bloques:

1. Presentación del programa.
2. Cuadro Programa.
3. Hoja de Programación.

Lee todas las páginas antes de crear semanas. No trabajes solo con la primera página visible.

### 1. Presentación del programa

Extrae y conserva estos datos cuando aparezcan:

- Catálogo o periodo.
- Nombre del curso o módulo.
- Escuela Profesional.
- Carrera.
- Nivel.
- Módulo Formativo.
- Módulo Ocupacional.
- Semestre.
- Objetivo General.

El usuario puede entregar por separado el código PIAD y el NRC. Pide esos valores si faltan.
No inventes PIAD, NRC, periodo ni códigos de curso.

### 2. Cuadro Programa

El Cuadro Programa es fuente obligatoria para relacionar tareas y operaciones.

La tabla contiene:

- Filas verticales de tareas HT.
- Columnas horizontales de operaciones.
- Código de cada tarea.
- Código y nombre de cada operación.
- Celdas marcadas, sombreadas o en negrita.
- Leyenda de Operación Nueva y Operación Repetida.

Interpreta cada celda marcada como pertenencia de esa operación a la tarea de su fila.
No asignes todas las operaciones del cuadro a todas las tareas.
No relaciones operaciones por cercanía visual ni por orden del texto extraído.
Usa la intersección exacta entre fila de tarea y columna de operación.

Conserva para cada tarea un registro interno con esta forma:

```text
HT-01:
  nombre: ...
  operaciones:
    - codigo: HO-01
      nombre: ...
      tipo: nueva|repetida
    - codigo: HO-02
      nombre: ...
      tipo: nueva|repetida
```

El PDF puede mostrar `HO-01` con letra O o `H0-01` con número cero.
Conserva código exactamente como aparece en el PDF.
Si OCR no permite distinguirlos, informa la duda y no normalices silenciosamente.

Las operaciones pueden aparecer como `H1`, `H2`, `H3`, `H4` en instrucciones del usuario.
Relaciona esos nombres con códigos completos solo cuando la correspondencia sea verificable.

La relación de operación debe alimentar después:

- Objetivos específicos de práctica.
- Prácticas y actividades.
- Resumen de taller y práctica.
- Hoja de operaciones del plan de sesión.

### 3. Hoja de Programación

Lee todas las páginas de la Hoja de Programación, incluidas páginas de continuación.

Extrae por cada fila de semana:

- Número de semana.
- Horas T, P y V como contexto.
- Tareas de aprendizaje.
- Operaciones.
- Conocimientos Tecnológicos.
- Conocimientos Complementarios.
- Formación Virtual.

Conserva el orden original de semanas y filas.
Si una semana contiene varias tareas, conserva cada tarea y sus operaciones correspondientes.
No mezcles contenidos de tareas distintas.
Si una fila continúa en otra página, únela a la misma semana antes de redactar.
Si aparece una fila de evaluación o distribución de horas, consérvala como metadato y no la conviertas en tarea.

### 4. Relación entre tareas y semanas

Normalmente cada tarea corresponde a una semana.
Verifica esa relación contra la Hoja de Programación antes de asumirla.

Si una tarea ocupa varias semanas, repite la tarea solo cuando el PDF la mantenga activa en esas filas.
Si una semana contiene varias tareas, desarrolla una sola semana con todas sus tareas en una línea.
Mantén códigos HT exactos.

### 5. Validación cruzada

Antes de redactar, comprueba:

- Cada tarea HT del calendario existe en el Cuadro Programa.
- Cada operación usada pertenece a la tarea correcta.
- Cada operación tiene código y nombre verificables.
- Tipo nueva o repetida coincide con la leyenda del cuadro.
- Semana de Hoja de Programación coincide con la semana redactada.
- Operaciones, conocimientos y formación virtual pertenecen a la misma fila.
- No se perdió texto en páginas continuadas.

Si OCR mezcla columnas rotadas del Cuadro Programa, usa la imagen de la tabla para reconstruir filas y columnas.
El texto OCR no tiene prioridad sobre la posición real de la celda marcada.

### 6. Uso en salida semanal

Mantén plantilla de salida existente.
Agrega operaciones exactas solo donde corresponda:

```markdown
## Tareas: HT-01 [nombre]

### Operaciones
HO-01 [nombre], HO-02 [nombre], HO-03 [nombre]
```

Si la salida solicitada no incluye una sección Operaciones, usa esos datos dentro de Objetivos específicos, Prácticas y actividades y resumen práctico.
No agregues una sección nueva sin solicitud del usuario.

Para la Hoja de Operaciones del plan de sesión, escribe los códigos de la tarea actual en orden original.
No uses `H1, H2 y siguientes` como sustituto si el PDF proporciona códigos completos.

### 7. Datos faltantes o ilegibles

Si el PDF no permite leer una operación, marca:

`[operación ilegible en PDF]`

Si falta PIAD o NRC, solicita esos datos al usuario.
Si falta una página o una continuación, solicita el PDF completo antes de cerrar la planificación.
Si el cuadro y la hoja de programación contradicen sus códigos, muestra la discrepancia y pide confirmación.

### 8. Criterios adicionales de calidad

- [ ] Se leyeron todas las páginas del PDF.
- [ ] Se extrajo presentación del curso.
- [ ] Se reconstruyó Cuadro Programa por intersección de filas y columnas.
- [ ] Se relacionaron códigos de operación con cada tarea.
- [ ] Se distinguieron operaciones nuevas y repetidas.
- [ ] Se procesaron todas las páginas de Hoja de Programación.
- [ ] Se verificó continuidad de semanas y tareas.
- [ ] Se conservaron PIAD y NRC proporcionados por el usuario.
- [ ] No se inventaron operaciones ni relaciones.
