import {
  ScrumPillar,
  ScrumValue,
  ScrumRole,
  ScrumEvent,
  ScrumArtifact,
  UserStory,
  GameQuestion,
  Badge,
  ToolIntegrationInfo,
  ReferenceSource
} from '../types/scrum';

export const SCRUM_PILLARS: ScrumPillar[] = [
  {
    id: 'transparency',
    name: 'Transparencia',
    tagline: 'Lo que se ve es la realidad compartida',
    description: 'El proceso y el trabajo emergente deben ser visibles tanto para quienes realizan el trabajo como para quienes lo reciben. Sin transparencia, las decisiones para inspeccionar y adaptar carecen de fundamento.',
    example: 'El Sprint Backlog y el Incremento son visibles para todo el equipo en tiempo real; ningún miembro oculta impedimentos en la Daily Scrum.',
    iconName: 'Eye'
  },
  {
    id: 'inspection',
    name: 'Inspección',
    tagline: 'Detectar desviaciones o problemas a tiempo',
    description: 'Los artefactos de Scrum y el progreso hacia los objetivos acordados deben inspeccionarse con frecuencia y diligencia para detectar variaciones o problemas potencialmente indeseables.',
    example: 'Durante la Sprint Review se inspecciona el Incremento terminado junto a los stakeholders para comprobar si aporta valor real al negocio.',
    iconName: 'SearchCheck'
  },
  {
    id: 'adaptation',
    name: 'Adaptación',
    tagline: 'Ajustar el rumbo cuando la realidad cambia',
    description: 'Si algún aspecto de un proceso se desvía fuera de los límites aceptables o si el producto resultante es inaceptable, el proceso o el material que se procesa debe ajustarse lo antes posible.',
    example: 'En la Retrospectiva, el equipo identifica que las pruebas manuales demoran la entrega e implementa una acción concreta para automatizarlas en el siguiente Sprint.',
    iconName: 'RefreshCw'
  }
];

export const SCRUM_VALUES: ScrumValue[] = [
  {
    id: 'commitment',
    name: 'Compromiso',
    description: 'Las personas se comprometen personalmente a alcanzar los objetivos del equipo Scrum y a apoyarse mutuamente.',
    inPractice: 'El equipo se enfoca en cumplir el Sprint Goal y no en simplemente "cerrar tickets" de forma aislada.',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'courage',
    name: 'Coraje',
    description: 'Los miembros tienen el valor de hacer lo correcto y de trabajar en los problemas difíciles y desafiantes.',
    inPractice: 'Decir "no" a introducir trabajo a mitad del Sprint si pone en riesgo el Sprint Goal, o admitir de inmediato un bloqueo técnico.',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'focus',
    name: 'Foco (Enfoque)',
    description: 'El foco principal de todos está en el trabajo del Sprint y en los objetivos del equipo Scrum.',
    inPractice: 'Evitar la multitarea descontrolada; terminar una historia de usuario antes de iniciar la siguiente (Stop Starting, Start Finishing).',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'openness',
    name: 'Apertura (Franqueza)',
    description: 'El equipo Scrum y sus interesados acuerdan ser abiertos sobre todo el trabajo y los desafíos que surgen.',
    inPractice: 'Compartir métricas reales de velocidad y calidad técnica sin maquillar números ante la gerencia.',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'respect',
    name: 'Respeto',
    description: 'Los miembros del equipo Scrum se respetan entre sí como personas capaces e independientes.',
    inPractice: 'Confiar plenamente en el criterio técnico de los Desarrolladores y en la priorización de valor del Product Owner.',
    color: 'from-purple-500 to-indigo-600'
  }
];

export const WATERFALL_VS_SCRUM = [
  {
    aspect: 'Filosofía base',
    waterfall: 'Predictivo: Se planea todo al inicio y se asume que los requisitos no cambiarán.',
    scrum: 'Adaptativo & Empírico: Se experimenta en ciclos cortos respondiendo al cambio continuo.'
  },
  {
    aspect: 'Entrega de Valor',
    waterfall: 'Al final del proyecto (meses o años después), con alto riesgo de obsolescencia.',
    scrum: 'Incremental y continuo: cada Sprint (1 a 4 semanas) produce un Incremento utilizable.'
  },
  {
    aspect: 'Gestión de Cambios',
    waterfall: 'Costoso y burocrático (comités de cambio, penalizaciones).',
    scrum: 'Bienvenido: las nuevas prioridades se incorporan de forma natural en el Product Backlog.'
  },
  {
    aspect: 'Estructura de Equipos',
    waterfall: 'Silos especializados (analistas, diseñadores, codificadores, testers por separado).',
    scrum: 'Multidisciplinario y autogestionado: todas las habilidades necesarias están en el mismo equipo.'
  },
  {
    aspect: 'Mitigación de Riesgos',
    waterfall: 'Los errores de arquitectura o de negocio se descubren en la fase tardía de pruebas.',
    scrum: 'Riesgo reducido drásticamente mediante feedback temprano de clientes en cada Sprint Review.'
  }
];

