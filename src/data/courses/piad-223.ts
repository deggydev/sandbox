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
          { id: "w9-t-10", type: "text", title: "Simbología del Modelo Conceptual", content: "El <b>diagrama entidad-relación</b> representa gráficamente el modelo conceptual sin tipos de datos ni detalles técnicos:\n\n• <span class='hl-cyan font-bold'>Rectángulo</span>: entidad.\n• <span class='hl-purple font-bold'>Óvalo</span>: atributo.\n• <span class='hl-amber font-bold'>Rombo</span>: relación.\n• <span class='hl-emerald font-bold'>Líneas y cardinalidades</span>: participación entre entidades.", code: `SÍMBOLOS BÁSICOS

Entidad             Atributo             Relación
+-------------+       .---------.          /-----------\\
|   CLIENTE   |      (  Nombre   )        <   REALIZA   >
+-------------+       '---------'          \\-----------/
  Rectángulo            Óvalo                 Rombo

EJEMPLO CONCEPTUAL COMPLETO

                      .-------------.
                     (    Nombre     )
                      '------+------'
                             |
.---------------.      +-----+------+       /-----------\\
( IdCliente UID )------|  CLIENTE   |--1---<   REALIZA   >---N--+
'---------------'      +------------+       \\-----------/      |
                                                               +--+-------+
                      .-------------.                         |  PEDIDO  |
                     (   Correo      )                         +----------+
                      '-------------'                               |
                                                        .----------+----------.
                                                       ( Fecha            Estado )
                                                        '---------------------'

Lectura: un CLIENTE realiza muchos PEDIDOS.
Aquí solo interesa QUÉ existe y CÓMO se relaciona.`, language: "text", notes: "" },
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
          { id: "w9-w-6", type: "callout", calloutType: "info", title: "Construcción del ERD", content: "Representa el modelo conceptual usando <span class='hl-badge'>rectángulos</span> para entidades, <span class='hl-badge'>óvalos</span> para atributos, <span class='hl-badge'>rombos</span> para relaciones y líneas para cardinalidad y opcionalidad.", code: `Plantilla conceptual para completar:

  .---------.       +-----------+       /-----------\\       +----------+
 ( ________ )------|  CLIENTE  |--?---<  _________  >--?---|  PEDIDO  |
  '---------'       +-----------+       \\-----------/       +----------+
                         |                                      |
                    .----+----.                            .----+----.
                   ( ________ )                          ( ________ )
                    '---------'                            '--------'

// Completa los atributos dentro de los óvalos
// Escribe el verbo de la relación dentro del rombo
// Indica la cardinalidad en ambos extremos`, language: "text", notes: "" },
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
    },
    {
      id: "week-10",
      number: 10,
      title: "Semana 10",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp10-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp10-t-1a", type: "title", title: "Tareas", content: "HT-02 Normaliza el modelo de datos relacional", notes: "" },
            { id: "sp10-t-1b", type: "text", title: "Semana 10", content: "Refinamiento y normalización del modelo de datos.\n\nDurante esta semana el estudiante comprenderá el proceso de refinamiento de un modelo de datos relacional mediante la aplicación de reglas de negocio y técnicas de normalización. Se estudiará la redundancia de datos y sus efectos, así como la primera, segunda y tercera forma normal. También se abordará la importancia de documentar los cambios realizados en el modelo y mantener la trazabilidad de las modificaciones efectuadas.", notes: "" },
            { id: "sp10-t-2", type: "title", title: "Objetivo General", content: "Comprender el proceso de normalización y refinamiento de un modelo de datos relacional mediante la aplicación de reglas de negocio, formas normales y criterios de integridad de la información.", notes: "" },
            { id: "sp10-t-3", type: "text", title: "Objetivos Específicos", content: "• Identificar reglas de negocio y problemas de redundancia presentes en un modelo relacional.\n• Comprender la aplicación de la primera, segunda y tercera forma normal.\n• Reconocer la importancia de la trazabilidad y documentación de cambios en el modelo.\n• Valorar la integridad y veracidad de la información durante el proceso de normalización.", notes: "" },
            { id: "sp10-t-4", type: "text", title: "Temas Teóricos a Tratar", content: "• Reglas de negocio y restricciones en el modelo de datos.\n• Redundancia de datos y sus efectos.\n• Primera forma normal 1FN.\n• Segunda forma normal 2FN.\n• Tercera forma normal 3FN.\n• Refinamiento del modelo relacional.\n• Trazabilidad y seguimiento de cambios en la data.\n• Integridad y veracidad de la información.\n• Lógica proposicional aplicada a reglas de negocio.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp10-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp10-w-1a", type: "title", title: "Tareas", content: "HT-02 Normaliza el modelo de datos relacional", notes: "" },
            { id: "sp10-w-1b", type: "text", title: "Semana 10", content: "Aplicación de formas normales en un modelo relacional.\n\nEl estudiante analizará un modelo relacional para identificar redundancias, inconsistencias y reglas de negocio que deban ser consideradas. Posteriormente aplicará la primera, segunda y tercera forma normal para mejorar la estructura de las tablas. Finalmente, documentará los cambios efectuados y validará que el modelo resultante mantenga la integridad y coherencia de la información.", notes: "" },
            { id: "sp10-w-2", type: "title", title: "Objetivo General", content: "Aplicar técnicas de normalización sobre un modelo de datos relacional para reducir redundancias, mejorar su estructura y mantener la integridad de la información.", notes: "" },
            { id: "sp10-w-3", type: "text", title: "Objetivos Específicos", content: "• Identificar redundancias y dependencias dentro de un modelo de datos.\n• Aplicar 1FN, 2FN y 3FN en tablas relacionales.\n• Validar las reglas de negocio después del proceso de normalización.\n• Documentar los cambios realizados durante el refinamiento del modelo.", notes: "" },
            { id: "sp10-w-4", type: "text", title: "Prácticas y Actividades", content: "• Análisis de un modelo relacional con problemas de redundancia.\n• Identificación de reglas de negocio y restricciones.\n• Aplicación de la primera forma normal 1FN.\n• Aplicación de la segunda forma normal 2FN.\n• Aplicación de la tercera forma normal 3FN.\n• Comparación entre el modelo inicial y el modelo normalizado.\n• Documentación de cambios y refinamientos realizados.\n• Práctica de normalización aplicada a una base de datos de ventas.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w10-t-1", type: "cover", title: "Normalización y Refinamiento del Modelo Relacional", subtitle: "Conocimiento Teórico - Semana 10", notes: "" },
          { id: "w10-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Reglas de negocio y restricciones del modelo de datos.", "Redundancia de datos y sus efectos.", "Primera forma normal (1FN).", "Segunda forma normal (2FN).", "Tercera forma normal (3FN).", "Refinamiento del modelo relacional.", "Trazabilidad y documentación de cambios.", "Integridad y veracidad de la información.", "Lógica proposicional aplicada a reglas de negocio."], notes: "" },
          { id: "w10-t-3", type: "callout", calloutType: "tip", title: "¿Por qué normalizar?", content: "La <span class='hl-callout'>normalización</span> permite refinar un modelo relacional para reducir redundancias, evitar inconsistencias y conservar la integridad de la información. El proceso debe respetar las reglas de negocio y dejar evidencia de cada modificación realizada.", notes: "" },
          { id: "w10-t-4", type: "text", title: "Del Modelo Conceptual al Modelo Lógico", content: "El <b>modelo lógico</b> organiza las entidades como tablas y los atributos como campos, manteniendo las relaciones y cardinalidades. Sigue siendo independiente de Oracle: todavía no define VARCHAR2, NUMBER, tamaños, índices ni detalles de almacenamiento.\n\nLas reglas de negocio permiten decidir cómo organizar estas tablas y relaciones.", code: `MODELO LÓGICO — SIN DETALLES TÉCNICOS

+------------------+             +------------------+
| CLIENTE          | 1         N | PEDIDO           |
+------------------+-------------+------------------+
| IdCliente        |   realiza   | IdPedido         |
| Nombre           |             | Fecha            |
| Correo           |             | Estado           |
+------------------+             | IdCliente        |
                                 +------------------+

RELACIÓN MUCHOS A MUCHOS (N:M)

+-------------+  N             M  +-------------+
| PEDIDO      |-------------------| PRODUCTO    |
+-------------+      contiene     +-------------+
| IdPedido    |                   | IdProducto  |
| Fecha       |                   | Nombre      |
+-------------+                   | Precio      |
                                  +-------------+

En el modelo lógico vemos:
✓ tablas, atributos y relaciones
✓ cardinalidades 1:1, 1:N y N:M

Todavía NO vemos:
✗ VARCHAR2, NUMBER, DATE ni tamaños
✗ sintaxis de Oracle ni almacenamiento físico`, language: "text", notes: "" },
          { id: "w10-t-5", type: "text", title: "Redundancia de Datos", content: "La <b>redundancia</b> aparece cuando un mismo dato se almacena repetidamente. Esto puede producir inconsistencias, dificultar las modificaciones y afectar la veracidad de la información.\n\nEl refinamiento busca separar la información de acuerdo con sus dependencias, sin perder las relaciones necesarias.", code: `MODELO CON REDUNDANCIA
+--------+----------+------------+----------+
| Venta  | Cliente  | Teléfono   | Producto |
+--------+----------+------------+----------+
| V-01   | Ana      | 999-111    | Teclado  |
| V-02   | Ana      | 999-111    | Monitor  |
| V-03   | Ana      | 999-111    | Mouse    |
+--------+----------+------------+----------+

Dato repetido: Cliente y Teléfono
Riesgo: modificar una fila y olvidar las demás`, language: "text", notes: "" },
          { id: "w10-t-6", type: "text", title: "Primera Forma Normal — 1FN", content: "Una tabla cumple la <b>primera forma normal</b> cuando sus datos están organizados de manera que cada campo contiene un único valor. No deben existir grupos repetidos ni varios valores dentro de una misma celda.", code: `ANTES DE 1FN: una celda contiene varios productos
+--------+---------+--------------------------+------------+
| Venta  | Cliente | Productos                | Cantidades |
+--------+---------+--------------------------+------------+
| V-01   | Ana     | Teclado, Monitor, Mouse  | 1, 2, 1    |
| V-02   | Luis    | Laptop, Mouse            | 1, 3       |
| V-03   | Rosa    | Monitor, Teclado         | 2, 2       |
+--------+---------+--------------------------+------------+

DESPUÉS DE APLICAR 1FN: un valor por cada campo
+--------+---------+----------+----------+
| Venta  | Cliente | Producto | Cantidad |
+--------+---------+----------+----------+
| V-01   | Ana     | Teclado  | 1        |
| V-01   | Ana     | Monitor  | 2        |
| V-01   | Ana     | Mouse    | 1        |
| V-02   | Luis    | Laptop   | 1        |
| V-02   | Luis    | Mouse    | 3        |
| V-03   | Rosa    | Monitor  | 2        |
| V-03   | Rosa    | Teclado  | 2        |
+--------+---------+----------+----------+

Resultado: no existen listas dentro de una celda.`, language: "text", notes: "" },
          { id: "w10-t-7", type: "quiz", title: "Comprueba la 1FN", question: "Una columna denominada <b>Teléfonos</b> contiene el valor «999-111, 999-222». ¿Qué problema presenta?", options: ["No tiene identificador", "Contiene más de un valor", "Tiene demasiadas filas", "No presenta ningún problema"], answer: "Contiene más de un valor", explanation: "Para cumplir 1FN, cada campo debe contener un único valor; la lista de teléfonos debe refinarse.", notes: "" },
          { id: "w10-t-8", type: "text", title: "Segunda Forma Normal — 2FN", content: "La <b>segunda forma normal</b> refina las tablas que ya cumplen 1FN. Busca que la información dependa completamente del identificador correspondiente y evita dependencias parciales dentro del modelo.", code: `ANTES DE 2FN: UID compuesto = IdVenta + IdProducto
+---------+------------+----------------+--------+----------+
| IdVenta | IdProducto | NombreProducto | Precio | Cantidad |
+---------+------------+----------------+--------+----------+
| V-01    | P-01       | Teclado        | 80.00  | 1        |
| V-01    | P-02       | Monitor        | 650.00 | 2        |
| V-02    | P-01       | Teclado        | 80.00  | 3        |
| V-02    | P-03       | Mouse          | 45.00  | 1        |
| V-03    | P-02       | Monitor        | 650.00 | 1        |
+---------+------------+----------------+--------+----------+

Dependencias:
(IdVenta + IdProducto) ---> Cantidad
IdProducto -------------> NombreProducto, Precio

DESPUÉS DE 2FN
PRODUCTO
+------------+----------------+--------+
| IdProducto | NombreProducto | Precio |
+------------+----------------+--------+
| P-01       | Teclado        | 80.00  |
| P-02       | Monitor        | 650.00 |
| P-03       | Mouse          | 45.00  |
+------------+----------------+--------+

DETALLE_VENTA
+---------+------------+----------+
| IdVenta | IdProducto | Cantidad |
+---------+------------+----------+
| V-01    | P-01       | 1        |
| V-01    | P-02       | 2        |
| V-02    | P-01       | 3        |
| V-02    | P-03       | 1        |
| V-03    | P-02       | 1        |
+---------+------------+----------+

Resultado: cada atributo depende de todo su identificador.`, language: "text", notes: "" },
          { id: "w10-t-9", type: "text", title: "Tercera Forma Normal — 3FN", content: "La <b>tercera forma normal</b> parte de un modelo que ya cumple 2FN. Su propósito es evitar dependencias entre datos que no corresponden directamente al identificador principal de la tabla.", code: `ANTES DE 3FN
+-----------+---------+----------+--------------+
| IdCliente | Nombre  | Distrito | CódigoPostal |
+-----------+---------+----------+--------------+
| C-01      | Ana     | Centro   | 15001        |
| C-02      | Luis    | Norte    | 15301        |
| C-03      | Rosa    | Centro   | 15001        |
| C-04      | Pedro   | Sur      | 15801        |
| C-05      | María   | Norte    | 15301        |
+-----------+---------+----------+--------------+

Dependencia transitiva:
IdCliente ---> Distrito ---> CódigoPostal

CódigoPostal no depende directamente de IdCliente;
depende del Distrito. Además, ambos datos se repiten.

DESPUÉS DE 3FN
CLIENTE
+-----------+---------+------------+
| IdCliente | Nombre  | IdDistrito |
+-----------+---------+------------+
| C-01      | Ana     | D-01       |
| C-02      | Luis    | D-02       |
| C-03      | Rosa    | D-01       |
| C-04      | Pedro   | D-03       |
| C-05      | María   | D-02       |
+-----------+---------+------------+

DISTRITO
+------------+----------+--------------+
| IdDistrito | Distrito | CódigoPostal |
+------------+----------+--------------+
| D-01       | Centro   | 15001        |
| D-02       | Norte    | 15301        |
| D-03       | Sur      | 15801        |
+------------+----------+--------------+

Resultado: los atributos no identificadores dependen
únicamente del identificador de su propia tabla.`, language: "text", notes: "" },
          { id: "w10-t-10", type: "quiz", title: "Identifica la Forma Normal", question: "Si una tabla ya cumple 1FN, pero un atributo depende solo de una parte de su identificador compuesto, ¿qué forma normal debe aplicarse?", options: ["1FN", "2FN", "3FN", "Ninguna"], answer: "2FN", explanation: "La 2FN busca eliminar dependencias parciales y exige que los atributos dependan completamente del identificador.", notes: "" },
          { id: "w10-t-11", type: "callout", calloutType: "info", title: "Trazabilidad e Integridad", content: "Cada refinamiento debe quedar <span class='hl-callout'>documentado</span>: problema detectado, regla aplicada, tablas modificadas y resultado obtenido. La trazabilidad permite seguir los cambios y comprobar que el modelo conserva la <span class='hl-callout'>integridad</span> y la <span class='hl-callout'>veracidad</span> de la información.", notes: "" },
          { id: "w10-t-12", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de aplicar 1FN, 2FN y 3FN en el taller?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w10-w-1", type: "cover", title: "Aplicación de Formas Normales", subtitle: "Taller Práctico - Semana 10", notes: "" },
          { id: "w10-w-2", type: "interactive-list", title: "Ruta del Taller", items: ["Analizar un modelo de ventas con redundancia.", "Identificar reglas de negocio y restricciones.", "Aplicar la primera forma normal (1FN).", "Aplicar la segunda forma normal (2FN).", "Aplicar la tercera forma normal (3FN).", "Comparar el modelo inicial con el modelo normalizado.", "Documentar los cambios realizados.", "Validar la integridad y coherencia del resultado."], notes: "" },
          { id: "w10-w-3", type: "exercise", title: "Caso Inicial", subtitle: "Base de datos de ventas", functionsToUse: ["Redundancia", "Dependencias", "Reglas de negocio"], content: "Analiza el siguiente modelo relacional. Identifica datos repetidos, campos con varios valores y dependencias que deban revisarse.", code: `VENTA
+-------+---------+----------+-------------------+-----------+
| Id    | Cliente | Distrito | Productos         | Vendedor  |
+-------+---------+----------+-------------------+-----------+
| V-01  | Ana     | Centro   | P-01, P-02        | Luis      |
| V-02  | Ana     | Centro   | P-03              | Marta     |
| V-03  | Pedro   | Norte    | P-01, P-04        | Luis      |
+-------+---------+----------+-------------------+-----------+

// 1. Marca los datos redundantes
// 2. Identifica los campos no atómicos
// 3. Anota las dependencias observadas`, language: "text", notes: "" },
          { id: "w10-w-4", type: "exercise", title: "Paso 1", subtitle: "Aplicación de 1FN", functionsToUse: ["Valores atómicos", "Filas", "Identificador"], content: "Observa la tabla que todavía no cumple 1FN. Construye la tabla posterior separando los valores múltiples para que cada campo contenga un solo valor. No resuelvas todavía 2FN ni 3FN.", code: `ANTES DE 1FN
+-------+---------+-------------+------------+
| Venta | Cliente | Productos   | Cantidades |
+-------+---------+-------------+------------+
| V-01  | Ana     | P-01, P-02  | 1, 2       |
| V-02  | Luis    | P-01, P-03  | 3, 1       |
| V-03  | Rosa    | P-02, P-04  | 1, 2       |
+-------+---------+-------------+------------+

EJERCICIO — DESPUÉS DE 1FN
+-------+---------+----------+----------+
| Venta | Cliente | Producto | Cantidad |
+-------+---------+----------+----------+
| V-01  | Ana     | P-01     | 1        |
| V-01  | Ana     | ______   | ______   |
| V-02  | ______  | ______   | ______   |
| V-02  | ______  | ______   | ______   |
| V-03  | ______  | ______   | ______   |
| V-03  | ______  | ______   | ______   |
+-------+---------+----------+----------+

// Completa la tabla posterior
// Cada celda debe contener un solo valor`, language: "text", notes: "" },
          { id: "w10-w-5", type: "quiz", title: "Control de 1FN", question: "Después de separar «P-01, P-02» en filas distintas, ¿qué criterio de 1FN se está cumpliendo?", options: ["Eliminar identificadores", "Mantener valores atómicos", "Crear datos repetidos", "Eliminar reglas de negocio"], answer: "Mantener valores atómicos", explanation: "1FN requiere que cada campo contenga un solo valor, sin listas ni grupos repetidos.", notes: "" },
          { id: "w10-w-6", type: "exercise", title: "Paso 2", subtitle: "Aplicación de 2FN", functionsToUse: ["Dependencia completa", "UID", "Separación de tablas"], content: "La tabla inicial ya cumple 1FN, pero conserva dependencias parciales. Identifica qué atributos dependen solo de IdProducto y completa las tablas posteriores para alcanzar 2FN.", code: `ANTES DE 2FN — UID: IdVenta + IdProducto
+---------+------------+----------------+--------+----------+
| IdVenta | IdProducto | NombreProducto | Precio | Cantidad |
+---------+------------+----------------+--------+----------+
| V-01    | P-01       | Teclado        | 80.00  | 1        |
| V-01    | P-02       | Monitor        | 650.00 | 2        |
| V-02    | P-01       | Teclado        | 80.00  | 3        |
| V-02    | P-03       | Mouse          | 45.00  | 1        |
+---------+------------+----------------+--------+----------+

EJERCICIO — DESPUÉS DE 2FN
PRODUCTO
+------------+----------------+--------+
| IdProducto | NombreProducto | Precio |
+------------+----------------+--------+
| P-01       | Teclado        | 80.00  |
| P-02       | ____________   | ______ |
| P-03       | ____________   | ______ |
+------------+----------------+--------+

DETALLE_VENTA
+---------+------------+----------+
| IdVenta | IdProducto | Cantidad |
+---------+------------+----------+
| V-01    | P-01       | 1        |
| ______  | ______     | ______   |
| ______  | ______     | ______   |
| ______  | ______     | ______   |
+---------+------------+----------+

// Completa ambas tablas
// Justifica de qué identificador depende cada atributo`, language: "text", notes: "" },
          { id: "w10-w-7", type: "exercise", title: "Paso 3", subtitle: "Aplicación de 3FN", functionsToUse: ["Dependencia transitiva", "Refinamiento", "Integridad"], content: "La tabla inicial ya cumple 2FN, pero contiene una dependencia transitiva. Analiza la relación IdCliente → Distrito → CódigoPostal y completa las tablas posteriores para alcanzar 3FN.", code: `ANTES DE 3FN
+-----------+---------+----------+--------------+
| IdCliente | Nombre  | Distrito | CódigoPostal |
+-----------+---------+----------+--------------+
| C-01      | Ana     | Centro   | 15001        |
| C-02      | Luis    | Norte    | 15301        |
| C-03      | Rosa    | Centro   | 15001        |
| C-04      | Pedro   | Sur      | 15801        |
+-----------+---------+----------+--------------+

EJERCICIO — DESPUÉS DE 3FN
CLIENTE
+-----------+---------+------------+
| IdCliente | Nombre  | IdDistrito |
+-----------+---------+------------+
| C-01      | Ana     | D-01       |
| C-02      | ______  | ______     |
| C-03      | ______  | ______     |
| C-04      | ______  | ______     |
+-----------+---------+------------+

DISTRITO
+------------+----------+--------------+
| IdDistrito | Distrito | CódigoPostal |
+------------+----------+--------------+
| D-01       | Centro   | 15001        |
| D-02       | ______   | ______       |
| D-03       | ______   | ______       |
+------------+----------+--------------+

// Completa las dos tablas
// Explica qué redundancia se eliminó
// Comprueba que no se pierda información`, language: "text", notes: "" },
          { id: "w10-w-8", type: "exercise", title: "Comparación del Modelo", subtitle: "Antes y después de normalizar", functionsToUse: ["Modelo inicial", "Modelo normalizado", "Reglas de negocio"], content: "Compara ambos modelos y registra qué problemas fueron corregidos en cada etapa.", code: `MODELO INICIAL          MODELO NORMALIZADO
---------------         ------------------
1 tabla                 ____ tablas
Datos repetidos         __________________
Campos múltiples        __________________
Dependencias            __________________

1FN corrigió: _____________________________
2FN corrigió: _____________________________
3FN corrigió: _____________________________`, language: "text", notes: "" },
          { id: "w10-w-9", type: "callout", calloutType: "warning", title: "HT-02: Normaliza el Modelo Relacional", content: "Normaliza el modelo de datos de ventas aplicando <span class='hl-callout'>1FN</span>, <span class='hl-callout'>2FN</span> y <span class='hl-callout'>3FN</span>. Documenta el problema identificado, el cambio realizado y la regla de negocio preservada en cada etapa. Finalmente, valida la integridad y coherencia del modelo resultante.", notes: "" },
          { id: "w10-w-10", type: "closing", title: "Fin del Taller", subtitle: "Entrega el modelo inicial, cada etapa de normalización y la documentación de cambios.", notes: "" }
        ]
      }
    },
    {
      id: "week-11",
      number: 11,
      title: "Semana 11",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp11-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp11-t-1a", type: "title", title: "Tareas", content: "HT-03 Transforma modelo lógico a relacional", notes: "" },
            { id: "sp11-t-1b", type: "text", title: "Semana 11", content: "Transformación del modelo lógico al modelo relacional.\n\nDurante esta semana el estudiante comprenderá el proceso de transformación de un modelo lógico hacia un modelo relacional utilizando Oracle SQL Developer Data Modeler. Se estudiará la interfaz de la herramienta, los procesos de ingeniería directa e inversa, el mapeo de entidades a tablas y de atributos a columnas, así como la definición de claves primarias y foráneas para garantizar la integridad referencial.", notes: "" },
            { id: "sp11-t-2", type: "title", title: "Objetivo General", content: "Comprender el proceso de transformación de un modelo lógico a un modelo relacional mediante Oracle SQL Developer Data Modeler, aplicando criterios de mapeo e integridad referencial.", notes: "" },
            { id: "sp11-t-3", type: "text", title: "Objetivos Específicos", content: "• Identificar las principales funciones de Oracle SQL Developer Data Modeler.\n• Comprender el proceso de transformación de entidades y atributos hacia tablas y columnas.\n• Reconocer la aplicación de claves primarias y foráneas en el modelo relacional.\n• Comprender los procesos de ingeniería directa e inversa dentro de la herramienta.", notes: "" },
            { id: "sp11-t-4", type: "text", title: "Temas Teóricos a Tratar", content: "• Interfaz de Oracle SQL Developer Data Modeler.\n• Procesos de ingeniería directa e inversa.\n• Transformación de entidades a tablas.\n• Mapeo de atributos a columnas y tipos de datos.\n• Integridad referencial mediante PK y FK.\n• Álgebra relacional básica.\n• Simbología técnica utilizada en diagramas de arquitectura de datos.\n• Respeto a la propiedad intelectual del software.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp11-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp11-w-1a", type: "title", title: "Tareas", content: "HT-03 Transforma modelo lógico a relacional", notes: "" },
            { id: "sp11-w-1b", type: "text", title: "Semana 11", content: "Transformación y generación del modelo relacional.\n\nEl estudiante configurará Oracle SQL Developer Data Modeler e importará un modelo lógico previamente elaborado. A partir de este modelo, realizará la transformación hacia un modelo relacional, mapeará entidades y atributos, establecerá claves primarias y foráneas y generará el esquema físico de la base de datos. También se revisará la correcta representación técnica del modelo resultante.", notes: "" },
            { id: "sp11-w-2", type: "title", title: "Objetivo General", content: "Aplicar Oracle SQL Developer Data Modeler para transformar un modelo lógico en un modelo relacional correctamente estructurado y preparado para su posterior implementación.", notes: "" },
            { id: "sp11-w-3", type: "text", title: "Objetivos Específicos", content: "• Importar y revisar un modelo lógico en Oracle SQL Developer Data Modeler.\n• Transformar entidades y atributos en tablas y columnas.\n• Configurar claves primarias y foráneas en el modelo relacional.\n• Generar y revisar el esquema físico resultante.", notes: "" },
            { id: "sp11-w-4", type: "text", title: "Prácticas y Actividades", content: "• Configuración inicial de Oracle SQL Developer Data Modeler.\n• Importación de un modelo lógico existente.\n• Ejecución del proceso de ingeniería directa.\n• Transformación de entidades en tablas relacionales.\n• Mapeo de atributos a columnas y tipos de datos.\n• Asignación de claves primarias y claves foráneas.\n• Validación de la integridad referencial del modelo.\n• Generación del esquema físico de la base de datos.\n• Revisión técnica del diagrama relacional generado.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w11-t-1", type: "cover", title: "Del Modelo Lógico al Modelo Relacional", subtitle: "Conocimiento Teórico - Semana 11", notes: "" },
          { id: "w11-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Interfaz de Oracle SQL Developer Data Modeler.", "Ingeniería directa e ingeniería inversa.", "Transformación de entidades en tablas.", "Mapeo de atributos a columnas y tipos de datos.", "Claves primarias y claves foráneas.", "Integridad referencial.", "Álgebra relacional básica.", "Simbología técnica y propiedad intelectual del software."], notes: "" },
          { id: "w11-t-3", type: "callout", calloutType: "tip", title: "Transformar sin perder significado", content: "La transformación debe conservar las <span class='hl-callout'>entidades</span>, los <span class='hl-callout'>atributos</span> y las <span class='hl-callout'>relaciones</span> del modelo lógico, expresándolos mediante tablas, columnas, claves primarias y claves foráneas en el modelo relacional.", notes: "" },
          { id: "w11-t-4", type: "text", title: "Oracle SQL Developer Data Modeler", content: "Oracle SQL Developer Data Modeler permite trabajar con modelos lógicos, relacionales y físicos. Su interfaz facilita visualizar los diagramas, revisar propiedades y ejecutar procesos de transformación entre modelos.", code: `ORACLE SQL DEVELOPER DATA MODELER
+---------------------------------------+
| Navegador de diseños                  |
|  ├─ Modelo lógico                     |
|  ├─ Modelos relacionales              |
|  └─ Modelos físicos                   |
+---------------------------------------+
| Área de diagrama                      |
|  Entidades / Tablas / Relaciones      |
+---------------------------------------+
| Propiedades del elemento seleccionado |
+---------------------------------------+`, language: "text", notes: "" },
          { id: "w11-t-5", type: "text", title: "Ingeniería Directa e Inversa", content: "La <b>ingeniería directa</b> transforma un modelo diseñado hacia una estructura preparada para su implementación. La <b>ingeniería inversa</b> parte de una estructura existente para recuperar y analizar su modelo.", code: `INGENIERÍA DIRECTA
[Modelo lógico] ---> [Modelo relacional] ---> [Esquema físico]

INGENIERÍA INVERSA
[Esquema existente] ---> [Modelo relacional] ---> [Revisión]

Directa: diseño hacia implementación
Inversa: implementación hacia representación`, language: "text", notes: "" },
          { id: "w11-t-6", type: "text", title: "Entidades a Tablas", content: "Durante la transformación, cada entidad relevante del modelo lógico se representa como una tabla en el modelo relacional. La tabla conserva la identidad y la información definida para la entidad.", code: `MODELO LÓGICO                 MODELO RELACIONAL
+----------------+             +----------------+
| ENTIDAD        |             | TABLA          |
| CLIENTE        | ----------> | CLIENTE        |
+----------------+             +----------------+

+----------------+             +----------------+
| ENTIDAD        |             | TABLA          |
| PEDIDO         | ----------> | PEDIDO         |
+----------------+             +----------------+`, language: "text", notes: "" },
          { id: "w11-t-7", type: "text", title: "Del Modelo Lógico al Modelo Físico", content: "El <b>modelo físico</b> toma las tablas y atributos del modelo lógico y agrega las especificaciones necesarias para implementarlos en Oracle: nombres técnicos, tipos de datos, tamaños y restricciones.", code: `MODELO LÓGICO                 MODELO FÍSICO EN ORACLE
(sin detalles técnicos)       (listo para implementar)

+------------------+           +-------------------------------+
| CLIENTE          |           | CLIENTE                       |
+------------------+           +-------------------------------+
| IdCliente        |  ------>  | ID_CLIENTE NUMBER PK          |
| Nombre           |  ------>  | NOMBRE VARCHAR2(80) NOT NULL |
| Correo           |  ------>  | CORREO VARCHAR2(120) UNIQUE  |
| FechaRegistro    |  ------>  | FECHA_REGISTRO DATE          |
+------------------+           +-------------------------------+

+------------------+           +-------------------------------+
| PEDIDO           |           | PEDIDO                        |
+------------------+           +-------------------------------+
| IdPedido         |  ------>  | ID_PEDIDO NUMBER PK           |
| Fecha            |  ------>  | FECHA DATE NOT NULL           |
| Estado           |  ------>  | ESTADO VARCHAR2(20)           |
| IdCliente        |  ------>  | ID_CLIENTE NUMBER FK          |
+------------------+           +-------------------------------+

El modelo físico sí contiene:
✓ NUMBER, VARCHAR2 y DATE
✓ tamaños como VARCHAR2(80)
✓ PK, FK, NOT NULL y UNIQUE
✓ especificaciones propias de Oracle`, language: "text", notes: "" },
          { id: "w11-t-8", type: "text", title: "Claves Primarias y Foráneas", content: "La <b>clave primaria (PK)</b> identifica de forma única cada fila. La <b>clave foránea (FK)</b> conecta una tabla con la clave primaria de otra tabla y permite representar las relaciones del modelo.", code: `CLIENTE                         PEDIDO
+---------------------+         +---------------------+
| ID_CLIENTE (PK)     |<--------| ID_CLIENTE (FK)     |
| NOMBRE              |    1:N  | ID_PEDIDO (PK)      |
| CORREO              |         | FECHA               |
+---------------------+         +---------------------+

PK: identifica una fila
FK: referencia la PK de otra tabla`, language: "text", notes: "" },
          { id: "w11-t-9", type: "quiz", title: "Comprueba el Mapeo", question: "¿Qué elemento del modelo relacional representa una relación entre CLIENTE y PEDIDO?", options: ["Una columna sin tipo", "Una clave foránea", "El nombre del diagrama", "Una tabla sin clave"], answer: "Una clave foránea", explanation: "La FK en PEDIDO referencia la PK de CLIENTE y mantiene la relación entre ambas tablas.", notes: "" },
          { id: "w11-t-10", type: "text", title: "Integridad Referencial", content: "La integridad referencial asegura que una clave foránea apunte a una fila válida de la tabla relacionada. Esto mantiene la coherencia técnica de las relaciones durante la transformación.", code: `REGLA DE INTEGRIDAD

PEDIDO.ID_CLIENTE (FK)
          |
          v
CLIENTE.ID_CLIENTE (PK)

SI el cliente existe  ---> relación válida
SI el cliente no existe ---> se incumple la integridad`, language: "text", notes: "" },
          { id: "w11-t-11", type: "callout", calloutType: "info", title: "Álgebra, Simbología y Propiedad Intelectual", content: "El <span class='hl-callout'>álgebra relacional</span> aporta operaciones básicas para comprender el tratamiento de las relaciones. La <span class='hl-callout'>simbología técnica</span> comunica tablas, claves y vínculos en los diagramas. Durante el uso de la herramienta también debe respetarse la propiedad intelectual y las condiciones de uso del software.", notes: "" },
          { id: "w11-t-12", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de transformar el modelo en Oracle SQL Developer Data Modeler?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w11-w-1", type: "cover", title: "Transformación y Generación del Modelo Relacional", subtitle: "Taller Práctico - Semana 11", notes: "" },
          { id: "w11-w-2", type: "interactive-list", title: "Ruta del Taller", items: ["Configurar Oracle SQL Developer Data Modeler.", "Importar y revisar el modelo lógico.", "Ejecutar la ingeniería directa.", "Transformar entidades en tablas.", "Mapear atributos a columnas y tipos de datos.", "Asignar claves primarias y foráneas.", "Validar la integridad referencial.", "Generar y revisar el esquema físico."], notes: "" },
          { id: "w11-w-3", type: "exercise", title: "Paso 1", subtitle: "Configuración e importación", functionsToUse: ["Data Modeler", "Modelo lógico", "Revisión"], content: "Configura Oracle SQL Developer Data Modeler e importa el modelo lógico previamente elaborado. Revisa que sus entidades, atributos y relaciones estén disponibles antes de transformarlo.", code: `LISTA DE VERIFICACIÓN

[ ] La herramienta está configurada
[ ] El modelo lógico fue importado
[ ] Las entidades son visibles
[ ] Los atributos están completos
[ ] Las relaciones están representadas

// Registra cualquier elemento que necesite corrección
Observaciones: ______________________________`, language: "text", notes: "" },
          { id: "w11-w-4", type: "exercise", title: "Paso 2", subtitle: "Entidades y atributos", functionsToUse: ["Entidades", "Tablas", "Columnas", "Tipos de datos"], content: "Ejecuta la transformación y completa el mapeo propuesto. El resultado debe convertir cada entidad en una tabla y cada atributo en una columna con su tipo de dato.", code: `MODELO LÓGICO              MODELO RELACIONAL
CLIENTE                     CLIENTE
- IdCliente (UID)  ------>  - ID_CLIENTE  NUMBER
- Nombre           ------>  - __________  __________
- Correo           ------>  - __________  __________

PEDIDO                      PEDIDO
- IdPedido (UID)   ------>  - __________  __________
- Fecha            ------>  - __________  __________
- Estado           ------>  - __________  __________

// Completa columnas y tipos de datos
// Comprueba que no falte ningún atributo`, language: "text", notes: "" },
          { id: "w11-w-5", type: "quiz", title: "Control del Mapeo", question: "Al transformar el atributo UID de una entidad, ¿qué función debe cumplir en la tabla relacional?", options: ["Clave primaria", "Nombre del diagrama", "Clave foránea automática", "Relación sin columna"], answer: "Clave primaria", explanation: "El identificador único de la entidad se representa como la PK que identifica cada fila de la tabla.", notes: "" },
          { id: "w11-w-6", type: "exercise", title: "Paso 3", subtitle: "Asignación de PK y FK", functionsToUse: ["Clave primaria", "Clave foránea", "Relación 1:N"], content: "Configura las claves del modelo relacional para representar la relación entre CLIENTE y PEDIDO. Completa la estructura posterior sin resolverla completamente desde el ejemplo.", code: `ANTES DE CONFIGURAR CLAVES
CLIENTE (ID_CLIENTE, NOMBRE, CORREO)
PEDIDO  (ID_PEDIDO, FECHA, ESTADO)

EJERCICIO — DESPUÉS DE CONFIGURAR
CLIENTE
+------------+----------------+
| Columna    | Restricción    |
+------------+----------------+
| ID_CLIENTE | PK             |
| NOMBRE     | __________     |
+------------+----------------+

PEDIDO
+------------+----------------+
| Columna    | Restricción    |
+------------+----------------+
| ID_PEDIDO  | ________       |
| ID_CLIENTE | ________       |
| FECHA      | __________     |
+------------+----------------+

// Completa PK y FK
// Dibuja la relación 1:N entre ambas tablas`, language: "text", notes: "" },
          { id: "w11-w-7", type: "exercise", title: "Paso 4", subtitle: "Validación de integridad referencial", functionsToUse: ["PK", "FK", "Integridad referencial"], content: "Revisa que cada FK del modelo apunte a una PK válida y documenta el resultado de la validación.", code: `VALIDACIÓN
+-------------------+-------------------+-----------+
| Clave foránea     | Clave referenciada| Resultado |
+-------------------+-------------------+-----------+
| PEDIDO.ID_CLIENTE | CLIENTE.________  | ________  |
| ________________  | ________________  | ________  |
+-------------------+-------------------+-----------+

[ ] No existen FK sin referencia
[ ] Todas las PK identifican filas únicas
[ ] Las relaciones respetan el modelo lógico`, language: "text", notes: "" },
          { id: "w11-w-8", type: "exercise", title: "Paso 5", subtitle: "Generación del esquema físico", functionsToUse: ["Modelo relacional", "Esquema físico", "Revisión técnica"], content: "Genera el esquema físico y compara su estructura con el modelo relacional. Revisa tablas, columnas, tipos de datos, PK, FK y relaciones.", code: `REVISIÓN TÉCNICA FINAL

Elemento                 Estado
-----------------------  ----------------
Tablas generadas         ________________
Columnas y tipos         ________________
Claves primarias         ________________
Claves foráneas          ________________
Integridad referencial   ________________
Representación técnica   ________________

Observaciones: ______________________________`, language: "text", notes: "" },
          { id: "w11-w-9", type: "callout", calloutType: "warning", title: "HT-03: Transforma el Modelo Lógico", content: "Importa el modelo lógico, transfórmalo en un <span class='hl-callout'>modelo relacional</span>, mapea entidades y atributos, configura <span class='hl-callout'>PK y FK</span>, valida la integridad referencial y genera el esquema físico. Incluye la revisión técnica del resultado.", notes: "" },
          { id: "w11-w-10", type: "closing", title: "Fin del Taller", subtitle: "Entrega el modelo relacional, el esquema físico y la revisión técnica realizada.", notes: "" }
        ]
      }
    },
    {
      id: "week-12",
      number: 12,
      title: "Semana 12",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp12-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp12-t-1a", type: "title", title: "Tareas", content: "HT-04 Gestiona datos mediante sentencias SQL", notes: "" },
            { id: "sp12-t-1b", type: "text", title: "Semana 12", content: "Gestión y consulta de datos mediante SQL.\n\nDurante esta semana el estudiante comprenderá el uso de Oracle Application Express como entorno para trabajar con sentencias SQL. Se estudiarán los fundamentos del lenguaje de definición de datos DDL y del lenguaje de manipulación de datos DML, así como las consultas SELECT, los filtros mediante WHERE, el ordenamiento con ORDER BY y la unión de tablas mediante diferentes tipos de JOIN.", notes: "" },
            { id: "sp12-t-2", type: "title", title: "Objetivo General", content: "Comprender el uso de sentencias SQL para crear estructuras, manipular registros y consultar información dentro de una base de datos relacional en Oracle Application Express.", notes: "" },
            { id: "sp12-t-3", type: "text", title: "Objetivos Específicos", content: "• Identificar la finalidad de Oracle Application Express y los principales grupos de sentencias SQL.\n• Comprender el uso de DDL y DML para crear estructuras y gestionar registros.\n• Reconocer el uso de SELECT, WHERE y ORDER BY para recuperar y organizar información.\n• Comprender los tipos de JOIN utilizados para relacionar datos entre tablas.", notes: "" },
            { id: "sp12-t-4", type: "text", title: "Temas Teóricos a Tratar", content: "• Oracle Application Express APEX.\n• Lenguaje de Definición de Datos DDL.\n• Lenguaje de Manipulación de Datos DML.\n• Sentencia SELECT para recuperación de información.\n• Filtros mediante cláusula WHERE.\n• Ordenamiento de resultados mediante ORDER BY.\n• Tipos de JOIN y relaciones físicas entre tablas.\n• Lógica booleana aplicada a filtros de búsqueda.\n• Confidencialidad en el acceso a datos sensibles.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp12-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp12-w-1a", type: "title", title: "Tareas", content: "HT-04 Gestiona datos mediante sentencias SQL", notes: "" },
            { id: "sp12-w-1b", type: "text", title: "Semana 12", content: "Aplicación de sentencias SQL en Oracle APEX.\n\nEl estudiante accederá a Oracle APEX y desarrollará scripts para crear estructuras de base de datos, insertar y modificar registros y consultar información. También aplicará filtros, ordenamiento y relaciones entre tablas mediante JOIN, integrando en un mismo ejercicio la creación de tablas, carga de datos y recuperación de información.", notes: "" },
            { id: "sp12-w-2", type: "title", title: "Objetivo General", content: "Aplicar sentencias SQL en Oracle APEX para crear estructuras, gestionar registros y realizar consultas sobre una base de datos relacional.", notes: "" },
            { id: "sp12-w-3", type: "text", title: "Objetivos Específicos", content: "• Crear estructuras de base de datos mediante sentencias DDL.\n• Insertar y modificar registros utilizando sentencias DML.\n• Consultar y filtrar información mediante SELECT, WHERE y ORDER BY.\n• Relacionar tablas utilizando cláusulas JOIN.", notes: "" },
            { id: "sp12-w-4", type: "text", title: "Prácticas y Actividades", content: "• Acceso y reconocimiento del entorno Oracle Application Express.\n• Creación de tablas mediante sentencias DDL.\n• Inserción y modificación de registros mediante DML.\n• Desarrollo de consultas utilizando SELECT.\n• Aplicación de filtros mediante WHERE.\n• Ordenamiento de resultados mediante ORDER BY.\n• Unión de tablas mediante diferentes tipos de JOIN.\n• Desarrollo de un script integrador de creación, carga y consulta de una base de datos.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w12-t-1", type: "cover", title: "Gestión y Consulta de Datos mediante SQL", subtitle: "Conocimiento Teórico - Semana 12", notes: "" },
          { id: "w12-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Oracle Application Express (APEX).", "Lenguaje de Definición de Datos (DDL).", "Lenguaje de Manipulación de Datos (DML).", "Consultas mediante SELECT.", "Filtros mediante WHERE y lógica booleana.", "Ordenamiento mediante ORDER BY.", "Relaciones entre tablas mediante JOIN.", "Confidencialidad en el acceso a datos sensibles."], notes: "" },
          { id: "w12-t-3", type: "callout", calloutType: "tip", title: "SQL en Oracle APEX", content: "Oracle Application Express proporciona un entorno para ejecutar sentencias <span class='hl-callout'>SQL</span>, crear estructuras, gestionar registros y consultar información almacenada en una base de datos relacional.", notes: "" },
          { id: "w12-t-4", type: "text", title: "DDL — Definición de Estructuras", content: "El lenguaje de definición de datos permite crear y modificar las estructuras de la base de datos. Una tabla define columnas, tipos de datos y restricciones.", code: `CREATE TABLE cliente (
    id_cliente NUMBER PRIMARY KEY,
    nombre     VARCHAR2(80),
    correo     VARCHAR2(120)
);

CREATE TABLE pedido (
    id_pedido NUMBER PRIMARY KEY,
    fecha     DATE,
    estado    VARCHAR2(20),
    id_cliente NUMBER,
    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente)
);`, language: "sql", notes: "" },
          { id: "w12-t-5", type: "text", title: "DML — Gestión de Registros", content: "El lenguaje de manipulación de datos permite insertar y modificar los registros almacenados en las tablas.", code: `-- Insertar registros
INSERT INTO cliente (id_cliente, nombre, correo)
VALUES (1, 'Ana Torres', 'ana@correo.com');

INSERT INTO cliente (id_cliente, nombre, correo)
VALUES (2, 'Luis Ramos', 'luis@correo.com');

-- Modificar un registro
UPDATE cliente
SET correo = 'ana.torres@correo.com'
WHERE id_cliente = 1;`, language: "sql", notes: "" },
          { id: "w12-t-6", type: "text", title: "SELECT — Recuperación de Información", content: "La sentencia SELECT recupera datos de una o varias columnas. El asterisco selecciona todas las columnas; también es posible indicar únicamente las necesarias.", code: `-- Todas las columnas
SELECT *
FROM cliente;

-- Columnas específicas
SELECT nombre, correo
FROM cliente;

-- Datos de pedidos
SELECT id_pedido, fecha, estado
FROM pedido;`, language: "sql", notes: "" },
          { id: "w12-t-7", type: "text", title: "WHERE y Lógica Booleana", content: "La cláusula WHERE filtra las filas que cumplen una condición. Los operadores AND, OR y NOT permiten combinar o negar condiciones de búsqueda.", code: `-- Una condición
SELECT *
FROM pedido
WHERE estado = 'PENDIENTE';

-- Condiciones mediante AND
SELECT *
FROM pedido
WHERE estado = 'PENDIENTE'
  AND id_cliente = 1;

-- Alternativas mediante OR
SELECT *
FROM pedido
WHERE estado = 'PENDIENTE'
   OR estado = 'ENVIADO';`, language: "sql", notes: "" },
          { id: "w12-t-8", type: "quiz", title: "Comprueba el Filtro", question: "¿Qué cláusula permite recuperar únicamente las filas que cumplen una condición?", options: ["CREATE TABLE", "WHERE", "ORDER BY", "JOIN"], answer: "WHERE", explanation: "WHERE evalúa la condición indicada y conserva únicamente las filas que la cumplen.", notes: "" },
          { id: "w12-t-9", type: "text", title: "ORDER BY — Ordenamiento", content: "ORDER BY organiza el resultado de una consulta. ASC ordena de forma ascendente y DESC de forma descendente.", code: `-- Orden ascendente
SELECT nombre, correo
FROM cliente
ORDER BY nombre ASC;

-- Orden descendente
SELECT id_pedido, fecha, estado
FROM pedido
ORDER BY fecha DESC;

-- Filtrar y luego ordenar
SELECT id_pedido, fecha
FROM pedido
WHERE estado = 'PENDIENTE'
ORDER BY fecha DESC;`, language: "sql", notes: "" },
          { id: "w12-t-10", type: "text", title: "JOIN — Relación entre Tablas", content: "JOIN combina información relacionada mediante las claves físicas de las tablas. INNER JOIN muestra coincidencias; LEFT JOIN conserva todas las filas de la tabla izquierda; RIGHT JOIN conserva todas las filas de la tabla derecha.", code: `-- Relación física
CLIENTE.ID_CLIENTE (PK)
          |
          +---- PEDIDO.ID_CLIENTE (FK)

-- Coincidencias entre clientes y pedidos
SELECT c.nombre, p.id_pedido, p.estado
FROM cliente c
INNER JOIN pedido p
    ON c.id_cliente = p.id_cliente;

-- Todos los clientes, incluso sin pedidos
SELECT c.nombre, p.id_pedido
FROM cliente c
LEFT JOIN pedido p
    ON c.id_cliente = p.id_cliente;`, language: "sql", notes: "" },
          { id: "w12-t-11", type: "callout", calloutType: "warning", title: "Confidencialidad de los Datos", content: "Las consultas deben recuperar únicamente la información necesaria. El acceso a datos sensibles requiere aplicar criterios de <span class='hl-callout'>confidencialidad</span> y evitar mostrar o modificar información que no corresponda al propósito de la consulta.", notes: "" },
          { id: "w12-t-12", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de crear, cargar y consultar datos en Oracle APEX?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w12-w-1", type: "cover", title: "Aplicación de Sentencias SQL en Oracle APEX", subtitle: "Taller Práctico - Semana 12", notes: "" },
          { id: "w12-w-2", type: "interactive-list", title: "Ruta del Taller", items: ["Acceder y reconocer el entorno Oracle APEX.", "Crear tablas mediante DDL.", "Insertar y modificar registros mediante DML.", "Consultar datos mediante SELECT.", "Filtrar información mediante WHERE.", "Ordenar resultados mediante ORDER BY.", "Relacionar tablas mediante JOIN.", "Integrar creación, carga y consulta en un script."], notes: "" },
          { id: "w12-w-3", type: "exercise", title: "Paso 1", subtitle: "Crear las estructuras con DDL", functionsToUse: ["CREATE TABLE", "PRIMARY KEY", "FOREIGN KEY"], content: "En Oracle APEX, crea las tablas CLIENTE y PEDIDO. Completa las columnas, tipos y restricciones faltantes.", code: `CREATE TABLE cliente (
    id_cliente NUMBER PRIMARY KEY,
    nombre     VARCHAR2(80),
    correo     VARCHAR2(120)
);

CREATE TABLE pedido (
    id_pedido  NUMBER ___________,
    fecha      DATE,
    estado     VARCHAR2(20),
    id_cliente NUMBER,
    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (___________)
        REFERENCES cliente(___________)
);`, language: "sql", notes: "" },
          { id: "w12-w-4", type: "exercise", title: "Paso 2", subtitle: "Insertar y modificar registros", functionsToUse: ["INSERT INTO", "VALUES", "UPDATE", "WHERE"], content: "Inserta registros de clientes y pedidos. Después modifica el estado de un pedido específico sin alterar los demás.", code: `-- Ejemplo inicial
INSERT INTO cliente (id_cliente, nombre, correo)
VALUES (1, 'Ana Torres', 'ana@correo.com');

-- Completa dos clientes adicionales
INSERT INTO cliente (________, ________, ________)
VALUES (________, ________, ________);

-- Inserta tres pedidos
INSERT INTO pedido (________, ________, ________, ________)
VALUES (________, ________, ________, ________);

-- Modifica únicamente el pedido indicado
UPDATE pedido
SET estado = __________
WHERE id_pedido = __________;`, language: "sql", notes: "" },
          { id: "w12-w-5", type: "exercise", title: "Paso 3", subtitle: "Consultar, filtrar y ordenar", functionsToUse: ["SELECT", "WHERE", "ORDER BY"], content: "Escribe consultas para recuperar los pedidos pendientes de un cliente y ordenarlos desde la fecha más reciente.", code: `SELECT id_pedido, fecha, estado
FROM pedido
WHERE estado = '__________'
  AND id_cliente = ______
ORDER BY fecha ____;

-- Crea otra consulta:
-- 1. Recupera nombre y correo de CLIENTE
-- 2. Filtra el cliente requerido
-- 3. Ordena el resultado por nombre`, language: "sql", notes: "" },
          { id: "w12-w-6", type: "quiz", title: "Control de la Consulta", question: "¿En qué orden se escriben las cláusulas para consultar, filtrar y ordenar?", options: ["ORDER BY, WHERE, SELECT", "SELECT, FROM, WHERE, ORDER BY", "WHERE, SELECT, FROM", "FROM, ORDER BY, SELECT"], answer: "SELECT, FROM, WHERE, ORDER BY", explanation: "La consulta comienza con SELECT y FROM, después aplica WHERE y finalmente organiza el resultado con ORDER BY.", notes: "" },
          { id: "w12-w-7", type: "exercise", title: "Paso 4", subtitle: "Relacionar tablas mediante JOIN", functionsToUse: ["INNER JOIN", "LEFT JOIN", "ON"], content: "Relaciona CLIENTE y PEDIDO utilizando su PK y FK. Completa una consulta con coincidencias y otra que conserve todos los clientes.", code: `-- Coincidencias entre ambas tablas
SELECT c.nombre, p.id_pedido, p.estado
FROM cliente c
INNER JOIN pedido p
    ON c.__________ = p.__________;

-- Todos los clientes, incluso sin pedidos
SELECT c.nombre, p.id_pedido
FROM cliente c
________ JOIN pedido p
    ON c.id_cliente = p.id_cliente;

-- Explica la diferencia entre ambos resultados`, language: "sql", notes: "" },
          { id: "w12-w-8", type: "exercise", title: "Script Integrador", subtitle: "Creación, carga y consulta", functionsToUse: ["DDL", "DML", "SELECT", "WHERE", "ORDER BY", "JOIN"], content: "Integra en un solo script la creación de tablas, la carga de datos y las consultas solicitadas. Mantén el orden correcto de ejecución.", code: `-- 1. CREACIÓN DE ESTRUCTURAS (DDL)
CREATE TABLE ______________________________;

-- 2. CARGA DE DATOS (DML)
INSERT INTO _______________________________;

-- 3. MODIFICACIÓN DE REGISTROS
UPDATE ___________________________________;

-- 4. CONSULTA CON FILTRO Y ORDEN
SELECT ___________________________________;

-- 5. CONSULTA ENTRE TABLAS
SELECT ___________________________________
FROM _____________________________________
JOIN _____________________________________;`, language: "sql", notes: "" },
          { id: "w12-w-9", type: "callout", calloutType: "warning", title: "HT-04: Gestiona Datos mediante SQL", content: "Desarrolla en Oracle APEX un script que cree las estructuras mediante <span class='hl-callout'>DDL</span>, gestione registros mediante <span class='hl-callout'>DML</span> y recupere información usando <span class='hl-callout'>SELECT, WHERE, ORDER BY y JOIN</span>. Respeta la confidencialidad de los datos consultados.", notes: "" },
          { id: "w12-w-10", type: "closing", title: "Fin del Taller", subtitle: "Entrega el script integrador y los resultados de las consultas ejecutadas en Oracle APEX.", notes: "" }
        ]
      }
    }
  ]
};
