export const piad223 = {
  id: "piad-223",
  name: "DATABASE FOUNDATIONS (ORACLE)",
  code: "PIAD-223",
  description: "Aprende los conceptos fundamentales de bases de datos, modelamiento de datos y el lenguaje SQL utilizando tecnología Oracle.",
  imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
  weeks: [
    {
      id: "week-09",
      number: 9,
      title: "Semana 09",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp-t-1a", type: "title", title: "Tareas", content: "HT-01 Crea modelo entidad relación conceptual", notes: "" },
            { id: "sp-t-1b", type: "text", title: "Semana 9", content: "Introducción a bases de datos y modelado conceptual.\n\nDurante esta semana el estudiante comprenderá los fundamentos de las bases de datos y los tipos de modelos de datos, con énfasis en las bases de datos relacionales. Se trabajará el modelado conceptual mediante la identificación de entidades, atributos, identificadores únicos y relaciones entre entidades. También se abordarán los tipos de relaciones y la opcionalidad como elementos necesarios para representar correctamente un escenario de negocio mediante un diagrama entidad-relación.", notes: "" },
            { id: "sp-t-2", type: "title", title: "Objetivo General", content: "Comprender los fundamentos de las bases de datos y del modelado conceptual para representar los requerimientos de un negocio mediante entidades, atributos, identificadores y relaciones.", notes: "" },
            { id: "sp-t-3", type: "text", title: "Objetivos Específicos", content: "• Identificar los principales tipos de modelos de datos y las características de una base de datos relacional.\n• Comprender los conceptos de entidad, atributo e identificador único dentro de un modelo conceptual.\n• Reconocer los tipos de relaciones y la opcionalidad entre entidades.\n• Comprender la finalidad del diagrama entidad-relación como representación del modelo conceptual.", notes: "" },
            { id: "sp-t-4", type: "text", title: "Temas Teóricos a Tratar", content: "• Tipos de modelos de datos.\n• Bases de datos relacionales.\n• Entidades y atributos dentro del modelado conceptual.\n• Identificadores únicos (UID).\n• Tipos de relaciones entre entidades.\n• Opcionalidad en las relaciones.\n• Requerimientos de negocio aplicados al modelado conceptual.\n• Representación mediante diagramas entidad-relación (ERD).\n• Privacidad y protección de datos personales.\n• Teoría de conjuntos y diagramas de Venn como apoyo al análisis de relaciones.\n• Principios básicos de organización de la información.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp-w-1a", type: "title", title: "Tareas", content: "HT-01 Crea modelo entidad relación conceptual", notes: "" },
            { id: "sp-w-1b", type: "text", title: "Semana 9", content: "Creación de un modelo entidad-relación conceptual.\n\nEl estudiante analizará un caso de negocio para identificar sus principales requerimientos y transformarlos en un modelo conceptual. A partir de ello, determinará entidades, atributos e identificadores únicos, establecerá relaciones entre entidades y construirá un diagrama entidad-relación (ERD). Como parte del trabajo, se reforzará la correcta representación de relaciones y opcionalidad dentro del modelo.", notes: "" },
            { id: "sp-w-2", type: "title", title: "Objetivo General", content: "Aplicar los fundamentos del modelado conceptual mediante la construcción de un diagrama entidad-relación que represente correctamente los requerimientos de un caso de negocio.", notes: "" },
            { id: "sp-w-3", type: "text", title: "Objetivos Específicos", content: "• Identificar entidades, atributos e identificadores únicos a partir de un caso propuesto.\n• Establecer relaciones y opcionalidad entre las entidades identificadas.\n• Representar el modelo conceptual mediante un diagrama entidad-relación.", notes: "" },
            { id: "sp-w-4", type: "text", title: "Prácticas y Actividades", content: "• Análisis de los requerimientos de un caso de negocio.\n• Identificación de entidades y atributos principales.\n• Definición de identificadores únicos para cada entidad.\n• Establecimiento de relaciones entre entidades.\n• Determinación de la opcionalidad de las relaciones.\n• Construcción del diagrama entidad-relación conceptual.\n• Revisión y validación del modelo respecto a los requerimientos del negocio.\n• Comparación básica entre modelos relacionales y otros tipos de modelos de datos.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w9-t-1", type: "cover", title: "Bases de Datos y Modelado Conceptual", subtitle: "Conocimiento Teórico - Semana 09", notes: "" },
          { id: "w9-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Tipos de modelos de datos y sus niveles de abstracción.", "Bases de datos relacionales y sus características.", "Entidades, atributos e identificadores únicos (UID).", "Tipos de relaciones y opcionalidad entre entidades.", "Representación mediante diagramas entidad-relación (ERD).", "Privacidad y protección de datos personales.", "Teoría de conjuntos y diagramas de Venn como apoyo.", "Organización de la información en el modelado conceptual."], notes: "" },
          { id: "w9-t-3", type: "callout", calloutType: "tip", title: "Modelar antes de construir", content: "El <b>modelado conceptual</b> nos permite representar la información del negocio antes de preocuparnos por el motor de base de datos. Nos centramos en identificar <span class='hl-callout'>entidades</span>, <span class='hl-callout'>atributos</span>, <span class='hl-callout'>identificadores únicos</span> y <span class='hl-callout'>relaciones</span> que reflejen correctamente el escenario de negocio.", notes: "" },
          { id: "w9-t-4", type: "text", title: "Tipos de Modelos de Datos", content: "Existen diferentes niveles de abstracción para representar la información de una organización. Cada modelo responde a una etapa del diseño y a un público distinto:\n\n• <span class='hl-blue font-bold'>Modelo conceptual</span>: describe <b>qué</b> datos existen y cómo se relacionan, sin detalles técnicos. Se comunica con usuarios y analistas.\n• <span class='hl-purple font-bold'>Modelo lógico</span>: define <b>cómo</b> se estructuran los datos en tablas, claves y relaciones, pero sin depender de un DBMS específico.\n• <span class='hl-amber font-bold'>Modelo físico</span>: especifica <b>cómo</b> se almacenarán los datos en un motor concreto, incluyendo tipos de datos, índices y restricciones.", notes: "" },
          { id: "w9-t-5", type: "text", title: "Bases de Datos Relacionales", content: "Una base de datos relacional organiza la información en <b>tablas</b> formadas por filas y columnas:\n\n• Cada <span class='hl-cyan font-bold'>fila</span> representa un registro único (una instancia de una entidad).\n• Cada <span class='hl-cyan font-bold'>columna</span> representa un atributo de esa entidad.\n• Las relaciones entre tablas se establecen mediante <span class='hl-purple font-bold'>claves</span>, lo que garantiza integridad y reduce redundancia.\n• Es el modelo más utilizado en la industria y el que utilizaremos con Oracle.", code: `-- Ejemplo esquemático de una tabla relacional
CLIENTE
-------------------------------
ID_Cliente | Nombre   | Correo
-------------------------------
1          | Ana      | ana@mail.com
2          | Luis     | luis@mail.com

PEDIDO
------------------------------------------
ID_Pedido | Fecha       | ID_Cliente
------------------------------------------
101       | 2025-09-20  | 1
102       | 2025-09-21  | 2

-- La columna ID_Cliente en PEDIDO relaciona
-- cada pedido con un cliente de la tabla CLIENTE.`, language: "sql", notes: "" },
          { id: "w9-t-6", type: "interactive-list", title: "Entidades y Atributos", items: ["<b>Entidad</b>: objeto del mundo real relevante para el negocio (Cliente, Producto, Pedido).", "<b>Atributo</b>: característica que describe a una entidad (nombre, precio, fecha).", "Una entidad suele representarse con un rectángulo en el diagrama ERD.", "Los atributos se representan con óvalos o se listan dentro del rectángulo.", "Todo atributo debe aportar información útil para el negocio."], notes: "" },
          { id: "w9-t-6b", type: "quiz", title: "¿Entidad o atributo?", question: "En una base de datos de una universidad, ¿cuál de estos es una <b>entidad</b> y no un atributo?", options: ["Nombre del alumno", "Alumno", "Teléfono del alumno", "Correo del alumno"], answer: "Alumno", explanation: "El alumno es el objeto del mundo real (entidad). Su nombre, teléfono y correo son características que lo describen (atributos).", notes: "" },
          { id: "w9-t-7", type: "text", title: "Identificadores Únicos (UID)", content: "El <b>identificador único</b> es un atributo o conjunto de atributos cuyo valor distingue un registro de otro dentro de una misma entidad:\n\n• <span class='hl-emerald font-bold'>UID natural</span>: ya existe en el negocio, como el DNI o el RUC.\n• <span class='hl-emerald font-bold'>UID artificial</span>: se crea solo para identificar registros, como un código autogenerado.\n• En el <b>modelo conceptual</b> se marcan claramente; en el modelo relacional se convertirán en <span class='hl-amber font-bold'>clave primaria</span>.\n• Un buen UID debe ser único, inmutable y lo más corto posible.", notes: "" },
          { id: "w9-t-8", type: "text", title: "Tipos de Relaciones entre Entidades", content: "La <b>cardinalidad</b> indica cuántas instancias de una entidad se relacionan con instancias de otra entidad. Los tres tipos principales son:\n\n• <span class='hl-blue font-bold'>Uno a uno (1:1)</span>: una instancia de A se relaciona con una única instancia de B.\n• <span class='hl-blue font-bold'>Uno a muchos (1:N)</span>: una instancia de A se relaciona con muchas instancias de B.\n• <span class='hl-blue font-bold'>Muchos a muchos (N:M)</span>: muchas instancias de A se relacionan con muchas instancias de B.\n\nLa cardinalidad se define a partir de las reglas de negocio del escenario analizado.", notes: "" },
          { id: "w9-t-8b", type: "quiz", title: "Identifica la cardinalidad", question: "Un <b>CLIENTE</b> puede realizar muchos <b>PEDIDOS</b>, pero un <b>PEDIDO</b> pertenece a un solo <b>CLIENTE</b>. ¿Qué relación es?", options: ["1:1", "1:N", "N:M"], answer: "1:N", explanation: "Un cliente se relaciona con muchos pedidos (1 del lado cliente, N del lado pedido). Por eso es una relación uno a muchos (1:N).", notes: "" },
          { id: "w9-t-9", type: "callout", calloutType: "warning", title: "Ojo con la Opcionalidad", content: "La <b>opcionalidad</b> define si una entidad debe participar obligatoriamente en una relación o si puede no hacerlo. Se combina con la cardinalidad para representar reglas de negocio exactas:\n\n• <span class='hl-badge'>Obligatoria</span>: toda instancia debe participar en la relación.\n• <span class='hl-badge'>Opcional</span>: la instancia puede existir sin participar en la relación.", notes: "" },
          { id: "w9-t-10", type: "text", title: "Diagrama Entidad-Relación (ERD)", content: "El <b>diagrama entidad-relación</b> es la representación gráfica del modelo conceptual. Sus elementos principales son:\n\n• <span class='hl-cyan font-bold'>Rectángulos</span>: representan las entidades.\n• <span class='hl-purple font-bold'>Óvalos</span>: representan los atributos.\n• <span class='hl-amber font-bold'>Rombos o líneas</span>: representan las relaciones entre entidades.\n• <span class='hl-emerald font-bold'>Notación de cardinalidad y opcionalidad</span>: indica las reglas de participación.\n\nEl ERD permite validar con el usuario que el modelo refleja correctamente el negocio antes de crear las tablas.", code: `-- Ejemplo textual de un ERD simple
[CLIENTE] 1 ---- realiza ---- N [PEDIDO]

Atributos de CLIENTE:
- ID_Cliente (UID)
- Nombre
- Correo

Atributos de PEDIDO:
- ID_Pedido (UID)
- Fecha
- Estado

Cardinalidad: 1:N
Opcionalidad: un cliente puede tener cero o muchos pedidos.`, language: "text", notes: "" },
          { id: "w9-t-11", type: "text", title: "Requerimientos de Negocio", content: "El punto de partida del modelado conceptual es el <b>análisis de requerimientos</b>: hay que entender qué información maneja la organización y qué reglas la gobiernan.\n\n• Cada entidad, atributo y relación debe responder a una necesidad real del negocio.\n• Los requerimientos nos ayudan a descubrir entidades que no siempre son evidentes.\n• Un modelo bien construido facilita el diseño de la base de datos relacional y reduce cambios futuros.", notes: "" },
          { id: "w9-t-12", type: "callout", calloutType: "info", title: "Privacidad y Protección de Datos", content: "Dentro del diseño de bases de datos es fundamental respetar los principios de <b>privacidad</b> y <b>protección de datos personales</b>: minimización de datos, finalidad, consentimiento y seguridad. La base de datos debe almacenar solo la información necesaria y protegerla según la normativa vigente.", notes: "" },
          { id: "w9-t-13", type: "text", title: "Teoría de Conjuntos y Diagramas de Venn", content: "La <b>teoría de conjuntos</b> y los <b>diagramas de Venn</b> son herramientas útiles para analizar relaciones entre entidades:\n\n• <span class='hl-blue font-bold'>Intersección</span>: elementos que pertenecen a dos conjuntos (entidades relacionadas).\n• <span class='hl-blue font-bold'>Unión</span>: todos los elementos de ambos conjuntos.\n• <span class='hl-blue font-bold'>Diferencia</span>: elementos de un conjunto que no están en el otro.\n\nEstas ideas ayudan a interpretar la cardinalidad y la opcionalidad antes de dibujar el ERD.", code: `-- Ejemplo textual de conjuntos aplicado a entidades
Conjunto CLIENTE = {Ana, Luis, Pedro}
Conjunto PEDIDO   = {P101, P102, P103}

Cliente Ana realizó los pedidos P101 y P102.
Cliente Luis realizó el pedido P103.
Cliente Pedro no tiene pedidos.

Interpretación:
- Ana y Luis están en la intersección (tienen pedidos).
- Pedro está en la diferencia (cliente sin pedidos).
- Esto representa una relación opcional del lado del cliente.`, language: "text", notes: "" },
          { id: "w9-t-14", type: "quiz", title: "Reto Rápido", question: "Una entidad A se relaciona con muchas entidades B, y una entidad B se relaciona con muchas entidades A. ¿Qué tipo de relación es?", options: ["1:1", "1:N", "N:M"], answer: "N:M", explanation: "Cuando ambos lados de la relación permiten múltiples instancias, la cardinalidad es muchos a muchos (N:M).", notes: "" },
          { id: "w9-t-15", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de pasar al Taller Práctico?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w9-w-1", type: "cover", title: "Creación de un Modelo Entidad-Relación Conceptual", subtitle: "Taller Práctico - Semana 09", notes: "" },
          { id: "w9-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Análisis de los requerimientos de un caso de negocio.", "Identificación de entidades y atributos principales.", "Definición de identificadores únicos para cada entidad.", "Establecimiento de relaciones entre entidades.", "Determinación de la opcionalidad de las relaciones.", "Construcción del diagrama entidad-relación conceptual.", "Revisión y validación del modelo respecto a los requerimientos del negocio.", "Comparación básica entre modelos relacionales y otros tipos de modelos de datos."], notes: "" },
          { id: "w9-w-3", type: "text", title: "Caso de Negocio", content: "Se requiere modelar la información de una <b>tienda en línea</b> que vende productos a sus clientes.\n\nLa tienda necesita registrar:\n\n• Los <span class='hl-cyan font-bold'>clientes</span> que realizan compras.\n• Los <span class='hl-cyan font-bold'>productos</span> disponibles para la venta.\n• Los <span class='hl-cyan font-bold'>pedidos</span> que los clientes realizan.\n• La <span class='hl-cyan font-bold'>fecha</span> y el <span class='hl-cyan font-bold'>estado</span> de cada pedido.\n\nA partir de este escenario identificaremos entidades, atributos, identificadores y relaciones para construir el modelo conceptual.", notes: "" },
          { id: "w9-w-4", type: "exercise", title: "Ejercicio 1", subtitle: "Identifica entidades y atributos", functionsToUse: ["Análisis de requerimientos", "Entidades", "Atributos", "UID"], content: "Analiza el caso de la tienda en línea y responde:\n\n1. ¿Qué entidades identificas?\n2. ¿Qué atributos tendría cada entidad?\n3. ¿Cuál sería el identificador único (UID) de cada entidad?", code: `Ejemplo parcial (solo una pista inicial):

ENTIDAD: ___________________
- Atributos: ___, ___, ___
- UID posible: _______________

Ahora completa tú mismo el resto:
// 1. Enumera cada entidad del caso
// 2. Escribe sus atributos
// 3. Marca el UID de cada una`, language: "text", notes: "" },
          { id: "w9-w-5", type: "exercise", title: "Ejercicio 2", subtitle: "Define relaciones y opcionalidad", functionsToUse: ["Cardinalidad", "Opcionalidad", "Diagrama ERD"], content: "Determina las relaciones entre las entidades del caso y especifica:\n\n1. Cardinalidad (1:1, 1:N o N:M).\n2. Opcionalidad de cada lado de la relación.\n3. Ejemplos de reglas de negocio que justifiquen tu respuesta.", code: `Plantilla para completar:

ENTIDAD_A (?) ---- relacion ---- (?) ENTIDAD_B
ENTIDAD_B (?) ---- relacion ---- (?) ENTIDAD_C

Preguntas guía:
// ¿Un cliente puede existir sin pedidos?
// ¿Un pedido puede existir sin productos?
// ¿Un producto puede existir sin estar en un pedido?

// Escribe la cardinalidad y opcionalidad de cada relación`, language: "text", notes: "" },
          { id: "w9-w-5b", type: "quiz", title: "Cardinalidad del caso", question: "En el caso de la tienda, un <b>PEDIDO</b> puede incluir varios <b>PRODUCTOS</b>, y un <b>PRODUCTO</b> puede aparecer en varios pedidos. ¿Qué relación existe?", options: ["1:1", "1:N", "N:M"], answer: "N:M", explanation: "Cuando ambos lados permiten múltiples instancias, se trata de una relación muchos a muchos (N:M).", notes: "" },
          { id: "w9-w-6", type: "callout", calloutType: "info", title: "Construcción del ERD", content: "Representa gráficamente el modelo conceptual utilizando los símbolos del diagrama entidad-relación:\n\n• <span class='hl-badge'>Rectángulos</span> para las entidades.\n• <span class='hl-badge'>Óvalos</span> para los atributos.\n• <span class='hl-badge'>Líneas</span> para las relaciones, indicando cardinalidad y opcionalidad.\n• <span class='hl-badge'>Subrayado</span> o marcado especial para los identificadores únicos.", notes: "" },
          { id: "w9-w-7", type: "exercise", title: "Ejercicio 3", subtitle: "Dibuja el ERD conceptual", functionsToUse: ["Diagrama ERD", "Entidades", "Relaciones", "UID"], content: "Dibuja el diagrama entidad-relación conceptual completo del caso de la tienda en línea. Asegúrate de incluir:\n\n1. Todas las entidades identificadas.\n2. Sus atributos y UID.\n3. Las relaciones con cardinalidad y opcionalidad.\n4. Una nota breve que justifique cada relación.", code: `Pasos sugeridos (no es la solución final):

// 1. Dibuja un rectángulo para cada entidad
// 2. Escribe sus atributos alrededor
// 3. Marca el UID de cada entidad
// 4. Conecta las entidades con líneas
// 5. Anota la cardinalidad y opcionalidad
// 6. Revisa que cada relación tenga sentido de negocio

Herramientas: papel, pizarra o draw.io / diagrams.net`, language: "text", notes: "" },
          { id: "w9-w-8", type: "text", title: "Validación del Modelo", content: "Antes de considerar terminado el modelo, revisa lo siguiente:\n\n• Cada entidad, atributo y relación responde a un requerimiento del caso de negocio.\n• Los identificadores únicos son realmente únicos e inmutables.\n• Las cardinalidades reflejan las reglas de negocio reales.\n• La opcionalidad está correctamente representada.\n• No existen atributos redundantes ni entidades innecesarias.", notes: "" },
          { id: "w9-w-9", type: "callout", calloutType: "warning", title: "HT-01: Modelo Entidad-Relación Conceptual", content: "Desarrolla el <b>modelo entidad-relación conceptual</b> del caso propuesto y entrégalo en la plataforma. Incluye el diagrama ERD con entidades, atributos, identificadores únicos, relaciones, cardinalidad y opcionalidad.", notes: "" },
          { id: "w9-w-10", type: "closing", title: "Fin del Taller", subtitle: "IMPORTANTE: Sube tu diagrama a la plataforma y comparte el enlace si usas una herramienta en línea.", notes: "" }
        ]
      }
    }
  ]
};