export const SCRUM_ROLES: ScrumRole[] = [
  {
    id: 'product-owner',
    title: 'Product Owner (PO)',
    subtitle: 'El maximizador del valor del producto',
    accountabilities: [
      'Desarrollar y comunicar explícitamente el Objetivo del Producto (Product Goal).',
      'Crear y comunicar claramente los elementos del Product Backlog.',
      'Ordenar y priorizar los elementos del Product Backlog para optimizar el valor entregado.',
      'Asegurarse de que el Product Backlog sea transparente, visible y entendido por todos.'
    ],
    antiPatterns: [
      'Actuar como un "tomador de pedidos" sin criterio estratégico propio.',
      'Cambiar el Sprint Goal en medio de un Sprint en curso.',
      'Microgestionar a los desarrolladores dictándoles "cómo" programar.'
    ],
    keyQuestion: '¿Qué debemos construir para maximizar el retorno de inversión y el valor al usuario?',
    icon: 'Crown',
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-500'
  },
  {
    id: 'scrum-master',
    title: 'Scrum Master (SM)',
    subtitle: 'Líder que está al servicio del equipo y la organización',
    accountabilities: [
      'Fomentar la efectividad del equipo ayudándolo a mejorar sus prácticas dentro del marco Scrum.',
      'Facilitar la eliminación de impedimentos que frenan el avance de los Desarrolladores.',
      'Asegurar que todos los eventos de Scrum se lleven a cabo, sean positivos y se mantengan dentro del timebox.',
      'Guiar a la organización en la adopción ágil y colaborar con el Product Owner en la gestión del Backlog.'
    ],
    antiPatterns: [
      'Comportarse como un "jefe de proyecto tradicional" que asigna tareas individuales.',
      'Ser el único que habla en la Daily Scrum o convertirla en un reporte de estatus.',
      'Permitir que el equipo ignore la Definición de Hecho (Definition of Done).'
    ],
    keyQuestion: '¿Cómo puedo potenciar la autogestión de mi equipo y remover cualquier obstáculo?',
    icon: 'ShieldCheck',
    color: 'border-blue-500/40 bg-blue-500/10 text-blue-500'
  },
  {
    id: 'developers',
    title: 'Desarrolladores (Developers)',
    subtitle: 'Profesionales comprometidos con crear un Incremento utilizable',
    accountabilities: [
      'Crear un plan para el Sprint: el Sprint Backlog.',
      'Inculcar calidad adhiriéndose rigurosamente a una Definición de Hecho (DoD).',
      'Adaptar su plan cada día hacia el Sprint Goal durante la Daily Scrum.',
      'Responsabilizarse mutuamente como profesionales multidisciplinarios (diseño, código, QA, devops).'
    ],
    antiPatterns: [
      'Trabajar en silos aislados ("yo solo hago backend, no me toquen el front").',
      'No actualizar el tablero de tareas o dejar las pruebas para el último día del Sprint.',
      'Aceptar más trabajo del que su capacidad real les permite en la planificación.'
    ],
    keyQuestion: '¿Cómo diseñamos, construimos y verificamos un incremento terminado y con alta calidad técnica?',
    icon: 'Code2',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500'
  }
];

export const SCRUM_EVENTS: ScrumEvent[] = [
  {
    id: 'sprint',
    name: 'El Sprint (El Contenedor)',
    timebox: '1 a 4 semanas (habitual: 2 semanas)',
    timeboxRule: 'Fijo e inalterable. Tan pronto termina uno, inicia el siguiente.',
    purpose: 'Es el latido del corazón de Scrum, donde las ideas se convierten en valor tangible de forma continua.',
    participants: 'Todo el Equipo Scrum (PO, SM y Developers).',
    inputs: ['Product Backlog actualizado', 'Capacidad del equipo', 'Rendimiento pasado'],
    outputs: ['Incremento utilizable que cumple la Definition of Done', 'Nuevo aprendizaje'],
    bestPractices: [
      'No realizar cambios que pongan en peligro el Sprint Goal.',
      'Mantener constante la duración entre Sprints para tener cadencia y predictibilidad.',
      'El alcance puede clarificarse y renegociarse entre el PO y Developers según se aprenda más.'
    ]
  },
  {
    id: 'sprint-planning',
    name: 'Sprint Planning',
    timebox: 'Máximo 8 horas para un Sprint de 1 mes (4 horas para 2 semanas)',
    timeboxRule: 'Al inicio de cada Sprint.',
    purpose: 'Establecer el trabajo a realizar durante el Sprint respondiendo: 1) ¿Por qué es valioso? (Sprint Goal), 2) ¿Qué se puede hacer? (Historias seleccionadas), 3) ¿Cómo se realizará? (Desglose de tareas).',
    participants: 'Todo el Equipo Scrum.',
    inputs: ['Product Backlog priorizado', 'Definición de Hecho', 'Velocidad histórica'],
    outputs: ['Sprint Goal acordado', 'Sprint Backlog'],
    bestPractices: [
      'El Sprint Goal debe ser claro, inspirador y orientador del valor.',
      'Solo los Desarrolladores estiman el esfuerzo y deciden cuánto trabajo seleccionan.',
      'Desglosar las historias de los primeros días en tareas menores a 1 día de esfuerzo.'
    ]
  },
  {
    id: 'daily-scrum',
    name: 'Daily Scrum (Reunión Diaria)',
    timebox: '15 minutos exactos',
    timeboxRule: 'Cada día laboral a la misma hora y en el mismo lugar.',
    purpose: 'Inspeccionar el progreso hacia el Sprint Goal y adaptar el Sprint Backlog según sea necesario para las próximas 24 horas.',
    participants: 'Desarrolladores (el Scrum Master y Product Owner asisten si tienen tareas activas).',
    inputs: ['Sprint Backlog actual', 'Estado de tareas del día anterior', 'Bloqueos detectados'],
    outputs: ['Sprint Backlog actualizado', 'Plan de colaboración para las próximas 24 horas'],
    bestPractices: [
      'No es un reporte de estatus para un jefe; es una sesión de sincronización entre iguales.',
      'Foco en: ¿Qué logramos ayer hacia la meta? ¿Qué haremos hoy? ¿Hay algún impedimento?',
      'Las discusiones técnicas profundas se programan inmediatamente después de los 15 minutos.'
    ]
  },
  {
    id: 'sprint-review',
    name: 'Sprint Review (Revisión del Sprint)',
    timebox: 'Máximo 4 horas para un Sprint de 1 mes (2 horas para 2 semanas)',
    timeboxRule: 'Al final del Sprint, antes de la Retrospectiva.',
    purpose: 'Inspeccionar el resultado del Sprint y determinar futuras adaptaciones. El equipo presenta los resultados de su trabajo a los stakeholders clave.',
    participants: 'Equipo Scrum completo e Interesados clave (Stakeholders, clientes, usuarios).',
    inputs: ['Incremento completado con Definition of Done', 'Estado del mercado y presupuesto'],
    outputs: ['Product Backlog adaptado con nuevos requerimientos y prioridades'],
    bestPractices: [
      'Es una sesión colaborativa de trabajo, no una simple demostración unilateral (demo).',
      'Solo se muestra software real funcionando que cumpla la DoD (no diapositivas teóricas).',
      'Se discuten cambios en el mercado para actualizar la hoja de ruta del producto.'
    ]
  },
  {
    id: 'sprint-retrospective',
    name: 'Sprint Retrospective (Retrospectiva)',
    timebox: 'Máximo 3 horas para un Sprint de 1 mes (1.5 horas para 2 semanas)',
    timeboxRule: 'El último evento del Sprint.',
    purpose: 'Planificar formas de aumentar la calidad y la efectividad inspeccionando cómo fue el último Sprint con respecto a personas, relaciones, procesos y herramientas.',
    participants: 'El Equipo Scrum exclusivamente (ambiente seguro y de confianza).',
    inputs: ['Métricas del Sprint', 'Eventos ocurridos', 'Observaciones del equipo'],
    outputs: ['Al menos 1 o 2 mejoras procesables de alta prioridad para el siguiente Sprint'],
    bestPractices: [
      'Regla de Oro: Asumir que todos hicieron lo mejor que pudieron con lo que sabían.',
      'Identificar qué fue bien, qué problemas surgieron y cómo se resolvieron (o no).',
      'Incorporar las mejoras directamente en el Sprint Backlog del próximo Sprint.'
    ]
  }
];

