import { week13Theory, week13Workshop, week14Theory, week14Workshop, week15Theory, week15Workshop, week16Theory, week16Workshop } from './piad-224-decks';

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
      theory: { slides: week13Theory },
      workshop: { slides: week13Workshop }
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
      theory: { slides: week14Theory },
      workshop: { slides: week14Workshop }
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
      theory: { slides: week15Theory },
      workshop: { slides: week15Workshop }
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
      theory: { slides: week16Theory },
      workshop: { slides: week16Workshop }
    }
  ]
};
