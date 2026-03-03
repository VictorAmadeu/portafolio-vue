import mediaKitCover from "@/assets/images/projects/media-kit-jhulyana.jpg";
import victorAiBlogCover from "@/assets/images/projects/victorai-blog.jpg";

const projectAssetModules = import.meta.glob(
  "../assets/images/projects/**/*.{avif,webp,png,jpg,jpeg}",
  {
    eager: true,
    import: "default",
  }
);

function getProjectAsset(relativePath) {
  return projectAssetModules[`../assets/images/projects/${relativePath}`] ?? null;
}

const projects = [
  {
    id: "media-kit-jhulyana",
    slug: "media-kit-jhulyana",
    title: "Media Kit Jhulyana",
    subtitle: "Media kit web interactivo para colaboraciones con marcas",
    coverImage: mediaKitCover,
    context:
      "Este fue mi Proyecto final en Cesur (FP Grado Superior). He desarrollado este proyecto para una creadora de contenidos presentarse ante marcas con una experiencia web actualizable.",
    problem:
      "Jhulyana tiene una audiencia muy grande y toda la información de su trabajo estaba dispersa en redes: un poco en Instagram, otro poco en TikTok, otras cosas por correo y etc. Eso hacía más difícil que las marcas entendieran rápido quién es Jhulyana y qué alcance real tiene.",
    goals: [
      "Presentar historia personal, misión y valores de la creadora con narrativa clara.",
      "Mostrar audiencia y plataformas con datos fáciles de leer para marcas.",
      "Ofrecer paquetes de colaboración con precios y alcance de cada propuesta.",
      "Incluir un canal de contacto conectado a Supabase dónde están almacenados los mensajes de sus clientes.",
      "Garantizar experiencia responsive y accesible en móvil y escritorio.",
    ],
    stack: [
      { area: "Frontend", items: ["React 19", "Vite", "Tailwind CSS v4"] },
      { area: "Datos y servicios", items: ["Supabase", "Formulario de contacto"] },
      { area: "Prácticas de UX", items: ["Diseño responsive", "A11Y", "Optimización de imágenes"] },
    ],
    architecture:
      "SPA orientada a presentación comercial: contenido editorial + datos de audiencia + catálogo de paquetes + formulario de contacto persistido en Supabase.",
    features: [
      {
        title: "Sobre mí y posicionamiento",
        items: [
          "Presentación de creadora brasileña afincada en Madrid.",
          "Especialización en estilo femenino y cuidado de cabello rizado.",
          "Narrativa de misión y valores para reforzar propuesta de marca.",
        ],
      },
      {
        title: "Audiencia y destaques",
        items: [
          "Bloques visuales de datos demográficos y plataformas.",
          "Comunidad fiel de nicho y contenido bilingüe ES/PT.",
          "Referencia de 12-15k visualizaciones orgánicas en stories.",
        ],
      },
      {
        title: "Paquetes de colaboración",
        items: [
          "Tabla estructurada con precios y entregables.",
          "Comparación rápida entre opciones para marcas.",
          "Contenido preparado para actualización periódica.",
        ],
      },
      {
        title: "Contacto",
        items: [
          "Formulario de contacto integrado con Supabase.",
          "Validaciones básicas en cliente.",
          "Separación de configuración para no exponer credenciales sensibles en el front.",
        ],
      },
    ],
    challenges: [
      {
        challenge: "Aprender React 19 y Tailwind v4 en un proyecto real.",
        solution:
          "Se organizó la UI en secciones reutilizables y utilidades de diseño consistentes para mantener velocidad de desarrollo.",
        learning:
          "Consolidación de flujo de trabajo moderno para construir una SPA mantenible.",
      },
      {
        challenge: "Optimizar imágenes sin perder calidad visual.",
        solution:
          "Compresión y ajuste de tamaños por breakpoint para reducir peso y mejorar tiempo de carga.",
        learning:
          "Equilibrio entre estética y rendimiento en portafolio comercial.",
      },
      {
        challenge: "Estructurar paquetes y datos de forma escalable.",
        solution:
          "Modelado de información en objetos/listas para facilitar mantenimiento y futuras ampliaciones.",
        learning:
          "La calidad del modelo de datos simplifica tanto UI como evolución del producto.",
      },
    ],
    outcomes: [
      {
        label: "Resultado principal",
        value: "Entrega final de Cesur usada como caso real de presentación profesional.",
      },
      {
        label: "Efecto de negocio",
        value: "Formato digital más claro y actualizable que una plantilla PDF estática.",
      },
      {
        label: "Métrica disponible",
        value: "Stories orgánicas estimadas en el rango de 12-15k visualizaciones.",
      },
      {
        label: "Métricas pendientes",
        value: "Conversión a contactos cualificados y ratio de respuesta por paquete.",
      },
    ],
    roles: [
      "Análisis funcional del media kit.",
      "Diseño UX/UI y arquitectura de contenidos.",
      "Desarrollo frontend (React + Tailwind).",
      "Integración de formulario y datos con Supabase.",
      "Optimización responsive y accesibilidad.",
    ],
    links: {
      github: "https://github.com/VictorAmadeu/media-kit-jhulyana",
      demo: "https://victoramadeu.github.io/media-kit-jhulyana/",
    },
    screenshots: [
      {
        id: "mk-audiencia",
        title: "Audiencia y estadísticas",
        description: "Vista con demografía/plataformas y resumen de comunidad.",
        alt: "Sección de audiencia del media kit con datos demográficos y plataformas.",
        src: getProjectAsset("media-kit-jhulyana/audiencia.webp"),
        expectedPath: "src/assets/images/projects/media-kit-jhulyana/audiencia.webp",
      },
      {
        id: "mk-destaques",
        title: "Destaques de comunidad",
        description: "Bloque de diferenciadores: nicho, bilingüe y alcance orgánico.",
        alt: "Tarjetas de destaques del media kit con valores de comunidad.",
        src: getProjectAsset("media-kit-jhulyana/destaques.webp"),
        expectedPath: "src/assets/images/projects/media-kit-jhulyana/destaques.webp",
      },
      {
        id: "mk-paquetes",
        title: "Paquetes de colaboración",
        description: "Comparativa de precios y entregables para marcas.",
        alt: "Sección paquetes del media kit con tarjetas de precios.",
        src: getProjectAsset("media-kit-jhulyana/paquetes.webp"),
        expectedPath: "src/assets/images/projects/media-kit-jhulyana/paquetes.webp",
      },
      {
        id: "mk-contacto",
        title: "Formulario de contacto",
        description: "Canal directo para propuestas comerciales.",
        alt: "Formulario de contacto del media kit para colaboraciones con marcas.",
        src: getProjectAsset("media-kit-jhulyana/contacto.webp"),
        expectedPath: "src/assets/images/projects/media-kit-jhulyana/contacto.webp",
      },
    ],
  },
  {
    id: "victorai-blog",
    slug: "victorai-blog",
    title: "VictorAI Blog",
    subtitle: "Blog técnico para practicar IA y Python con Angular 19",
    coverImage: victorAiBlogCover,
    context:
      "Proyecto personal para reforzar estudios en IA y Python con un espacio propio de publicación didáctica.",
    problem:
      "Las plataformas externas no encajaban con necesidades de práctica técnica y necesitaba poner mis conocimientos en práctica.",
    goals: [
      "Construir un blog en Angular 19 con arquitectura standalone.",
      "Gestionar posts, categorías y formularios sobre Supabase.",
      "Mostrar artículos con Markdown seguro y resaltado de código.",
      "Crear sección Python con ejercicios y salidas esperadas.",
      "Aplicar rutas lazy y mejoras de accesibilidad.",
    ],
    stack: [
      { area: "Frontend", items: ["Angular 19 standalone", "Bootstrap 5"] },
      {
        area: "Datos y servicios",
        items: [
          "Supabase",
          "SupabaseService",
          "Tablas posts/categories/contact_messages/newsletter_subscribers",
        ],
      },
      {
        area: "Contenido técnico",
        items: ["marked", "DOMPurify", "highlight.js", "ngx-highlightjs"],
      },
      { area: "Calidad", items: ["Karma", "Jasmine", "Lazy loading", "Skeleton loaders"] },
    ],
    architecture:
      "Aplicación Angular con rutas lazy por secciones (Home, Artículos, Categorías, Python y Sobre mí), servicios centralizados y renderizado seguro de contenido técnico.",
    features: [
      {
        title: "Navegación y arquitectura",
        items: [
          "Rutas lazy para optimizar carga inicial.",
          "Estructura standalone sin NgModules.",
          "Secciones didácticas organizadas por tipo de contenido.",
        ],
      },
      {
        title: "Gestión de contenido",
        items: [
          "SupabaseService centraliza operaciones CRUD.",
          "Modelado de posts y categorías para reutilizar consultas.",
          "Flujo de newsletter y mensajes de contacto persistidos en Supabase.",
        ],
      },
      {
        title: "Sección Python",
        items: [
          "Catálogo de ejercicios con archivo `.py` y salida esperada.",
          "Enfoque práctico para repaso de fundamentos y lógica.",
          "Presentación orientada a aprendizaje progresivo.",
        ],
      },
      {
        title: "Accesibilidad y experiencia",
        items: [
          "Skip link para navegación por teclado.",
          "Botón volver arriba y menú responsive.",
          "Animaciones suaves y skeleton loaders para estados de carga.",
        ],
      },
    ],
    challenges: [
      {
        challenge: "Integrar Supabase con Angular standalone.",
        solution:
          "Se encapsularon consultas en un servicio central para evitar duplicación y simplificar mantenimiento.",
        learning:
          "Una capa de datos bien definida reduce acoplamiento entre vistas y backend.",
      },
      {
        challenge: "Renderizar Markdown sin abrir vectores XSS.",
        solution:
          "Pipeline combinado de `marked` + `DOMPurify` antes de pintar contenido dinámico.",
        learning:
          "La seguridad de contenido es obligatoria cuando se publica texto enriquecido.",
      },
      {
        challenge: "Mantener rendimiento al crecer el contenido.",
        solution:
          "Lazy loading en rutas y componentes, junto con skeleton loaders.",
        learning:
          "Escalar UX y rendimiento requiere decisiones de arquitectura desde el inicio.",
      },
    ],
    outcomes: [
      {
        label: "Resultado principal",
        value: "Repositorio base para publicar contenido de IA/Python con control total de estructura.",
      },
      {
        label: "Resultado técnico",
        value: "Dominio práctico de Angular 19 standalone + integración de Supabase.",
      },
      {
        label: "Indicador cualitativo",
        value: "Proyecto usado como laboratorio personal para practicar sanitización, lazy loading y testing.",
      },
      {
        label: "Métricas pendientes",
        value: "Número de artículos publicados por sprint y crecimiento de suscriptores.",
      },
    ],
    roles: [
      "Definición de arquitectura frontend y datos.",
      "Desarrollo Angular standalone y UI con Bootstrap.",
      "Integración Supabase para contenido y formularios.",
      "Implementación de renderizado seguro de Markdown.",
      "Pruebas unitarias con Karma/Jasmine.",
    ],
    links: {
      github: "https://github.com/VictorAmadeu/victorai-blog",
      demo: "https://victorai-blog.vercel.app/",
    },
    screenshots: [
      {
        id: "vb-home",
        title: "Home del blog",
        description: "Entrada principal con navegación a secciones de contenido.",
        alt: "Página principal de VictorAI Blog con tarjetas de navegación.",
        src: getProjectAsset("victorai-blog/home.webp"),
        expectedPath: "src/assets/images/projects/victorai-blog/home.webp",
      },
      {
        id: "vb-articulos",
        title: "Listado de artículos",
        description: "Sección de posts con filtrado por categorías.",
        alt: "Listado de artículos del blog con categorías y extractos.",
        src: getProjectAsset("victorai-blog/articulos.webp"),
        expectedPath: "src/assets/images/projects/victorai-blog/articulos.webp",
      },
      {
        id: "vb-python",
        title: "Ejercicios de Python",
        description: "Catálogo con código y salida esperada.",
        alt: "Página de ejercicios de Python con código resaltado.",
        src: getProjectAsset("victorai-blog/python.webp"),
        expectedPath: "src/assets/images/projects/victorai-blog/python.webp",
      },
      {
        id: "vb-contacto",
        title: "Formulario de contacto",
        description: "Canal de feedback persistido en Supabase.",
        alt: "Formulario de contacto del blog para enviar mensajes de feedback.",
        src: getProjectAsset("victorai-blog/contacto.webp"),
        expectedPath: "src/assets/images/projects/victorai-blog/contacto.webp",
      },
    ],
  },
];

const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

export function getProjects() {
  return projects;
}

export function getProjectBySlug(slug) {
  return projectBySlug.get(slug);
}