export const SCRUM_ARTIFACTS: ScrumArtifact[] = [
  {
    id: 'product-backlog',
    name: 'Product Backlog',
    commitment: 'Objetivo del Producto (Product Goal)',
    commitmentDescription: 'Describe un estado futuro del producto que sirve como objetivo a largo plazo para el equipo Scrum.',
    description: 'Es una lista ordenada y emergente de todo lo que se sabe que es necesario en el producto. Es la única fuente de trabajo emprendido por el equipo Scrum.',
    characteristics: [
      'Dinámico y vivo: nunca está completo, evoluciona junto con el mercado.',
      'Los elementos superiores están más detallados (refinados) y listos para ser estimados.',
      'DEEP: Detailed appropriately, Estimated, Emergent, Prioritized.'
    ]
  },
  {
    id: 'sprint-backlog',
    name: 'Sprint Backlog',
    commitment: 'Objetivo del Sprint (Sprint Goal)',
    commitmentDescription: 'El único propósito del Sprint. Es un compromiso de los Desarrolladores que ofrece flexibilidad en el trabajo necesario para lograrlo.',
    description: 'Compuesto por el Sprint Goal (por qué), el conjunto de elementos del Product Backlog seleccionados (qué), y un plan de acción para entregar el Incremento (cómo).',
    characteristics: [
      'Propiedad exclusiva de los Desarrolladores.',
      'Es un plan detallado y altamente visible en tiempo real.',
      'Se actualiza durante todo el Sprint a medida que se aprende más.'
    ]
  },
  {
    id: 'increment',
    name: 'El Incremento',
    commitment: 'Definición de Hecho (Definition of Done - DoD)',
    commitmentDescription: 'Una descripción formal del estado del Incremento cuando cumple con las medidas de calidad requeridas para el producto.',
    description: 'Es un peldaño concreto hacia el Objetivo del Producto. Cada Incremento se suma a todos los anteriores y se verifica exhaustivamente, asegurando que todos funcionen juntos.',
    characteristics: [
      'Para proporcionar valor, el Incremento debe ser utilizable e inspeccionable.',
      'Si un elemento no cumple la Definición de Hecho, no se puede publicar ni presentar en la Sprint Review; regresa al Product Backlog.',
      'Pueden crearse múltiples Incrementos dentro de un mismo Sprint.'
    ]
  }
];

