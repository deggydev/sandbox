/* =========================================================================
   PIAD-224 · Sistemas Operativos y Comunicación de Datos
   Presentaciones interactivas (máx. 12 diapositivas por deck), basadas en
   los temas y actividades del plan de sesión de cada semana.

   Tipos nuevos: "visual" (animación + ideas clave), "flow" (recorrido paso
   a paso), "compare" (tarjetas que se abren). Los ejercicios aceptan
   "minutes" (temporizador) y "visual" (animación).
   ========================================================================= */

const OS_LAYERS = [
  { icon: 'mdi:account', label: 'Usuario' },
  { icon: 'mdi:console', label: 'Shell' },
  { icon: 'mdi:api', label: 'API' },
  { icon: 'mdi:atom', label: 'Kernel' },
  { icon: 'mdi:chip', label: 'Hardware' },
];

/* ============================== SEMANA 13 ============================== */

export const week13Theory = [
  {
    id: 'w13-t-1', type: 'cover', title: 'Arquitectura de Sistemas Operativos', subtitle: 'Conocimiento Teórico · Semana 13',
    visual: { kind: 'orbit', center: 'mdi:layers-triple', label: 'Sistema operativo', satellites: ['mdi:cpu-64-bit', 'mdi:memory', 'mdi:harddisk', 'mdi:keyboard-outline', 'mdi:monitor', 'mdi:printer', 'mdi:wifi'] },
  },
  { id: "w13-t-index", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Fundamentos y funciones del sistema operativo.", "Arquitectura básica: kernel, shell y API.", "Gestión de procesos, memoria y entrada/salida.", "Tipos de sistemas operativos.", "Hardware, controladores e interrupciones.", "Relación con la comunicación de datos.", "Ética, seguridad e higiene."], code: `USUARIO -> SHELL -> API -> KERNEL -> HARDWARE\n                     ^\n                solicitud de una aplicación`, language: "text", notes: "" },
  {
    id: 'w13-t-2', type: 'visual', title: '¿Qué es un sistema operativo?',
    content: 'Es el <b>software principal</b> de la computadora. Hace de puente entre las personas, los programas y el hardware.',
    points: ['Administra <b>procesos, memoria y archivos</b>.', 'Controla los <b>dispositivos y periféricos</b>.', 'Ofrece una <b>interfaz</b> para usar el equipo.', 'Sin SO, el hardware no trabaja de forma coordinada.'],
    visual: { kind: 'layers', layers: [{ icon: 'mdi:account', label: 'Usuario' }, { icon: 'mdi:application-outline', label: 'Aplicaciones' }, { icon: 'mdi:layers-triple', label: 'Sistema operativo' }, { icon: 'mdi:chip', label: 'Hardware' }] },
    caption: 'Cada capa usa los servicios de la capa de abajo',
  },
  {
    id: 'w13-t-3', type: 'flow', title: 'Arquitectura: kernel, shell y API', kicker: 'Viaje de una orden',
    content: 'Haz clic en cada paso o reproduce el recorrido: <i>abrir un archivo</i>.',
    steps: [
      { icon: 'mdi:account', label: 'Usuario', detail: 'Hace doble clic en <b>informe.docx</b> o escribe una orden.' },
      { icon: 'mdi:console', label: 'Shell', detail: 'Es la <b>interfaz</b> (gráfica o de comandos). Interpreta lo que pide el usuario.' },
      { icon: 'mdi:api', label: 'API', detail: 'Es el <b>contrato</b>: funciones que los programas usan para pedir servicios al SO sin tocar el hardware.' },
      { icon: 'mdi:atom', label: 'Kernel', detail: 'Es el <b>núcleo</b>. Decide qué recursos usar: CPU, memoria y disco.' },
      { icon: 'mdi:harddisk', label: 'Hardware', detail: 'El disco entrega los datos y el archivo aparece en pantalla. ✔' },
    ],
    visual: { kind: 'layers', layers: OS_LAYERS },
  },
  {
    id: 'w13-t-4', type: 'visual', title: 'Gestión de procesos', kicker: 'Gestión de recursos', icon: 'mdi:cpu-64-bit',
    content: 'Un <b>proceso</b> es un programa en ejecución. El SO los crea, los planifica y los finaliza.',
    points: ['La CPU atiende un proceso a la vez, pero <b>cambia muy rápido</b>.', 'El <b>planificador</b> decide a quién le toca el turno.', 'Por eso parece que todo funciona al mismo tiempo.'],
    visual: { kind: 'scheduler' },
    caption: 'Planificación round-robin: cada proceso usa la CPU por turnos',
  },
  {
    id: 'w13-t-5', type: 'visual', title: 'Memoria y entrada/salida', kicker: 'Gestión de recursos', icon: 'mdi:memory', reverse: true,
    content: 'El SO <b>asigna memoria</b> a cada proceso y la <b>recupera</b> cuando se cierra. También coordina la entrada y salida (E/S) con los dispositivos.',
    points: ['<b>Memoria:</b> cada programa recibe su espacio, sin chocar con otros.', '<b>E/S:</b> leer del teclado, guardar en el disco, imprimir.', 'Buena gestión = <b>estabilidad y rendimiento</b>.'],
    visual: { kind: 'memory' },
    caption: 'La RAM se llena y se libera según los programas abiertos',
  },
  {
    id: 'w13-t-6', type: 'compare', title: 'Tipos de sistemas operativos',
    content: 'Se clasifican por cuántas <b>tareas</b> y cuántos <b>usuarios</b> atienden. Toca cada tarjeta.',
    cards: [
      { icon: 'mdi:numeric-1-box-outline', title: 'Monotarea', tag: 'Tareas', text: 'Ejecuta <b>una tarea a la vez</b>.', visual: { kind: 'tasks', mode: 'mono' }, details: ['Ejemplo: MS-DOS o una caja registradora simple.', 'La siguiente tarea espera a que termine la actual.'] },
      { icon: 'mdi:layers-triple-outline', title: 'Multitarea', tag: 'Tareas', text: 'Ejecuta <b>varias tareas</b> de forma concurrente.', visual: { kind: 'tasks', mode: 'multi' }, details: ['Ejemplo: Windows, Linux, macOS, Android.', 'La CPU alterna entre procesos muy rápido.'] },
      { icon: 'mdi:account', title: 'Monousuario', tag: 'Usuarios', text: 'Atiende a <b>un usuario</b> a la vez.', visual: { kind: 'users', mode: 'mono' }, details: ['Ejemplo: una PC personal con una sola sesión.', 'Un usuario usa todos los recursos.'] },
      { icon: 'mdi:account-group', title: 'Multiusuario', tag: 'Usuarios', text: 'Permite <b>varios usuarios</b> sobre el mismo sistema.', visual: { kind: 'users', mode: 'multi' }, details: ['Ejemplo: un servidor Linux o Windows Server.', 'Cada usuario tiene su cuenta y sus permisos.'] },
    ],
  },
  {
    id: 'w13-t-7', type: 'flow', title: 'Drivers e interrupciones', kicker: 'Hardware y periféricos',
    content: '¿Qué pasa en milisegundos cuando presionas una tecla?',
    steps: [
      { icon: 'mdi:keyboard-outline', label: 'Tecla', detail: 'Presionas la tecla <b>A</b>. El teclado genera una señal eléctrica.' },
      { icon: 'mdi:bell-ring-outline', label: 'Interrupción', detail: 'El hardware envía una <b>interrupción</b>: un aviso a la CPU de que necesita atención.' },
      { icon: 'mdi:cpu-64-bit', label: 'CPU', detail: 'La CPU pausa lo que hacía y atiende el aviso.' },
      { icon: 'mdi:puzzle-outline', label: 'Driver', detail: 'El <b>controlador (driver)</b> traduce la señal para que el SO la entienda. Sin driver, el dispositivo no funciona.' },
      { icon: 'mdi:application-outline', label: 'Aplicación', detail: 'La letra aparece en tu documento. ✔' },
    ],
  },
  {
    id: 'w13-t-8', type: 'visual', title: 'Buses del sistema', kicker: 'Hardware', icon: 'mdi:transit-connection-horizontal',
    content: 'Los <b>buses</b> son las autopistas que conectan la CPU, la memoria y los periféricos.',
    points: ['<b>Bus de datos:</b> lleva la información.', '<b>Bus de direcciones:</b> indica a dónde va.', '<b>Bus de control:</b> envía las órdenes (leer, escribir).'],
    visual: { kind: 'bus' },
    caption: 'Tres carriles: datos, direcciones y control',
  },
  {
    id: 'w13-t-9', type: 'visual', title: 'SO y comunicación de datos', kicker: 'Flujo de información', icon: 'mdi:swap-horizontal', reverse: true,
    content: 'Todo viaja en <b>binario</b> (ceros y unos). El SO usa drivers, puertos y protocolos para enviar y recibir datos.',
    points: ['La letra <b>A</b> se convierte en <code>01000001</code>.', 'Los <b>periféricos</b> ingresan, muestran, guardan o comunican datos.', 'El SO cuida que la información <b>llegue completa</b>.'],
    visual: { kind: 'binary', char: 'A' },
    caption: 'De la tecla a la pantalla, en binario',
  },
  {
    id: 'w13-t-10', type: 'callout', calloutType: 'warning', title: 'Ética, seguridad e higiene',
    content: 'Usa los recursos de forma <b>responsable</b>: respeta licencias y protege la información.<br/><br/>Antes de tocar hardware: <b>desconecta el equipo</b>, revisa los cables y reporta los daños.',
    visual: { kind: 'shield', label: 'Uso responsable y seguro' },
  },
  {
    id: 'w13-t-11', type: 'quiz', title: 'Comprobación rápida',
    question: '¿Qué componente interpreta las órdenes del usuario y las comunica al kernel?',
    options: ['Kernel', 'Shell', 'API', 'Driver'], answer: 'Shell',
    explanation: 'El shell es la interfaz que recibe las órdenes del usuario y las transmite al kernel.',
  },
  { id: 'w13-t-12', type: 'closing', title: 'Fin de la teoría', subtitle: '¿Preguntas antes de pasar al taller?', visual: { kind: 'layers', layers: OS_LAYERS } },
];

export const week13Workshop = [
  { id: 'w13-w-1', type: 'cover', title: 'Analiza la arquitectura del SO', subtitle: 'Taller práctico · Semana 13 · HT-01', visual: { kind: 'layers', layers: OS_LAYERS } },
  {
    id: 'w13-w-2', type: 'interactive-list', title: 'Ruta del taller',
    items: ['Identifica kernel, shell y API en tu equipo.', 'Observa procesos, memoria y E/S en vivo.', 'Elabora el inventario de hardware de tu PC.', 'Investiga el mercado actual de sistemas operativos.', 'Arma el cuadro comparativo de periféricos.', 'Entrega el informe HT-01.'],
  },
  {
    id: 'w13-w-3', type: 'flow', title: 'Ejemplo guiado: imprimir un documento', kicker: 'Antes de empezar',
    steps: [
      { icon: 'mdi:cursor-default-click-outline', label: 'Clic', detail: 'Presionas <b>Imprimir</b> en Word.' },
      { icon: 'mdi:application-outline', label: 'Aplicación', detail: 'Word pide el servicio de impresión mediante la <b>API</b>.' },
      { icon: 'mdi:atom', label: 'Kernel', detail: 'Coloca el trabajo en la <b>cola de impresión</b>.' },
      { icon: 'mdi:puzzle-outline', label: 'Driver', detail: 'Traduce el documento al lenguaje de la impresora.' },
      { icon: 'mdi:printer', label: 'Impresora', detail: 'Recibe los datos por USB o red y saca la hoja. ✔' },
    ],
    visual: { kind: 'flow', nodes: [{ icon: 'mdi:application-outline', label: 'App' }, { icon: 'mdi:atom', label: 'Kernel' }, { icon: 'mdi:puzzle-outline', label: 'Driver' }, { icon: 'mdi:printer', label: 'Impresora' }] },
  },
  {
    id: 'w13-w-4', type: 'exercise', title: 'Ejercicio 1', subtitle: 'Kernel, shell y API en tu equipo', minutes: 20,
    functionsToUse: ['winver', 'cmd', 'systeminfo', 'Explorador'],
    content: '1. Ejecuta <code>winver</code> y anota el SO y su versión.<br/>2. Usa dos shells: el <b>Explorador</b> (gráfico) y <b>CMD</b> (comandos).<br/>3. Ejecuta <code>systeminfo</code> y anota la versión del kernel.<br/>4. Escribe el recorrido de una orden: usuario → shell → API → kernel → hardware.',
    visual: { kind: 'terminal', title: 'Símbolo del sistema', prompt: 'C:\\Users\\estudiante>', lines: [{ cmd: 'winver' }, { cmd: 'systeminfo', out: ['Nombre del SO: Microsoft Windows 11 Pro', 'Versión del SO: 10.0.26200', 'Tipo de sistema: x64-based PC'] }] },
    caption: 'Comandos para reconocer tu sistema',
  },
  {
    id: 'w13-w-5', type: 'exercise', title: 'Ejercicio 2', subtitle: 'Procesos, memoria y E/S en vivo', minutes: 20,
    functionsToUse: ['Ctrl + Shift + Esc', 'Procesos', 'Rendimiento'],
    content: 'Abre el <b>Administrador de tareas</b>.<br/><br/>1. Abre el navegador y el editor: ¿cuántos procesos aparecen?<br/>2. Observa cuánta <b>memoria</b> usa cada uno.<br/>3. Cierra una app: ¿se libera memoria?<br/>4. Copia un archivo grande y mira la actividad del <b>disco</b>.',
    visual: { kind: 'memory' },
    code: `SITUACIÓN                    RECURSO     OBSERVACIÓN
Navegador + editor abiertos  ________    ______________
Cerrar una aplicación        ________    ______________
Copiar un archivo grande     ________    ______________
Enviar a imprimir            ________    ______________`,
    language: 'text',
  },
  {
    id: 'w13-w-6', type: 'exercise', title: 'Ejercicio 3', subtitle: 'Inventario de hardware', minutes: 25,
    functionsToUse: ['msinfo32', 'devmgmt.msc', 'dxdiag'],
    content: '1. Ejecuta <code>msinfo32</code>.<br/>2. Registra procesador, RAM y almacenamiento.<br/>3. En el <b>Administrador de dispositivos</b>, anota dos periféricos y su driver.<br/>4. Presenta todo en una tabla ordenada.',
    visual: { kind: 'orbit', center: 'mdi:desktop-tower-monitor', satellites: ['mdi:cpu-64-bit', 'mdi:memory', 'mdi:harddisk', 'mdi:keyboard-outline', 'mdi:mouse', 'mdi:monitor'] },
    code: `COMPONENTE      MARCA/MODELO   CAPACIDAD   DRIVER
Procesador      ____________   _________   ________
Memoria RAM     ____________   _________   ________
Almacenamiento  ____________   _________   ________
Periférico 1    ____________   _________   ________
Periférico 2    ____________   _________   ________`,
    language: 'text',
  },
  {
    id: 'w13-w-7', type: 'exercise', title: 'Ejercicio 4', subtitle: 'Mercado actual de sistemas operativos', minutes: 20,
    functionsToUse: ['StatCounter', 'Licencia', 'Multitarea', 'Multiusuario'],
    content: '1. Busca la participación de mercado en una fuente confiable.<br/>2. Compara 3 SO de escritorio y 2 móviles.<br/>3. Registra licencia, multitarea y multiusuario.<br/>4. Escribe una conclusión de 3 líneas e indica la fuente y la fecha.',
    visual: { kind: 'orbit', center: 'mdi:earth', satellites: ['mdi:microsoft-windows', 'mdi:apple', 'mdi:linux', 'mdi:android', 'mdi:ubuntu', 'mdi:apple-ios'] },
    code: `SO            % MERCADO   LICENCIA    MULTITAREA   MULTIUSUARIO
___________   ________    _________   __________   ____________
___________   ________    _________   __________   ____________
___________   ________    _________   __________   ____________`,
    language: 'text',
  },
  {
    id: 'w13-w-8', type: 'exercise', title: 'Ejercicio 5', subtitle: 'Cuadro comparativo de periféricos', minutes: 20,
    functionsToUse: ['Entrada', 'Salida', 'Almacenamiento', 'Comunicación'],
    content: 'Elige 5 periféricos y completa el cuadro:<br/><br/>1. <b>Tipo:</b> entrada, salida, almacenamiento o comunicación.<br/>2. <b>Conexión:</b> USB, HDMI, Bluetooth, Wi-Fi…<br/>3. <b>Driver</b> que necesita.<br/>4. <b>Función</b> en el sistema de información.',
    visual: { kind: 'bus' },
    code: `PERIFÉRICO   TIPO        CONEXIÓN   DRIVER    FUNCIÓN
__________   _________   ________   _______   ______________
__________   _________   ________   _______   ______________
__________   _________   ________   _______   ______________`,
    language: 'text',
  },
  {
    id: 'w13-w-9', type: 'exercise', title: 'Reto integrador', subtitle: 'HT-01 Analiza arquitectura SO', minutes: 30,
    functionsToUse: ['Kernel', 'Shell', 'API', 'Procesos', 'Memoria', 'E/S', 'Driver', 'Bus'],
    content: 'Une todo en un informe técnico:<br/><br/>1. Arquitectura del SO de tu equipo.<br/>2. Gestión de procesos, memoria y E/S (con capturas).<br/>3. Tipo de SO y su justificación.<br/>4. Inventario y cuadro de periféricos.<br/>5. Conclusión sobre el uso responsable de recursos.',
    code: `INFORME HT-01
1. Arquitectura:      kernel / shell / API
2. Recursos:          procesos / memoria / E/S
3. Tipo de SO:        ________  porque ________
4. Hardware:          inventario + periféricos
5. Conclusión:        ___________________________`,
    language: 'text',
  },
  {
    id: 'w13-w-10', type: 'callout', calloutType: 'warning', title: 'Seguridad en el taller',
    content: 'Antes de abrir o conectar hardware:<br/>• <b>Desconecta</b> el equipo de la corriente.<br/>• Revisa cables y enchufes.<br/>• Usa pulsera antiestática al tocar componentes.<br/>• Reporta cualquier daño.',
    visual: { kind: 'shield', label: 'Prevención de riesgos eléctricos' },
  },
  {
    id: 'w13-w-11', type: 'quiz', title: 'Reto del taller',
    question: '¿Qué elemento permite que el sistema operativo reconozca y controle un periférico?',
    options: ['Shell', 'API', 'Driver', 'Bus'], answer: 'Driver',
    explanation: 'El driver (controlador) traduce las órdenes del SO al lenguaje del dispositivo.',
  },
  { id: 'w13-w-12', type: 'closing', title: 'Fin del taller', subtitle: 'Presenta tu inventario, el cuadro comparativo y el informe HT-01.' },
];

/* ============================== SEMANA 14 ============================== */

export const week14Theory = [
  { id: 'w14-t-1', type: 'cover', title: 'Virtualización y Máquinas Virtuales', subtitle: 'Conocimiento Teórico · Semana 14', visual: { kind: 'hypervisor', type: 2 } },
  { id: "w14-t-index", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Conceptos de virtualización.", "Host, guest e hipervisor.", "Tipos de hipervisor.", "Software de virtualización.", "Formatos de disco virtual.", "Sistemas de archivos y arranque.", "Licenciamiento y eficiencia energética."], code: `HOST -> HIPERVISOR -> GUEST\nCPU + RAM + DISCO       Ubuntu virtual`, language: "text", notes: "" },
  {
    id: 'w14-t-2', type: 'visual', title: '¿Qué es la virtualización?', icon: 'mdi:layers-triple',
    content: 'Es crear <b>computadoras virtuales</b> dentro de una computadora real. Cada una funciona como un equipo independiente.',
    points: ['<b>Host:</b> el equipo físico real.', '<b>Guest:</b> el sistema operativo que corre dentro de la VM.', '<b>Hipervisor:</b> el software que reparte CPU, RAM y disco entre las VMs.'],
    visual: { kind: 'orbit', center: 'mdi:layers-triple', label: 'Hipervisor', satellites: ['mdi:linux', 'mdi:microsoft-windows', 'mdi:apple', 'mdi:ubuntu', 'mdi:server'] },
    caption: 'Un solo equipo físico, varios sistemas operativos',
  },
  {
    id: 'w14-t-3', type: 'compare', title: 'Hipervisor tipo 1 y tipo 2',
    content: 'La diferencia está en <b>dónde se instala</b> el hipervisor.',
    cards: [
      { icon: 'mdi:server', title: 'Tipo 1 · bare-metal', tag: 'Servidores', text: 'Se instala <b>directo sobre el hardware</b>. Más rendimiento.', visual: { kind: 'hypervisor', type: 1 }, details: ['Ejemplos: VMware ESXi, Hyper-V, Proxmox (KVM).', 'Se usa en <b>centros de datos</b>.'] },
      { icon: 'mdi:monitor', title: 'Tipo 2 · hosted', tag: 'Escritorio', text: 'Se instala <b>sobre un SO anfitrión</b>, como una aplicación.', visual: { kind: 'hypervisor', type: 2 }, details: ['Ejemplos: VirtualBox, VMware Workstation.', 'Ideal para <b>aprender y hacer pruebas</b>.'] },
    ],
  },
  {
    id: 'w14-t-4', type: 'compare', title: 'Software de virtualización',
    content: 'Las herramientas más usadas. Toca cada una para ver detalles.',
    cards: [
      { icon: 'mdi:cube-outline', title: 'VirtualBox', tag: 'Tipo 2', text: 'Gratuito y multiplataforma (Oracle).', details: ['Usa discos <b>VDI</b>.', 'Lo usaremos en el taller.'] },
      { icon: 'mdi:server-network', title: 'VMware', tag: 'Tipo 1 y 2', text: 'Workstation (escritorio) y ESXi (servidores).', details: ['Usa discos <b>VMDK</b>.', 'Muy usado en empresas.'] },
      { icon: 'mdi:microsoft-windows', title: 'Hyper-V', tag: 'Tipo 1', text: 'Incluido en Windows Pro y Windows Server.', details: ['Usa discos <b>VHD/VHDX</b>.', 'Se activa desde “Características de Windows”.'] },
      { icon: 'mdi:linux', title: 'KVM / Proxmox', tag: 'Tipo 1', text: 'Integrado en el kernel de Linux.', details: ['Usa discos <b>QCOW2</b>.', 'Libre y de código abierto.'] },
    ],
  },
  {
    id: 'w14-t-5', type: 'compare', title: 'Formatos de disco virtual',
    content: 'El disco de una VM es un <b>archivo</b> guardado en el disco del host. Puede ser <b>dinámico</b> (crece según uso) o <b>fijo</b> (ocupa todo desde el inicio).',
    cards: [
      { icon: 'mdi:harddisk', title: 'VDI', tag: 'VirtualBox', text: 'Virtual Disk Image.', details: ['Formato nativo de VirtualBox.'] },
      { icon: 'mdi:harddisk', title: 'VMDK', tag: 'VMware', text: 'Virtual Machine Disk.', details: ['También lo abre VirtualBox.'] },
      { icon: 'mdi:harddisk', title: 'VHD / VHDX', tag: 'Hyper-V', text: 'Virtual Hard Disk de Microsoft.', details: ['VHDX admite discos más grandes y es más resistente a fallos.'] },
      { icon: 'mdi:harddisk', title: 'QCOW2', tag: 'KVM', text: 'QEMU Copy On Write.', details: ['Permite instantáneas (snapshots).'] },
    ],
  },
  {
    id: 'w14-t-6', type: 'visual', title: 'Sistemas de archivos', kicker: 'Almacenamiento', icon: 'mdi:file-tree',
    content: 'Organizan cómo se <b>guardan y encuentran</b> los archivos en un disco.',
    points: ['<b>NTFS:</b> Windows. Permisos y archivos grandes.', '<b>EXT4:</b> Linux. Estable, con registro de cambios (journaling).', '<b>APFS:</b> macOS. Optimizado para SSD y con cifrado.'],
    visual: { kind: 'filetree' },
    caption: 'Árbol de directorios de Linux (EXT4): todo nace en /',
  },
  {
    id: 'w14-t-7', type: 'flow', title: 'Proceso de arranque e instalación', kicker: 'Del botón al escritorio',
    content: 'En una VM pasa lo mismo, pero el “disco de instalación” es un archivo <b>ISO</b>.',
    steps: [
      { icon: 'mdi:power', label: 'Encendido', detail: 'Presionas el botón: llega energía a la placa base.' },
      { icon: 'mdi:chip', label: 'BIOS / UEFI', detail: 'Revisa el hardware (<b>POST</b>) y busca un dispositivo de arranque.' },
      { icon: 'mdi:rocket-launch-outline', label: 'Gestor de arranque', detail: '<b>GRUB</b> o <b>Windows Boot Manager</b> carga el sistema elegido.' },
      { icon: 'mdi:atom', label: 'Kernel', detail: 'El núcleo se carga en memoria e inicia drivers y servicios.' },
      { icon: 'mdi:login', label: 'Inicio de sesión', detail: 'Aparece la pantalla de login: el sistema está listo. ✔' },
    ],
  },
  {
    id: 'w14-t-8', type: 'visual', title: 'Comandos básicos en Linux', kicker: 'Terminal', icon: 'mdi:console',
    content: 'La <b>terminal</b> permite gestionar archivos y carpetas rápidamente.',
    points: ['<code>pwd</code> dónde estoy · <code>ls</code> qué hay aquí', '<code>mkdir</code> crear carpeta · <code>cd</code> entrar a ella', '<code>touch</code> crear archivo · <code>cp</code> copiar · <code>mv</code> mover · <code>rm</code> borrar'],
    visual: {
      kind: 'terminal', title: 'Lubuntu · Terminal',
      lines: [
        { cmd: 'pwd', out: ['/home/estudiante'] },
        { cmd: 'mkdir practica && cd practica' },
        { cmd: 'touch informe.txt' },
        { cmd: 'cp informe.txt copia.txt' },
        { cmd: 'ls', out: ['copia.txt  informe.txt'] },
      ],
    },
    caption: 'Observa cómo se escriben los comandos',
  },
  {
    id: 'w14-t-9', type: 'compare', title: 'Licenciamiento de software',
    content: 'Una licencia dice <b>qué puedes hacer</b> con un programa. Usar software sin licencia es ilegal y riesgoso.',
    cards: [
      { icon: 'mdi:license', title: 'Propietario', text: 'Pagas por usarlo; el código es cerrado.', details: ['Windows, macOS, Microsoft Office.'] },
      { icon: 'mdi:open-source-initiative', title: 'Libre / código abierto', text: 'Puedes usarlo, estudiarlo, modificarlo y compartirlo.', details: ['Linux (GPL), Lubuntu, LibreOffice.'] },
      { icon: 'mdi:gift-outline', title: 'Freeware', text: 'Gratis, pero el código es cerrado.', details: ['Ej.: algunos lectores de PDF.'] },
      { icon: 'mdi:calendar-clock', title: 'Prueba / suscripción', text: 'Uso por tiempo limitado o pago mensual.', details: ['Ej.: Microsoft 365, versiones de evaluación de Windows.'] },
    ],
  },
  {
    id: 'w14-t-10', type: 'visual', title: 'Unidades y eficiencia energética', kicker: 'Configura con criterio', icon: 'mdi:leaf',
    content: 'La RAM y el disco de una VM se configuran en <b>MB y GB</b>. Convierte bien antes de asignar.',
    points: ['1 KB = 1024 B · 1 MB = 1024 KB · 1 GB = 1024 MB', 'Un servidor con varias VMs <b>ahorra energía</b> frente a muchos equipos físicos.', 'Apaga las VMs y los equipos que no uses.'],
    visual: { kind: 'units', value: 4, unit: 'GB' },
    caption: 'Prueba el conversor: escribe un valor y elige la unidad',
  },
  {
    id: 'w14-t-11', type: 'quiz', title: 'Comprobación rápida',
    question: '¿Qué tipo de hipervisor es VirtualBox?',
    options: ['Tipo 1 (bare-metal)', 'Tipo 2 (hosted)', 'Un sistema de archivos', 'Un formato de disco'], answer: 'Tipo 2 (hosted)',
    explanation: 'VirtualBox se instala sobre un sistema operativo anfitrión, como cualquier aplicación.',
  },
  { id: 'w14-t-12', type: 'closing', title: 'Fin de la teoría', subtitle: '¿Preguntas antes de crear nuestras máquinas virtuales?', visual: { kind: 'hypervisor', type: 2 } },
];

export const week14Workshop = [
  { id: 'w14-w-1', type: 'cover', title: 'Implementa máquinas virtuales', subtitle: 'Taller práctico · Semana 14 · HT-02', visual: { kind: 'orbit', center: 'mdi:cube-outline', label: 'VirtualBox', satellites: ['mdi:ubuntu', 'mdi:linux', 'mdi:microsoft-windows', 'mdi:apple', 'mdi:harddisk', 'mdi:memory'] } },
  {
    id: 'w14-w-2', type: 'interactive-list', title: 'Ruta del taller',
    items: ['Documenta Windows, Linux y macOS.', 'Instala VirtualBox y crea la VM.', 'Instala Lubuntu como sistema invitado.', 'Practica comandos de archivos en Linux.', 'Compara el rendimiento host vs guest.', 'Revisa licencias y convierte unidades.', 'Entrega el informe HT-02.'],
  },
  {
    id: 'w14-w-3', type: 'exercise', title: 'Ejercicio 1', subtitle: 'Documenta Windows, Linux y macOS', minutes: 15,
    functionsToUse: ['Desarrollador', 'Licencia', 'Sistema de archivos', 'Uso típico'],
    content: 'Investiga y completa la tabla de los tres sistemas.<br/><br/>Agrega una conclusión: ¿cuál conviene para un servidor, para diseño y para uso en oficina?',
    visual: { kind: 'orbit', center: 'mdi:monitor', satellites: ['mdi:microsoft-windows', 'mdi:linux', 'mdi:apple'] },
    code: `SO        DESARROLLADOR   LICENCIA   SIST. ARCHIVOS   USO TÍPICO
Windows   _____________   ________   ______________   __________
Linux     _____________   ________   ______________   __________
macOS     _____________   ________   ______________   __________`,
    language: 'text',
  },
  {
    id: 'w14-w-4', type: 'flow', title: 'Crea tu máquina virtual en VirtualBox', kicker: 'Paso a paso',
    steps: [
      { icon: 'mdi:download', label: 'Descargar', detail: 'Instala VirtualBox (virtualbox.org) y descarga la ISO de Lubuntu (lubuntu.me).' },
      { icon: 'mdi:plus-box-outline', label: 'Nueva VM', detail: 'Clic en <b>Nueva</b>: nombre <i>Lubuntu-SENATI</i>, tipo Linux, Ubuntu 64-bit.' },
      { icon: 'mdi:memory', label: 'RAM y CPU', detail: 'Asigna <b>2048 MB</b> de RAM y 2 núcleos. Nunca más de la mitad del host.' },
      { icon: 'mdi:harddisk-plus', label: 'Disco', detail: 'Crea un disco <b>VDI dinámico</b> de 25 GB.' },
      { icon: 'mdi:disc', label: 'ISO', detail: 'En <b>Almacenamiento</b>, carga la ISO en la unidad óptica.' },
      { icon: 'mdi:play-circle-outline', label: 'Iniciar', detail: 'Clic en <b>Iniciar</b>: la VM arranca desde la ISO. ✔' },
    ],
    visual: { kind: 'hypervisor', type: 2 },
  },
  {
    id: 'w14-w-5', type: 'exercise', title: 'Ejercicio 2', subtitle: 'Instala Lubuntu y verifica', minutes: 30,
    functionsToUse: ['ISO Lubuntu', 'Guest Additions', 'Borrar disco (solo VM)'],
    content: '1. Elige idioma y teclado <b>Español (Latinoamérica)</b>.<br/>2. Tipo de instalación: <b>Borrar disco</b> (solo afecta al disco virtual).<br/>3. Crea tu usuario y contraseña.<br/>4. Reinicia y retira la ISO.<br/>5. Verifica red, sonido y resolución de pantalla.',
    visual: { kind: 'flow', nodes: [{ icon: 'mdi:disc', label: 'ISO' }, { icon: 'mdi:cog-outline', label: 'Instalar' }, { icon: 'mdi:account-plus', label: 'Usuario' }, { icon: 'mdi:restart', label: 'Reiniciar' }, { icon: 'mdi:check-circle-outline', label: 'Listo' }] },
    code: `VERIFICACIÓN          OK / FALLA   OBSERVACIÓN
Arranca sin la ISO    ________     ____________
Conexión a Internet   ________     ____________
Resolución correcta   ________     ____________
Sonido                ________     ____________`,
    language: 'text',
  },
  {
    id: 'w14-w-6', type: 'exercise', title: 'Ejercicio 3', subtitle: 'Comandos de archivos en Linux', minutes: 20,
    functionsToUse: ['pwd', 'ls', 'mkdir', 'cd', 'touch', 'cp', 'mv', 'rm'],
    content: 'En la terminal de Lubuntu:<br/><br/>1. Crea la carpeta <code>senati</code> y dentro <code>semana14</code>.<br/>2. Crea <code>notas.txt</code> y cópialo como <code>respaldo.txt</code>.<br/>3. Mueve <code>respaldo.txt</code> a tu carpeta personal.<br/>4. Lista el resultado con <code>ls -l</code>.<br/>5. Borra <code>respaldo.txt</code>.',
    visual: {
      kind: 'terminal', title: 'Lubuntu · Terminal',
      lines: [
        { cmd: 'mkdir -p senati/semana14' },
        { cmd: 'cd senati/semana14 && touch notas.txt' },
        { cmd: 'cp notas.txt respaldo.txt' },
        { cmd: 'mv respaldo.txt ~/' },
        { cmd: 'ls -l', out: ['-rw-rw-r-- 1 estudiante estudiante 0 notas.txt'] },
      ],
    },
  },
  {
    id: 'w14-w-7', type: 'exercise', title: 'Ejercicio 4', subtitle: 'Rendimiento host vs guest', minutes: 20,
    functionsToUse: ['Administrador de tareas', 'htop', 'Cronómetro'],
    content: 'Compara tu PC física con la VM:<br/><br/>1. Tiempo de arranque.<br/>2. Tiempo para abrir el navegador.<br/>3. Uso de RAM y CPU.<br/>4. Conclusión: ¿por qué la VM es más lenta?',
    visual: { kind: 'gauge', value: 65, label: 'Ejemplo: RAM del host con la VM encendida' },
    code: `PRUEBA               HOST       GUEST (VM)
Arranque (segundos)  ________   ________
Abrir navegador      ________   ________
Uso de RAM           ________   ________
Uso de CPU           ________   ________`,
    language: 'text',
  },
  {
    id: 'w14-w-8', type: 'exercise', title: 'Ejercicio 5', subtitle: 'Licencias y conversión de unidades', minutes: 15,
    functionsToUse: ['GPL', 'Propietaria', '× 1024', '÷ 1024'],
    content: '1. ¿Qué licencia tienen VirtualBox, Lubuntu y Windows?<br/>2. Convierte: 25 GB a MB, 2048 MB a GB y 1 TB a GB.<br/>3. Comprueba tus respuestas con el conversor.',
    visual: { kind: 'units', value: 25, unit: 'GB' },
    caption: 'Conversor interactivo',
  },
  {
    id: 'w14-w-9', type: 'exercise', title: 'Reto integrador', subtitle: 'HT-02 Implementa máquinas virtuales', minutes: 30,
    functionsToUse: ['Host', 'Guest', 'Hipervisor', 'VDI', 'EXT4', 'Licencia'],
    content: 'Informe técnico con capturas:<br/><br/>1. Configuración de la VM (RAM, CPU, disco).<br/>2. Instalación de Lubuntu paso a paso.<br/>3. Comandos practicados y resultado.<br/>4. Tabla de rendimiento host vs guest.<br/>5. Licencias y uso responsable.',
    code: `INFORME HT-02
1. VM:          RAM ____  CPU ____  Disco ____ (VDI)
2. Instalación: capturas paso a paso
3. Comandos:    mkdir, cd, touch, cp, mv, rm
4. Rendimiento: host vs guest
5. Licencias y conclusiones`,
    language: 'text',
  },
  {
    id: 'w14-w-10', type: 'callout', calloutType: 'warning', title: 'Uso responsable y energía',
    content: '• Usa solo software <b>con licencia</b> o libre.<br/>• No asignes a la VM más de la mitad de la RAM del host.<br/>• Apaga las VMs al terminar: ahorras energía.<br/>• Mantén la ventilación del equipo libre.',
    visual: { kind: 'shield', label: 'Software legal y equipos seguros' },
  },
  {
    id: 'w14-w-11', type: 'quiz', title: 'Reto del taller',
    question: 'Al instalar Lubuntu en la VM eliges “Borrar disco”. ¿Qué ocurre?',
    options: ['Se borra el disco del host', 'Solo se usa el disco virtual de la VM', 'Se desinstala VirtualBox', 'Se formatea la memoria RAM'], answer: 'Solo se usa el disco virtual de la VM',
    explanation: 'La VM solo ve su propio disco virtual (archivo VDI). Los datos del host no se tocan.',
  },
  { id: 'w14-w-12', type: 'closing', title: 'Fin del taller', subtitle: 'Presenta tu informe HT-02 y la comparación de rendimiento.' },
];

/* ============================== SEMANA 15 ============================== */

export const week15Theory = [
  { id: 'w15-t-1', type: 'cover', title: 'Componentes de Red', subtitle: 'Conocimiento Teórico · Semana 15', visual: { kind: 'orbit', center: 'mdi:router-network', label: 'Red', satellites: ['mdi:laptop', 'mdi:cellphone', 'mdi:printer', 'mdi:server', 'mdi:monitor', 'mdi:tablet'] } },
  { id: "w15-t-index", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Tipos y clasificación de redes.", "Modelos OSI y TCP/IP.", "Topologías de red.", "Medios de transmisión.", "Protocolos principales.", "Direcciones MAC.", "Intranet y cliente-servidor."], code: `PC -> SWITCH -> ROUTER -> SERVIDOR\n     LAN       WAN       servicio`, language: "text", notes: "" },
  {
    id: 'w15-t-2', type: 'visual', title: '¿Qué es una red?', kicker: 'Fundamentos de networking', icon: 'mdi:lan',
    content: 'Dos o más dispositivos conectados para <b>compartir información y recursos</b>.',
    points: ['<b>Dispositivos finales:</b> PC, laptop, celular, impresora.', '<b>Dispositivos de red:</b> switch, router, access point.', '<b>Medios:</b> cable, fibra o aire (Wi-Fi).', '<b>Protocolos:</b> reglas que todos entienden.'],
    visual: { kind: 'network', topology: 'star' },
    caption: 'Los datos viajan en paquetes entre los equipos',
  },
  {
    id: 'w15-t-3', type: 'visual', title: 'Tipos de redes según su alcance', kicker: 'Clasificación', icon: 'mdi:earth', reverse: true,
    content: 'Cuanto más grande el área, más compleja la red.',
    points: ['<b>LAN:</b> una casa, un aula, una oficina.', '<b>WLAN:</b> una LAN inalámbrica (Wi-Fi).', '<b>MAN:</b> una ciudad (ej. sedes de una municipalidad).', '<b>WAN:</b> países o el mundo (Internet).'],
    visual: { kind: 'scopes' },
  },
  {
    id: 'w15-t-4', type: 'visual', title: 'Modelos OSI y TCP/IP', kicker: 'Capas de comunicación', icon: 'mdi:layers-outline',
    content: 'Dividen la comunicación en <b>capas</b>. Cada capa tiene una sola tarea.',
    points: ['OSI tiene <b>7 capas</b>: modelo de referencia para entender.', 'TCP/IP tiene <b>4 capas</b>: es el que usa Internet.', 'Al enviar, los datos <b>bajan</b> por las capas; al recibir, <b>suben</b>.'],
    visual: { kind: 'osi' },
    caption: 'Cada capa de TCP/IP agrupa una o más capas OSI',
  },
  {
    id: 'w15-t-5', type: 'compare', title: 'Topologías de red',
    content: 'La topología es la <b>forma</b> en que se conectan los equipos.',
    cards: [
      { icon: 'mdi:star-outline', title: 'Estrella', text: 'Todos se conectan a un <b>switch</b> central.', visual: { kind: 'network', topology: 'star' }, details: ['✔ Fácil de administrar.', '✘ Si falla el switch, cae la red.'] },
      { icon: 'mdi:minus', title: 'Bus', text: 'Todos comparten <b>un solo cable</b>.', visual: { kind: 'network', topology: 'bus' }, details: ['✔ Barata.', '✘ Un corte afecta a todos.'] },
      { icon: 'mdi:circle-outline', title: 'Anillo', text: 'Los datos circulan <b>en círculo</b>.', visual: { kind: 'network', topology: 'ring' }, details: ['✔ Orden en la transmisión.', '✘ Un equipo caído puede cortar el anillo.'] },
      { icon: 'mdi:vector-polyline', title: 'Malla', text: 'Cada equipo con <b>varios caminos</b>.', visual: { kind: 'network', topology: 'mesh' }, details: ['✔ Muy confiable.', '✘ Más cara y compleja.'] },
    ],
  },
  {
    id: 'w15-t-6', type: 'compare', title: 'Medios de transmisión',
    content: 'Por dónde viajan los datos.',
    cards: [
      { icon: 'mdi:ethernet-cable', title: 'Par trenzado', tag: 'Cobre', text: 'Cable UTP con conector RJ-45.', visual: { kind: 'media', medium: 'twisted' }, details: ['<b>Cat 5e:</b> 1 Gbps.', '<b>Cat 6:</b> 1 Gbps (10 Gbps en tramos cortos).', '<b>Cat 6A:</b> 10 Gbps hasta 100 m.'] },
      { icon: 'mdi:flare', title: 'Fibra óptica', tag: 'Luz', text: 'Pulsos de luz en un hilo de vidrio.', visual: { kind: 'media', medium: 'fiber' }, details: ['<b>Monomodo:</b> kilómetros de distancia.', '<b>Multimodo:</b> distancias cortas (edificios).', 'Inmune a interferencias eléctricas.'] },
      { icon: 'mdi:wifi', title: 'Inalámbrico (Wi-Fi)', tag: 'Aire', text: 'Ondas de radio en 2.4, 5 o 6 GHz.', visual: { kind: 'media', medium: 'wireless' }, details: ['Estándar <b>IEEE 802.11</b> (Wi-Fi 5, 6, 7).', 'Movilidad, pero más interferencias.'] },
    ],
  },
  {
    id: 'w15-t-7', type: 'visual', title: 'La dirección MAC', kicker: 'Direccionamiento físico', icon: 'mdi:card-account-details-outline',
    content: 'Es la <b>identificación física</b> de la tarjeta de red. Viene grabada de fábrica.',
    points: ['Tiene <b>48 bits</b> en hexadecimal: <code>00-1A-2B-3C-4D-5E</code>.', 'Los primeros 24 bits identifican al <b>fabricante</b>.', 'El switch usa la MAC para entregar los datos al equipo correcto.'],
    visual: {
      kind: 'terminal', title: 'Símbolo del sistema', prompt: 'C:\\>',
      lines: [
        { cmd: 'ipconfig /all', out: ['Adaptador de Ethernet:', '  Descripción . . . : Intel(R) Ethernet', '  Dirección física . : 00-1A-2B-3C-4D-5E'] },
        { cmd: 'getmac', out: ['00-1A-2B-3C-4D-5E'] },
      ],
    },
    caption: 'En Windows: ipconfig /all → “Dirección física”',
  },
  {
    id: 'w15-t-8', type: 'compare', title: 'Protocolos principales',
    content: 'Un protocolo es un <b>conjunto de reglas</b> para comunicarse.',
    cards: [
      { icon: 'mdi:web', title: 'HTTP / HTTPS', tag: 'Web', text: 'Carga páginas web. HTTPS va <b>cifrado</b>.', details: ['Puertos 80 y 443.'] },
      { icon: 'mdi:swap-horizontal', title: 'TCP / UDP', tag: 'Transporte', text: 'TCP es confiable; UDP es más rápido.', details: ['TCP: correo, web. UDP: video, juegos.'] },
      { icon: 'mdi:ip-network', title: 'IP', tag: 'Red', text: 'Pone dirección a cada paquete y lo enruta.', details: ['IPv4 (32 bits) e IPv6 (128 bits).'] },
      { icon: 'mdi:dns', title: 'DNS / DHCP', tag: 'Servicios', text: 'DNS traduce nombres a IP; DHCP asigna IP automática.', details: ['DNS: puerto 53. DHCP: 67/68.'] },
    ],
  },
  {
    id: 'w15-t-9', type: 'visual', title: 'Intranet y cliente-servidor', kicker: 'Servicios de red', icon: 'mdi:server', reverse: true,
    content: 'Una <b>Intranet</b> es la red privada de una organización. Usa las mismas tecnologías que Internet.',
    points: ['El <b>cliente</b> pide (navegador, app).', 'El <b>servidor</b> responde (web, archivos, impresión).', 'Requisitos: switch/router, cableado, servidor, IPs y seguridad.'],
    visual: { kind: 'client-server', request: 'GET /', response: '200 OK' },
    caption: 'Azul: solicitudes · verde: respuestas',
  },
  {
    id: 'w15-t-10', type: 'callout', calloutType: 'warning', title: 'Seguridad e higiene',
    content: '• No pises ni dobles los cables; ordénalos.<br/>• <b>Nunca mires</b> directo a un conector de fibra óptica: usa láser.<br/>• Desconecta los equipos antes de manipularlos.<br/>• Mantén las bebidas lejos de los equipos.',
    visual: { kind: 'shield', label: 'Trabajo seguro con redes' },
  },
  {
    id: 'w15-t-11', type: 'quiz', title: 'Comprobación rápida',
    question: '¿Qué topología conecta todos los equipos a un dispositivo central?',
    options: ['Bus', 'Anillo', 'Estrella', 'Malla'], answer: 'Estrella',
    explanation: 'En la topología estrella todos los equipos se conectan a un switch o hub central.',
  },
  { id: 'w15-t-12', type: 'closing', title: 'Fin de la teoría', subtitle: '¿Preguntas antes de pasar al taller?', visual: { kind: 'network', topology: 'mesh' } },
];

export const week15Workshop = [
  { id: 'w15-w-1', type: 'cover', title: 'Identifica componentes de red', subtitle: 'Taller práctico · Semana 15 · HT-03', visual: { kind: 'network', topology: 'star', center: 'mdi:lan' } },
  {
    id: 'w15-w-2', type: 'interactive-list', title: 'Ruta del taller',
    items: ['Clasifica redes LAN, MAN, WAN y WLAN.', 'Reconoce medios y topologías.', 'Simula una red simple en Packet Tracer.', 'Encuentra tu dirección MAC y protocolos.', 'Investiga los estándares IEEE 802.3 y 802.11.', 'Diseña el plano de red (HT-03).'],
  },
  {
    id: 'w15-w-3', type: 'exercise', title: 'Calentamiento', subtitle: 'Clasifica la red', minutes: 10,
    functionsToUse: ['LAN', 'WLAN', 'MAN', 'WAN'],
    content: 'Clasifica cada caso:<br/><br/>1. El Wi-Fi de tu casa.<br/>2. Las PCs cableadas del laboratorio.<br/>3. Las sedes de un banco en una ciudad.<br/>4. Internet.',
    visual: { kind: 'scopes' },
    code: `CASO                      TIPO     ¿ALÁMBRICA?
Wi-Fi de tu casa          ______   ______
Laboratorio cableado      ______   ______
Sedes en una ciudad       ______   ______
Internet                  ______   ______`,
    language: 'text',
  },
  {
    id: 'w15-w-4', type: 'exercise', title: 'Ejercicio 1', subtitle: 'Medios y topologías del laboratorio', minutes: 20,
    functionsToUse: ['UTP', 'RJ-45', 'Fibra', 'Wi-Fi', 'Estrella'],
    content: 'Observa el laboratorio (sin desconectar nada):<br/><br/>1. ¿Qué cable usan las PCs? Lee la categoría impresa en el cable.<br/>2. ¿Hay fibra óptica o Wi-Fi?<br/>3. ¿A qué dispositivo central llegan los cables?<br/>4. Dibuja la topología que encontraste.',
    visual: { kind: 'media', medium: 'twisted' },
    code: `ELEMENTO              OBSERVACIÓN
Tipo de cable         ______________
Categoría             ______________
Dispositivo central   ______________
Topología             ______________`,
    language: 'text',
  },
  {
    id: 'w15-w-5', type: 'flow', title: 'Simula una red en Packet Tracer', kicker: 'Ejemplo guiado',
    steps: [
      { icon: 'mdi:devices', label: 'Dispositivos', detail: 'Arrastra <b>1 switch 2960</b> y <b>3 PCs</b> al área de trabajo.' },
      { icon: 'mdi:ethernet-cable', label: 'Cableado', detail: 'Conecta cada PC al switch con <b>cable directo</b> (línea negra).' },
      { icon: 'mdi:ip-network', label: 'IPs', detail: 'PC0 <code>192.168.1.10</code>, PC1 <code>.11</code>, PC2 <code>.12</code> · máscara <code>255.255.255.0</code>.' },
      { icon: 'mdi:console', label: 'Prueba', detail: 'Desde PC0 → Command Prompt: <code>ping 192.168.1.11</code>.' },
      { icon: 'mdi:play-circle-outline', label: 'Simulación', detail: 'Activa el modo <b>Simulation</b> y mira viajar los paquetes ICMP. ✔' },
    ],
    visual: { kind: 'network', topology: 'star', center: 'mdi:lan' },
  },
  {
    id: 'w15-w-6', type: 'exercise', title: 'Ejercicio 2', subtitle: 'Tu red en Packet Tracer', minutes: 30,
    functionsToUse: ['Switch 2960', 'PC', 'Cable directo', 'ping'],
    content: '1. Arma la red del ejemplo con <b>4 PCs</b>.<br/>2. Asigna las IPs de la tabla.<br/>3. Haz ping entre todas las PCs.<br/>4. Captura el modo Simulation mostrando un paquete ICMP.',
    visual: { kind: 'ping', target: '192.168.1.11' },
    code: `EQUIPO   IP              MÁSCARA          PING OK
PC0      192.168.1.10    255.255.255.0    ____
PC1      192.168.1.11    255.255.255.0    ____
PC2      192.168.1.12    255.255.255.0    ____
PC3      192.168.1.13    255.255.255.0    ____`,
    language: 'text',
  },
  {
    id: 'w15-w-7', type: 'exercise', title: 'Ejercicio 3', subtitle: 'Protocolos y dirección MAC', minutes: 15,
    functionsToUse: ['ipconfig /all', 'getmac', 'arp -a'],
    content: '1. Encuentra la MAC de tu PC con <code>ipconfig /all</code>.<br/>2. Identifica al fabricante con los primeros 6 dígitos.<br/>3. Usa <code>arp -a</code> para ver MAC de otros equipos.<br/>4. Nombra 3 protocolos que usas al abrir una página web.',
    visual: { kind: 'terminal', title: 'Símbolo del sistema', prompt: 'C:\\>', lines: [{ cmd: 'getmac', out: ['00-1A-2B-3C-4D-5E'] }, { cmd: 'arp -a', out: ['192.168.1.1   a4-2b-b0-11-22-33   dinámico'] }] },
  },
  {
    id: 'w15-w-8', type: 'exercise', title: 'Ejercicio 4', subtitle: 'Estándares IEEE 802.3 y 802.11', minutes: 15,
    functionsToUse: ['802.3 (Ethernet)', '802.11 (Wi-Fi)', 'Velocidad', 'Frecuencia'],
    content: 'Investiga y completa:<br/><br/>1. ¿Qué regula el estándar 802.3? ¿Y el 802.11?<br/>2. Velocidad de Fast Ethernet y Gigabit Ethernet.<br/>3. Diferencia entre Wi-Fi 5 (802.11ac) y Wi-Fi 6 (802.11ax).',
    visual: { kind: 'media', medium: 'wireless' },
    code: `ESTÁNDAR     NOMBRE COMERCIAL   VELOCIDAD   MEDIO
802.3u       ________________   _________   _____
802.3ab      ________________   _________   _____
802.11ac     ________________   _________   _____
802.11ax     ________________   _________   _____`,
    language: 'text',
  },
  {
    id: 'w15-w-9', type: 'exercise', title: 'Reto integrador', subtitle: 'HT-03 Plano de red e Intranet', minutes: 30,
    functionsToUse: ['Draw.io', 'Topología', 'Medios', 'Servidor', 'Intranet'],
    content: 'Diseña en <b>Draw.io</b> el plano de red de un hogar u oficina:<br/><br/>1. Ubica router, switch, access point y equipos.<br/>2. Indica el medio de cada conexión.<br/>3. Agrega un servidor para la Intranet.<br/>4. Escribe los requisitos de la Intranet.',
    visual: { kind: 'client-server', request: 'Intranet', response: 'OK' },
    code: `PLANO DE RED HT-03
Ambiente:        __________________
Topología:       __________________
Dispositivos:    router / switch / AP / PCs
Medios:          UTP Cat __ / Wi-Fi / fibra
Intranet:        servidor ________  servicios ________`,
    language: 'text',
  },
  {
    id: 'w15-w-10', type: 'callout', calloutType: 'warning', title: 'Seguridad del taller',
    content: '• No desconectes cables del laboratorio sin autorización.<br/>• No mires a un conector de fibra óptica.<br/>• Ordena los cables para evitar caídas.<br/>• Reporta equipos dañados.',
    visual: { kind: 'shield', label: 'Laboratorio seguro' },
  },
  {
    id: 'w15-w-11', type: 'quiz', title: 'Reto del taller',
    question: '¿Qué comando muestra la dirección MAC en Windows?',
    options: ['ping', 'ipconfig /all', 'cd', 'mkdir'], answer: 'ipconfig /all',
    explanation: 'ipconfig /all muestra la “Dirección física” (MAC) de cada adaptador de red.',
  },
  { id: 'w15-w-12', type: 'closing', title: 'Fin del taller', subtitle: 'Presenta la simulación y el plano de red de HT-03.' },
];

/* ============================== SEMANA 16 ============================== */

export const week16Theory = [
  { id: 'w16-t-1', type: 'cover', title: 'Configuración de Redes LAN/WLAN', subtitle: 'Conocimiento Teórico · Semana 16', visual: { kind: 'waves' } },
  { id: "w16-t-index", type: "interactive-list", title: "¿Qué aprenderemos en esta semana?", items: ["Direccionamiento IPv4.", "Máscara, gateway y DNS.", "Subnetting básico y VLSM.", "Protocolos DHCP, HTTP e ICMP.", "Arquitectura cliente-servidor.", "Servidores locales e Intranet.", "Diagnóstico y seguridad de red."], code: `CLIENTE -> SWITCH -> ROUTER -> SERVIDOR\n         IP local   gateway   servicio`, language: "text", notes: "" },
  {
    id: 'w16-t-2', type: 'visual', title: 'La dirección IPv4', kicker: 'Protocolo IPv4', icon: 'mdi:ip-network',
    content: 'Es como la <b>dirección de tu casa</b> en la red: identifica a cada equipo.',
    points: ['Son <b>32 bits</b> en 4 octetos: <code>192.168.1.10</code>.', 'Una parte identifica la <b>red</b> y otra el <b>host</b>.', 'La <b>máscara</b> dice dónde termina la red.'],
    visual: { kind: 'ipv4', ip: '192.168.1.10', prefix: 24 },
    caption: 'Azul: parte de red · verde: parte de host',
  },
  {
    id: 'w16-t-3', type: 'compare', title: 'Clases, máscara, gateway y DNS',
    content: 'Los cuatro datos que necesita un equipo para conectarse.',
    cards: [
      { icon: 'mdi:alpha-c-box-outline', title: 'Clases', text: 'A, B y C según el primer octeto.', details: ['<b>A:</b> 1–126 · /8', '<b>B:</b> 128–191 · /16', '<b>C:</b> 192–223 · /24', 'Privadas: 10.x · 172.16–31.x · 192.168.x'] },
      { icon: 'mdi:filter-outline', title: 'Máscara', text: 'Separa la red del host.', details: ['255.255.255.0 = <b>/24</b>', '255.255.0.0 = <b>/16</b>'] },
      { icon: 'mdi:boom-gate-outline', title: 'Gateway', text: 'La <b>puerta de salida</b> a otras redes: el router.', details: ['Ej.: 192.168.1.1'] },
      { icon: 'mdi:dns', title: 'DNS', text: 'Traduce nombres a IP.', details: ['senati.edu.pe → dirección IP', 'Ej.: 8.8.8.8 · 1.1.1.1'] },
    ],
  },
  {
    id: 'w16-t-4', type: 'visual', title: 'Operaciones binarias', kicker: 'Base para subnetting', icon: 'mdi:calculator-variant',
    content: 'Para calcular subredes necesitas pasar de <b>binario a decimal</b>.',
    points: ['Cada bit vale: 128, 64, 32, 16, 8, 4, 2, 1.', 'Suma los bits encendidos: 11000000 = 128 + 64 = <b>192</b>.', '<b>AND</b> entre IP y máscara = dirección de red.'],
    visual: { kind: 'bits', value: 192 },
    caption: 'Interactivo: toca los bits y mira el resultado',
  },
  {
    id: 'w16-t-5', type: 'visual', title: 'Subnetting básico y VLSM', kicker: 'Dividir la red', icon: 'mdi:chart-tree', reverse: true,
    content: 'Dividir una red grande en <b>subredes</b> más pequeñas: más orden y más seguridad.',
    points: ['Cada bit que tomas del host <b>duplica</b> las subredes.', 'Hosts útiles = 2<sup>n</sup> − 2 (se restan red y broadcast).', '<b>VLSM:</b> subredes de distinto tamaño según la necesidad.'],
    visual: { kind: 'subnet', base: '192.168.1.0', prefix: 26 },
    caption: 'Mueve el control: /24 → /30',
  },
  {
    id: 'w16-t-6', type: 'visual', title: 'DHCP: IP automática', kicker: 'Protocolos', icon: 'mdi:server-network',
    content: 'El servidor DHCP entrega IP, máscara, gateway y DNS <b>automáticamente</b>.',
    points: ['4 pasos: <b>D</b>iscover, <b>O</b>ffer, <b>R</b>equest, <b>A</b>ck (DORA).', 'Evita errores de configuración manual.', 'En casa, el router suele ser el servidor DHCP.'],
    visual: { kind: 'dhcp' },
    caption: 'Proceso DORA',
  },
  {
    id: 'w16-t-7', type: 'compare', title: 'DNS, HTTP e ICMP',
    content: 'Tres protocolos que usas todos los días sin notarlo.',
    cards: [
      { icon: 'mdi:dns', title: 'DNS', tag: 'Puerto 53', text: 'Pregunta la IP de un nombre.', visual: { kind: 'dns' }, details: ['Sin DNS tendrías que memorizar IPs.'] },
      { icon: 'mdi:web', title: 'HTTP / HTTPS', tag: '80 / 443', text: 'Pide y entrega páginas web.', visual: { kind: 'client-server', request: 'GET', response: '200 OK' }, details: ['HTTPS cifra la información.'] },
      { icon: 'mdi:heart-pulse', title: 'ICMP', tag: 'ping', text: 'Comprueba si un equipo responde.', visual: { kind: 'ping' }, details: ['Lo usan <code>ping</code> y <code>tracert</code>.'] },
    ],
  },
  {
    id: 'w16-t-8', type: 'visual', title: 'Intranet y servidores locales', kicker: 'Cliente-servidor', icon: 'mdi:server',
    content: 'En una Intranet, los <b>servidores locales</b> ofrecen servicios solo a la red interna.',
    points: ['<b>Web:</b> la página interna de la empresa.', '<b>Archivos:</b> carpetas compartidas.', '<b>DHCP y DNS:</b> direcciones y nombres internos.', '<b>Impresión:</b> una impresora para todos.'],
    visual: { kind: 'orbit', center: 'mdi:server', label: 'Servidor local', satellites: ['mdi:web', 'mdi:folder-network', 'mdi:dns', 'mdi:printer', 'mdi:account-group', 'mdi:email-outline'] },
  },
  {
    id: 'w16-t-9', type: 'visual', title: 'Diagnóstico: ipconfig y ping', kicker: 'Comandos', icon: 'mdi:console', reverse: true,
    content: 'Dos comandos para saber si tu red funciona.',
    points: ['<code>ipconfig</code>: muestra tu IP, máscara y gateway.', '<code>ping</code>: comprueba si otro equipo responde.', 'Si el ping falla: revisa cable, IP y firewall.'],
    visual: {
      kind: 'terminal', title: 'Símbolo del sistema', prompt: 'C:\\>',
      lines: [
        { cmd: 'ipconfig', out: ['Dirección IPv4. . . : 192.168.1.10', 'Máscara de subred . : 255.255.255.0', 'Puerta de enlace . : 192.168.1.1'] },
        { cmd: 'ping 192.168.1.1', out: ['Respuesta desde 192.168.1.1: bytes=32 tiempo=2ms TTL=64', 'Paquetes: enviados = 4, recibidos = 4, perdidos = 0'] },
      ],
    },
  },
  {
    id: 'w16-t-10', type: 'callout', calloutType: 'warning', title: 'Seguridad en redes y equipos',
    content: '<b>Redes abiertas:</b> evita ingresar contraseñas o datos bancarios. Usa <b>HTTPS</b> y, si puedes, una VPN.<br/><br/><b>Tu Wi-Fi:</b> usa WPA2/WPA3 y una clave robusta.<br/><br/><b>Equipos energizados:</b> no manipules racks ni fuentes encendidas.',
    visual: { kind: 'shield', label: 'Información protegida' },
  },
  {
    id: 'w16-t-11', type: 'quiz', title: 'Comprobación rápida',
    question: 'Con la máscara 255.255.255.0 (/24), ¿cuántos hosts útiles tiene la red?',
    options: ['256', '254', '255', '128'], answer: '254',
    explanation: '2⁸ = 256 direcciones, menos la de red y la de broadcast = 254 hosts útiles.',
  },
  { id: 'w16-t-12', type: 'closing', title: 'Fin de la teoría', subtitle: '¿Preguntas antes de configurar nuestra red?', visual: { kind: 'waves' } },
];

export const week16Workshop = [
  { id: 'w16-w-1', type: 'cover', title: 'Configura redes LAN/WLAN', subtitle: 'Taller práctico · Semana 16 · HT-04', visual: { kind: 'network', topology: 'star', center: 'mdi:router-wireless' } },
  {
    id: 'w16-w-2', type: 'interactive-list', title: 'Ruta del taller',
    items: ['Analiza las partes de una dirección IPv4.', 'Calcula subredes para tres departamentos.', 'Configura un switch básico y la LAN.', 'Establece una WLAN segura.', 'Publica una página web local y diagnostica con ipconfig y ping.', 'Entrega el informe HT-04.'],
  },
  {
    id: 'w16-w-3', type: 'exercise', title: 'Calentamiento', subtitle: 'Analiza una dirección IPv4', minutes: 10,
    functionsToUse: ['Clase', 'Máscara', 'Red', 'Host'],
    content: 'Para la IP <code>172.16.20.35/16</code>:<br/><br/>1. ¿De qué clase es?<br/>2. ¿Cuál es su máscara en decimal?<br/>3. ¿Qué parte es red y qué parte es host?<br/>4. ¿Es pública o privada?',
    visual: { kind: 'ipv4', ip: '172.16.20.35', prefix: 16 },
  },
  {
    id: 'w16-w-4', type: 'flow', title: 'Ejemplo guiado: tres departamentos', kicker: 'Subnetting paso a paso',
    content: 'Red <code>192.168.10.0/24</code> para Ventas, Logística y Sistemas (hasta 60 equipos cada uno).',
    steps: [
      { icon: 'mdi:account-group', label: 'Necesidad', detail: 'Hasta 60 hosts → necesitamos 2<sup>6</sup> = <b>64</b> direcciones (62 útiles).' },
      { icon: 'mdi:calculator-variant', label: 'Prefijo', detail: '32 − 6 = <b>/26</b> → máscara <code>255.255.255.192</code>.' },
      { icon: 'mdi:cart-outline', label: 'Ventas', detail: '<code>192.168.10.0/26</code> → hosts .1 a .62 · broadcast .63' },
      { icon: 'mdi:truck-outline', label: 'Logística', detail: '<code>192.168.10.64/26</code> → hosts .65 a .126 · broadcast .127' },
      { icon: 'mdi:laptop', label: 'Sistemas', detail: '<code>192.168.10.128/26</code> → hosts .129 a .190 · broadcast .191' },
    ],
    visual: { kind: 'subnet', base: '192.168.10.0', prefix: 26 },
  },
  {
    id: 'w16-w-5', type: 'exercise', title: 'Ejercicio 1', subtitle: 'Calcula tus subredes', minutes: 25,
    functionsToUse: ['2ⁿ − 2', 'Máscara', 'Broadcast'],
    content: 'Red <code>192.168.20.0/24</code> para 4 áreas de <b>hasta 25 equipos</b>.<br/><br/>1. ¿Cuántos bits de host necesitas?<br/>2. ¿Qué prefijo y máscara usarás?<br/>3. Completa la tabla.<br/>4. Comprueba con el simulador.',
    visual: { kind: 'subnet', base: '192.168.20.0', prefix: 27 },
    code: `ÁREA        RED              PRIMER HOST   ÚLTIMO HOST   BROADCAST
Gerencia    ______________   ___________   ___________   _________
Ventas      ______________   ___________   ___________   _________
Soporte     ______________   ___________   ___________   _________
Almacén     ______________   ___________   ___________   _________`,
    language: 'text',
  },
  {
    id: 'w16-w-6', type: 'exercise', title: 'Ejercicio 2', subtitle: 'Switch básico y LAN', minutes: 25,
    functionsToUse: ['enable', 'configure terminal', 'hostname', 'interface vlan 1'],
    content: 'En Packet Tracer:<br/><br/>1. Ponle nombre al switch y una contraseña.<br/>2. Asigna una IP de administración.<br/>3. Conecta 3 PCs de la subred de Ventas.<br/>4. Guarda la configuración y prueba con ping.',
    visual: { kind: 'network', topology: 'star', center: 'mdi:lan' },
    code: `enable
configure terminal
hostname SW-VENTAS
enable secret Senati2026
interface vlan 1
 ip address 192.168.10.2 255.255.255.192
 no shutdown
end
copy running-config startup-config`,
    language: 'bash',
  },
  {
    id: 'w16-w-7', type: 'exercise', title: 'Ejercicio 3', subtitle: 'WLAN segura', minutes: 20,
    functionsToUse: ['SSID', 'WPA2/WPA3', 'Clave robusta', 'DHCP'],
    content: 'Configura el router inalámbrico (real o en Packet Tracer):<br/><br/>1. Cambia el <b>SSID</b> por defecto.<br/>2. Usa seguridad <b>WPA2 o WPA3-Personal</b>.<br/>3. Crea una clave de 12+ caracteres.<br/>4. Cambia la contraseña de administrador.<br/>5. Conecta una laptop y verifica la IP por DHCP.',
    visual: { kind: 'waves' },
    code: `PARÁMETRO              VALOR
SSID                   ______________
Seguridad              ______________
Contraseña Wi-Fi       (no la compartas)
Rango DHCP             ______ a ______
Laptop conectada (IP)  ______________`,
    language: 'text',
  },
  {
    id: 'w16-w-8', type: 'exercise', title: 'Ejercicio 4', subtitle: 'Página web local y diagnóstico', minutes: 25,
    functionsToUse: ['index.html', 'python -m http.server', 'ipconfig', 'ping'],
    content: '1. Crea <code>index.html</code> con el nombre de tu equipo.<br/>2. En esa carpeta ejecuta <code>python -m http.server 8080</code>.<br/>3. Desde otra PC abre <code>http://TU_IP:8080</code>.<br/>4. Si no carga: usa <code>ipconfig</code> y <code>ping</code> para diagnosticar.',
    visual: { kind: 'client-server', request: 'GET /index.html', response: '200 OK' },
    code: `<!DOCTYPE html>
<html lang="es">
  <head><meta charset="UTF-8"><title>Intranet SENATI</title></head>
  <body>
    <h1>Bienvenido a la Intranet de Ventas</h1>
    <p>Servidor: PC-01 · 192.168.10.10</p>
  </body>
</html>`,
    language: 'html',
  },
  {
    id: 'w16-w-9', type: 'exercise', title: 'Reto integrador', subtitle: 'HT-04 Configura redes LAN/WLAN', minutes: 30,
    functionsToUse: ['Subnetting', 'Switch', 'WLAN', 'Servidor web', 'ping'],
    content: 'Informe con capturas:<br/><br/>1. Tabla de subredes de los departamentos.<br/>2. Configuración del switch.<br/>3. WLAN con seguridad WPA2/WPA3.<br/>4. Página web local funcionando.<br/>5. Servidores esenciales de la red (DHCP, DNS, web, archivos).<br/>6. Pruebas con ipconfig y ping.',
    code: `INFORME HT-04
1. Subredes:     tabla red / hosts / broadcast
2. Switch:       hostname, IP, contraseña
3. WLAN:         SSID, WPA2/WPA3, DHCP
4. Web local:    http://____________:8080
5. Servidores:   DHCP / DNS / web / archivos
6. Diagnóstico:  ipconfig + ping (capturas)`,
    language: 'text',
  },
  {
    id: 'w16-w-10', type: 'callout', calloutType: 'warning', title: 'Seguridad del taller',
    content: '• No manipules routers ni switches <b>energizados</b> por dentro.<br/>• No compartas la clave del Wi-Fi.<br/>• No te conectes a redes abiertas para hacer el trabajo.<br/>• Ordena los cables al terminar.',
    visual: { kind: 'shield', label: 'Red y equipos seguros' },
  },
  {
    id: 'w16-w-11', type: 'quiz', title: 'Reto del taller',
    question: '¿Qué comando usarías para comprobar si el gateway 192.168.10.1 responde?',
    options: ['ipconfig', 'ping 192.168.10.1', 'mkdir red', 'ls -l'], answer: 'ping 192.168.10.1',
    explanation: 'ping envía mensajes ICMP y muestra si el equipo responde y en cuánto tiempo.',
  },
  { id: 'w16-w-12', type: 'closing', title: 'Fin del taller', subtitle: 'Presenta tu informe HT-04. ¡Buen cierre de módulo!' },
];
