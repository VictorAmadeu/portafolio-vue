// src/chatbot/knowledge/portfolioDocuments.js
// Corpus base para RAG del chatbot del portafolio.
// Nota: Mantén aquí SOLO cosas que estés cómodo mostrando públicamente.

export const portfolioDocuments = [
    {
      id: "home-profile",
      title: "Perfil y propuesta (Home)",
      url: "/#/",
      tags: ["perfil", "resumen", "disponibilidad", "formacion", "experiencia"],
      content: `
  Victor Amadeu Braga Heleno. Desarrollador Full Stack Junior.
  En el portafolio se presenta como disponible para contratar.
  Experiencia profesional: Ekium - Equilibrio Tecnológico.
  Formación: Técnico Superior en Desarrollo de Aplicaciones Web (Cesur, Madrid).
  Acciones principales: Hablemos (contacto), Ver proyectos, Descargar CV.
  `.trim(),
    },
    {
      id: "about-summary",
      title: "Sobre mí (resumen, stack y experiencia)",
      url: "/#/about",
      tags: ["sobre-mi", "stack", "experiencia", "valor"],
      content: `
  Soy Victor Amadeu, Desarrollador Full Stack Júnior en Ekium - Equilibrio Tecnológico.
  Trabajo en desarrollo web, apps híbridas offline-first e integraciones full-stack.
  Propuesta de valor: enfoque offline-first, integración de APIs, visión full-stack y trabajo metódico.
  Stack: Ionic, Angular, TypeScript, Vue, React, Symfony, PHP, Node/Express, PostgreSQL, Supabase, etc.
  `.trim(),
    },
    {
      id: "projects-overview",
      title: "Proyectos (visión general)",
      url: "/#/projects",
      tags: ["proyectos", "portfolio"],
      content: `
  El portafolio incluye casos de estudio de proyectos personales, con contexto, objetivos, arquitectura, retos y aprendizajes.
  Hay una vista de listado y una vista de detalle por proyecto.
  `.trim(),
    },
    {
      id: "project-victorai-blog",
      title: "Caso de estudio: VictorAI Blog",
      url: "/#/projects/victorai-blog",
      tags: ["proyecto", "blog", "angular", "supabase", "vercel", "ia"],
      content: `
  VictorAI Blog es un blog técnico enfocado en aprendizaje y documentación didáctica sobre Inteligencia Artificial.
  Incluye secciones (inicio, artículos, categorías, sobre mí) y funcionalidades como newsletter y autenticación.
  Se desplegó con pipeline CI/CD y gestión de variables de entorno en hosting.
  `.trim(),
    },
    {
      id: "project-media-kit",
      title: "Caso de estudio: Media Kit Jhulyana",
      url: "/#/projects/media-kit-jhulyana",
      tags: ["proyecto", "react", "vite", "tailwind", "supabase", "producto"],
      content: `
  Media Kit profesional para una creadora de contenido, construido como producto real.
  Incluye diseño consistente, responsive y componentes reutilizables.
  Integra Supabase como backend de datos.
  `.trim(),
    },
    {
      id: "contact",
      title: "Contacto",
      url: "/#/contact",
      tags: ["contacto", "cta"],
      content: `
  La vía recomendada para contacto profesional es el formulario de contacto del portafolio.
  El formulario persiste mensajes en Supabase y muestra feedback de éxito o error.
  `.trim(),
    },
  ];