export const INITIAL_USER_STORIES: UserStory[] = [
  {
    id: 'US-01',
    title: 'Autenticación con Huella / FaceID',
    rolePersona: 'usuario recurrente',
    want: 'iniciar sesión biométricamente',
    soThat: 'hacer pedidos en menos de 5 segundos sin escribir contraseñas',
    storyPoints: 5,
    priority: 'alta',
    status: 'done',
    assignee: { name: 'Sofía Chen', avatar: '👩‍💻', role: 'Seguridad & Mobile' },
    tags: ['Auth', 'Mobile', 'Biometría'],
    checklist: [
      { id: 'c1', text: 'Pruebas unitarias de enclave seguro > 85%', completed: true },
      { id: 'c2', text: 'Verificación de fallback con PIN seguro', completed: true },
      { id: 'c3', text: 'Revisión por pares (Code Review)', completed: true },
      { id: 'c4', text: 'Documentación de API actualizada', completed: true }
    ],
    acceptanceCriteria: [
      'Soporte para FaceID en iOS y BiometricPrompt en Android',
      'Bloqueo tras 3 intentos fallidos con opción de PIN',
      'Tiempo de respuesta < 600ms'
    ]
  },
  {
    id: 'US-02',
    title: 'Geolocalización en Tiempo Real del Repartidor',
    rolePersona: 'cliente con pedido activo',
    want: 'ver el mapa en vivo con la posición del repartidor',
    soThat: 'saber con precisión cuándo esperar en la puerta',
    storyPoints: 8,
    priority: 'critica',
    status: 'in_progress',
    assignee: { name: 'Mateo Morales', avatar: '👨‍💻', role: 'Backend & Maps' },
    tags: ['GPS', 'WebSockets', 'Frontend'],
    checklist: [
      { id: 'c5', text: 'Conexión WebSocket con reconexión automática', completed: true },
      { id: 'c6', text: 'Pruebas de estrés para 500 conexiones simultáneas', completed: true },
      { id: 'c7', text: 'Pruebas E2E en dispositivo móvil real', completed: false },
      { id: 'c8', text: 'Aprobación de diseño UX responsive', completed: false }
    ],
    acceptanceCriteria: [
      'Actualización de coordenadas cada 3 segundos',
      'Cálculo dinámico de ETA en minutos y metros',
      'Icono animado con dirección de movimiento'
    ]
  },
  {
    id: 'US-03',
    title: 'Pasarela de Pagos con Apple Pay y Google Pay',
    rolePersona: 'comprador móvil',
    want: 'pagar con 1 solo toque usando mi wallet del sistema',
    soThat: 'evitar digitar datos de tarjeta de crédito',
    storyPoints: 8,
    priority: 'alta',
    status: 'review',
    assignee: { name: 'Valentina López', avatar: '👩‍💻', role: 'Fintech & Cloud' },
    tags: ['Pagos', 'Stripe', 'Wallet'],
    checklist: [
      { id: 'c9', text: 'Certificación PCI DSS y tokenización de tarjeta', completed: true },
      { id: 'c10', text: 'Pruebas automáticas de pago exitoso y declinado', completed: true },
      { id: 'c11', text: 'Code review de seguridad aprobado', completed: true },
      { id: 'c12', text: 'Confirmación de webhook bancario testeado', completed: false }
    ],
    acceptanceCriteria: [
      'Detección automática del wallet soportado en el dispositivo',
      'Generación de recibo digital en PDF y correo inmediato',
      'Gestión transparente de fallos con mensaje amigable'
    ]
  },
  {
    id: 'US-04',
    title: 'Filtro Dietético y Alérgenos en Restaurantes',
    rolePersona: 'comensal con celiaquía o vegano',
    want: 'filtrar platillos libres de gluten y alérgenos',
    soThat: 'ordenar comida segura para mi salud',
    storyPoints: 3,
    priority: 'media',
    status: 'todo',
    assignee: { name: 'Lucas Silva', avatar: '👨‍🎨', role: 'Frontend UI/UX' },
    tags: ['Filtros', 'Salud', 'Accesibilidad'],
    checklist: [
      { id: 'c13', text: 'Diseño accesible contrastes WCAG AA', completed: false },
      { id: 'c14', text: 'Pruebas con datos de prueba de alérgenos', completed: false },
      { id: 'c15', text: 'Validación en QA staging', completed: false }
    ],
    acceptanceCriteria: [
      'Badges visibles de Gluten Free, Vegano, Libre de Frutos Secos',
      'Filtrado instantáneo en menos de 200ms',
      'Descargo de responsabilidad visible de contaminación cruzada'
    ]
  },
  {
    id: 'US-05',
    title: 'Calificación y Propinas post-entrega',
    rolePersona: 'usuario satisfecho',
    want: 'calificar al repartidor y dejar propina voluntaria',
    soThat: 'reconocer su buen servicio',
    storyPoints: 5,
    priority: 'media',
    status: 'todo',
    assignee: { name: 'Ana Romero', avatar: '👩‍💻', role: 'Fullstack' },
    tags: ['Reviews', 'Tips'],
    checklist: [
      { id: 'c16', text: 'Componente interactivo de 5 estrellas', completed: false },
      { id: 'c17', text: 'Cálculo automático de porcentajes de propina', completed: false }
    ],
    acceptanceCriteria: [
      'Valores predefinidos de propina: 10%, 15%, 20% o personalizado',
      'Posibilidad de dejar comentarios al restaurante y al repartidor por separado'
    ]
  },
  {
    id: 'US-06',
    title: 'Recomendaciones con Inteligencia Artificial',
    rolePersona: 'usuario indeciso',
    want: 'ver sugerencias de comida basadas en mis hábitos y el clima',
    soThat: 'elegir qué almorzar rápidamente',
    storyPoints: 13,
    priority: 'baja',
    status: 'backlog',
    assignee: { name: 'Sin Asignar', avatar: '👤', role: 'Product Backlog' },
    tags: ['IA', 'Machine Learning', 'Backlog'],
    checklist: [],
    acceptanceCriteria: [
      'Modelo predictivo basado en hora del día y pedidos anteriores',
      'A/B testing con grupo de control'
    ]
  },
  {
    id: 'US-07',
    title: 'Suscripción Premium "QuickPass" (Envíos Gratis)',
    rolePersona: 'usuario frecuente',
    want: 'pagar una cuota mensual por envíos gratis ilimitados',
    soThat: 'ahorrar dinero en mis pedidos semanales',
    storyPoints: 13,
    priority: 'baja',
    status: 'backlog',
    assignee: { name: 'Sin Asignar', avatar: '👤', role: 'Product Backlog' },
    tags: ['Suscripciones', 'Negocio', 'Backlog'],
    checklist: [],
    acceptanceCriteria: [
      'Cobro recurrente mensual automático',
      'Descuento automático aplicado en checkout'
    ]
  }
];

export const PLANNING_POKER_STORIES = [
  {
    id: 'PP-1',
    title: 'Cambiar el color del botón principal a verde',
    description: 'Hacer que el botón de "Comprar" sea de color verde brillante con esquinas redondeadas para que resalte más.',
    complexity: 'Baja (Muy rápido)',
    recommendedEstimate: 2,
    teamVotes: [2, 2, 3, 1, 2],
    consensusReasoning: 'Es solo ajustar el estilo visual del botón en la pantalla. No requiere cambiar bases de datos ni conectar servicios externos. 2 puntos es el consenso adecuado.'
  },
  {
    id: 'PP-2',
    title: 'Crear la pantalla de inicio de sesión con correo y contraseña',
    description: 'Diseñar el formulario donde el usuario escribe su correo y clave, validando que los datos sean correctos para entrar.',
    complexity: 'Media',
    recommendedEstimate: 5,
    teamVotes: [5, 5, 8, 5, 3],
    consensusReasoning: 'Requiere diseñar la interfaz, comprobar que el correo sea válido, guardar la sesión segura y mostrar mensaje si la clave es incorrecta. 5 puntos es el consenso.'
  },
  {
    id: 'PP-3',
    title: 'Cobrar con tarjetas de crédito y débito',
    description: 'Conectar la pasarela de pagos del banco para procesar cobros con tarjeta y emitir el recibo de compra al cliente.',
    complexity: 'Alta',
    recommendedEstimate: 13,
    teamVotes: [8, 13, 13, 20, 13],
    consensusReasoning: 'Involucra coordinar con la entidad bancaria, proteger datos sensibles, gestionar tarjetas rechazadas o sin fondos y confirmar transacciones. 13 puntos es la estimación acordada.'
  }
];

