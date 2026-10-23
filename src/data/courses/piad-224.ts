export const piad224 = {
  id: "piad-224",
  name: "SISTEMAS OPERATIVOS Y COMUNICACIÓN DE DATOS",
  code: "PIAD-224",
  description: "Aprende los fundamentos de la administración de sistemas operativos, arquitectura de computadoras y redes de comunicación de datos.",
  imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  weeks: [
    {
      id: "week-13",
      number: 13,
      title: "Semana 13",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp13-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp13-t-2", type: "title", title: "Tareas", content: "HT-01 Analiza arquitectura SO", notes: "" },
            { id: "sp13-t-3", type: "text", title: "Semana 13", content: "Durante esta semana el estudiante comprenderá los fundamentos de los sistemas operativos y su arquitectura básica. Se estudiarán los componentes esenciales del kernel, el shell y la API, así como la gestión de recursos como procesos, memoria y entrada/salida. También se abordarán los tipos de sistemas operativos según su capacidad de tareas y usuarios, y la relación del sistema operativo con la comunicación de datos. Finalmente, se reconocerán los controladores de dispositivos, las interrupciones y los buses del sistema como elementos que permiten la interacción entre hardware, software y periféricos.", notes: "" },
            { id: "sp13-t-4", type: "title", title: "Objetivo General", content: "Comprender la arquitectura básica de los sistemas operativos, identificando los componentes del kernel, el shell y la API, la gestión de recursos, los tipos de sistemas operativos y su relación con el hardware, los periféricos y la comunicación de datos.", notes: "" },
            { id: "sp13-t-5", type: "text", title: "Objetivos Específicos", content: "Identificar los componentes principales del sistema operativo y la función del kernel y el shell.\nReconocer la gestión de procesos, memoria y entrada/salida dentro del sistema operativo.\nDiferenciar los sistemas operativos monotarea y multitarea, monousuario y multiusuario.\nDescribir los controladores, interrupciones y buses que conectan el hardware con el sistema operativo.", notes: "" },
            { id: "sp13-t-6", type: "text", title: "Temas Teóricos a Tratar", content: "Fundamentos de los sistemas operativos.\nArquitectura básica: kernel, shell y API.\nGestión de procesos y memoria.\nGestión de entrada y salida.\nTipos de sistemas operativos.\nControladores de dispositivos.\nInterrupciones y buses del sistema.\nRelación entre SO y comunicación de datos.\nRol de los periféricos en los sistemas de información.\nUso responsable de recursos y riesgos eléctricos.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp13-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp13-w-2", type: "title", title: "Tareas", content: "HT-01 Analiza arquitectura SO", notes: "" },
            { id: "sp13-w-3", type: "text", title: "Semana 13", content: "En el taller, el estudiante identificará los componentes del kernel y del shell en un equipo informático y reconocerá los componentes principales del sistema operativo. Analizará la relación entre el sistema operativo y la comunicación de datos, y describirá el rol de los periféricos dentro de los sistemas de información. Además, realizará un inventario del hardware de su computadora personal, investigará el mercado actual de sistemas operativos y elaborará un cuadro comparativo de periféricos, aplicando criterios de uso responsable y prevención de riesgos eléctricos.", notes: "" },
            { id: "sp13-w-4", type: "title", title: "Objetivo General", content: "Aplicar los fundamentos de la arquitectura de sistemas operativos mediante la identificación de sus componentes, el análisis de la gestión de recursos y la elaboración de un inventario de hardware y un cuadro comparativo de periféricos.", notes: "" },
            { id: "sp13-w-5", type: "text", title: "Objetivos Específicos", content: "Identificar el kernel, el shell y los componentes principales del sistema operativo en un equipo.\nRelacionar la gestión de procesos, memoria y entrada/salida con el funcionamiento del equipo.\nElaborar un inventario del hardware y un cuadro comparativo de periféricos.\nInvestigar el mercado actual de sistemas operativos y presentar los resultados.", notes: "" },
            { id: "sp13-w-6", type: "text", title: "Prácticas y Actividades", content: "Identificación del kernel y el shell en el equipo de trabajo.\nReconocimiento de los componentes principales del sistema operativo.\nAnálisis de la relación entre el sistema operativo y la comunicación de datos.\nAnálisis de la gestión de procesos, memoria y entrada/salida.\nElaboración del inventario de hardware de la PC personal.\nInvestigación del mercado actual de sistemas operativos.\nElaboración de un cuadro comparativo de periféricos.\nDescripción del rol de los periféricos en los sistemas de información.\nAplicación de medidas de prevención de riesgos eléctricos.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w13-t-1", type: "cover", title: "Arquitectura de Sistemas Operativos", subtitle: "Conocimiento Teórico - Semana 13", notes: "" },
           { id: "w13-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Fundamentos y funciones del sistema operativo.", "Arquitectura básica: kernel, shell y API.", "Gestión de procesos, memoria y entrada/salida.", "Tipos de sistemas operativos.", "Hardware, controladores e interrupciones.", "Relación con la comunicación de datos.", "Ética, seguridad e higiene."], code: `USUARIO -> SHELL -> API -> KERNEL -> HARDWARE\n                     ^\n                solicitud de una aplicación`, language: "text", notes: "" },
           { id: "w13-t-3", type: "text", title: "¿Qué es un sistema operativo?", content: "Un sistema operativo es el software principal que administra los recursos de la computadora y permite la interacción entre el usuario, las aplicaciones y el hardware.\n\nSus funciones principales son:\n• Gestionar procesos, memoria y entrada/salida.\n• Organizar el almacenamiento y los archivos.\n• Controlar los dispositivos y periféricos.\n• Proporcionar una interfaz de uso para el usuario y las aplicaciones.\n\nSin el sistema operativo, el hardware no podría ejecutar tareas de forma coordinada.", code: `USUARIO -> APLICACIÓN -> SISTEMA OPERATIVO -> HARDWARE\n   "abre"        "solicita memoria"       "controla"`, language: "text", notes: "" },
           { id: "w13-t-4", type: "text", title: "Arquitectura básica del SO", content: "<b>Kernel:</b> es el núcleo del sistema operativo. Administra la memoria, los procesos, los dispositivos y la comunicación con el hardware.\n\n<b>Shell:</b> es la interfaz que interpreta las órdenes del usuario y las transmite al kernel. Puede ser gráfica o de línea de comandos.\n\n<b>API:</b> es el conjunto de funciones y reglas que permiten que las aplicaciones soliciten servicios al sistema operativo sin acceder directamente al hardware.", code: `USUARIO -> SHELL -> API -> KERNEL -> DRIVER -> PERIFÉRICO\n"abre archivo" -> "pide servicio" -> "ejecuta" -> "controla"`, language: "text", notes: "" },
           { id: "w13-t-5", type: "callout", calloutType: "info", title: "Kernel y Shell: dos roles distintos", content: "El <b>kernel</b> trabaja cerca del hardware y toma decisiones sobre los recursos. El <b>shell</b> trabaja cerca del usuario y traduce sus órdenes. La <b>API</b> actúa como un contrato de comunicación entre las aplicaciones y el sistema operativo.", code: `ORDEN: "abrir archivo"\nUSUARIO -> SHELL -> API -> KERNEL -> DISCO\nRESULTADO: archivo abierto`, language: "text", notes: "" },
           { id: "w13-t-6", type: "text", title: "Gestión de recursos", content: "<b>Procesos:</b> el sistema operativo crea, planifica y finaliza los programas en ejecución.\n\n<b>Memoria:</b> asigna espacio a cada proceso y evita conflictos entre programas.\n\n<b>Entrada/salida (E/S):</b> coordina la lectura y escritura de datos entre el equipo y los dispositivos.\n\nUna gestión adecuada permite estabilidad, rendimiento y uso eficiente del hardware.", code: `NAVEGADOR -> PROCESADOR\nEDITOR -> MEMORIA RAM\nARCHIVO -> DISCO\nIMPRESORA <- SALIDA`, language: "text", notes: "" },
           { id: "w13-t-7", type: "text", title: "Tipos de sistemas operativos", content: "<b>Monotarea:</b> ejecuta una tarea a la vez.\n<b>Multitarea:</b> ejecuta varios procesos de forma concurrente.\n\n<b>Monousuario:</b> atiende a un usuario a la vez.\n<b>Multiusuario:</b> permite el trabajo de varios usuarios sobre el mismo sistema.\n\nEstas clasificaciones describen la capacidad del sistema operativo para administrar tareas y usuarios.", code: `                         TAREAS\nMONOTAREA   [NAVEGADOR]\nMULTITAREA  [NAVEGADOR] [EDITOR] [MÚSICA]\n\n                         USUARIOS\nMONOUSUARIO [ANA]\nMULTIUSUARIO [ANA] [LUIS] [SOFÍA]`, language: "text", notes: "" },
           { id: "w13-t-8", type: "text", title: "SO y comunicación de datos", content: "El sistema operativo participa en la comunicación de datos cuando administra los controladores, los puertos y los protocolos que permiten el intercambio de información entre el equipo y otros dispositivos o sistemas.\n\nSu función es coordinar el envío y la recepción de datos, asegurar el uso correcto de los recursos y mantener la integridad de la información durante la transmisión.", code: `APLICACIÓN -> PROTOCOLO -> CONTROLADOR -> PUERTO -> RED\n   mensaje       reglas       driver       interfaz   destino`, language: "text", notes: "" },
           { id: "w13-t-9", type: "text", title: "Hardware y periféricos", content: "<b>Controladores o drivers:</b> permiten que el sistema operativo reconozca y controle un dispositivo.\n\n<b>Interrupciones:</b> avisos que envía el hardware al procesador para solicitar atención.\n\n<b>Buses del sistema:</b> canales que transportan datos, direcciones y señales de control entre los componentes.\n\nEstos elementos hacen posible la comunicación entre el procesador, la memoria y los periféricos.", code: `TECLADO -> INTERRUPCIÓN -> CPU -> DRIVER -> APLICACIÓN\nDATOS: 01000001  ->  "A"`, language: "text", notes: "" },
          { id: "w13-t-10", type: "callout", calloutType: "tip", title: "El rol de los periféricos", content: "Los periféricos amplían las capacidades del sistema: permiten ingresar datos, mostrar resultados, almacenar información o comunicar el equipo con otros sistemas. El sistema operativo los administra mediante controladores y coordina su funcionamiento dentro de los sistemas de información.", notes: "" },
           { id: "w13-t-11", type: "text", title: "Flujo de información digital", content: "La información que procesa el sistema operativo se representa mediante el flujo de datos digitales en binario, es decir, combinaciones de ceros y unos.\n\nCada instrucción, imagen, texto o señal de un periférico se transforma en datos que el procesador y el sistema operativo pueden interpretar. Comprender este flujo permite entender cómo circula la información entre hardware, software y dispositivos.", code: `TECLA "A" -> CÓDIGO BINARIO -> CPU -> PANTALLA\n             01000001        procesa     muestra A`, language: "text", notes: "" },
          { id: "w13-t-12", type: "callout", calloutType: "warning", title: "Ética, seguridad e higiene", content: "El uso de los recursos tecnológicos corporativos debe ser responsable: respetar licencias, proteger la información y evitar acciones que afecten a otros usuarios.\n\nEn la manipulación de hardware, se deben prevenir los riesgos eléctricos: no intervenir equipos conectados, revisar cables y reportar daños antes de continuar.", notes: "" },
          { id: "w13-t-13", type: "quiz", title: "Comprobación rápida", question: "¿Qué componente interpreta las órdenes del usuario y las comunica al kernel?", options: ["Kernel", "Shell", "API", "Driver"], answer: "Shell", explanation: "El shell es la interfaz que recibe las órdenes del usuario y las transmite al kernel para que se ejecuten.", notes: "" },
          { id: "w13-t-14", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de pasar al Taller Práctico?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w13-w-1", type: "cover", title: "Arquitectura de Sistemas Operativos", subtitle: "Taller Práctico - Semana 13", notes: "" },
           { id: "w13-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Calentamiento: clasificación de componentes.", "Ejercicio 1: kernel, shell y API en el equipo.", "Ejercicio 2: gestión de procesos, memoria y E/S.", "Ejercicio 3: tipos de sistemas operativos.", "Ejercicio 4: inventario de hardware.", "Ejercicio 5: mercado de sistemas operativos.", "Ejercicio 6: cuadro comparativo de periféricos.", "Reto integrador HT-01."], code: `EJEMPLO DE RECORRIDO\nusuario -> shell -> API -> kernel -> driver -> impresora`, language: "text", notes: "" },
           { id: "w13-w-2b", type: "callout", calloutType: "tip", title: "Ejemplo guiado: imprimir un documento", content: "Observa cómo una acción cotidiana activa varios componentes del sistema operativo.", code: `CLIC EN IMPRIMIR -> APLICACIÓN -> API -> KERNEL\nKERNEL -> DRIVER -> IMPRESORA -> HOJA`, language: "text", notes: "" },
          { id: "w13-w-3", type: "exercise", title: "Calentamiento", subtitle: "Clasifica los componentes",
            functionsToUse: ["Kernel", "Shell", "API"],
            content: "Clasifica cada función según el componente que la realiza.<br/><br/>1. Administra la memoria y los procesos.<br/>2. Interpreta las órdenes escritas por el usuario.<br/>3. Permite que una aplicación solicite servicios al sistema operativo.<br/>4. Controla los controladores de dispositivos.<br/><br/>Justifica cada respuesta en una línea.",
            code: `ELEMENTO                          COMPONENTE
Administra memoria y procesos     __________
Interpreta órdenes del usuario    __________
Comunica aplicaciones con el SO   __________
Controla los drivers              __________`,
            language: "text", notes: "" },
          { id: "w13-w-4", type: "exercise", title: "Ejercicio 1", subtitle: "Kernel, shell y API en el equipo",
            functionsToUse: ["Kernel", "Shell", "API"],
            content: "En el equipo de trabajo, ubica una evidencia de cada componente.<br/><br/>1. Identifica el sistema operativo instalado.<br/>2. Reconoce la interfaz desde la cual el usuario ejecuta órdenes.<br/>3. Explica cómo esa orden llega al núcleo del sistema.<br/>4. Registra un ejemplo de servicio solicitado por una aplicación.<br/><br/>Ordena el recorrido: usuario, shell, kernel y hardware.",
            code: `EQUIPO: ______________________________
SISTEMA OPERATIVO: ___________________

1. Kernel: evidencia observada
   ____________________________________

2. Shell: interfaz utilizada
   ____________________________________

3. API: ejemplo de servicio solicitado
   ____________________________________

Recorrido de una orden:
usuario -> __________ -> __________ -> hardware`,
            language: "text", notes: "" },
          { id: "w13-w-5", type: "exercise", title: "Ejercicio 2", subtitle: "Gestión de procesos, memoria y E/S",
            functionsToUse: ["Procesos", "Memoria", "Entrada/Salida"],
            content: "Analiza cada situación y determina qué recurso administra el sistema operativo.<br/><br/>1. Se abren el navegador y el editor al mismo tiempo.<br/>2. El sistema libera memoria al cerrar una aplicación.<br/>3. Se guarda un archivo en el disco.<br/>4. Se envía un documento a la impresora.<br/>5. El sistema alterna la ejecución de dos programas.<br/><br/>Explica qué ocurriría si el recurso no se administra correctamente.",
            code: `SITUACIÓN                                  RECURSO        JUSTIFICACIÓN
Navegador y editor abiertos a la vez       __________     ______________
Se libera memoria al cerrar una app        __________     ______________
Se guarda un archivo en el disco           __________     ______________
Se envía un documento a la impresora       __________     ______________
El sistema alterna dos programas           __________     ______________`,
            language: "text", notes: "" },
          { id: "w13-w-6", type: "exercise", title: "Ejercicio 3", subtitle: "Tipos de sistemas operativos",
            functionsToUse: ["Monotarea", "Multitarea", "Monousuario", "Multiusuario"],
            content: "Clasifica cada caso según el tipo de sistema operativo.<br/><br/>1. Una caja registradora ejecuta una sola tarea.<br/>2. Un servidor atiende a varios usuarios conectados.<br/>3. Un equipo alterna navegador, editor y reproductor.<br/>4. Una computadora personal atiende a un solo usuario.<br/><br/>Justifica si el caso corresponde a la clasificación por tareas o por usuarios.",
            code: `CASO                                        TIPO
Caja registradora con una sola tarea        __________
Servidor con varios usuarios conectados     __________
Equipo con navegador, editor y reproductor  __________
PC personal con un solo usuario             __________`,
            language: "text", notes: "" },
          { id: "w13-w-7", type: "exercise", title: "Ejercicio 4", subtitle: "Inventario de hardware",
            functionsToUse: ["Procesador", "Memoria", "Almacenamiento", "Periféricos"],
            content: "Realiza el inventario del hardware de tu PC personal.<br/><br/>1. Registra procesador, memoria RAM y almacenamiento.<br/>2. Anota al menos dos periféricos conectados.<br/>3. Identifica la función de cada componente.<br/>4. Reconoce qué controlador utiliza el sistema para cada periférico.<br/><br/>Presenta el inventario en una tabla ordenada.",
            code: `INVENTARIO DE HARDWARE
Equipo: ______________________  Fecha: ____________

COMPONENTE      MARCA/MODELO   CAPACIDAD   FUNCIÓN
Procesador      ____________   __________  __________________
Memoria RAM     ____________   __________  __________________
Almacenamiento  ____________   __________  __________________
Periférico 1    ____________   __________  __________________
Periférico 2    ____________   __________  __________________

CONTROLADORES UTILIZADOS
Periférico 1: ______________________
Periférico 2: ______________________`,
            language: "text", notes: "" },
          { id: "w13-w-8", type: "exercise", title: "Ejercicio 5", subtitle: "Mercado actual de sistemas operativos",
            functionsToUse: ["Market share", "Licencia", "Multitarea", "Multiusuario"],
            content: "Investiga el mercado actual de sistemas operativos.<br/><br/>1. Identifica al menos tres sistemas operativos utilizados.<br/>2. Registra su participación de mercado o market share.<br/>3. Compara licencia, multitarea y multiusuario.<br/>4. Redacta una conclusión breve sobre los resultados.<br/><br/>Indica la fuente consultada y la fecha de la investigación.",
            code: `SISTEMA OPERATIVO   MARKET SHARE   LICENCIA   MULTITAREA   MULTIUSUARIO
________________    __________     ________   __________   ____________
________________    __________     ________   __________   ____________
________________    __________     ________   __________   ____________

FUENTE CONSULTADA: ______________________
FECHA: __________________________________
CONCLUSIÓN:
____________________________________________________________`,
            language: "text", notes: "" },
          { id: "w13-w-9", type: "exercise", title: "Ejercicio 6", subtitle: "Cuadro comparativo de periféricos",
            functionsToUse: ["Entrada", "Salida", "Almacenamiento", "Driver"],
            content: "Selecciona cinco periféricos del inventario y completa el cuadro comparativo.<br/><br/>1. Clasifica cada periférico como entrada, salida o almacenamiento.<br/>2. Registra el tipo de conexión utilizada.<br/>3. Identifica el controlador requerido.<br/>4. Describe su función dentro del sistema de información.<br/><br/>Agrega una conclusión sobre el periférico más importante para tu equipo.",
            code: `PERIFÉRICO   TIPO         CONEXIÓN   DRIVER   FUNCIÓN EN EL SISTEMA
__________   __________   ________   ______   _____________________
__________   __________   ________   ______   _____________________
__________   __________   ________   ______   _____________________
__________   __________   ________   ______   _____________________
__________   __________   ________   ______   _____________________

CONCLUSIÓN:
____________________________________________________________`,
            language: "text", notes: "" },
          { id: "w13-w-10", type: "text", title: "SO y comunicación de datos en la práctica", content: "Al conectar un periférico, el sistema operativo detecta el dispositivo, carga su controlador y habilita el intercambio de datos.\n\nLa interrupción informa al procesador que el dispositivo requiere atención, mientras el bus transporta la información. Si el controlador no está disponible, el dispositivo puede no funcionar correctamente.\n\nEste proceso permite que los periféricos se integren a los sistemas de información del equipo.", notes: "" },
          { id: "w13-w-11", type: "exercise", title: "Reto integrador", subtitle: "HT-01 Analiza arquitectura SO",
            functionsToUse: ["Kernel", "Shell", "API", "Procesos", "Memoria", "E/S", "Driver", "Interrupción", "Bus"],
            content: "Integra los resultados del taller en un informe técnico.<br/><br/>1. Describe la arquitectura del sistema operativo identificado.<br/>2. Explica la gestión de procesos, memoria y entrada/salida.<br/>3. Indica el tipo de sistema operativo y justifica la clasificación.<br/>4. Presenta el inventario de hardware y el cuadro comparativo.<br/>5. Explica cómo fluye la información entre el SO, el periférico y el bus.<br/>6. Cierra con una conclusión sobre el uso responsable de los recursos.",
            code: `INFORME TÉCNICO HT-01

1. Arquitectura del sistema operativo
   Kernel:
   Shell:
   API:

2. Gestión de recursos
   Procesos:
   Memoria:
   Entrada/Salida:

3. Tipo de sistema operativo
   Clasificación:
   Justificación:

4. Hardware y periféricos
   Inventario:
   Cuadro comparativo:

5. Comunicación de datos
   Driver:
   Interrupción:
   Bus:

6. Conclusiones
   Uso responsable de los recursos:`,
            language: "text", notes: "" },
          { id: "w13-w-12", type: "callout", calloutType: "warning", title: "Seguridad e higiene industrial", content: "Antes de manipular hardware, verifica que el equipo esté desconectado de la corriente eléctrica. Revisa el estado de los cables y conectores, utiliza las herramientas adecuadas y reporta cualquier daño.\n\nNo intervengas equipos energizados ni realices conexiones improvisadas.", notes: "" },
          { id: "w13-w-13", type: "quiz", title: "Reto del taller", question: "¿Qué elemento permite que el sistema operativo reconozca y controle un periférico?", options: ["Shell", "API", "Driver", "Bus"], answer: "Driver", explanation: "El controlador o driver es el componente que permite al sistema operativo comunicarse con el dispositivo y controlarlo.", notes: "" },
          { id: "w13-w-14", type: "closing", title: "Fin del taller", subtitle: "Presenta tu inventario, tu cuadro comparativo y tu informe HT-01.", notes: "" }
        ]
      }
    },
    {
      id: "week-14",
      number: 14,
      title: "Semana 14",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp14-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp14-t-2", type: "title", title: "Tareas", content: "HT-02 Implementa máquinas virtuales", notes: "" },
            { id: "sp14-t-3", type: "text", title: "Semana 14", content: "Durante esta semana el estudiante comprenderá los fundamentos de la virtualización y su aplicación en la implementación de máquinas virtuales. Se estudiarán los conceptos de host, guest e hipervisor, así como los tipos de hipervisor y el software disponible para crear entornos virtuales. También se abordarán los formatos de disco virtual, los sistemas de archivos NTFS, EXT4 y APFS, y el proceso de arranque e instalación de un sistema operativo. Finalmente, se relacionará la virtualización con el licenciamiento, la conversión de unidades de almacenamiento y la eficiencia energética.", notes: "" },
            { id: "sp14-t-4", type: "title", title: "Objetivo General", content: "Comprender los fundamentos de la virtualización mediante la identificación de los roles de host, guest e hipervisor, los formatos de disco virtual, los sistemas de archivos y el proceso de arranque e instalación de sistemas operativos.", notes: "" },
            { id: "sp14-t-5", type: "text", title: "Objetivos Específicos", content: "Diferenciar los conceptos de host, guest e hipervisor dentro de un entorno virtual.\nReconocer los tipos de hipervisor y el software utilizado para virtualización.\nIdentificar los formatos de disco virtual y los sistemas de archivos NTFS, EXT4 y APFS.\nDescribir el proceso de arranque e instalación de un sistema operativo.", notes: "" },
            { id: "sp14-t-6", type: "text", title: "Temas Teóricos a Tratar", content: "Conceptos de virtualización.\nHost, guest e hipervisor.\nHipervisor tipo 1 y tipo 2.\nSoftware de virtualización.\nFormatos de disco virtual.\nSistemas de archivos NTFS, EXT4 y APFS.\nProceso de arranque e instalación.\nComandos básicos de gestión de archivos en Linux.\nLicenciamiento de software.\nConversión de unidades y eficiencia energética.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp14-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp14-w-2", type: "title", title: "Tareas", content: "HT-02 Implementa máquinas virtuales", notes: "" },
            { id: "sp14-w-3", type: "text", title: "Semana 14", content: "En el taller, el estudiante documentará las características de Windows, Linux y macOS, instalará VirtualBox y configurará una máquina virtual. Luego instalará un sistema operativo en la máquina virtual y verificará su funcionamiento general. Además, instalará una distribución Linux ligera, practicará comandos básicos de gestión de archivos en la terminal y comparará el rendimiento entre host y guest. El trabajo se completará con la revisión de licencias, la conversión de unidades de almacenamiento y la valoración de la eficiencia energética.", notes: "" },
            { id: "sp14-w-4", type: "title", title: "Objetivo General", content: "Aplicar los fundamentos de la virtualización mediante la instalación y configuración de una máquina virtual, la instalación de sistemas operativos y la verificación de su funcionamiento en un entorno host.", notes: "" },
            { id: "sp14-w-5", type: "text", title: "Objetivos Específicos", content: "Documentar las características principales de Windows, Linux y macOS para comparar sus diferencias.\nInstalar VirtualBox y configurar una máquina virtual con los recursos necesarios.\nInstalar un sistema operativo invitado y verificar su funcionamiento general.\nPracticar comandos básicos de gestión de archivos en Linux y comparar el rendimiento host y guest.", notes: "" },
            { id: "sp14-w-6", type: "text", title: "Prácticas y Actividades", content: "Documentación de características de Windows, Linux y macOS.\nInstalación de VirtualBox en el equipo host.\nConfiguración de la máquina virtual.\nInstalación de Windows, Linux y macOS en la máquina virtual.\nVerificación del funcionamiento general del sistema invitado.\nInstalación de Lubuntu en una máquina virtual.\nPráctica de comandos básicos de gestión de archivos en Linux.\nComparación del rendimiento entre host y guest.\nRevisión de licenciamiento y conversión de unidades de almacenamiento.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w14-t-1", type: "cover", title: "Virtualización y Máquinas Virtuales", subtitle: "Conocimiento Teórico - Semana 14", notes: "" },
           { id: "w14-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Conceptos de virtualización.", "Host, guest e hipervisor.", "Tipos de hipervisor.", "Software de virtualización.", "Formatos de disco virtual.", "Sistemas de archivos y arranque.", "Licenciamiento y eficiencia energética."], code: `HOST -> HIPERVISOR -> GUEST\nCPU + RAM + DISCO       Ubuntu virtual`, language: "text", notes: "" },
           { id: "w14-t-3", type: "text", title: "¿Qué es la virtualización?", content: "La virtualización es la creación de recursos informáticos virtuales a partir de un equipo físico. Permite ejecutar uno o varios sistemas operativos dentro de una misma computadora.\n\nCada entorno virtual funciona de forma independiente y utiliza una parte de los recursos del equipo real: procesador, memoria, almacenamiento y red.\n\nEsta tecnología facilita las pruebas, el aprendizaje y el uso eficiente del hardware.", code: `EQUIPO FÍSICO\n      |\n      v\nHIPERVISOR -> VM 1: Linux\n           -> VM 2: Windows`, language: "text", notes: "" },
           { id: "w14-t-4", type: "text", title: "Host, guest e hipervisor", content: "<b>Host:</b> es el equipo físico donde se ejecuta la virtualización.\n\n<b>Guest:</b> es el sistema operativo invitado que se ejecuta dentro de la máquina virtual.\n\n<b>Hipervisor:</b> es el software que crea, administra y asigna los recursos a las máquinas virtuales.\n\nEl hipervisor permite que el guest funcione sin controlar directamente el hardware del host.", code: `HOST: Windows\n   | CPU / RAM / DISCO\n   v\nHIPERVISOR: VirtualBox\n   | asigna 2 GB RAM\n   v\nGUEST: Lubuntu`, language: "text", notes: "" },
           { id: "w14-t-5", type: "interactive-list", title: "Tipos de hipervisor", items: ["Tipo 1: se ejecuta directamente sobre el hardware del equipo.", "Tipo 1: se utiliza en servidores y entornos de producción.", "Tipo 2: se ejecuta sobre un sistema operativo anfitrión.", "Tipo 2: se utiliza en equipos de escritorio para pruebas y aprendizaje."], code: `TIPO 1: HARDWARE -> HIPERVISOR -> GUEST\nTIPO 2: HARDWARE -> SO HOST -> HIPERVISOR -> GUEST`, language: "text", notes: "" },
           { id: "w14-t-6", type: "text", title: "Software de virtualización", content: "<b>VirtualBox:</b> software de virtualización tipo 2, gratuito y multiplataforma. Será utilizado en el taller.\n\n<b>VMware:</b> ofrece soluciones de virtualización para escritorio y servidores.\n\n<b>Hyper-V:</b> tecnología de virtualización de Microsoft integrada en versiones compatibles de Windows.\n\nCada herramienta permite crear y administrar máquinas virtuales, aunque cambia su entorno de configuración.", code: `VIRTUALBOX -> VDI\nVMWARE    -> VMDK\nHYPER-V   -> VHD`, language: "text", notes: "" },
           { id: "w14-t-7", type: "interactive-list", title: "Formatos de disco virtual", items: ["VDI: formato de disco virtual utilizado por VirtualBox.", "VHD: formato de disco virtual utilizado por Hyper-V.", "VMDK: formato de disco virtual utilizado por VMware."], code: `VMWARE -> VMDK\nVIRTUALBOX -> VDI\nHYPER-V -> VHD`, language: "text", notes: "" },
           { id: "w14-t-8", type: "text", title: "Sistemas de archivos", content: "<b>NTFS:</b> sistema de archivos utilizado principalmente en Windows.\n\n<b>EXT4:</b> sistema de archivos utilizado en distribuciones Linux.\n\n<b>APFS:</b> sistema de archivos utilizado en macOS.\n\nEl sistema de archivos organiza los datos dentro de cada sistema operativo y condiciona la forma en que se almacenan, buscan y protegen los archivos.", code: `WINDOWS -> NTFS\nLINUX   -> EXT4\nmacOS   -> APFS\n\narchivo.txt -> carpeta -> sistema de archivos`, language: "text", notes: "" },
           { id: "w14-t-9", type: "text", title: "Proceso de arranque e instalación", content: "El proceso de arranque inicia cuando el equipo enciende y carga el sistema operativo desde el almacenamiento.\n\nEn una máquina virtual, la instalación comienza al seleccionar la imagen del sistema operativo, asignar los recursos y seguir las etapas del instalador: idioma, disco, usuario y configuración inicial.\n\nAl finalizar, el guest arranca dentro de la ventana de la máquina virtual.", code: `ISO -> ARRANQUE -> IDIOMA -> DISCO -> USUARIO -> ESCRITORIO\n          1          2        3        4          5`, language: "text", notes: "" },
           { id: "w14-t-10", type: "text", title: "Comandos básicos de gestión de archivos en Linux", content: "La terminal permite administrar archivos mediante comandos.\n\n<b>pwd:</b> muestra la ubicación actual.\n<b>ls:</b> lista el contenido del directorio.\n<b>cd:</b> cambia de directorio.\n<b>mkdir:</b> crea un directorio.\n<b>cp:</b> copia archivos.\n<b>mv:</b> mueve o renombra archivos.\n<b>rm:</b> elimina archivos.\n\nEstos comandos se practicarán dentro de la máquina virtual con Linux.", code: `pwd -> ls -> mkdir practica -> cd practica\n                         -> touch informe.txt\n                         -> cp informe.txt copia.txt`, language: "text", notes: "" },
          { id: "w14-t-11", type: "callout", calloutType: "warning", title: "Ética y licenciamiento", content: "Cada sistema operativo y programa utiliza un tipo de licencia. <b>GPL</b> corresponde a software libre, <b>EULA</b> establece las condiciones de uso de un programa propietario y <b>Copyright</b> protege los derechos del autor.\n\nSe deben utilizar instaladores y licencias obtenidos de forma legal. El uso responsable de los recursos tecnológicos forma parte de la ética profesional.", notes: "" },
           { id: "w14-t-12", type: "text", title: "Conversión de unidades de almacenamiento", content: "La capacidad de un disco virtual se expresa en unidades de almacenamiento.\n\n1 GB equivale a 1024 MB.\n\nEjemplo: un disco virtual de 20 GB equivale a 20480 MB.\n\nEsta conversión permite comparar el espacio asignado con el disponible en el host y evitar errores de configuración.", code: `20 GB x 1024 MB/GB = 20480 MB\n\nHOST: 8192 MB disponibles\nVM:   2048 MB asignados\nRESTO: 6144 MB`, language: "text", notes: "" },
           { id: "w14-t-13", type: "callout", calloutType: "info", title: "Eficiencia energética", content: "La consolidación de servidores mediante virtualización permite ejecutar varios entornos en un solo equipo físico.\n\nEsto reduce la cantidad de equipos encendidos y contribuye al ahorro de energía, siempre que los recursos se asignen de forma adecuada y se evite la sobrecarga del host.", code: `3 SERVIDORES FÍSICOS -> 1 HOST\n                 -> VM WEB\n                 -> VM ARCHIVOS\n                 -> VM DNS`, language: "text", notes: "" },
          { id: "w14-t-14", type: "quiz", title: "Comprobación rápida", question: "¿Qué componente crea y administra las máquinas virtuales?", options: ["Host", "Guest", "Hipervisor", "Sistema de archivos"], answer: "Hipervisor", explanation: "El hipervisor es el software que crea las máquinas virtuales y asigna los recursos del host al guest.", notes: "" },
          { id: "w14-t-15", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de pasar al Taller Práctico?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w14-w-1", type: "cover", title: "Virtualización y Máquinas Virtuales", subtitle: "Taller Práctico - Semana 14", notes: "" },
           { id: "w14-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Calentamiento: host, guest e hipervisor.", "Documentación de Windows, Linux y macOS.", "Instalación de VirtualBox.", "Configuración de la máquina virtual.", "Instalación del sistema operativo invitado.", "Discos virtuales y sistemas de archivos.", "Comandos básicos de Linux.", "Comparación de rendimiento host y guest.", "Reto integrador HT-02."], code: `EJEMPLO DE RECURSOS\nHOST: 8 GB RAM -> GUEST: 2 GB RAM\nHOST: 4 CPU    -> GUEST: 2 CPU`, language: "text", notes: "" },
           { id: "w14-w-2b", type: "callout", calloutType: "tip", title: "Ejemplo guiado: abrir Linux virtual", content: "El host conserva el control del equipo y el guest recibe recursos asignados por el hipervisor.", code: `HOST WINDOWS -> VIRTUALBOX -> GUEST LINUX\n       CPU / RAM / DISCO -> escritorio virtual`, language: "text", notes: "" },
          { id: "w14-w-3", type: "exercise", title: "Calentamiento", subtitle: "Host, guest o hipervisor",
            functionsToUse: ["Host", "Guest", "Hipervisor"],
            content: "Clasifica cada elemento según su función dentro de la virtualización.<br/><br/>1. Equipo físico donde se ejecuta la máquina virtual.<br/>2. Sistema operativo que funciona dentro de la máquina virtual.<br/>3. Software que asigna recursos y administra las máquinas virtuales.<br/>4. Sistema operativo instalado en la computadora real.<br/><br/>Justifica cada respuesta en una línea.",
            code: `ELEMENTO                                      COMPONENTE
Equipo físico donde se ejecuta la VM          __________
Sistema operativo dentro de la VM             __________
Software que administra las VM                __________
Sistema operativo de la computadora real      __________`,
            language: "text", notes: "" },
          { id: "w14-w-4", type: "exercise", title: "Ejercicio 1", subtitle: "Documenta Windows, Linux y macOS",
            functionsToUse: ["Windows", "Linux", "macOS", "Sistema de archivos"],
            content: "Investiga y documenta las características principales de los tres sistemas operativos.<br/><br/>1. Identifica la interfaz de usuario.<br/>2. Registra el sistema de archivos principal.<br/>3. Indica el tipo de licenciamiento.<br/>4. Anota un uso frecuente de cada sistema.<br/><br/>Presenta la información en una tabla comparativa.",
            code: `CARACTERÍSTICA      WINDOWS        LINUX          macOS
Interfaz            __________     __________     __________
Sistema de archivos __________     __________     __________
Licenciamiento      __________     __________     __________
Uso frecuente       __________     __________     __________`,
            language: "text", notes: "" },
          { id: "w14-w-5", type: "exercise", title: "Ejercicio 2", subtitle: "Instala VirtualBox",
            functionsToUse: ["VirtualBox", "Host", "Instalador"],
            content: "Instala VirtualBox en el equipo host.<br/><br/>1. Descarga el instalador desde la fuente oficial.<br/>2. Ejecuta la instalación y acepta las condiciones.<br/>3. Verifica que la aplicación inicie correctamente.<br/>4. Registra la versión instalada y el sistema operativo del host.<br/><br/>Documenta cada paso y cualquier mensaje mostrado.",
            code: `INSTALACIÓN DE VIRTUALBOX

Equipo host: ______________________
Sistema operativo del host: ________
Versión instalada: _________________
¿La aplicación inició? Sí / No
Observaciones: _____________________`,
            language: "text", notes: "" },
          { id: "w14-w-6", type: "exercise", title: "Ejercicio 3", subtitle: "Configura la máquina virtual",
            functionsToUse: ["CPU", "Memoria RAM", "Disco virtual", "Red"],
            content: "Crea una máquina virtual y configura sus recursos.<br/><br/>1. Asigna un nombre a la máquina virtual.<br/>2. Define la memoria RAM y el número de procesadores.<br/>3. Crea un disco virtual indicando su tamaño.<br/>4. Configura la red y selecciona la imagen del sistema operativo.<br/><br/>Verifica que los recursos no superen la capacidad del host.",
            code: `CONFIGURACIÓN DE LA MÁQUINA VIRTUAL

Nombre: ___________________________
Tipo de SO: _______________________
Memoria RAM: __________ MB
Procesadores: __________
Disco virtual: __________ GB (__________ MB)
Formato de disco: _________________
Tipo de red: ______________________
Imagen ISO: _______________________`,
            language: "text", notes: "" },
          { id: "w14-w-7", type: "exercise", title: "Ejercicio 4", subtitle: "Instala el sistema operativo invitado",
            functionsToUse: ["Guest", "ISO", "Instalador", "Arranque"],
            content: "Instala un sistema operativo dentro de la máquina virtual.<br/><br/>1. Inicia la máquina virtual con la imagen seleccionada.<br/>2. Sigue las etapas del instalador.<br/>3. Configura idioma, disco, usuario y contraseña.<br/>4. Espera el primer arranque del sistema invitado.<br/>5. Verifica que el escritorio y las aplicaciones básicas funcionen.<br/><br/>Registra el sistema instalado y el tiempo aproximado de instalación.",
            code: `INSTALACIÓN DEL SISTEMA INVITADO

Sistema operativo: ________________
Versión: __________________________
Tiempo de instalación: _____________
¿Arrancó correctamente? Sí / No
Prueba realizada: __________________
Observaciones: _____________________`,
            language: "text", notes: "" },
          { id: "w14-w-8", type: "exercise", title: "Ejercicio 5", subtitle: "Discos virtuales y sistemas de archivos",
            functionsToUse: ["VDI", "VHD", "VMDK", "NTFS", "EXT4", "APFS"],
            content: "Relaciona cada formato de disco virtual con su software y cada sistema de archivos con su sistema operativo.<br/><br/>1. Identifica el formato utilizado por VirtualBox.<br/>2. Reconoce los formatos de Hyper-V y VMware.<br/>3. Asocia NTFS, EXT4 y APFS con Windows, Linux y macOS.<br/>4. Justifica cada relación.",
            code: `FORMATO DE DISCO        SOFTWARE
VDI                     __________
VHD                     __________
VMDK                    __________

SISTEMA DE ARCHIVOS      SISTEMA OPERATIVO
NTFS                     __________
EXT4                     __________
APFS                     __________`,
            language: "text", notes: "" },
          { id: "w14-w-9", type: "exercise", title: "Ejercicio 6", subtitle: "Comandos básicos de Linux",
            functionsToUse: ["pwd", "ls", "cd", "mkdir", "cp", "mv", "rm"],
            content: "En la máquina virtual con Linux, abre la terminal y practica la gestión de archivos.<br/><br/>1. Muestra la ubicación actual y lista el contenido.<br/>2. Crea un directorio llamado practica.<br/>3. Ingresa al directorio y crea un archivo de texto.<br/>4. Copia el archivo, cámbiale el nombre y elimina el original.<br/>5. Verifica el resultado con ls.<br/><br/>Registra el comando utilizado en cada paso.",
            code: `PRÁCTICA DE COMANDOS

1. Ubicación actual:        __________
2. Contenido del directorio: __________
3. Crear directorio:        __________
4. Ingresar al directorio:  __________
5. Crear archivo:           __________
6. Copiar archivo:          __________
7. Renombrar archivo:       __________
8. Eliminar original:       __________
9. Verificar resultado:     __________`,
            language: "text", notes: "" },
          { id: "w14-w-10", type: "exercise", title: "Ejercicio 7", subtitle: "Rendimiento host vs guest",
            functionsToUse: ["Host", "Guest", "CPU", "Memoria", "Tiempo de arranque"],
            content: "Compara el rendimiento del equipo host con el de la máquina virtual.<br/><br/>1. Registra el tiempo de arranque del host.<br/>2. Registra el tiempo de arranque del guest.<br/>3. Anota la memoria asignada y la utilizada.<br/>4. Observa el comportamiento del procesador durante una tarea sencilla.<br/><br/>Presenta una conclusión sobre las diferencias encontradas.",
            code: `COMPARACIÓN DE RENDIMIENTO

INDICADOR              HOST           GUEST
Tiempo de arranque     __________     __________
Memoria asignada       __________     __________
Memoria utilizada      __________     __________
Uso del procesador     __________     __________

Conclusión:
____________________________________________________________`,
            language: "text", notes: "" },
          { id: "w14-w-11", type: "exercise", title: "Reto integrador", subtitle: "HT-02 Implementa máquinas virtuales",
            functionsToUse: ["Host", "Guest", "Hipervisor", "VDI", "EXT4", "Comandos Linux"],
            content: "Integra los resultados del taller en un informe técnico.<br/><br/>1. Documenta las características de Windows, Linux y macOS.<br/>2. Describe la instalación de VirtualBox y la configuración de la máquina virtual.<br/>3. Indica el sistema operativo invitado instalado y su proceso de arranque.<br/>4. Presenta la práctica de comandos y la comparación de rendimiento.<br/>5. Explica el formato de disco y el sistema de archivos utilizados.<br/>6. Cierra con una conclusión sobre licenciamiento y eficiencia energética.",
            code: `INFORME TÉCNICO HT-02

1. Características de los sistemas operativos
   Windows:
   Linux:
   macOS:

2. Instalación y configuración
   VirtualBox:
   Recursos asignados:
   Disco virtual:

3. Sistema operativo invitado
   Versión:
   Proceso de arranque:

4. Práctica de comandos Linux
   Comandos utilizados:
   Resultados:

5. Rendimiento host vs guest
   Comparación:
   Conclusión:

6. Licenciamiento y eficiencia energética
   Licencias:
   Ahorro energético:`,
            language: "text", notes: "" },
          { id: "w14-w-12", type: "callout", calloutType: "warning", title: "Licenciamiento y uso responsable", content: "Utiliza únicamente instaladores e imágenes obtenidos de fuentes legales. Respeta las condiciones de la licencia <b>GPL</b>, el contrato <b>EULA</b> y los derechos de <b>Copyright</b>.\n\nNo distribuyas copias no autorizadas de sistemas operativos ni de software propietario.", notes: "" },
          { id: "w14-w-13", type: "callout", calloutType: "info", title: "Eficiencia energética", content: "La virtualización permite consolidar varios servicios en un solo equipo físico. Antes de asignar recursos, calcula la capacidad disponible del host para evitar sobrecargas.\n\nUn uso equilibrado reduce el consumo de energía y prolonga la vida útil del hardware.", notes: "" },
          { id: "w14-w-14", type: "quiz", title: "Reto del taller", question: "¿Qué formato de disco virtual corresponde a VirtualBox?", options: ["VDI", "VHD", "VMDK", "ISO"], answer: "VDI", explanation: "VirtualBox utiliza el formato VDI para sus discos virtuales. VHD se asocia a Hyper-V y VMDK a VMware.", notes: "" },
          { id: "w14-w-15", type: "closing", title: "Fin del taller", subtitle: "Presenta tu informe HT-02 y la comparación de rendimiento.", notes: "" }
        ]
      }
    },
    {
      id: "week-15",
      number: 15,
      title: "Semana 15",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp15-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp15-t-2", type: "title", title: "Tareas", content: "HT-03 Identifica componentes de red", notes: "" },
            { id: "sp15-t-3", type: "text", title: "Semana 15", content: "Durante esta semana el estudiante comprenderá los fundamentos de networking, la clasificación de redes, el modelo OSI y la introducción al modelo TCP/IP. Reconocerá topologías, medios de transmisión, direccionamiento físico y el funcionamiento de una Intranet cliente-servidor.", notes: "" },
            { id: "sp15-t-4", type: "title", title: "Objetivo General", content: "Comprender los componentes fundamentales de una red de datos mediante la identificación de tipos, topologías, medios de transmisión, protocolos y requerimientos básicos de una Intranet.", notes: "" },
            { id: "sp15-t-5", type: "text", title: "Objetivos Específicos", content: "Identificar los tipos de redes y sus principales características.\nDiferenciar redes alámbricas e inalámbricas según sus medios de transmisión.\nReconocer protocolos, topologías y direcciones MAC dentro de una red.\nAnalizar requerimientos básicos y funcionamiento cliente-servidor de una Intranet.", notes: "" },
            { id: "sp15-t-6", type: "text", title: "Temas Teóricos a Tratar", content: "Fundamentos de networking.\nClasificación LAN, MAN, WAN y WLAN.\nIntroducción a los modelos OSI y TCP/IP.\nTopologías estrella, bus, anillo y malla.\nCables de par trenzado y categorías.\nFibra óptica y medios inalámbricos Wi-Fi.\nDireccionamiento físico MAC.\nProtocolos principales de red.\nRequerimientos de una Intranet.\nFuncionamiento cliente-servidor.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp15-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp15-w-2", type: "title", title: "Tareas", content: "HT-03 Identifica componentes de red", notes: "" },
            { id: "sp15-w-3", type: "text", title: "Semana 15", content: "En el taller, el estudiante clasificará redes, diferenciará medios alámbricos e inalámbricos, reconocerá protocolos y representará una red simple. Simulará una red en Packet Tracer, investigará los estándares IEEE 802.3 y 802.11, y dibujará el plano de red de un hogar u oficina considerando requerimientos de Intranet y comunicación cliente-servidor.", notes: "" },
            { id: "sp15-w-4", type: "title", title: "Objetivo General", content: "Aplicar los fundamentos de networking mediante la identificación de componentes, la simulación de una red simple y la elaboración de un plano básico de red.", notes: "" },
            { id: "sp15-w-5", type: "text", title: "Objetivos Específicos", content: "Clasificar redes según alcance, medio y topología.\nDiferenciar cables, fibra óptica y medios inalámbricos.\nSimular una red simple y reconocer protocolos principales.\nElaborar un plano de red con requerimientos básicos de Intranet.", notes: "" },
            { id: "sp15-w-6", type: "text", title: "Prácticas y Actividades", content: "Clasificación de redes LAN, MAN, WAN y WLAN.\nDiferenciación de redes alámbricas e inalámbricas.\nReconocimiento de topologías de red.\nIdentificación de cables, fibra óptica y medios Wi-Fi.\nReconocimiento de protocolos principales y direcciones MAC.\nSimulación de una red simple en Packet Tracer.\nInvestigación de estándares IEEE 802.3 y 802.11.\nElaboración del plano de red de un hogar u oficina.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w15-t-1", type: "cover", title: "Componentes de Red", subtitle: "Conocimiento Teórico - Semana 15", notes: "" },
           { id: "w15-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Tipos y clasificación de redes.", "Modelos OSI y TCP/IP.", "Topologías de red.", "Medios de transmisión.", "Protocolos principales.", "Direcciones MAC.", "Intranet y cliente-servidor."], code: `PC -> SWITCH -> ROUTER -> SERVIDOR\n     LAN       WAN       servicio`, language: "text", notes: "" },
           { id: "w15-t-3", type: "text", title: "Fundamentos de networking", content: "Una red de datos conecta dispositivos para compartir información y recursos. Sus componentes incluyen dispositivos finales, medios de transmisión, dispositivos de interconexión y protocolos.\n\nEl diseño de una red depende del alcance, la cantidad de equipos, el medio utilizado, la topología y los servicios requeridos.", code: `LAPTOP -> WI-FI -> ROUTER -> INTERNET\nIMPRESORA -> SWITCH -> LAPTOP`, language: "text", notes: "" },
           { id: "w15-t-4", type: "interactive-list", title: "Tipos de redes", items: ["LAN: red de área local.", "MAN: red de área metropolitana.", "WAN: red de área amplia.", "WLAN: red local inalámbrica."], code: `LAN  -> aula/oficina\nMAN  -> ciudad\nWAN  -> países\nWLAN -> LAN por Wi-Fi`, language: "text", notes: "" },
           { id: "w15-t-5", type: "text", title: "Modelos OSI y TCP/IP", content: "El modelo OSI organiza la comunicación de red en capas para facilitar su estudio y diagnóstico. El modelo TCP/IP agrupa funciones relacionadas con el acceso a la red, Internet, transporte y aplicaciones.\n\nAmbos modelos ayudan a ubicar protocolos y problemas de comunicación.", code: `MENSAJE WEB\nAPLICACIÓN  -> HTTP\nTRANSPORTE  -> TCP\nINTERNET    -> IP\nACCESO RED  -> Ethernet / Wi-Fi`, language: "text", notes: "" },
           { id: "w15-t-6", type: "interactive-list", title: "Topologías de red", items: ["Estrella: los equipos se conectan a un punto central.", "Bus: los equipos comparten un medio principal.", "Anillo: cada equipo se conecta con el siguiente.", "Malla: existen múltiples rutas entre nodos."], code: `ESTRELLA: PC1 -> SWITCH <- PC2\nBUS:      PC1 -- PC2 -- PC3\nANILLO:   PC1 -> PC2 -> PC3 -> PC1\nMALLA:    PC1 <-> PC2 <-> PC3`, language: "text", notes: "" },
           { id: "w15-t-7", type: "text", title: "Medios de transmisión", content: "El par trenzado utiliza conductores de cobre y se clasifica por categorías. La fibra óptica transmite información mediante luz y ofrece alta capacidad.\n\nLos medios inalámbricos utilizan ondas electromagnéticas, como Wi-Fi. La selección depende de distancia, velocidad, interferencias, costo y condiciones del entorno.", code: `PC ===== CABLE UTP ===== SWITCH\nSERVIDOR ===== FIBRA ÓPTICA ===== SWITCH\nLAPTOP ))) ONDA Wi-Fi ))) ROUTER`, language: "text", notes: "" },
           { id: "w15-t-8", type: "text", title: "Direccionamiento físico MAC", content: "La dirección MAC identifica una interfaz de red en el nivel de enlace. Se representa normalmente con valores hexadecimales y permite distinguir físicamente un dispositivo dentro de una red local.\n\nLa dirección MAC no reemplaza al direccionamiento IP, porque cumplen funciones diferentes.", code: `MAC: 3C:52:82:1A:0F:9B\n     fabricante | interfaz\n\nMAC identifica la tarjeta; IP identifica su ubicación lógica.`, language: "text", notes: "" },
           { id: "w15-t-9", type: "callout", calloutType: "info", title: "Protocolos principales", content: "Los protocolos establecen reglas para transportar información. TCP/IP organiza la comunicación entre redes; Ethernet se relaciona con redes cableadas; Wi-Fi permite comunicación inalámbrica; y otros protocolos apoyan servicios específicos.", code: `REGLAS COMUNES\nAPLICACIÓN -> HTTP\nRED        -> IP\nENLACE     -> Ethernet / Wi-Fi`, language: "text", notes: "" },
           { id: "w15-t-10", type: "text", title: "Intranet y cliente-servidor", content: "Una Intranet es una red privada de una organización. Sus requerimientos incluyen usuarios, dispositivos, medios, servicios, seguridad y disponibilidad.\n\nEn una arquitectura cliente-servidor, el cliente solicita un servicio y el servidor procesa la solicitud o entrega recursos a través de la red.", code: `CLIENTE: "abre intranet.local"\n       -> ROUTER -> SERVIDOR WEB\n       <- página de inicio`, language: "text", notes: "" },
          { id: "w15-t-11", type: "callout", calloutType: "warning", title: "Seguridad e higiene industrial", content: "Los trabajos de cableado requieren orden, postura adecuada y revisión del área. No manipules equipos energizados ni conectes cables dañados. Mantén los conductores organizados para evitar tropiezos y daños.", notes: "" },
          { id: "w15-t-12", type: "quiz", title: "Comprobación rápida", question: "¿Qué tipo de red conecta equipos dentro de un área local?", options: ["LAN", "MAN", "WAN", "WLAN siempre cableada"], answer: "LAN", explanation: "LAN identifica una red de área local. WLAN es una variante local que usa comunicación inalámbrica.", notes: "" },
          { id: "w15-t-13", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de pasar al Taller Práctico?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w15-w-1", type: "cover", title: "Componentes de Red", subtitle: "Taller Práctico - Semana 15", notes: "" },
           { id: "w15-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Clasificación de redes.", "Medios alámbricos e inalámbricos.", "Topologías de red.", "Protocolos y direcciones MAC.", "Simulación en Packet Tracer.", "Estándares IEEE 802.3 y 802.11.", "Plano de red.", "Reto integrador HT-03."], code: `EJEMPLO DE RED DE OFICINA\nLAPTOP ))) WI-FI ))) ROUTER === SWITCH === SERVIDOR`, language: "text", notes: "" },
           { id: "w15-w-2b", type: "callout", calloutType: "tip", title: "Ejemplo guiado: una solicitud web", content: "Sigue el recorrido de una solicitud desde un equipo cliente hasta el servidor de la Intranet.", code: `CLIENTE -> WI-FI -> ROUTER -> SWITCH -> SERVIDOR\nCLIENTE <- página web de la Intranet <- SERVIDOR`, language: "text", notes: "" },
          { id: "w15-w-3", type: "exercise", title: "Calentamiento", subtitle: "Clasifica la red", functionsToUse: ["LAN", "MAN", "WAN", "WLAN"], content: "Clasifica cada caso según su alcance o medio.<br/><br/>1. Red de una oficina.<br/>2. Red que conecta ciudades.<br/>3. Red inalámbrica de un hogar.<br/>4. Red que conecta sedes de una región.<br/><br/>Justifica cada respuesta.", code: `CASO                                      TIPO\nRed de una oficina                      __________\nRed que conecta ciudades                 __________\nRed inalámbrica de un hogar              __________\nRed entre sedes de una región            __________`, language: "text", notes: "" },
          { id: "w15-w-4", type: "exercise", title: "Ejercicio 1", subtitle: "Medios de transmisión", functionsToUse: ["Par trenzado", "Fibra óptica", "Wi-Fi"], content: "Compara medios de transmisión.<br/><br/>1. Identifica el medio usado en cada caso.<br/>2. Registra ventajas, limitaciones y condiciones de uso.<br/>3. Indica si la comunicación es alámbrica o inalámbrica.", code: `MEDIO              TIPO             VENTAJA        LIMITACIÓN\nPar trenzado       __________       __________     __________\nFibra óptica       __________       __________     __________\nWi-Fi              __________       __________     __________`, language: "text", notes: "" },
          { id: "w15-w-5", type: "exercise", title: "Ejercicio 2", subtitle: "Topologías de red", functionsToUse: ["Estrella", "Bus", "Anillo", "Malla"], content: "Dibuja y compara las topologías estrella, bus, anillo y malla.<br/><br/>1. Representa nodos y enlaces.<br/>2. Identifica el punto central cuando exista.<br/>3. Explica qué ocurre si un enlace falla.", code: `TOPOLOGÍA          DIBUJO / OBSERVACIÓN\nEstrella           __________________________\nBus                __________________________\nAnillo             __________________________\nMalla              __________________________`, language: "text", notes: "" },
          { id: "w15-w-6", type: "exercise", title: "Ejercicio 3", subtitle: "Simula una red simple", functionsToUse: ["Packet Tracer", "Switch", "PC", "Protocolo"], content: "Simula una red simple en Packet Tracer.<br/><br/>1. Agrega dos PC y un dispositivo de interconexión.<br/>2. Conecta los equipos.<br/>3. Identifica los protocolos y medios utilizados.<br/>4. Comprueba la comunicación entre los equipos.", code: `DISPOSITIVOS: __________________________\nMEDIO: _________________________________\nPROTOCOLO OBSERVADO: ___________________\nPRUEBA DE COMUNICACIÓN: ________________\nRESULTADO: ______________________________`, language: "text", notes: "" },
          { id: "w15-w-7", type: "exercise", title: "Ejercicio 4", subtitle: "Protocolos y dirección MAC", functionsToUse: ["Ethernet", "Wi-Fi", "MAC", "Hexadecimal"], content: "Reconoce protocolos y direccionamiento físico.<br/><br/>1. Consulta la dirección MAC de una interfaz.<br/>2. Identifica si usa conexión cableada o Wi-Fi.<br/>3. Separa los valores hexadecimales.<br/>4. Explica por qué la MAC identifica la interfaz.", code: `INTERFAZ: ______________________________\nMAC: ___________________________________\nTIPO DE CONEXIÓN: ______________________\nPROTOCOLO RELACIONADO: _________________`, language: "text", notes: "" },
          { id: "w15-w-8", type: "exercise", title: "Ejercicio 5", subtitle: "Estándares IEEE", functionsToUse: ["IEEE 802.3", "IEEE 802.11"], content: "Investiga los estándares IEEE 802.3 y 802.11.<br/><br/>1. Identifica el medio o tecnología relacionada.<br/>2. Registra una característica de cada estándar.<br/>3. Relaciona cada estándar con una red alámbrica o inalámbrica.", code: `ESTÁNDAR       TECNOLOGÍA       MEDIO        CARACTERÍSTICA\nIEEE 802.3     __________       __________   __________\nIEEE 802.11    __________       __________   __________`, language: "text", notes: "" },
          { id: "w15-w-9", type: "exercise", title: "Ejercicio 6", subtitle: "Plano de red e Intranet", functionsToUse: ["Intranet", "Cliente", "Servidor", "Topología"], content: "Dibuja el plano de red de un hogar u oficina.<br/><br/>1. Ubica clientes, servidor, dispositivos y medios.<br/>2. Selecciona una topología.<br/>3. Indica los requerimientos básicos de la Intranet.<br/>4. Explica una solicitud cliente-servidor.", code: `USUARIOS: ______________________________\nDISPOSITIVOS: __________________________\nSERVICIOS: ______________________________\nTOPOLOGÍA: ______________________________\nREQUERIMIENTOS: ________________________`, language: "text", notes: "" },
          { id: "w15-w-10", type: "callout", calloutType: "warning", title: "Seguridad del taller", content: "Ordena cables y equipos. Evita trabajar con instalaciones energizadas. Revisa conectores y despeja el área de trabajo antes de iniciar la simulación o el plano.", notes: "" },
          { id: "w15-w-11", type: "exercise", title: "Reto integrador", subtitle: "HT-03 Identifica componentes de red", functionsToUse: ["LAN", "WLAN", "Topología", "MAC", "Intranet"], content: "Integra el diagnóstico de una red simple.<br/><br/>1. Clasifica la red y su topología.<br/>2. Describe medios y protocolos.<br/>3. Registra direcciones MAC.<br/>4. Presenta la simulación o plano.<br/>5. Explica los requerimientos de Intranet y el flujo cliente-servidor.", code: `INFORME HT-03\n\nTIPO DE RED: ____________________________\nTOPOLOGÍA: ______________________________\nMEDIOS Y PROTOCOLOS: ____________________\nDIRECCIONES MAC: ________________________\nINTRANET Y SERVICIOS: ___________________\nCONCLUSIÓN: _____________________________`, language: "text", notes: "" },
          { id: "w15-w-12", type: "quiz", title: "Reto del taller", question: "¿Qué estándar se relaciona principalmente con redes inalámbricas Wi-Fi?", options: ["IEEE 802.3", "IEEE 802.11", "NTFS", "HTTP"], answer: "IEEE 802.11", explanation: "IEEE 802.11 define la familia de estándares para redes inalámbricas Wi-Fi.", notes: "" },
          { id: "w15-w-13", type: "closing", title: "Fin del taller", subtitle: "Presenta la simulación o el plano de red de HT-03.", notes: "" }
        ]
      }
    },
    {
      id: "week-16",
      number: 16,
      title: "Semana 16",
      sessionPlan: {
        theory: {
          slides: [
            { id: "sp16-t-1", type: "cover", title: "Plan de Sesión", subtitle: "Conocimiento Teórico", notes: "" },
            { id: "sp16-t-2", type: "title", title: "Tareas", content: "HT-04 Configura redes LAN/WLAN", notes: "" },
            { id: "sp16-t-3", type: "text", title: "Semana 16", content: "Durante esta semana el estudiante comprenderá el direccionamiento IPv4, las máscaras, gateway y DNS, así como el subnetting básico VLSM. Analizará DHCP, HTTP e ICMP, la arquitectura cliente-servidor, los servicios de Intranet, los servidores locales y los comandos de diagnóstico de red.", notes: "" },
            { id: "sp16-t-4", type: "title", title: "Objetivo General", content: "Comprender los protocolos y el direccionamiento de redes mediante el análisis de IPv4, subnetting, servicios de red, arquitectura cliente-servidor y herramientas básicas de diagnóstico.", notes: "" },
            { id: "sp16-t-5", type: "text", title: "Objetivos Específicos", content: "Analizar las partes de una dirección IPv4 y su relación con la máscara.\nAplicar subnetting básico y operaciones binarias para dividir redes.\nReconocer funciones de DHCP, DNS, HTTP e ICMP.\nExplicar servicios de Intranet, servidores locales y diagnóstico de red.", notes: "" },
            { id: "sp16-t-6", type: "text", title: "Temas Teóricos a Tratar", content: "Protocolo IPv4.\nClases, máscara, gateway y DNS.\nSubnetting básico y VLSM.\nProtocolos DHCP, HTTP e ICMP.\nArquitectura cliente-servidor.\nServicios de Intranet y servidores locales.\nComandos ipconfig y ping.\nSeguridad de la información en redes abiertas.\nOperaciones binarias para cálculo de subredes.\nNormas de seguridad en equipos energizados.", notes: "" }
          ]
        },
        workshop: {
          slides: [
            { id: "sp16-w-1", type: "cover", title: "Plan de Sesión", subtitle: "Taller / Práctica", notes: "" },
            { id: "sp16-w-2", type: "title", title: "Tareas", content: "HT-04 Configura redes LAN/WLAN", notes: "" },
            { id: "sp16-w-3", type: "text", title: "Semana 16", content: "En el taller, el estudiante analizará direcciones IPv4, calculará subredes para un caso de estudio de tres departamentos, configurará un switch básico y establecerá una LAN/WLAN. También creará una página web estática local, identificará servidores esenciales, analizará TCP/IP y configurará seguridad básica en un router Wi-Fi.", notes: "" },
            { id: "sp16-w-4", type: "title", title: "Objetivo General", content: "Aplicar el direccionamiento y los servicios de red mediante el cálculo de subredes, la configuración básica de LAN/WLAN, la creación de una página web local y el diagnóstico de conectividad.", notes: "" },
            { id: "sp16-w-5", type: "text", title: "Objetivos Específicos", content: "Calcular subredes y asignar direcciones IPv4 para un caso de estudio.\nConfigurar un switch básico y establecer una LAN/WLAN.\nCrear una página web estática local e identificar servidores esenciales.\nVerificar conectividad y aplicar seguridad básica en una red Wi-Fi.", notes: "" },
            { id: "sp16-w-6", type: "text", title: "Prácticas y Actividades", content: "Análisis de partes de una dirección IPv4.\nCálculo de subredes para tres departamentos.\nConfiguración básica de un switch.\nEstablecimiento de una red LAN y WLAN.\nCreación de una página web estática local.\nIdentificación de servidores esenciales.\nUso de ipconfig y ping para diagnóstico.\nConfiguración de seguridad básica en router Wi-Fi.", notes: "" }
          ]
        }
      },
      theory: {
        slides: [
          { id: "w16-t-1", type: "cover", title: "Configuración de Redes LAN/WLAN", subtitle: "Conocimiento Teórico - Semana 16", notes: "" },
           { id: "w16-t-2", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Direccionamiento IPv4.", "Máscara, gateway y DNS.", "Subnetting básico y VLSM.", "Protocolos DHCP, HTTP e ICMP.", "Arquitectura cliente-servidor.", "Servidores locales e Intranet.", "Diagnóstico y seguridad de red."], code: `CLIENTE -> SWITCH -> ROUTER -> SERVIDOR\n         IP local   gateway   servicio`, language: "text", notes: "" },
           { id: "w16-t-3", type: "text", title: "Partes de una dirección IPv4", content: "Una dirección IPv4 tiene 32 bits y se representa con cuatro octetos separados por puntos. La máscara permite distinguir la parte de red y la parte de host.\n\nEl gateway comunica la red local con otras redes. DNS traduce nombres de dominio a direcciones IP.", code: `IP:      192.168.10.25\nMÁSCARA: 255.255.255.0\nRED:     192.168.10.0\nHOST:    25`, language: "text", notes: "" },
           { id: "w16-t-4", type: "interactive-list", title: "Elementos del direccionamiento", items: ["IPv4: identifica lógicamente una interfaz.", "Máscara: separa red y host.", "Gateway: salida hacia otras redes.", "DNS: resuelve nombres en direcciones IP."], code: `PC -> 192.168.10.25 -> GATEWAY -> INTERNET\n       "intranet.local" -> DNS -> 192.168.10.10`, language: "text", notes: "" },
           { id: "w16-t-5", type: "text", title: "Subnetting básico", content: "Subnetting divide una red en subredes más pequeñas. Para calcularlas se toman bits de la parte de host y se incorporan a la parte de red.\n\nEl resultado debe indicar dirección de red, rango de hosts y dirección de broadcast. VLSM permite usar tamaños distintos según la necesidad.", code: `192.168.10.0/24\n       | presta 2 bits\n       v\n4 SUBREDES /26: .0  .64  .128  .192`, language: "text", notes: "" },
           { id: "w16-t-6", type: "callout", calloutType: "info", title: "Operaciones binarias", content: "El cálculo de subredes requiere representar octetos en binario y aplicar la máscara. La cantidad de bits prestados determina el número de subredes y los bits restantes determinan la cantidad de hosts disponibles.", code: `128 + 64 + 32 + 16 + 8 + 4 + 2 + 1\n  1   0   0   0   0   0   0   0 = 128\n\n/26 = 255.255.255.192`, language: "text", notes: "" },
           { id: "w16-t-7", type: "text", title: "Protocolos clave", content: "DHCP asigna parámetros de red automáticamente. HTTP permite transferir páginas web. ICMP comunica mensajes de control y se utiliza en pruebas de conectividad.\n\nTCP/IP integra protocolos que permiten que los datos viajen entre redes y lleguen a la aplicación correspondiente.", code: `DHCP -> asigna IP\nDNS  -> traduce nombre\nHTTP -> entrega página\nICMP -> prueba respuesta`, language: "text", notes: "" },
           { id: "w16-t-8", type: "text", title: "Cliente-servidor e Intranet", content: "En la arquitectura cliente-servidor, un cliente inicia una solicitud y un servidor ofrece un servicio. Una Intranet puede incluir servidores web, archivos, nombres y otros servicios locales.\n\nLa organización debe definir usuarios, recursos, direcciones, disponibilidad y controles de seguridad.", code: `CLIENTE -> "GET /inicio" -> SERVIDOR WEB\nCLIENTE <- HTML / CSS     <- SERVIDOR WEB\n\nSERVIDOR DNS: intranet.local -> 192.168.10.10`, language: "text", notes: "" },
           { id: "w16-t-9", type: "text", title: "Diagnóstico de red", content: "<b>ipconfig</b> muestra la configuración de las interfaces en Windows. <b>ping</b> verifica si existe respuesta entre un origen y un destino.\n\nEl diagnóstico debe seguir un orden: revisar conexión, dirección IP, máscara, gateway, resolución de nombres y alcance del destino.", code: `ipconfig -> IP / máscara / gateway\nping 192.168.10.1 -> respuesta\nping 192.168.10.99 -> tiempo agotado`, language: "text", notes: "" },
           { id: "w16-t-10", type: "interactive-list", title: "LAN y WLAN", items: ["LAN: red local con medios cableados o combinados.", "WLAN: red local que usa comunicación inalámbrica.", "Switch: interconecta equipos dentro de una LAN.", "Router Wi-Fi: conecta redes y proporciona acceso inalámbrico."], code: `PC ===== SWITCH ===== SERVIDOR\n  \  \n   ))) ROUTER Wi-Fi ))) LAPTOP`, language: "text", notes: "" },
          { id: "w16-t-11", type: "callout", calloutType: "warning", title: "Seguridad de la información", content: "Las redes abiertas exponen información y equipos. Usa contraseñas seguras, cambia credenciales predeterminadas y evita administrar equipos energizados sin aplicar las normas de seguridad correspondientes.", notes: "" },
          { id: "w16-t-12", type: "quiz", title: "Comprobación rápida", question: "¿Qué comando verifica la conectividad básica entre dos equipos?", options: ["ipconfig", "ping", "HTTP", "DNS"], answer: "ping", explanation: "ping envía mensajes de control y permite verificar si un destino responde en la red.", notes: "" },
          { id: "w16-t-13", type: "closing", title: "Fin de la teoría", subtitle: "¿Preguntas antes de pasar al Taller Práctico?", notes: "" }
        ]
      },
      workshop: {
        slides: [
          { id: "w16-w-1", type: "cover", title: "Configuración de Redes LAN/WLAN", subtitle: "Taller Práctico - Semana 16", notes: "" },
           { id: "w16-w-2", type: "interactive-list", title: "Actividades del Taller", items: ["Partes de una dirección IPv4.", "Cálculo de subredes.", "Configuración de switch.", "LAN y WLAN.", "Página web estática local.", "Servidores esenciales.", "Diagnóstico con ipconfig y ping.", "Seguridad básica de router Wi-Fi.", "Reto integrador HT-04."], code: `EJEMPLO DE DIAGNÓSTICO\nipconfig -> 192.168.10.25\nping 192.168.10.1 -> respuesta`, language: "text", notes: "" },
           { id: "w16-w-2b", type: "callout", calloutType: "tip", title: "Ejemplo guiado: tres departamentos", content: "Una red /24 puede dividirse en subredes para separar Administración, Ventas y Soporte.", code: `192.168.10.0/24 -> /26\nADMIN .0/26 -> VENTAS .64/26 -> SOPORTE .128/26`, language: "text", notes: "" },
          { id: "w16-w-3", type: "exercise", title: "Calentamiento", subtitle: "Analiza una dirección IPv4", functionsToUse: ["IPv4", "Máscara", "Gateway", "DNS"], content: "Analiza la configuración de una interfaz de red.<br/><br/>1. Registra la dirección IPv4.<br/>2. Identifica la máscara, gateway y DNS.<br/>3. Separa red y host.<br/>4. Explica la función de cada elemento.", code: `IPV4: ___________________________________\nMÁSCARA: ________________________________\nGATEWAY: ________________________________\nDNS: ____________________________________\nRED / HOST: _____________________________`, language: "text", notes: "" },
          { id: "w16-w-4", type: "exercise", title: "Ejercicio 1", subtitle: "Calcula subredes", functionsToUse: ["Subnetting", "VLSM", "Binario", "Broadcast"], content: "Calcula subredes para un caso de estudio con tres departamentos.<br/><br/>1. Define la cantidad de hosts por departamento.<br/>2. Selecciona una máscara adecuada.<br/>3. Calcula red, rango de hosts y broadcast.<br/>4. Si es necesario, aplica VLSM.", code: `DEPARTAMENTO    HOSTS   RED       MÁSCARA   RANGO       BROADCAST\nAdministración  ______  ________  ________  ________    ________\nVentas          ______  ________  ________  ________    ________\nSoporte         ______  ________  ________  ________    ________`, language: "text", notes: "" },
          { id: "w16-w-5", type: "exercise", title: "Ejercicio 2", subtitle: "Configura un switch básico", functionsToUse: ["Switch", "LAN", "IP", "Puerto"], content: "Configura un switch básico para una LAN.<br/><br/>1. Identifica puertos y equipos conectados.<br/>2. Define una dirección de administración si corresponde.<br/>3. Registra la topología y las conexiones.<br/>4. Verifica el estado de los puertos.", code: `SWITCH: __________________________________\nPUERTOS UTILIZADOS: ______________________\nDIRECCIÓN DE ADMINISTRACIÓN: ______________\nEQUIPOS CONECTADOS: _______________________\nVERIFICACIÓN: _____________________________`, language: "text", notes: "" },
          { id: "w16-w-6", type: "exercise", title: "Ejercicio 3", subtitle: "Establece una LAN y WLAN", functionsToUse: ["LAN", "WLAN", "Router", "SSID"], content: "Establece una red LAN y una WLAN.<br/><br/>1. Conecta un equipo por cable.<br/>2. Configura el nombre de la red inalámbrica.<br/>3. Define direccionamiento y gateway.<br/>4. Comprueba la conexión desde un cliente.", code: `NOMBRE DE RED / SSID: ____________________\nGATEWAY: _________________________________\nCLIENTE CABLEADO: ________________________\nCLIENTE INALÁMBRICO: _____________________\nRESULTADO: _______________________________`, language: "text", notes: "" },
          { id: "w16-w-7", type: "exercise", title: "Ejercicio 4", subtitle: "Crea una página web local", functionsToUse: ["HTTP", "Python", "XAMPP", "Servidor web"], content: "Monta un servidor web simple con Python o XAMPP y crea una página web estática local.<br/><br/>1. Selecciona la herramienta disponible.<br/>2. Crea el archivo de la página.<br/>3. Inicia el servicio web.<br/>4. Accede desde el equipo local y registra la dirección utilizada.", code: `HERRAMIENTA: ____________________________\nPUERTO: __________________________________\nARCHIVO: _________________________________\nURL LOCAL: _______________________________\nRESULTADO: _______________________________`, language: "text", notes: "" },
          { id: "w16-w-8", type: "exercise", title: "Ejercicio 5", subtitle: "Identifica servidores esenciales", functionsToUse: ["DHCP", "DNS", "HTTP", "Servidor local"], content: "Identifica los servidores o servicios esenciales de una red.<br/><br/>1. Relaciona DHCP con asignación de configuración.<br/>2. Relaciona DNS con resolución de nombres.<br/>3. Relaciona HTTP con páginas web.<br/>4. Ubica los servicios en la arquitectura cliente-servidor.", code: `SERVICIO       FUNCIÓN                         SERVIDOR / UBICACIÓN\nDHCP           _____________________________   __________________\nDNS            _____________________________   __________________\nHTTP           _____________________________   __________________`, language: "text", notes: "" },
          { id: "w16-w-9", type: "exercise", title: "Ejercicio 6", subtitle: "Diagnostica la conectividad", functionsToUse: ["ipconfig", "ping", "TCP/IP"], content: "Analiza la configuración y conectividad de un cliente.<br/><br/>1. Ejecuta ipconfig y registra los parámetros.<br/>2. Ejecuta ping hacia el gateway.<br/>3. Ejecuta ping hacia otro destino.<br/>4. Interpreta las respuestas y registra el problema si existe.", code: `IPCONFIG: __________________________________\nPING GATEWAY: ______________________________\nPING DESTINO: _______________________________\nDIAGNÓSTICO: ________________________________`, language: "text", notes: "" },
          { id: "w16-w-10", type: "exercise", title: "Ejercicio 7", subtitle: "Protege la WLAN", functionsToUse: ["Router Wi-Fi", "Contraseña", "Seguridad"], content: "Configura seguridad básica en un router Wi-Fi.<br/><br/>1. Cambia la credencial predeterminada.<br/>2. Define una contraseña segura para la WLAN.<br/>3. Revisa el nombre de red y el acceso de clientes.<br/>4. Explica una medida para proteger la información.", code: `SSID: ____________________________________\nMÉTODO DE SEGURIDAD: _____________________\nCREDENCIAL CAMBIADA: Sí / No\nMEDIDA ADICIONAL: ________________________`, language: "text", notes: "" },
          { id: "w16-w-11", type: "callout", calloutType: "warning", title: "Seguridad del taller", content: "No manipules routers, switches ni fuentes de alimentación energizadas sin aplicar las normas de seguridad. Protege credenciales y evita publicar datos reales de una red abierta.", notes: "" },
          { id: "w16-w-12", type: "exercise", title: "Reto integrador", subtitle: "HT-04 Configura redes LAN/WLAN", functionsToUse: ["IPv4", "Subnetting", "Switch", "LAN", "WLAN", "HTTP", "TCP/IP"], content: "Integra una propuesta de red para tres departamentos.<br/><br/>1. Calcula subredes y asigna IPv4.<br/>2. Define switch, LAN y WLAN.<br/>3. Identifica servidores y crea una página local.<br/>4. Comprueba conectividad con ipconfig y ping.<br/>5. Registra medidas de seguridad.", code: `INFORME HT-04\n\nSUBREDES: ________________________________\nLAN / WLAN: ______________________________\nSERVIDORES: ______________________________\nPÁGINA WEB LOCAL: ________________________\nDIAGNÓSTICO TCP/IP: ______________________\nSEGURIDAD: _______________________________`, language: "text", notes: "" },
          { id: "w16-w-13", type: "quiz", title: "Reto del taller", question: "¿Qué protocolo asigna automáticamente parámetros de red a un cliente?", options: ["DHCP", "HTTP", "ICMP", "DNS"], answer: "DHCP", explanation: "DHCP asigna automáticamente dirección IP, máscara, gateway y otros parámetros de configuración.", notes: "" },
          { id: "w16-w-14", type: "closing", title: "Fin del taller", subtitle: "Presenta el informe de red de HT-04.", notes: "" }
        ]
      }
    }
  ]
};
