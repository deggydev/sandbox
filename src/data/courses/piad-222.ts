export const piad222 = {
  id: "piad-222",
  name: "FRONTEND DEVELOPER WEB",
  code: "PIAD-222",
  description: "Aprende a construir interfaces web interactivas y modernas utilizando HTML, CSS, JavaScript y frameworks actuales.",
  imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
  weeks: [
    {
      id: "week-05",
      number: 5,
      title: "Semana 05",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp5-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp5-t-1a", type: "title", title: "Tareas", content: "HT-01 Estructura página web", notes: "" },
            { id: "sp5-t-1b", type: "text", title: "Semana 5", content: "Durante esta semana el estudiante comprenderá los fundamentos del desarrollo frontend, diferenciando los conceptos de frontend y backend y reconociendo la interacción cliente-servidor. También estudiará los principios básicos del diseño responsive y la estructura de un documento HTML5, considerando etiquetas semánticas, jerarquía de elementos y organización del contenido. Además, se introducirán conceptos básicos de UX/UI, navegación, jerarquía visual, mapas de sitio y wireframes.", notes: "" },
            { id: "sp5-t-2", type: "title", title: "Objetivo General", content: "Comprender los fundamentos del desarrollo frontend y la estructura de páginas HTML5, identificando los principales elementos semánticos y conceptos básicos de UX/UI necesarios para organizar y diseñar una página web.", notes: "" },
            { id: "sp5-t-3", type: "text", title: "Objetivos Específicos", content: "• Diferenciar los conceptos de frontend, backend e interacción cliente-servidor.\n• Comprender la estructura y organización básica de un documento HTML5.\n• Reconocer las principales etiquetas semánticas utilizadas para estructurar una página web.\n• Identificar conceptos básicos de UX/UI, jerarquía visual, navegación y wireframes.", notes: "" },
            { id: "sp5-t-4", type: "text", title: "Temas Teóricos a Tratar", content: "• Conceptos de frontend y backend.\n• Principios básicos del diseño responsive.\n• Interacción cliente-servidor.\n• Estructura básica de un documento HTML5.\n• Etiquetas semánticas: header, nav, main, section y footer.\n• Maquetación y jerarquía de elementos HTML.\n• Conceptos básicos de experiencia de usuario UX y diseño de interfaz UI.\n• Jerarquía visual y navegación.\n• Mapas de sitio y wireframes.\n• Medidas relativas y absolutas aplicadas al diseño web: px, %, em y rem.\n• Buenas prácticas en la publicación de contenido web.\n• Uso ergonómico del teclado y monitor durante el desarrollo.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp5-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp5-w-1a", type: "title", title: "Tareas", content: "HT-01 Estructura página web", notes: "" },
            { id: "sp5-w-1b", type: "text", title: "Semana 5", content: "El estudiante analizará la estructura de diferentes páginas web y realizará la maquetación básica de un sitio utilizando HTML5. Se trabajará con etiquetas semánticas como header, nav, main, section y footer, organizando correctamente los elementos de la página. Como parte del diseño previo, se elaborará una estructura sencilla mediante wireframe y se desarrollará una página básica aplicando criterios iniciales de UX/UI.", notes: "" },
            { id: "sp5-w-2", type: "title", title: "Objetivo General", content: "Aplicar los fundamentos de HTML5 y UX/UI mediante la estructuración y maquetación básica de una página web organizada con elementos semánticos y una jerarquía visual adecuada.", notes: "" },
            { id: "sp5-w-3", type: "text", title: "Objetivos Específicos", content: "• Construir la estructura básica de un documento HTML5.\n• Utilizar etiquetas semánticas para organizar correctamente el contenido de una página.\n• Representar previamente la distribución de una página mediante un wireframe.\n• Aplicar criterios básicos de jerarquía visual y navegación en una página sencilla.", notes: "" },
            { id: "sp5-w-4", type: "text", title: "Prácticas y Actividades", content: "• Identificación de las principales secciones de una página web existente.\n• Creación de la estructura inicial de un documento HTML5.\n• Implementación de header, nav, main, section y footer.\n• Organización jerárquica de los elementos dentro de la página.\n• Elaboración de un wireframe sencillo para definir la distribución del contenido.\n• Creación de una página simple con encabezado, cuerpo y pie de página.\n• Aplicación básica de criterios de navegación y jerarquía visual.\n• Revisión de ejemplos de maquetación web moderna para comparar diferentes estructuras.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w5-t-1", type: "cover", title: "Fundamentos Frontend", subtitle: "Conocimiento Teórico - Semana 05", notes: "Bienvenidos a la primera semana de Frontend Developer Web." },
          { id: "w5-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Frontend vs Backend y Cliente-Servidor.", "Diseño Responsive y Medidas (px, %, rem).", "Estructura de un documento HTML5.", "Etiquetas semánticas (header, nav, main, footer).", "UX/UI: Jerarquía visual y Navegación.", "Mapas de sitio y Wireframes.", "Ergonomía y buenas prácticas."], notes: "" },
          { id: "w5-t-3", type: "text", title: "Frontend vs Backend", content: "El desarrollo web se divide en dos grandes mundos:\n\n• <b>Frontend (Cliente)</b>: Es todo lo que el usuario ve e interactúa. Se construye con HTML, CSS y JavaScript. Se ejecuta en el navegador.\n• <b>Backend (Servidor)</b>: Es la lógica oculta que procesa datos, maneja bases de datos y seguridad. Se construye con Python, Node.js, PHP, Java, etc.\n\nLa <b>interacción cliente-servidor</b> ocurre cuando el frontend (navegador) hace una <i>petición</i> (request) y el backend responde con datos o archivos (response).", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80", notes: "" },
          { id: "w5-t-4", type: "text", title: "Estructura Básica HTML5", content: "HTML (HyperText Markup Language) no es un lenguaje de programación, es un lenguaje de marcado. Su estructura básica define el esqueleto de cualquier página web.\n\nTodo documento moderno debe tener la declaración <code>&lt;!DOCTYPE html&gt;</code> y dividirse en dos partes principales: el <code>&lt;head&gt;</code> (metadatos, invisible) y el <code>&lt;body&gt;</code> (contenido visible).", code: "<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Mi Primera Web</title>\n</head>\n<body>\n    <!-- Aquí va el contenido visible -->\n    <h1>Hola Mundo</h1>\n</body>\n</html>", language: "html", notes: "" },
          { id: "w5-t-5", type: "callout", calloutType: "tip", title: "El poder de la Semántica", content: "En HTML5, las etiquetas <b>semánticas</b> (como <code>&lt;header&gt;</code> o <code>&lt;nav&gt;</code>) no cambian cómo se ve la página visualmente, pero le dicen a los motores de búsqueda (SEO) y a los lectores de pantalla (accesibilidad) qué significa cada parte del contenido. ¡Nunca uses puros <code>&lt;div&gt;</code> para todo!", notes: "" },
          { id: "w5-t-6", type: "text", title: "Etiquetas Semánticas Principales", content: "Organizan jerárquicamente la página web:\n\n• <code>&lt;header&gt;</code>: Encabezado del sitio (suele contener el logo y título).\n• <code>&lt;nav&gt;</code>: Contiene los enlaces de navegación principales.\n• <code>&lt;main&gt;</code>: El contenido único y principal del documento.\n• <code>&lt;section&gt;</code>: Agrupa contenido temático (ej. 'Sobre nosotros', 'Servicios').\n• <code>&lt;article&gt;</code>: Contenido independiente y reutilizable (ej. un post de blog).\n• <code>&lt;aside&gt;</code>: Contenido tangencial (barras laterales).\n• <code>&lt;footer&gt;</code>: Pie de página (copyright, enlaces legales).", code: "<body>\n    <header>\n        <nav>\n            <!-- Enlaces -->\n        </nav>\n    </header>\n    \n    <main>\n        <section>\n            <!-- Contenido principal -->\n        </section>\n    </main>\n    \n    <footer>\n        <!-- Pie de página -->\n    </footer>\n</body>", language: "html", notes: "" },
          { id: "w5-t-7", type: "quiz", title: "Pregunta Rápida", question: "¿Qué etiqueta HTML5 debes usar para agrupar los enlaces principales de menú de tu sitio web?", options: ["<header>", "<menu>", "<nav>", "<section>"], answer: "<nav>", explanation: "La etiqueta <nav> (navigation) es la etiqueta semántica correcta para agrupar los enlaces principales de navegación del sitio.", notes: "" },
          { id: "w5-t-8", type: "text", title: "UX/UI y Wireframes", content: "• <b>UX (User Experience)</b>: Cómo se <i>siente</i> el usuario al usar la web (facilidad, velocidad, lógica).\n• <b>UI (User Interface)</b>: Cómo se <i>ve</i> la web (colores, botones, tipografías).\n\nAntes de escribir código, se crean <b>Wireframes</b>: bocetos simples (a lápiz o digitales) que definen la jerarquía visual y la distribución de los elementos sin detalles de diseño. Esto ayuda a planificar mapas de sitio y rutas de navegación eficaces.", image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80", notes: "" },
          { id: "w5-t-9", type: "text", title: "Unidades de Medida y Responsive", content: "Para lograr <b>Diseño Responsive</b> (que la web se adapte a celulares y computadoras), debemos dejar de usar medidas fijas y usar relativas:\n\n• <b>px (Pixeles)</b>: Medida absoluta. Siempre tiene el mismo tamaño. Usar con precaución.\n• <b>% (Porcentaje)</b>: Medida relativa al contenedor padre. Ideal para anchos fluidos.\n• <b>em / rem</b>: Medidas relativas al tamaño de la tipografía. `rem` es relativo a la raíz (html), lo que lo hace perfecto para accesibilidad y escalado.", notes: "" },
          { id: "w5-t-10", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de pasar al Taller de Maquetación?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w5-w-1", type: "cover", title: "Maquetación Básica", subtitle: "Taller Práctico - Semana 05", notes: "" },
          { id: "w5-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Creación de un wireframe básico.", "Estructura inicial HTML5.", "Organización jerárquica de elementos.", "Criterios de navegación (Menús con listas).", "Construcción completa de Portafolio Personal.", "Revisión de sitios web reales.", "<b>Tarea: HT-01 Estructura página web</b>."], notes: "" },
          { id: "w5-w-3", type: "text", title: "Fase 1: Wireframing", content: "Antes de tocar código, vamos a hacer un boceto.\n\nEn una hoja de papel (o en una herramienta como Figma/Excalidraw), dibuja la estructura de una página de 'Portafolio Personal'.\nDebe contener:\n1. Un área superior para el logo y 3 enlaces de menú.\n2. Un área central grande para una foto de perfil y una biografía.\n3. Una sección abajo para mostrar 3 proyectos.\n4. Un pie de página.\n\nIdentifica qué etiqueta semántica de HTML5 correspondería a cada bloque dibujado.", notes: "" },
          { id: "w5-w-4", type: "exercise", title: "Fase 2: Estructura Base HTML5", subtitle: "Traduciendo el wireframe a código",
            functionsToUse: ["<header>", "<nav>", "<main>", "<footer>"],
            content: "Abre tu editor de código (VS Code) y crea un archivo <code>index.html</code>.<br/><br/>Escribe la estructura base de HTML5 y utiliza las etiquetas semánticas para crear los contenedores de tu wireframe. <b>No te preocupes por el diseño ni los colores aún</b>, solo por la estructura.",
            code: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Portafolio</title>
</head>
<body>
    <!-- 1. Crea aquí el encabezado y la navegación -->
    

    <!-- 2. Crea el contenedor principal -->
    <main>
        <!-- 3. Dentro del main, crea dos secciones: 
             una para la biografía y otra para proyectos -->
        
    </main>

    <!-- 4. Crea el pie de página -->
    
</body>
</html>`, language: "html", notes: "No revelar todo el código, solo la estructura base y comentarios." },
          { id: "w5-w-5", type: "text", title: "Organización Jerárquica", content: "En HTML, los elementos se organizan de forma jerárquica o de 'árbol'. Esto significa que hay elementos <b>padres</b> que contienen a elementos <b>hijos</b>.\n\nPor ejemplo, dentro de una etiqueta <code>&lt;header&gt;</code> (padre), es muy común colocar un <code>&lt;h1&gt;</code> para el título y un <code>&lt;nav&gt;</code> para el menú (hijos).\n\nMantener una correcta indentación (espacios) te ayudará a visualizar visualmente qué etiqueta está dentro de cuál.", notes: "" },
          { id: "w5-w-6", type: "exercise", title: "Fase 3: Criterios de Navegación", subtitle: "Construyendo el menú del Portafolio",
            functionsToUse: ["<ul>", "<li>", "<a>"],
            content: "Para construir la navegación de un sitio web de forma semántica, no basta con poner enlaces <code>&lt;a&gt;</code> sueltos. \n\nSe recomienda agruparlos dentro de una <b>lista desordenada</b> <code>&lt;ul&gt;</code> y colocar cada enlace dentro de un elemento de lista <code>&lt;li&gt;</code>.<br/><br/>Completa la parte del <code>&lt;header&gt;</code> agregando un título H1 con tu nombre y un menú de navegación con enlaces a 'Sobre mí', 'Proyectos' y 'Contacto'.",
            code: `    <header>
        <!-- Agrega un h1 con tu nombre -->
        
        <nav>
            <!-- Crea una lista ul y dentro de ella 3 elementos li -->
            <!-- Cada li debe contener una etiqueta de enlace <a> -->
            <ul>
                <li><a href="#sobre-mi">Sobre mí</a></li>
                <!-- Completa los demás enlaces -->
                
            </ul>
        </nav>
    </header>`, language: "html", notes: "Dejar que el estudiante complete los enlaces." },
          { id: "w5-w-7", type: "exercise", title: "Fase 4: Perfil y Biografía", subtitle: "Completando el cuerpo de la página",
            functionsToUse: ["<section>", "<h2>", "<p>", "<img>"],
            content: "Ahora nos enfocaremos en el contenedor <code>&lt;main&gt;</code>. Dentro de él, crearemos la primera sección: la de biografía.\n\nUtiliza la etiqueta <code>&lt;section&gt;</code> con un atributo <code>id=\"sobre-mi\"</code> para que los enlaces de navegación funcionen. Dentro de la sección, añade una imagen de perfil, un subtítulo <code>&lt;h2&gt;</code> y un párrafo <code>&lt;p&gt;</code> con una breve descripción tuya.",
            code: `    <main>
        <!-- Sección de Biografía -->
        <section id="sobre-mi">
            <!-- Inserta una imagen con <img> (usa una URL de prueba o local) -->
            
            <!-- Agrega un subtítulo y un párrafo -->
            <h2>¡Hola, soy [Tu Nombre]!</h2>
            <p>Soy un estudiante de desarrollo web apasionado por...</p>
        </section>
        
        <!-- Aquí irá la sección de proyectos -->
    </main>`, language: "html", notes: "" },
          { id: "w5-w-8", type: "quiz", title: "Pregunta de Comprensión", question: "Si tu menú de navegación tiene un enlace `<a href=\"#contacto\">Contacto</a>`, ¿qué necesita la sección de contacto para que la página se desplace hacia ella al hacer clic?", options: ["Un atributo id=\"contacto\"", "Un atributo class=\"contacto\"", "Un atributo name=\"contacto\"", "Estar dentro de un <footer>"], answer: "Un atributo id=\"contacto\"", explanation: "Los enlaces internos (que comienzan con #) buscan en la misma página un elemento cuyo atributo ID coincida exactamente con el texto después del numeral.", notes: "" },
          { id: "w5-w-9", type: "exercise", title: "Fase 5: Proyectos y Pie de Página", subtitle: "Cierre del Portafolio Personal",
            functionsToUse: ["<article>", "<footer>"],
            content: "Finaliza tu portafolio creando la segunda sección de proyectos y un pie de página.\n\nPara los proyectos, utiliza la etiqueta <code>&lt;article&gt;</code> para separar cada uno de forma semántica. Recuerda ponerle un <code>id</code> a la sección para que el menú de navegación pueda llegar a ella.",
            code: `        <!-- Sección de Proyectos -->
        <section id="proyectos">
            <h2>Mis Proyectos</h2>
            
            <article>
                <h3>Proyecto 1</h3>
                <p>Descripción breve del proyecto.</p>
            </article>
            
            <!-- Agrega un par de <article> más para otros proyectos -->
        </section>
    </main>

    <!-- Pie de página -->
    <footer>
        <p>&copy; 2026 [Tu Nombre]. Todos los derechos reservados.</p>
    </footer>`, language: "html", notes: "" },
          { id: "w5-w-10", type: "callout", calloutType: "info", title: "Recomendación de Ergonomía", content: "Asegúrate de que tu monitor esté a la altura de tus ojos y tu teclado en una posición donde tus brazos formen un ángulo de 90 grados. Pasarás mucho tiempo maquetando, ¡cuida tu postura!", notes: "" },
          { id: "w5-w-11", type: "text", title: "Revisión de Estructuras Reales", content: "Ahora ingresa a un sitio web moderno (como Apple, Netflix o GitHub).\nHaz clic derecho y selecciona <b>Inspeccionar (Inspect Element)</b>.\n\nNavega por la pestaña 'Elements' e intenta identificar cómo ellos han utilizado las etiquetas <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code> y <code>&lt;main&gt;</code>. Compara su estructura profesional con la que acabas de construir.", notes: "" },
          { id: "w5-w-12", type: "closing", title: "Taller Finalizado", subtitle: "Recuerda subir tu archivo index.html estructurado a la plataforma.", notes: "" }
        ]
      }
    },
    {
      id: "week-06",
      number: 6,
      title: "Semana 06",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp6-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp6-t-1a", type: "title", title: "Tareas", content: "HT-02 Desarrolla interfaz estática", notes: "" },
            { id: "sp6-t-1b", type: "text", title: "Semana 6", content: "Durante esta semana el estudiante comprenderá los fundamentos de CSS3 para aplicar estilos visuales a páginas web. Se estudiará la sintaxis de CSS, el uso de selectores, propiedades y valores, así como el modelo de caja y el manejo de espacios. También se abordará el diseño responsive mediante Flexbox, Grid, media queries y el uso básico de Bootstrap como framework CSS.", notes: "" },
            { id: "sp6-t-2", type: "title", title: "Objetivo General", content: "Comprender los fundamentos de CSS3 y del diseño responsive para definir la apariencia, distribución y adaptación visual de una interfaz web en diferentes tamaños de pantalla.", notes: "" },
            { id: "sp6-t-3", type: "text", title: "Objetivos Específicos", content: "• Comprender la sintaxis básica de CSS3 y el uso de selectores, propiedades y valores.\n• Reconocer el modelo de caja y los principios de distribución y espaciado de elementos.\n• Comprender el funcionamiento de Flexbox, Grid y media queries en diseños responsive.\n• Identificar el uso básico de Bootstrap y sus componentes dentro de una interfaz web.", notes: "" },
            { id: "sp6-t-4", type: "text", title: "Temas Teóricos a Tratar", content: "• Sintaxis y estructura básica de CSS3.\n• Selectores, propiedades y valores CSS.\n• Modelo de caja y espaciado de elementos.\n• Estilos de texto, color y presentación visual.\n• Diseño flexible utilizando Flexbox y Grid.\n• Uso de grillas, contenedores y media queries.\n• Introducción a Bootstrap y sus componentes básicos.\n• Animaciones básicas con CSS3.\n• Principios de accesibilidad y diseño inclusivo.\n• Proporciones y porcentajes aplicados al diseño adaptativo.\n• Fundamentos de percepción visual y consistencia de estilos.\n• Ergonomía visual y prevención de fatiga ocular.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp6-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp6-w-1a", type: "title", title: "Tareas", content: "HT-02 Desarrolla interfaz estática", notes: "" },
            { id: "sp6-w-1b", type: "text", title: "Semana 6", content: "El estudiante aplicará estilos a páginas HTML mediante hojas CSS internas y externas, trabajando con texto, colores, márgenes, espaciados y distribución de elementos. También desarrollará diseños flexibles utilizando Flexbox y Grid, incorporará componentes básicos de Bootstrap y realizará una interfaz responsive orientada a un sitio informativo.", notes: "" },
            { id: "sp6-w-2", type: "title", title: "Objetivo General", content: "Aplicar CSS3 y herramientas de diseño responsive para construir una interfaz web estática organizada, adaptable y visualmente consistente.", notes: "" },
            { id: "sp6-w-3", type: "text", title: "Objetivos Específicos", content: "• Aplicar selectores y propiedades CSS sobre una estructura HTML.\n• Construir distribuciones flexibles utilizando Flexbox y Grid.\n• Implementar elementos responsive mediante media queries y Bootstrap.\n• Aplicar criterios básicos de accesibilidad y consistencia visual.", notes: "" },
            { id: "sp6-w-4", type: "text", title: "Prácticas y Actividades", content: "• Vinculación de hojas de estilo internas y externas a una página HTML.\n• Aplicación de estilos de texto, colores, márgenes y espaciados.\n• Construcción de una distribución básica utilizando Flexbox.\n• Creación de una estructura de página utilizando CSS Grid.\n• Aplicación de media queries para adaptar la interfaz a diferentes tamaños de pantalla.\n• Integración básica de Bootstrap y utilización de sus componentes.\n• Creación de una landing page sencilla utilizando Bootstrap.\n• Diseño de una interfaz responsive para un sitio informativo.\n• Revisión de accesibilidad, organización visual y consistencia de estilos.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w6-t-1", type: "cover", title: "Diseño Web con CSS3", subtitle: "Conocimiento Teórico - Semana 06", notes: "" },
          { id: "w6-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Propiedades y selectores avanzados de CSS3.", "El Modelo de Caja (Box Model).", "Flexbox: Contenedores e Hijos.", "CSS Grid: Dimensiones y Ubicación.", "Diseño Responsive y Media Queries.", "Introducción al framework Bootstrap.", "Ergonomía visual y accesibilidad."], notes: "" },
          { id: "w6-t-3", type: "text", title: "CSS3: Sintaxis y Propiedades Esenciales", content: "CSS da vida al HTML. Además de las propiedades clásicas para texto, colores y tamaños, CSS3 introdujo propiedades poderosas para fondos, sombras y bordes.\n\nEs fundamental entender que cada declaración termina con un punto y coma (<code>;</code>) y puedes aplicarlas a múltiples selectores.", code: "/* Tipografía y texto */\n.titulo-principal {\n    font-family: 'Arial', sans-serif;\n    font-size: 32px;\n    font-weight: bold;\n    text-align: center;\n    text-transform: uppercase; /* MAYÚSCULAS */\n    letter-spacing: 2px;\n}\n\n/* Fondos, bordes y dimensiones */\n.tarjeta {\n    background-color: #f8f9fa;\n    color: #333333;\n    width: 100%;\n    max-width: 400px;\n    border: 1px solid #ddd;\n    border-radius: 8px; /* Bordes redondeados */\n    box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Sombra */\n}", language: "css", notes: "" },
          { id: "w6-t-4", type: "text", title: "CSS3: Selectores Avanzados", content: "Aparte de seleccionar por Etiqueta, Clase (.) o ID (#), CSS permite seleccionar por <b>estado</b> usando pseudo-clases.\n\n• <code>:hover</code> se activa cuando el mouse pasa por encima.\n• <code>:nth-child(n)</code> selecciona el elemento hijo número 'n'.\n• <code>:focus</code> se activa al hacer clic en un input.", code: "/* Cambia el color al pasar el mouse */\n.boton:hover {\n    background-color: #0056b3;\n    cursor: pointer;\n}\n\n/* Selecciona las filas impares de una tabla */\ntr:nth-child(odd) {\n    background-color: #f2f2f2;\n}", language: "css", notes: "" },
          { id: "w6-t-5", type: "callout", calloutType: "warning", title: "El Modelo de Caja (Box Model)", content: "En CSS, TODO es una caja. Cada caja tiene 4 capas (de adentro hacia afuera):\n1. <b>Content:</b> El contenido real (texto, imagen).\n2. <b>Padding:</b> Espacio transparente entre el contenido y el borde.\n3. <b>Border:</b> Una línea visible que rodea el padding.\n4. <b>Margin:</b> Espacio transparente fuera del borde que lo separa de otros elementos.", notes: "" },
          { id: "w6-t-6", type: "text", title: "Flexbox: El Contenedor Padre", content: "Al aplicar <code>display: flex</code> a un contenedor padre, habilitas un superpoder para alinear a sus hijos (en una dimensión: fila o columna).\n\n• <code>justify-content</code>: Alinea en el eje principal (ej. horizontal).\n• <code>align-items</code>: Alinea en el eje secundario (ej. vertical).\n• <code>flex-wrap</code>: Permite que los elementos pasen a la siguiente línea si no caben.", code: ".contenedor-padre {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between; /* Espacio entre elementos */\n    align-items: center; /* Centrado vertical */\n    flex-wrap: wrap; /* Envolver si falta espacio */\n}", language: "css", notes: "" },
          { id: "w6-t-7", type: "text", title: "Flexbox: Los Elementos Hijos", content: "Los hijos directos de un contenedor flex también tienen propiedades propias para controlar cómo crecen o se encogen:\n\n• <code>flex-grow</code>: ¿Cuánto debe crecer si sobra espacio? (0 = nada, 1 = todo lo posible).\n• <code>flex-shrink</code>: ¿Cuánto debe encogerse si falta espacio?\n• <code>align-self</code>: Permite romper la regla de alineación vertical del padre para este hijo en específico.", code: ".hijo-1 {\n    flex-grow: 1; /* Ocupará todo el espacio sobrante */\n}\n\n.hijo-2 {\n    align-self: flex-start; /* Se alinea arriba, ignorando al padre */\n}", language: "css", notes: "" },
          { id: "w6-t-8", type: "text", title: "CSS Grid: Definiendo Columnas y Filas", content: "A diferencia de Flexbox, CSS Grid diseña en <b>dos dimensiones</b>. Primero debes definir la \"cuadrícula\" en el contenedor padre utilizando la unidad fraccional <code>fr</code>.\n\n• <code>grid-template-columns</code>: Define el ancho y cantidad de columnas.\n• <code>grid-template-rows</code>: Define el alto de las filas.\n• <code>gap</code>: Espacio entre celdas.", code: ".contenedor-grid {\n    display: grid;\n    /* 3 columnas: la 1ra y 3ra miden igual, la central mide el doble */\n    grid-template-columns: 1fr 2fr 1fr;\n    grid-template-rows: 100px auto;\n    gap: 20px;\n}", language: "css", notes: "" },
          { id: "w6-t-9", type: "text", title: "CSS Grid: Ubicando Elementos", content: "Una vez definida la cuadrícula, puedes decirle a los hijos exactamente en qué \"línea\" de la cuadrícula deben empezar y terminar.\n\nEsto te permite crear layouts asimétricos complejos fácilmente sin usar márgenes negativos.", code: ".sidebar {\n    /* Empieza en la línea de columna 1, termina en la 2 */\n    grid-column: 1 / 2;\n    /* Empieza en la línea de fila 1, termina en la 3 */\n    grid-row: 1 / 3;\n}\n\n.header {\n    /* Ocupa desde la línea de columna 1 hasta el final (-1) */\n    grid-column: 1 / -1;\n}", language: "css", notes: "" },
          { id: "w6-t-10", type: "quiz", title: "Pregunta Rápida", question: "¿Qué tecnología usarías principalmente para crear la estructura general de una página compleja (como header, sidebar y footer interconectados)?", options: ["Flexbox", "CSS Grid", "Tablas HTML", "Pseudo-clases"], answer: "CSS Grid", explanation: "CSS Grid está diseñado específicamente para layouts bidimensionales (filas y columnas al mismo tiempo), haciéndolo perfecto para estructurar páginas completas.", notes: "" },
          { id: "w6-t-11", type: "text", title: "Diseño Responsive (Media Queries)", content: "El diseño Responsive asegura que tu web se adapte a celulares. Las <b>Media Queries</b> aplican estilos <i>solo</i> si se cumple una condición (como el ancho del dispositivo).", code: "/* Estilo para celulares (1 columna) */\n.galeria { grid-template-columns: 1fr; }\n\n/* Si la pantalla mide 768px o más (Tablet/PC) */\n@media (min-width: 768px) {\n    .galeria { \n        grid-template-columns: 1fr 1fr 1fr; /* 3 columnas */\n    }\n}", language: "css", notes: "" },
          { id: "w6-t-12", type: "text", title: "Introducción a Bootstrap", content: "Bootstrap es un framework CSS. Contiene componentes interactivos y un potente sistema de cuadrícula.\n\nEn lugar de escribir CSS desde cero, aplicas <b>clases predefinidas</b> en tu HTML, como <code>class=\"btn btn-primary\"</code> para un botón azul.", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80", notes: "" },
          { id: "w6-t-13", type: "callout", calloutType: "info", title: "Ergonomía Visual", content: "Utiliza paletas de colores con buen contraste para mejorar la legibilidad y proteger tu vista. La regla 60-30-10 es ideal para equilibrar colores: 60% color dominante, 30% secundario y 10% para acentos (botones).", notes: "" },
          { id: "w6-t-14", type: "closing", title: "Fin de la teoría", subtitle: "¿Dudas antes de empezar con el código en el taller?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w6-w-1", type: "cover", title: "Estilos y Layouts", subtitle: "Taller Práctico - Semana 06", notes: "" },
          { id: "w6-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Vinculación de hoja CSS externa.", "Aplicación del Modelo de Caja.", "Centrado perfecto con Flexbox.", "Menú de navegación flexible.", "Estructuración con CSS Grid.", "Media Queries para móviles.", "Implementación básica de Bootstrap."], notes: "" },
          { id: "w6-w-3", type: "exercise", title: "Fase 1: Vinculación CSS", subtitle: "Conectando HTML con CSS",
            functionsToUse: ["<link>", "color", "font-family"],
            content: "Crea un archivo <code>index.html</code> y un archivo <code>style.css</code> en la misma carpeta.\n\nEn tu HTML, dentro del <code>&lt;head&gt;</code>, utiliza la etiqueta <code>&lt;link&gt;</code> para conectar ambos archivos. Luego, aplica un color y fuente base a la etiqueta <code>body</code> desde el CSS.",
            code: `/* En tu archivo style.css */
body {
    /* Agrega un color de fondo oscuro y texto claro */
    
    /* Cambia la tipografía a sans-serif */
    
}`, language: "css", notes: "El estudiante debe completar las propiedades background-color, color y font-family." },
          { id: "w6-w-4", type: "exercise", title: "Fase 2: El Modelo de Caja", subtitle: "Jugando con margin y padding",
            functionsToUse: ["margin", "padding", "border"],
            content: "En tu HTML, crea un <code>&lt;div class=\"tarjeta\"&gt;</code> con un texto adentro.\n\nEn tu CSS, añádele un borde visible. Luego, experimenta la diferencia: agrégale <code>padding</code> (espacio interno) y luego <code>margin</code> (espacio externo para separarlo de los bordes de la pantalla).",
            code: `.tarjeta {
    /* 1. Agrega un borde sólido de 2px */
    
    /* 2. Agrega padding de 20px */
    
    /* 3. Agrega margin de 30px */
    
}`, language: "css", notes: "" },
          { id: "w6-w-5", type: "exercise", title: "Fase 3: Magia con Flexbox", subtitle: "El famoso centrado vertical y horizontal",
            functionsToUse: ["display: flex", "justify-content", "align-items"],
            content: "Antes, centrar un elemento en medio de la pantalla era una pesadilla. Con Flexbox es cuestión de 3 líneas.\n\nCrea un contenedor en HTML que ocupe el 100% de la altura de la pantalla (<code>height: 100vh</code>). Convierte ese contenedor en un contenedor flexible y centra su contenido tanto horizontal como verticalmente.",
            code: `.contenedor-centrado {
    height: 100vh;
    /* Activa flexbox */
    display: flex;
    /* Centra horizontalmente */
    
    /* Centra verticalmente */
    
}`, language: "css", notes: "" },
          { id: "w6-w-6", type: "exercise", title: "Fase 4: Navegación Flexible", subtitle: "Menú horizontal con Flexbox",
            functionsToUse: ["display: flex", "gap", "list-style: none"],
            content: "Toma el menú de navegación (el <code>&lt;ul&gt;</code>) que creaste la semana pasada.\n\nPor defecto, los elementos <code>&lt;li&gt;</code> se apilan verticalmente (uno debajo de otro). Usa Flexbox en el <code>&lt;ul&gt;</code> para alinearlos horizontalmente y usa la propiedad <code>gap</code> para separarlos sin usar margins.",
            code: `nav ul {
    /* Quita los puntos de la lista */
    list-style: none;
    /* Elimina el padding por defecto */
    padding: 0;
    
    /* Convierte el ul en flexbox y separa sus elementos */
    
}`, language: "css", notes: "" },
          { id: "w6-w-7", type: "exercise", title: "Fase 5: CSS Grid", subtitle: "Estructurando una galería",
            functionsToUse: ["display: grid", "grid-template-columns", "gap"],
            content: "Crea una sección en HTML con 6 imágenes. Para organizarlas en una cuadrícula perfecta, usaremos CSS Grid.\n\nAplica Grid al contenedor padre y define 3 columnas de igual tamaño utilizando la unidad fraccional (<code>1fr</code>).",
            code: `.galeria {
    /* Activa grid */
    
    /* Define 3 columnas de 1fr cada una */
    
    /* Añade un espacio (gap) de 15px entre imágenes */
    
}`, language: "css", notes: "" },
          { id: "w6-w-8", type: "quiz", title: "Pregunta Rápida", question: "Si usas Flexbox y quieres que los elementos se distribuyan dejando el máximo espacio posible entre ellos (el primero al inicio y el último al final), ¿qué propiedad usas?", options: ["justify-content: center", "justify-content: space-between", "align-items: center", "flex-direction: column"], answer: "justify-content: space-between", explanation: "space-between toma todo el espacio sobrante y lo coloca equitativamente ENTRE los elementos.", notes: "" },
          { id: "w6-w-9", type: "exercise", title: "Fase 6: Responsive con Media Queries", subtitle: "Adaptando la galería al móvil",
            functionsToUse: ["@media", "max-width"],
            content: "En la fase anterior creamos una galería de 3 columnas. Pero en un celular, 3 columnas se verían muy pequeñas.\n\nUsa una <b>Media Query</b> para indicar que, si la pantalla tiene un ancho máximo de 600px (celulares), la galería debe pasar a tener solo 1 columna.",
            code: `/* Cuando la pantalla es menor a 600px */
@media (max-width: 600px) {
    .galeria {
        /* Cambia las columnas de la galería a 1 sola de 1fr */
        
    }
}`, language: "css", notes: "" },
          { id: "w6-w-10", type: "exercise", title: "Fase 7: Bootstrap Rápido", subtitle: "Componentes prefabricados",
            functionsToUse: ["class=\"container\"", "class=\"row\"", "class=\"btn btn-primary\""],
            content: "En un nuevo archivo HTML, pega el enlace CDN de Bootstrap en tu `<head>`.\n\nLuego, sin escribir NADA de CSS propio, crea un botón azul utilizando las clases de Bootstrap. Observa cómo el botón ya tiene bordes redondeados, sombras, hover y padding perfecto.",
            code: `<!-- Enlace CDN en el head (Búscalo en getbootstrap.com) -->

<body>
    <div class="container mt-5">
        <!-- Crea un botón azul de Bootstrap -->
        <button class="______">Mi Botón Bootstrap</button>
    </div>
</body>`, language: "html", notes: "" },
          { id: "w6-w-11", type: "callout", calloutType: "tip", title: "¡No reinventes la rueda!", content: "Aprender CSS nativo (Flexbox, Grid) es obligatorio para ser Frontend. Pero en proyectos reales de la industria, frameworks como Bootstrap o TailwindCSS se usan casi siempre para acelerar el desarrollo. ¡Aprende ambos mundos!", notes: "" },
          { id: "w6-w-12", type: "closing", title: "Taller Finalizado", subtitle: "Recuerda subir tu proyecto estático a la plataforma.", notes: "" }
        ]
      }
    },
    {
      id: "week-07",
      number: 7,
      title: "Semana 07",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp7-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp7-t-1a", type: "title", title: "Tareas", content: "HT-03 Implementa interactividad JS", notes: "" },
            { id: "sp7-t-1b", type: "text", title: "Semana 7", content: "Durante esta semana el estudiante comprenderá los fundamentos del lenguaje JavaScript para incorporar interactividad en páginas web. Se estudiarán variables, tipos de datos, operadores, funciones y estructuras de control. También se abordará la manipulación del DOM, el manejo de eventos y la integración de JavaScript con HTML y CSS para generar respuestas dinámicas dentro de una interfaz web.", notes: "" },
            { id: "sp7-t-2", type: "title", title: "Objetivo General", content: "Comprender los fundamentos de JavaScript y su integración con HTML y CSS para desarrollar comportamientos interactivos mediante variables, funciones, estructuras de control, DOM y eventos.", notes: "" },
            { id: "sp7-t-3", type: "text", title: "Objetivos Específicos", content: "• Identificar los principales tipos de datos, variables y operadores utilizados en JavaScript.\n• Comprender el uso de funciones y estructuras de control para gestionar la lógica de un script.\n• Reconocer el funcionamiento del DOM y el manejo de eventos en una página web.\n• Comprender principios básicos de validación y depuración mediante herramientas del navegador.", notes: "" },
            { id: "sp7-t-4", type: "text", title: "Temas Teóricos a Tratar", content: "• Tipos de datos y operadores en JavaScript.\n• Variables, funciones y eventos.\n• Estructuras de control: if, while y for.\n• Acceso a elementos HTML mediante el DOM.\n• Manejo de eventos y generación de respuestas dinámicas.\n• Integración de JavaScript con HTML y CSS.\n• Uso de consola y herramientas del navegador para depuración.\n• Validación básica de datos y formularios.\n• Álgebra booleana aplicada a condiciones y eventos.\n• Responsabilidad en la gestión de scripts y datos.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp7-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp7-w-1a", type: "title", title: "Tareas", content: "HT-03 Implementa interactividad JS", notes: "" },
            { id: "sp7-w-1b", type: "text", title: "Semana 7", content: "El estudiante desarrollará scripts sencillos en JavaScript para trabajar con variables, condiciones, ciclos y funciones. Se realizarán ejercicios de acceso y modificación de elementos HTML desde JavaScript, manejo de eventos y validación básica de datos. Además, se utilizará la consola del navegador para depurar errores y se desarrollará una calculadora básica como ejercicio integrador.", notes: "" },
            { id: "sp7-w-2", type: "title", title: "Objetivo General", content: "Aplicar JavaScript en páginas web mediante scripts que permitan controlar elementos HTML, responder a eventos y validar datos básicos dentro de una interfaz.", notes: "" },
            { id: "sp7-w-3", type: "text", title: "Objetivos Específicos", content: "• Crear scripts utilizando variables, operadores y estructuras de control.\n• Manipular elementos del DOM y responder a eventos del usuario.\n• Integrar JavaScript con HTML y CSS en ejercicios sencillos.\n• Utilizar herramientas del navegador para validar y depurar el funcionamiento del código.", notes: "" },
            { id: "sp7-w-4", type: "text", title: "Prácticas y Actividades", content: "• Declaración y uso de variables y tipos de datos en JavaScript.\n• Aplicación de operadores y estructuras if, while y for.\n• Creación y ejecución de funciones básicas.\n• Acceso y modificación de elementos HTML mediante el DOM.\n• Implementación de eventos como clics y cambios en elementos de la página.\n• Integración de scripts JavaScript dentro de una página HTML.\n• Validación básica de datos ingresados por el usuario.\n• Uso de la consola del navegador para identificar y corregir errores.\n• Desarrollo de una calculadora básica utilizando JavaScript.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w7-t-1", type: "cover", title: "Interactividad con JavaScript", subtitle: "Conocimiento Teórico - Semana 07", notes: "" },
          { id: "w7-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Introducción a JavaScript y consola.", "Variables, tipos de datos y operadores.", "Estructuras de control (If, For, While).", "Funciones y reutilización de código.", "El DOM (Document Object Model).", "Manejo de eventos (clics, teclado).", "Depuración y validación básica."], notes: "" },
          { id: "w7-t-3", type: "text", title: "El Rol de JavaScript", content: "Si HTML es el esqueleto de una web y CSS es su ropa/estilo, <b>JavaScript (JS)</b> es el cerebro y los músculos.\n\nJS es el lenguaje de programación que permite que las páginas web sean dinámicas: responder a clics, enviar datos, crear animaciones complejas y mucho más.", code: "/* Un pequeño ejemplo del poder de JS */\nalert('¡Hola! Soy un mensaje interactivo');", language: "javascript", notes: "" },
          { id: "w7-t-4", type: "text", title: "Variables y Tipos de Datos", content: "Las variables son como \"cajas\" donde guardamos información.\nEn el JS moderno usamos <code>let</code> (para valores que pueden cambiar) y <code>const</code> (para valores fijos o constantes).\n\nLos tipos de datos básicos son: Strings (texto), Numbers (números) y Booleans (verdadero/falso).", code: "const nombre = 'Carlos'; // String (Texto)\nlet edad = 25;           // Number (Número)\nlet esEstudiante = true; // Boolean (Verdadero/Falso)\n\nedad = 26; // Válido, 'let' permite cambios\n// nombre = 'Ana'; // ERROR! 'const' no permite cambios", language: "javascript", notes: "" },
          { id: "w7-t-5", type: "text", title: "Consola y Operadores", content: "Para ver qué está haciendo nuestro código por detrás, usamos la consola del navegador con <code>console.log()</code>.\n\nJavaScript usa operadores matemáticos (+, -, *, /) y operadores lógicos (=== para igualdad estricta, !== para diferencia).", code: "const precio = 100;\nconst impuesto = precio * 0.18;\nconst total = precio + impuesto;\n\n// Mostramos el resultado en la consola (F12 en el navegador)\nconsole.log('El total a pagar es: ' + total);\n\n// Operadores lógicos\nconsole.log(total === 118); // Imprime: true", language: "javascript", notes: "" },
          { id: "w7-t-6", type: "callout", calloutType: "warning", title: "Condiciones (if / else)", content: "Las estructuras de control nos permiten tomar decisiones basadas en <b>Álgebra Booleana</b> (verdadero o falso).\nSi la condición entre paréntesis es verdadera, se ejecuta el primer bloque. Si no, se ejecuta el <code>else</code>.", notes: "" },
          { id: "w7-t-7", type: "text", title: "Estructuras de Control: if", content: "Ejemplo clásico de una condición simple:", code: "let nota = 14;\n\nif (nota >= 13) {\n    console.log('¡Aprobaste el curso!');\n} else {\n    console.log('Debes esforzarte más');\n}", language: "javascript", notes: "" },
          { id: "w7-t-8", type: "text", title: "Ciclos o Bucles (For / While)", content: "Los ciclos nos permiten repetir una acción muchas veces sin tener que escribir el código repetidamente.\n\n• <code>for</code>: Cuando sabemos exactamente cuántas veces queremos repetir algo.\n• <code>while</code>: Cuando queremos repetir algo MIENTRAS una condición sea verdadera.", code: "/* Imprimir los números del 1 al 5 */\nfor (let i = 1; i <= 5; i++) {\n    console.log('Número: ' + i);\n}\n\n/* Lo mismo, pero con while */\nlet contador = 1;\nwhile (contador <= 5) {\n    console.log('Contador: ' + contador);\n    contador++;\n}", language: "javascript", notes: "" },
          { id: "w7-t-9", type: "text", title: "Funciones", content: "Una función es un bloque de código reutilizable que realiza una tarea específica.\nPuede recibir datos de entrada (parámetros) y devolver un resultado (return).", code: "/* Definición de la función */\ndef sumar(numero1, numero2) {\n    let resultado = numero1 + numero2;\n    return resultado;\n}\n\n/* Uso de la función */\nlet totalSuma = sumar(10, 5);\nconsole.log(totalSuma); // Imprime: 15", language: "javascript", notes: "" },
          { id: "w7-t-10", type: "text", title: "El DOM (Document Object Model)", content: "El DOM es la representación que hace el navegador de tu HTML. JavaScript puede interactuar con el DOM para cambiar textos, colores o agregar elementos al vuelo.\n\nEl objeto global se llama <code>document</code> y tiene métodos como <code>getElementById</code> o <code>querySelector</code>.", code: "/* Supongamos que en HTML tenemos: <h1 id=\"titulo\">Hola</h1> */\n\n// 1. Buscamos el elemento en el DOM\nconst miTitulo = document.getElementById('titulo');\n\n// 2. Modificamos su texto interno\nmiTitulo.textContent = '¡JavaScript estuvo aquí!';\n\n// 3. Modificamos su CSS\nmiTitulo.style.color = 'red';", language: "javascript", notes: "" },
          { id: "w7-t-11", type: "text", title: "Manejo de Eventos", content: "Un \"evento\" es cualquier cosa que sucede en la página web: un clic, pulsar una tecla, mover el mouse.\n\nPodemos hacer que JavaScript \"escuche\" (<code>addEventListener</code>) estos eventos y ejecute una función como respuesta.", code: "/* HTML: <button id=\"miBoton\">Hazme clic</button> */\n\nconst boton = document.getElementById('miBoton');\n\nboton.addEventListener('click', function() {\n    alert('¡Hiciste clic en el botón!');\n});", language: "javascript", notes: "" },
          { id: "w7-t-12", type: "quiz", title: "Pregunta Rápida", question: "¿Qué método del DOM utilizarías para encontrar un elemento HTML por su atributo 'id'?", options: ["document.findId()", "document.getElementById()", "window.searchId()", "document.querySelectorId()"], answer: "document.getElementById()", explanation: "getElementById es el método estándar más directo y rápido para seleccionar un único elemento del DOM basándose en su ID único.", notes: "" },
          { id: "w7-t-13", type: "callout", calloutType: "tip", title: "Validación y Depuración", content: "La regla de oro del desarrollo web: NUNCA confíes en los datos ingresados por el usuario. Usa JS para validar (ej. comprobar que un campo de correo tenga el formato correcto) antes de enviar la información al backend. ¡Y usa la consola (F12) siempre para buscar errores en rojo!", notes: "" },
          { id: "w7-t-14", type: "closing", title: "Fin de la teoría", subtitle: "¿Listos para programar en el Taller?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w7-w-1", type: "cover", title: "Scripts y DOM", subtitle: "Taller Práctico - Semana 07", notes: "" },
          { id: "w7-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Vinculación JS-HTML y la Consola.", "Prácticas de Variables y Condiciones.", "Creación de funciones utilitarias.", "Manipulación del DOM.", "Eventos de clic y cambio.", "Extracción de valores de inputs.", "Ejercicio Integrador: Calculadora Básica.", "<b>Tarea: HT-03 Implementa interactividad JS</b>"], notes: "" },
          { id: "w7-w-3", type: "exercise", title: "Fase 1: Vinculación y Consola", subtitle: "Tu primer script",
            functionsToUse: ["<script src=\"...\">", "console.log()"],
            content: "Para que el navegador ejecute JS, debemos vincularlo al HTML, de forma similar al CSS pero usando la etiqueta <code>&lt;script&gt;</code> justo antes de cerrar el <code>&lt;/body&gt;</code>.\n\nCrea un archivo <code>app.js</code>, vincúlalo a tu HTML y muestra un mensaje en la consola.",
            code: `<!-- En tu index.html (antes del cierre del body) -->
    <script src="app.js"></script>
</body>

/* En tu archivo app.js */
// Escribe un mensaje en la consola para probar
console.____('Hola, la vinculación funciona');`, language: "javascript", notes: "" },
          { id: "w7-w-4", type: "exercise", title: "Fase 2: Variables y Condiciones", subtitle: "Lógica básica",
            functionsToUse: ["let", "const", "if / else"],
            content: "Crea un pequeño script que defina una constante con el precio de un producto y una variable con el dinero que tienes en tu billetera.\n\nLuego, utiliza una condición <code>if / else</code> para imprimir en consola si puedes comprarlo o si te falta dinero.",
            code: `/* En app.js */
const precioProducto = 50;
let miDinero = 30;

// Escribe la condición if / else
if ( _____ >= _____ ) {
    console.log('¡Puedes comprarlo!');
} else {
    console.log('No tienes suficiente dinero.');
}`, language: "javascript", notes: "" },
          { id: "w7-w-5", type: "exercise", title: "Fase 3: Funciones Utilitarias", subtitle: "Evitando código repetitivo",
            functionsToUse: ["function", "return"],
            content: "Vas a crear una función que reciba dos números y retorne el área de un rectángulo.\n\nUna vez creada, llámala un par de veces con diferentes valores y guarda los resultados en variables para imprimirlos en consola.",
            code: `// 1. Declara la función calcularAreaRectangulo
function calcularAreaRectangulo(base, altura) {
    // Retorna la multiplicación de base por altura
    
}

// 2. Llama a la función y muestra el resultado
let area1 = calcularAreaRectangulo(10, 5);
console.log('El primer área es:', area1);`, language: "javascript", notes: "" },
          { id: "w7-w-6", type: "exercise", title: "Fase 4: Manipulando el DOM", subtitle: "Modificando HTML desde JS",
            functionsToUse: ["getElementById", "textContent"],
            content: "Crea en tu HTML un <code>&lt;p id=\"mensaje\"&gt;Texto original&lt;/p&gt;</code>.\n\nAhora, desde tu archivo JavaScript, atrapa ese párrafo usando su ID y cámbiale el texto a '¡Texto modificado por JS!'.",
            code: `// En app.js

// 1. Selecciona el elemento del DOM
const parrafo = document._________('mensaje');

// 2. Modifica su contenido de texto
parrafo._______ = '¡Texto modificado por JS!';`, language: "javascript", notes: "" },
          { id: "w7-w-7", type: "exercise", title: "Fase 5: Eventos de Usuario", subtitle: "Reaccionando a los clics",
            functionsToUse: ["addEventListener", "'click'"],
            content: "La verdadera magia ocurre cuando JS reacciona al usuario. Crea un botón en tu HTML: <code>&lt;button id=\"btnAlerta\"&gt;Avisar&lt;/button&gt;</code>.\n\nEn JS, selecciona el botón y agrégale un \"escuchador de eventos\" (Event Listener) para que, al hacer clic, lance una alerta.",
            code: `// 1. Selecciona el botón
const botonAlerta = document.getElementById('btnAlerta');

// 2. Agrega el evento click
botonAlerta.addEventListener('______', function() {
    // 3. Lanza la alerta aquí
    alert('¡Alerta desde el botón!');
});`, language: "javascript", notes: "" },
          { id: "w7-w-8", type: "quiz", title: "Pregunta Rápida", question: "Si tienes un campo de texto `<input id=\"nombre\" type=\"text\">`, ¿qué propiedad de JS te permite extraer lo que el usuario escribió ahí adentro?", options: ["input.textContent", "input.innerHTML", "input.value", "input.text"], answer: "input.value", explanation: "Para los elementos de formulario como los <input>, el contenido que el usuario escribe se almacena en la propiedad '.value', no en textContent.", notes: "" },
          { id: "w7-w-9", type: "exercise", title: "Fase 6: Leyendo Inputs", subtitle: "Extrayendo valores del usuario",
            functionsToUse: [".value"],
            content: "Crea un campo de texto (input) y un botón en HTML. \nAl hacer clic en el botón, extrae el valor (value) que el usuario escribió en el input y muéstralo en la consola.",
            code: `/* HTML:
<input type="text" id="campoNombre" placeholder="Tu nombre">
<button id="btnSaludar">Saludar</button>
*/

const inputNombre = document.getElementById('campoNombre');
const botonSaludar = document.getElementById('btnSaludar');

botonSaludar.addEventListener('click', function() {
    // Atrapa el valor escrito por el usuario
    let nombreEscrito = inputNombre.______;
    
    console.log('Hola, ' + nombreEscrito);
});`, language: "javascript", notes: "" },
          { id: "w7-w-10", type: "exercise", title: "Reto Integrador: Calculadora", subtitle: "Poniendo todo en práctica",
            functionsToUse: ["getElementById", ".value", "parseInt()", "textContent"],
            content: "Vamos a crear una mini calculadora que suma dos números.\n\n<b>Estructura HTML:</b> Crea 2 inputs numéricos, 1 botón de sumar, y 1 párrafo para mostrar el resultado.\n<b>Lógica JS:</b> Al hacer clic en el botón, atrapa los valores de los inputs, conviértelos a números (con <code>Number()</code> o <code>parseInt()</code>), súmalos y muestra el resultado en el párrafo.",
            code: `// Esqueleto de la lógica
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
const btnSumar = document.getElementById('btnSumar');
const pResultado = document.getElementById('resultado');

btnSumar.addEventListener('click', function() {
    // 1. Extrae los valores y conviértelos a número
    
    // 2. Suma ambos valores
    
    // 3. Muestra el resultado modificando el textContent del párrafo
    
});`, language: "javascript", notes: "No revelar todo el código de la suma. Que los estudiantes usen Number() y textContent." },
          { id: "w7-w-11", type: "callout", calloutType: "info", title: "Depurando en Consola", content: "Si tu calculadora no suma (por ejemplo, si escribes 1 y 1 y el resultado es '11'), significa que JS está tratando los números como texto (Strings) y los está concatenando en lugar de sumar. ¡Recuerda siempre convertir los values (que por defecto son texto) a números matemáticos!", notes: "" },
          { id: "w7-w-12", type: "closing", title: "Taller Finalizado", subtitle: "Sube tu calculadora interactiva a la plataforma como HT-03.", notes: "" }
        ]
      }
    },
    {
      id: "week-08",
      number: 8,
      title: "Semana 08",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp8-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp8-t-1a", type: "title", title: "Tareas", content: "HT-04 Crea formularios web", notes: "" },
            { id: "sp8-t-1b", type: "text", title: "Semana 8", content: "Durante esta semana el estudiante comprenderá la construcción de formularios web utilizando HTML5, identificando los principales elementos de entrada, salida y selección de datos. También se estudiará el procesamiento mediante los métodos GET y POST, la validación con HTML5 y JavaScript, así como la generación de mensajes de error y confirmación. Además, se reforzarán criterios básicos de privacidad y protección de datos personales.", notes: "" },
            { id: "sp8-t-2", type: "title", title: "Objetivo General", content: "Comprender la estructura, funcionamiento y validación de formularios web en HTML5 para gestionar el ingreso de datos de manera organizada, segura y funcional.", notes: "" },
            { id: "sp8-t-3", type: "text", title: "Objetivos Específicos", content: "• Identificar los principales elementos y tipos de campos utilizados en formularios HTML5.\n• Comprender el funcionamiento de los métodos GET y POST para el envío de información.\n• Reconocer los mecanismos básicos de validación con HTML5 y JavaScript.\n• Comprender la importancia de proteger los datos personales ingresados por los usuarios.", notes: "" },
            { id: "sp8-t-4", type: "text", title: "Temas Teóricos a Tratar", content: "• Elementos de entrada y salida de datos en formularios HTML5.\n• Tipos de campos: texto, correo, número y selección.\n• Botones de acción y mecanismos de validación.\n• Métodos GET y POST para procesamiento de formularios.\n• Validaciones mediante HTML5 y JavaScript.\n• Mensajes de error y confirmación.\n• Diseño de formularios para registro de clientes o matrículas.\n• Integración básica del frontend con servicios backend.\n• Protección de datos personales y consentimiento informado.\n• Lógica condicional aplicada a validaciones.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp8-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp8-w-1a", type: "title", title: "Tareas", content: "HT-04 Crea formularios web", notes: "" },
            { id: "sp8-w-1b", type: "text", title: "Semana 8", content: "El estudiante desarrollará formularios funcionales para registrar información de usuarios, clientes o matrículas. Se trabajará con campos de texto, correo, número, selección y botones, aplicando validaciones antes del envío. Como actividad integradora, se diseñará una interfaz de registro y una web comercial sencilla con formulario activo.", notes: "" },
            { id: "sp8-w-2", type: "title", title: "Objetivo General", content: "Aplicar HTML5 y JavaScript en la creación de formularios web que permitan registrar, validar y procesar información de usuarios de manera funcional.", notes: "" },
            { id: "sp8-w-3", type: "text", title: "Objetivos Específicos", content: "• Crear formularios utilizando diferentes tipos de campos y botones.\n• Implementar validaciones básicas antes del envío de información.\n• Aplicar los métodos GET y POST en ejercicios de procesamiento de formularios.\n• Diseñar una interfaz de registro clara y funcional.", notes: "" },
            { id: "sp8-w-4", type: "text", title: "Prácticas y Actividades", content: "• Creación de formularios utilizando etiquetas HTML5.\n• Implementación de campos de texto, correo, número y listas de selección.\n• Creación de botones para envío y control del formulario.\n• Aplicación de validaciones básicas mediante HTML5 y JavaScript.\n• Configuración de mensajes de error y confirmación.\n• Práctica de envío de información utilizando GET y POST.\n• Diseño de un formulario para registro de usuarios, clientes o matrículas.\n• Simulación de un registro de usuarios con validación.\n• Creación de una web comercial sencilla con formulario activo.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w8-t-1", type: "cover", title: "Formularios y Validación", subtitle: "Conocimiento Teórico - Semana 08", notes: "" },
          { id: "w8-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Estructura básica de un Formulario HTML.", "Métodos GET y POST.", "Tipos de campos de entrada (Inputs).", "Elementos de selección (Select, Radio, Checkbox).", "Botones de acción.", "Validación nativa con HTML5.", "Validación personalizada con JavaScript.", "Protección de datos y privacidad."], notes: "" },
          { id: "w8-t-3", type: "text", title: "¿Qué es un Formulario?", content: "Un formulario es la interfaz principal para interactuar con los usuarios. Permite recopilar información como nombres, correos o contraseñas, para luego enviarla a un servidor.\n\nTodo formulario debe estar envuelto en la etiqueta <code>&lt;form&gt;</code>, la cual tiene dos atributos vitales: <b>action</b> (adónde va la data) y <b>method</b> (cómo viaja la data).", code: "<form action=\"/guardar-datos\" method=\"POST\">\n    <!-- Los campos de entrada van aquí -->\n</form>", language: "html", notes: "" },
          { id: "w8-t-4", type: "text", title: "Métodos GET y POST", content: "Son las dos formas principales de enviar datos:\n\n• <b>GET</b>: Envía los datos anexados a la URL. Útil para búsquedas o filtros, pero <b>INSEGURO</b> para contraseñas o datos sensibles porque quedan expuestos en el historial del navegador.\n\n• <b>POST</b>: Envía los datos de forma oculta en el cuerpo de la petición HTTP. Es el método estándar para formularios de registro, login o pagos.", code: "<!-- Búsqueda (Se ve en la URL: misitio.com/buscar?q=zapatos) -->\n<form method=\"GET\" action=\"/buscar\">\n\n<!-- Login (Los datos viajan ocultos) -->\n<form method=\"POST\" action=\"/login\">", language: "html", notes: "" },
          { id: "w8-t-5", type: "text", title: "Elementos de Entrada (Inputs)", content: "El elemento <code>&lt;input&gt;</code> es el corazón de los formularios. Cambiando su atributo <code>type</code>, cambia completamente su comportamiento.\n\nEs fundamental usar la etiqueta <code>&lt;label&gt;</code> vinculada al input mediante el atributo <code>id</code> para mejorar la accesibilidad.", code: "<label for=\"nombreUsuario\">Nombre:</label>\n<input type=\"text\" id=\"nombreUsuario\" name=\"nombre\">\n\n<label for=\"edadUsuario\">Edad:</label>\n<input type=\"number\" id=\"edadUsuario\" name=\"edad\">", language: "html", notes: "" },
          { id: "w8-t-6", type: "text", title: "Tipos de Campos Avanzados HTML5", content: "HTML5 introdujo tipos de input específicos que facilitan la vida del usuario (mostrando teclados especiales en móviles) y ofrecen validación automática.", code: "<!-- Fuerza a escribir un correo válido (@ y dominio) -->\n<input type=\"email\" name=\"correo\">\n\n<!-- Despliega un calendario nativo -->\n<input type=\"date\" name=\"fechaNacimiento\">\n\n<!-- Oculta los caracteres al escribir -->\n<input type=\"password\" name=\"clave\">", language: "html", notes: "" },
          { id: "w8-t-7", type: "text", title: "Elementos de Selección", content: "Cuando queremos que el usuario elija entre opciones predefinidas:\n\n• <b>Select / Option:</b> Un menú desplegable.\n• <b>Radio Buttons:</b> Seleccionar UNA sola opción de un grupo.\n• <b>Checkboxes:</b> Seleccionar VARIAS opciones.", code: "<!-- Radio (Deben tener el mismo 'name' para agruparse) -->\n<input type=\"radio\" id=\"tallaS\" name=\"talla\" value=\"S\">\n<label for=\"tallaS\">Small</label>\n\n<input type=\"radio\" id=\"tallaM\" name=\"talla\" value=\"M\">\n<label for=\"tallaM\">Medium</label>", language: "html", notes: "" },
          { id: "w8-t-8", type: "text", title: "Botones de Acción", content: "Existen tres tipos principales de botones dentro de un formulario:\n\n• <code>type=\"submit\"</code>: Envía el formulario (es el comportamiento por defecto).\n• <code>type=\"reset\"</code>: Limpia todos los campos del formulario.\n• <code>type=\"button\"</code>: No hace nada por sí solo, ideal para activarle funciones JavaScript personalizadas.", code: "<form>\n    <input type=\"text\">\n    <button type=\"button\">Cancelar</button>\n    <button type=\"submit\">Guardar</button>\n</form>", language: "html", notes: "" },
          { id: "w8-t-9", type: "callout", calloutType: "warning", title: "Validación Nativa HTML5", content: "Antes de enviar un formulario, debemos asegurarnos de que la información sea correcta. HTML5 permite hacer validaciones sin JavaScript usando atributos directamente en la etiqueta input:\n\n• <b>required</b>: El campo no puede estar vacío.\n• <b>minlength / maxlength</b>: Límite de caracteres.\n• <b>min / max</b>: Límites de valores para números.\n• <b>pattern</b>: Validación avanzada usando expresiones regulares.", notes: "" },
          { id: "w8-t-10", type: "text", title: "Validación con JavaScript", content: "A veces la validación HTML5 no es suficiente (ej. comprobar que dos contraseñas coinciden). \n\nCon JavaScript podemos interceptar el envío del formulario usando <code>evento.preventDefault()</code>, validar lo que queramos, y decidir si enviamos los datos o mostramos un error.", code: "const form = document.getElementById('miFormulario');\n\nform.addEventListener('submit', function(evento) {\n    // Detiene el envío automático del formulario\n    evento.preventDefault();\n    \n    // Aquí va tu lógica de validación\n    console.log('Validando antes de enviar...');\n});", language: "javascript", notes: "" },
          { id: "w8-t-11", type: "quiz", title: "Pregunta Rápida", question: "¿Qué método HTTP utilizarías para enviar la información de una tarjeta de crédito en una pasarela de pago?", options: ["GET", "POST", "SUBMIT", "PUT"], answer: "POST", explanation: "Para datos sensibles siempre se debe usar POST, ya que los datos viajan ocultos en el cuerpo de la petición y no en la URL como ocurre con GET.", notes: "" },
          { id: "w8-t-12", type: "callout", calloutType: "info", title: "Privacidad y Datos Personales", content: "Al diseñar formularios, solicita SÓLO la información estrictamente necesaria. Es una buena práctica (y en muchos países, una ley) incluir una casilla de verificación (checkbox) donde el usuario acepta las Políticas de Privacidad y consiente el tratamiento de sus datos personales antes de enviar el formulario.", notes: "" },
          { id: "w8-t-13", type: "closing", title: "Fin de la teoría", subtitle: "¿Listos para construir y validar formularios en el Taller?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w8-w-1", type: "cover", title: "Formularios Funcionales", subtitle: "Taller Práctico - Semana 08", notes: "" },
          { id: "w8-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Creación de la estructura del formulario.", "Implementación de Inputs y Labels.", "Controles de Selección (Radio / Select).", "Validaciones nativas (required, minlength).", "Interceptación del envío con JavaScript.", "Validación personalizada (Contraseñas).", "Mensajes de error dinámicos.", "Reto Integrador: Formulario Comercial.", "<b>Tarea: HT-04 Crea formularios web</b>"], notes: "" },
          { id: "w8-w-3", type: "exercise", title: "Fase 1: Estructura Básica", subtitle: "Creando el contenedor del formulario",
            functionsToUse: ["<form>", "action", "method=\"POST\""],
            content: "Todo formulario necesita la etiqueta <code>&lt;form&gt;</code>.\n\nCrea la estructura principal de un formulario en HTML. Asígnale un <code>id</code> para manipularlo con JS más adelante, y configura el método de envío a POST.",
            code: `<!-- En tu index.html -->\n\n<!-- Crea el formulario y configura su método -->\n<form id=\"registroUsuario\" method=\"_____\" action=\"/procesar\">\n    <!-- Aquí irán los campos (por ahora vacío) -->\n</form>`, language: "html", notes: "" },
          { id: "w8-w-4", type: "exercise", title: "Fase 2: Campos de Texto y Correo", subtitle: "Atrapando datos básicos",
            functionsToUse: ["<label>", "<input type=\"text\">", "<input type=\"email\">"],
            content: "Dentro del formulario que acabas de crear, agrega dos campos: uno para el Nombre Completo y otro para el Correo Electrónico.\n\nRecuerda usar la etiqueta <code>&lt;label&gt;</code> vinculada correctamente al <code>id</code> de cada input.",
            code: `<form id=\"registroUsuario\" method=\"POST\" action=\"/procesar\">\n    <!-- Campo de Nombre -->\n    <label for=\"nombre\">Nombre Completo:</label>\n    <input type=\"_____\" id=\"nombre\" name=\"nombre\">\n    \n    <!-- Campo de Correo -->\n    <label for=\"correo\">Correo Electrónico:</label>\n    <input type=\"_____\" id=\"correo\" name=\"correo\">\n</form>`, language: "html", notes: "" },
          { id: "w8-w-5", type: "exercise", title: "Fase 3: Campos de Contraseña y Botón", subtitle: "Terminando la estructura visual",
            functionsToUse: ["<input type=\"password\">", "<button type=\"submit\">"],
            content: "Agrega un campo para que el usuario cree una Contraseña, asegurándote de que el texto se oculte al escribir.\n\nFinalmente, agrega el botón de envío (Submit) en la parte inferior del formulario.",
            code: `    <!-- Campo de Contraseña -->\n    <label for=\"clave\">Contraseña:</label>\n    <input type=\"________\" id=\"clave\" name=\"clave\">\n    \n    <!-- Botón de Envío -->\n    <button type=\"______\">Registrarse</button>\n</form>`, language: "html", notes: "" },
          { id: "w8-w-6", type: "exercise", title: "Fase 4: Validación Nativa HTML5", subtitle: "La primera barrera de defensa",
            functionsToUse: ["required", "minlength"],
            content: "No queremos que nos envíen formularios vacíos.\n\nModifica los inputs que creaste en los pasos anteriores agregando el atributo <code>required</code> a todos ellos. Además, exige que la contraseña tenga al menos 6 caracteres usando <code>minlength</code>.",
            code: `    <!-- Modifica este input -->\n    <input type=\"password\" id=\"clave\" name=\"clave\" ________ minlength=\"___\">`, language: "html", notes: "" },
          { id: "w8-w-7", type: "exercise", title: "Fase 5: Interceptando el Formulario", subtitle: "Tomando el control con JavaScript",
            functionsToUse: ["addEventListener('submit')", "preventDefault()"],
            content: "En un archivo <code>app.js</code>, atrapa el formulario usando su ID.\nAgrega un escuchador de eventos para el momento del envío ('submit'). Lo más importante: usa <code>preventDefault()</code> para evitar que la página se recargue inmediatamente.",
            code: `// Seleccionamos el formulario\nconst formRegistro = document.getElementById('registroUsuario');\n\n// Escuchamos el evento de envío\nformRegistro.addEventListener('______', function(evento) {\n    // Evitamos el envío por defecto\n    evento.______________;\n    \n    console.log('Formulario interceptado. Listo para validar con JS.');\n});`, language: "javascript", notes: "" },
          { id: "w8-w-8", type: "exercise", title: "Fase 6: Leyendo Datos en JS", subtitle: "Extrayendo valores de los inputs",
            functionsToUse: ["getElementById", ".value"],
            content: "Dentro del evento 'submit', extrae el valor (value) que el usuario escribió en el campo de la contraseña y muéstralo en la consola.\n\nEsto es fundamental para poder validar los datos antes de enviarlos.",
            code: `formRegistro.addEventListener('submit', function(evento) {\n    evento.preventDefault();\n    \n    // Atrapamos el input de la contraseña\n    const inputClave = document.getElementById('clave');\n    \n    // Extraemos su valor\n    const valorClave = inputClave.______;\n    \n    console.log('La contraseña ingresada es:', valorClave);\n});`, language: "javascript", notes: "" },
          { id: "w8-w-9", type: "exercise", title: "Fase 7: Mostrando Errores Dinámicos", subtitle: "Informando al usuario",
            functionsToUse: ["textContent", "style.color"],
            content: "Crea un <code>&lt;p id=\"mensajeError\"&gt;&lt;/p&gt;</code> vacío debajo del formulario en tu HTML.\n\nEn JS, valida si la contraseña contiene la palabra '123'. Si es así, escribe un mensaje de error en ese párrafo y píntalo de rojo.",
            code: `    const valorClave = inputClave.value;\n    const pError = document.getElementById('mensajeError');\n    \n    if (valorClave.includes('123')) {\n        // Mostramos el error\n        pError._______ = 'La contraseña es muy insegura.';\n        pError.style.color = 'red';\n    } else {\n        // Si todo está bien, simulamos el envío\n        pError.textContent = '¡Registro Exitoso!';\n        pError.style.color = 'green';\n    }`, language: "javascript", notes: "" },
          { id: "w8-w-10", type: "exercise", title: "Reto Integrador: Formulario Comercial", subtitle: "Creando una web de registro real",
            functionsToUse: ["<select>", "<input type=\"checkbox\">", "CSS styling"],
            content: "Crea una página de registro para un servicio ficticio (ej. Netflix, Spotify o un Gimnasio).\n\n<b>Requisitos:</b>\n1. Diseña el formulario con CSS (centrado, bordes, colores corporativos).\n2. Debe incluir: Nombre (text), Correo (email), Plan elegido (select/option), y un Checkbox de 'Acepto términos y condiciones'.\n3. Aplica validación HTML5 (campos obligatorios).\n4. Usa JS para evitar el envío y simular un registro exitoso en consola.",
            code: `<!-- Esqueleto de la lista de selección (Plan) -->\n<label for=\"plan\">Elige tu Plan:</label>\n<select id=\"plan\" name=\"plan\" required>\n    <option value=\"\">-- Selecciona --</option>\n    <option value=\"basico\">Plan Básico ($10)</option>\n    <option value=\"pro\">Plan Pro ($20)</option>\n</select>`, language: "html", notes: "No revelar todo el código. Que los alumnos apliquen lo aprendido para construir el formulario completo y estilizado." },
          { id: "w8-w-11", type: "callout", calloutType: "info", title: "Simulando el Backend", content: "En el mundo real, después de validar con JavaScript, enviaríamos los datos a un servidor (Backend) usando tecnologías como <code>fetch</code> o <code>axios</code>. Por ahora, detener el envío con preventDefault() y mostrar un '¡Registro Exitoso!' es la mejor forma de simular y probar tu frontend de manera aislada.", notes: "" },
          { id: "w8-w-12", type: "closing", title: "Taller Finalizado", subtitle: "Asegúrate de aplicar buenos estilos CSS a tu formulario y súbelo a la plataforma como HT-04.", notes: "" }
        ]
      }
    }
  ]
};