export const GAME_QUESTIONS: GameQuestion[] = [
  {
    id: 1,
    topic: 'valores',
    difficulty: 'fácil',
    scenario: 'El Gerente de Ventas entra a la oficina a mitad del Sprint y le exige a un desarrollador que suspenda lo que está haciendo para programar un botón urgente para un cliente especial.',
    question: '¿Qué debe hacer el equipo según el marco Scrum?',
    options: [
      {
        id: 'a',
        text: 'El desarrollador debe obedecer al Gerente inmediatamente porque ventas es la prioridad.',
        isCorrect: false,
        explanation: 'En Scrum, nadie fuera del equipo puede imponer cambios al Sprint en curso sin acuerdo.'
      },
      {
        id: 'b',
        text: 'El desarrollador debe remitir amablemente al Gerente con el Product Owner, y el Scrum Master debe proteger el foco del equipo.',
        isCorrect: true,
        explanation: '¡Correcto! El Product Owner es la única persona con la autoridad de ordenar el Product Backlog. El Scrum Master protege al equipo de interrupciones para mantener el foco en el Sprint Goal.'
      },
      {
        id: 'c',
        text: 'Hacer el botón rápido por las noches sin registrarlo en el tablero.',
        isCorrect: false,
        explanation: 'Viola flagrantemente el pilar de Transparencia y genera deuda técnica no planificada.'
      },
      {
        id: 'd',
        text: 'Cancelar el Sprint de inmediato.',
        isCorrect: false,
        explanation: 'Solo el Product Owner tiene la potestad de cancelar un Sprint, y únicamente si el Sprint Goal se ha vuelto obsoleto.'
      }
    ]
  },
  {
    id: 2,
    topic: 'eventos',
    difficulty: 'fácil',
    scenario: 'La reunión Daily Scrum se ha convertido en una sesión de 45 minutos donde el jefe técnico interroga a cada desarrollador sobre sus horas trabajadas.',
    question: '¿Cuál es el antipatrón y cómo se corrige?',
    options: [
      {
        id: 'a',
        text: 'La Daily dura máximo 15 minutos, es una sesión entre Desarrolladores para coordinarse hacia el Sprint Goal, no un reporte de horas.',
        isCorrect: true,
        explanation: '¡Excelente! La Daily Scrum es una reunión de 15 minutos de los Desarrolladores para inspeccionar el progreso hacia el Sprint Goal y adaptar su plan de trabajo de las próximas 24 horas.'
      },
      {
        id: 'b',
        text: 'Debe aumentarse a 1 hora para dar tiempo de discutir cada línea de código.',
        isCorrect: false,
        explanation: 'El timebox de 15 minutos es estricto. Las conversaciones técnicas detalladas se abordan después entre los involucrados.'
      },
      {
        id: 'c',
        text: 'Eliminar la Daily Scrum y enviar un email al final de la semana.',
        isCorrect: false,
        explanation: 'La falta de sincronización diaria destruye la adaptación rápida y retrasa la resolución de bloqueos.'
      },
      {
        id: 'd',
        text: 'Hacer que solo el Scrum Master hable durante los 15 minutos.',
        isCorrect: false,
        explanation: 'El Scrum Master facilita el evento, pero no es el dueño ni el protagonista del contenido de la Daily.'
      }
    ]
  },
  {
    id: 3,
    topic: 'artefactos',
    difficulty: 'medio',
    scenario: 'Faltan 2 horas para la Sprint Review. Una funcionalidad de 8 puntos está casi lista en un 95%, pero no tiene pruebas automatizadas ni documentación según la Definición de Hecho (DoD).',
    question: '¿Qué se debe hacer con esta historia de usuario?',
    options: [
      {
        id: 'a',
        text: 'Presentarla en la Sprint Review y contar los 8 puntos como completados diciendo que falta poco.',
        isCorrect: false,
        explanation: 'En Scrum no existen los "puntos parciales". Si no cumple la DoD, no está Hecho.'
      },
      {
        id: 'b',
        text: 'No se presenta como Incremento terminado ni se cuentan sus puntos; regresa al Product Backlog para ser re-estimada.',
        isCorrect: true,
        explanation: '¡Exacto! Según la Guía Scrum oficial, si un elemento no satisface la Definition of Done, no puede ser lanzado ni presentado como terminado en la Sprint Review. Vuelve al Backlog.'
      },
      {
        id: 'c',
        text: 'Modificar temporalmente la Definición de Hecho para quitar el requisito de pruebas.',
        isCorrect: false,
        explanation: 'Rebajar los estándares de calidad para "cumplir" compromisos genera software defectuoso y deuda técnica severa.'
      },
      {
        id: 'd',
        text: 'Extender el Sprint por dos días más para terminarla.',
        isCorrect: false,
        explanation: 'Los Sprints tienen un timebox fijo. Jamás se extienden las fechas de entrega en Scrum.'
      }
    ]
  },
  {
    id: 4,
    topic: 'roles',
    difficulty: 'medio',
    scenario: 'Durante la Sprint Planning, el Product Owner insiste en decirle a los desarrolladores cuántas horas deben tardar en programar la base de datos y quién debe hacer cada tarea.',
    question: '¿Por qué esto infringe las responsabilidades de Scrum?',
    options: [
      {
        id: 'a',
        text: 'El PO define el QUÉ y el POR QUÉ; los Desarrolladores deciden de forma autónoma el CÓMO, la estimación y el plan de trabajo.',
        isCorrect: true,
        explanation: '¡Brillante! El Product Owner es responsable de priorizar el valor del negocio, mientras que los Desarrolladores son profesionales autogestionados responsables de la estimación técnica y el diseño.'
      },
      {
        id: 'b',
        text: 'El Scrum Master es quien debe asignar cada tarea a los desarrolladores.',
        isCorrect: false,
        explanation: 'El Scrum Master nunca asigna tareas; los equipos ágiles se autoorganizan y toman trabajo voluntariamente.'
      },
      {
        id: 'c',
        text: 'El PO tiene la razón porque es el dueño del presupuesto del proyecto.',
        isCorrect: false,
        explanation: 'El PO gestiona el producto, pero no impone estimaciones ni métodos técnicos a los especialistas.'
      },
      {
        id: 'd',
        text: 'Las estimaciones no importan en Scrum.',
        isCorrect: false,
        explanation: 'Las estimaciones son cruciales para que los Desarrolladores evalúen su capacidad de entrega.'
      }
    ]
  },
  {
    id: 5,
    topic: 'antipatrones',
    difficulty: 'avanzado',
    scenario: 'Un equipo realiza la Retrospectiva del Sprint durante 4 meses seguidos. En cada una señalan que los servidores de prueba fallan constantemente, pero nadie toma ninguna acción.',
    question: '¿Cuál es el principio de Scrum que está fallando y cómo corregirlo?',
    options: [
      {
        id: 'a',
        text: 'Falla la Adaptación: La Retrospectiva debe generar al menos una acción concreta y accionable que se incluya en el próximo Sprint Backlog.',
        isCorrect: true,
        explanation: '¡Correcto! Inspeccionar sin adaptar es inútil. La Guía Scrum establece que las mejoras identificadas deben planificarse e integrarse formalmente en el Sprint Backlog subsiguiente.'
      },
      {
        id: 'b',
        text: 'Dejar de hacer la Retrospectiva porque no sirve de nada.',
        isCorrect: false,
        explanation: 'La Retrospectiva es el motor de mejora continua de Scrum; el error está en la falta de seguimiento y compromiso.'
      },
      {
        id: 'c',
        text: 'Despedir al equipo de infraestructura.',
        isCorrect: false,
        explanation: 'Viola el valor de Respeto y no resuelve la causa raíz de la colaboración de procesos.'
      },
      {
        id: 'd',
        text: 'Pedirle a los clientes que paguen por servidores nuevos.',
        isCorrect: false,
        explanation: 'Es una evasión de la responsabilidad del equipo de optimizar su cadena de entrega de valor.'
      }
    ]
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-first-step',
    name: 'Primer Paso Ágil',
    description: 'Respondiste correctamente tu primera pregunta de Scrum.',
    icon: '🎯',
    unlocked: false
  },
  {
    id: 'badge-streak-master',
    name: 'Racha Imparable',
    description: 'Conseguiste 3 respuestas correctas consecutivas.',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'badge-quiz-champion',
    name: 'Scrum Master Certificado',
    description: 'Completaste con éxito todos los dilemas del simulador.',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'badge-sprint-completer',
    name: 'Guardián del Incremento',
    description: 'Finalizaste un Sprint completo en el tablero visual.',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'badge-tool-integrator',
    name: 'Arquitecto de Herramientas',
    description: 'Generaste una exportación o plantilla para herramientas ágiles.',
    icon: '🛠️',
    unlocked: false
  }
];

export const TOOL_INTEGRATIONS: ToolIntegrationInfo[] = [
  {
    id: 'jira',
    name: 'Jira Software (Atlassian)',
    category: 'Gestión Empresarial y Sprints',
    description: 'El estándar de la industria para seguimiento de issues, gestión de épicas, control de versiones y tableros Scrum con gráficos Burndown y Velocity nativos.',
    scrumAlignment: 'Mapea épicas a grandes iniciativas del Product Backlog, User Stories con Story Points a elementos del Sprint, y permite configurar workflow estricto con Definition of Done como condiciones de transición.',
    exportFormat: 'CSV compatible con Jira Importer',
    color: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
    keyFeatures: [
      'JQL (Jira Query Language) para filtros avanzados de sprints activos',
      'Burndown Chart automático en tiempo real',
      'Informes de velocidad y flujo acumulado (CFD)',
      'Campos personalizados para Criterios de Aceptación y Story Points'
    ]
  },
  {
    id: 'trello',
    name: 'Trello (Atlassian)',
    category: 'Tableros Visuales Ligeros',
    description: 'Herramienta intuitiva basada en listas y tarjetas, ideal para equipos que inician en Scrum o proyectos de escala ágil reducida.',
    scrumAlignment: 'Estructura visual organizada por listas (Product Backlog -> To Do -> Doing -> Code Review -> Done) con Power-Ups para estimación de Fibonacci y checklists de DoD.',
    exportFormat: 'JSON Board Backup',
    color: 'border-sky-500/30 bg-sky-500/10 text-sky-400',
    keyFeatures: [
      'Visualización rápida estilo Kanban',
      'Automatizaciones nativas con Butler (ej. mover a Done al completar checklist)',
      'Power-Up de Agile Cards & Scrum Points',
      'Adjuntos directos de prototipos y mockups de diseño'
    ]
  },
  {
    id: 'github',
    name: 'GitHub Projects & Issues',
    category: 'Desarrollo Orientado al Código',
    description: 'Integración estrecha con repositorios de código Git, Pull Requests, ramas y despliegue continuo (CI/CD).',
    scrumAlignment: 'Cada User Story es un GitHub Issue con plantillas Markdown (criterios de aceptación y checklist). Las ramas y Pull Requests se vinculan automáticamente para cerrar historias al hacer merge a main.',
    exportFormat: 'Markdown con GFM Task Lists',
    color: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-300',
    keyFeatures: [
      'GitHub Projects (v2) con vistas de tabla, tablero Kanban y roadmap',
      'Cierre automático de issues mediante PR keywords ("Closes #123")',
      'Milestones que representan Sprints con fecha límite fija',
      'Automatizaciones con GitHub Actions para validar linters y pruebas antes del Done'
    ]
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Herramienta de Alto Rendimiento',
    description: 'Diseñada específicamente para equipos de ingeniería y producto que valoran velocidad extrema, atajos de teclado y estética minimalista.',
    scrumAlignment: 'Concepto nativo de "Cycles" (equivalente al Sprint) con cadencia fija y backlog triaged automático.',
    exportFormat: 'JSON / Linear API sync ready',
    color: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
    keyFeatures: [
      'Ciclos automáticos que no requieren cerrar y abrir manualmente',
      'Estimación por Fibonacci o T-shirt sizes',
      'Sincronización bidireccional instantánea con Git y Slack',
      'Triage de bugs e interrupciones para proteger el ciclo activo'
    ]
  },
  {
    id: 'azure-devops',
    name: 'Azure DevOps Boards (Microsoft)',
    category: 'Ecosistema Corporativo Integral',
    description: 'Plataforma empresarial que combina tableros Scrum, repositorios Git, pipelines de CI/CD y gestión de pruebas QA.',
    scrumAlignment: 'Plantilla de proceso "Scrum" oficial con entidades de Product Backlog Item (PBI), Bug, Task e Impediment.',
    exportFormat: 'XML / Excel Work Item Template',
    color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
    keyFeatures: [
      'Gestión de capacidad de horas por desarrollador por Sprint',
      'Trazabilidad completa desde el requerimiento hasta el commit y release',
      'Gráficos de velocidad y Burnup de entregas corporativas',
      'Auditoría y cumplimiento de estándares de seguridad'
    ]
  }
];

export const BIBLIOGRAPHY: ReferenceSource[] = [
  {
    id: 'ref-scrum-guide',
    title: 'The Scrum Guide: The Definitive Guide to Scrum: The Rules of the Game',
    authors: 'Ken Schwaber & Jeff Sutherland',
    year: 2020,
    publisherOrOrg: 'Scrum.org & Scrum Inc.',
    url: 'https://scrumguides.org/scrum-guide.html',
    contribution: 'La fuente canónica oficial que define Scrum, sus roles, los 5 eventos, los 3 artefactos y sus compromisos asociados (Product Goal, Sprint Goal, Definition of Done).',
    quote: 'Scrum es un marco de trabajo liviano que ayuda a las personas, equipos y organizaciones a generar valor a través de soluciones adaptativas para problemas complejos.',
    category: 'Oficial'
  },
  {
    id: 'ref-agile-manifesto',
    title: 'Manifesto for Agile Software Development',
    authors: 'Kent Beck, Mike Beedle, Arie van Bennekum, Alistair Cockburn, Ward Cunningham, Martin Fowler, Jim Highsmith, Andrew Hunt, Ron Jeffries, Jon Kern, Brian Marick, Robert C. Martin, Steve Mellor, Ken Schwaber, Jeff Sutherland, Dave Thomas',
    year: 2001,
    publisherOrOrg: 'AgileAlliance.org',
    url: 'https://agilemanifesto.org/',
    contribution: 'Declaración fundacional de los 4 valores y 12 principios del movimiento ágil que dieron sustento a Scrum y XP en Snowbird, Utah.',
    quote: 'Individuos e interacciones sobre procesos y herramientas. Software funcionando sobre documentación extensiva. Colaboración con el cliente sobre negociación contractual. Respuesta ante el cambio sobre seguir un plan.',
    category: 'Oficial'
  },
  {
    id: 'ref-sutherland-book',
    title: 'Scrum: The Art of Doing Twice the Work in Half the Time',
    authors: 'Jeff Sutherland',
    year: 2014,
    publisherOrOrg: 'Crown Business / Random House',
    url: 'https://www.scruminc.com/scrum-the-art-of-doing-twice-the-work-in-half-the-time/',
    contribution: 'Explica los orígenes de Scrum, la influencia de los sistemas de producción de Toyota (Lean), la psicología de equipos de alto rendimiento y por qué las jerarquías tradicionales fallan.',
    quote: 'El cambio es inevitable; acéptalo. La planificación es útil; los planes ciegos son mortales. Los equipos que entregan valor frecuentemente transforman el mundo.',
    category: 'Libro Fundacional'
  },
  {
    id: 'ref-cohn-estimating',
    title: 'Agile Estimating and Planning',
    authors: 'Mike Cohn',
    year: 2005,
    publisherOrOrg: 'Prentice Hall / Pearson',
    url: 'https://www.mountaingoatsoftware.com/books/agile-estimating-and-planning',
    contribution: 'Establece las bases matemáticas y prácticas de Planning Poker, Story Points, velocidad del equipo y el cono de incertidumbre.',
    quote: 'Los Story Points estiman el esfuerzo relativo, no el tiempo transcurrido en el reloj. Nos permiten enfocarnos en la complejidad real sin sesgos de optimismo.',
    category: 'Metodología & Estimación'
  },
  {
    id: 'ref-patton-storymapping',
    title: 'User Story Mapping: Discover the Whole Story, Build the Right Product',
    authors: 'Jeff Patton & Peter Economy',
    year: 2014,
    publisherOrOrg: 'O’Reilly Media',
    url: 'https://www.jpattonassociates.com/user-story-mapping/',
    contribution: 'Metodología visual para organizar el Product Backlog en una narrativa bidimensional centrada en el viaje del usuario, facilitando la creación de releases mínimos viables (MVP).',
    quote: 'Las historias de usuario no son requisitos escritos; son promesas para tener una conversación honesta con el equipo sobre lo que realmente necesita el usuario.',
    category: 'Metodología & Estimación'
  },
  {
    id: 'ref-watts-scrummastery',
    title: 'Scrum Mastery: From Good To Great Servant-Leadership',
    authors: 'Geoff Watts',
    year: 2013,
    publisherOrOrg: 'Inspect & Adapt Ltd',
    url: 'https://inspectandadapt.com/books/scrum-mastery/',
    contribution: 'Guía esencial para líderes de servicio sobre cómo gestionar la dinámica psicológica del equipo, resolver conflictos y pasar de facilitador básico a mentor transformador.',
    quote: 'Un buen Scrum Master protege al equipo; un gran Scrum Master enseña al equipo a protegerse a sí mismo.',
    category: 'Liderazgo'
  }
];

export const ROLE_MATCH_QUESTIONS = [
  {
    id: 1,
    task: 'Decidir qué tareas van primero según lo que más le sirve al cliente.',
    correctRole: 'po' as const,
    roleName: 'Product Owner (PO)',
    roleIcon: '👑',
    explanation: '¡Exacto! El Product Owner es quien prioriza las tareas para entregar el mayor valor al negocio.'
  },
  {
    id: 2,
    task: 'Ayudar a resolver un bloqueo o problema que no deja avanzar al equipo.',
    correctRole: 'sm' as const,
    roleName: 'Scrum Master (SM)',
    roleIcon: '🛡️',
    explanation: '¡Muy bien! El Scrum Master elimina obstáculos para que el equipo trabaje sin interrupciones.'
  },
  {
    id: 3,
    task: 'Escribir el código, diseñar la interfaz y probar que todo funcione sin errores.',
    correctRole: 'dev' as const,
    roleName: 'Desarrolladores (Developers)',
    roleIcon: '💻',
    explanation: '¡Correcto! Los Desarrolladores son los profesionales técnicos que construyen el producto.'
  },
  {
    id: 4,
    task: 'Cuidar que la reunión diaria (Daily) dure 15 minutos y sea enfocada.',
    correctRole: 'sm' as const,
    roleName: 'Scrum Master (SM)',
    roleIcon: '🛡️',
    explanation: '¡Excelente! El Scrum Master facilita las ceremonias y asegura que se cumplan los tiempos acordados.'
  },
  {
    id: 5,
    task: 'Explicar la visión del producto y definir la meta general (Product Goal).',
    correctRole: 'po' as const,
    roleName: 'Product Owner (PO)',
    roleIcon: '👑',
    explanation: '¡Así es! El Product Owner guía al equipo con la visión y los objetivos del producto a futuro.'
  },
  {
    id: 6,
    task: 'Estimar cuánto esfuerzo toma programar cada historia en el Sprint.',
    correctRole: 'dev' as const,
    roleName: 'Desarrolladores (Developers)',
    roleIcon: '💻',
    explanation: '¡Genial! Solo los Desarrolladores estiman el esfuerzo, porque ellos son quienes hacen el trabajo.'
  }
];

export const TRUE_FALSE_QUESTIONS = [
  {
    id: 1,
    statement: 'La reunión diaria (Daily Scrum) debe durar un máximo de 15 minutos.',
    isTrue: true,
    explanation: 'Verdadero. Es una reunión rápida de pie para coordinarse entre compañeros, no una sesión larga.'
  },
  {
    id: 2,
    statement: 'El Scrum Master es el jefe tradicional que manda y asigna tareas a cada programador.',
    isTrue: false,
    explanation: 'Falso. El Scrum Master es un facilitador y líder al servicio del equipo; no da órdenes ni asigna tareas.'
  },
  {
    id: 3,
    statement: 'Un Sprint suele durar entre 1 y 4 semanas y su tiempo no se alarga si falta trabajo.',
    isTrue: true,
    explanation: 'Verdadero. El tiempo es fijo para mantener un ritmo predecible y constante.'
  },
  {
    id: 4,
    statement: 'Si una función casi está lista pero no tiene pruebas, podemos decir que está "Hecha".',
    isTrue: false,
    explanation: 'Falso. Solo está Hecha si cumple todos los requisitos de calidad acordados (Definition of Done).'
  },
  {
    id: 5,
    statement: 'En la Sprint Review mostramos al cliente el producto funcionando de verdad.',
    isTrue: true,
    explanation: 'Verdadero. Se enseña software real y usable para recibir comentarios honestos del cliente.'
  },
  {
    id: 6,
    statement: 'Cualquier persona puede agregar tareas urgentes al Sprint en curso sin hablar con el Product Owner.',
    isTrue: false,
    explanation: 'Falso. El foco del equipo se protege. Cualquier nuevo pedido debe pasar primero por el Product Owner.'
  }
];

export const SPRINT_ORDER_ITEMS = [
  {
    id: 'planning',
    stepNumber: 1,
    name: '1. Planificación (Sprint Planning)',
    simpleDescription: 'El equipo decide qué va a construir y define la meta del Sprint.',
    icon: '🎯'
  },
  {
    id: 'daily',
    stepNumber: 2,
    name: '2. Sincronización Diaria (Daily)',
    simpleDescription: 'Reunión de 15 minutos cada día para revisar avances y bloqueos.',
    icon: '☀️'
  },
  {
    id: 'review',
    stepNumber: 3,
    name: '3. Demostración (Sprint Review)',
    simpleDescription: 'Mostramos el producto terminado al cliente para recibir feedback.',
    icon: '👀'
  },
  {
    id: 'retro',
    stepNumber: 4,
    name: '4. Mejora de Equipo (Retrospectiva)',
    simpleDescription: 'Analizamos qué salió bien y qué podemos mejorar en el próximo Sprint.',
    icon: '🚀'
  }
];

