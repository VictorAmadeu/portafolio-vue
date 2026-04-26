// src/chatbot/knowledge/portfolioDocuments.js
// Corpus publico del chatbot RAG del portafolio.

export const portfolioDocuments = [
  {
    id: "home-profile",
    title: "Perfil y propuesta (Home)",
    url: "/#/",
    tags: ["perfil", "resumen", "disponibilidad", "formacion", "experiencia"],
    content: `
Victor Amadeu Braga Heleno es Desarrollador Full Stack Junior.
Victor aparece en el portafolio como disponible para contratar.
Su experiencia profesional actual es en Ekium - Equilibrio Tecnologico.
Su formacion principal es Tecnico Superior en Desarrollo de Aplicaciones Web en Cesur, Madrid.
El portafolio destaca tres acciones principales: Hablemos, Ver proyectos y Descargar CV.
Victor esta abierto a oportunidades relacionadas con desarrollo full stack, frontend, backend, integraciones y proyectos con Inteligencia Artificial.
`.trim(),
  },
  {
    id: "about-summary",
    title: "Sobre mi: resumen, stack y experiencia",
    url: "/#/about",
    tags: ["sobre-mi", "stack", "experiencia", "valor", "tecnologias"],
    content: `
Victor Amadeu es Desarrollador Full Stack Junior en Ekium - Equilibrio Tecnologico.
Trabaja en desarrollo de paginas web, apps hibridas offline-first e integraciones full-stack.
Su propuesta de valor combina enfoque offline-first, integracion de APIs, vision full-stack, trabajo metodico y aprendizaje continuo.

Stack frontend: Ionic, Angular, TypeScript, Vue 3, React, JavaScript, Tailwind, CSS3, HTML5 y Bootstrap.
Stack backend y datos: Symfony, PHP, Node, Express, PostgreSQL, Supabase, Meteor, Java, Python y MySQL.
Arquitectura de aplicaciones: offline-first, persistencia local SQL, sincronizacion de datos, Capacitor y Android nativo.
Practicas de trabajo: Git, GitHub, Bitbucket, documentacion tecnica actualizada y mejora continua.
Inteligencia Artificial: Ingenieria de Prompt y aplicacion practica de IA en proyectos.
`.trim(),
  },
  {
    id: "experience-ekium",
    title: "Experiencia profesional en Ekium",
    url: "/#/about",
    tags: ["experiencia", "ekium", "full-stack", "offline-first"],
    content: `
Experiencia profesional de Victor en Ekium - Equilibrio Tecnologico:
1. Desarrollador Full Stack Junior, desde enero de 2026 hasta la actualidad.
2. Becario de Desarrollo Web DAW, desde octubre de 2025 hasta enero de 2026.

Tareas destacadas:
- Desarrollo de paginas web y apps hibridas offline-first con Ionic y Angular.
- Persistencia local SQL y sincronizacion al recuperar conectividad.
- Mejoras full-stack en ecosistema Intranek con Symfony, PostgreSQL, React y Meteor.
- Soporte en frontend y backend para evolucion de producto.
- Contacto directo con cliente para resolver dudas.
- Uso de Git, GitHub y Bitbucket para pull requests y documentacion tecnica.
`.trim(),
  },
  {
    id: "projects-overview",
    title: "Proyectos principales del portafolio",
    url: "/#/projects",
    tags: ["proyectos", "portfolio", "recruiter", "recomendacion"],
    content: `
Proyectos principales del portafolio de Victor:

1. VictorAI Blog: blog tecnico sobre Inteligencia Artificial y Python, construido con Angular 19, Bootstrap 5, Supabase y Vercel.
2. Media Kit Jhulyana: media kit web interactivo para colaboraciones con marcas, construido con React 19, Vite, Tailwind CSS v4 y Supabase.
3. Chatbot RAG del portafolio: asistente integrado en el portafolio con Vue, Supabase pgvector, embeddings, Cloudflare Worker y Workers AI.

Para un recruiter interesado en Inteligencia Artificial, el proyecto recomendado para revisar primero es el Chatbot RAG del portafolio, porque demuestra integracion real de IA, retrieval, fuentes, embeddings, Worker serverless y despliegue.
Para revisar frontend moderno y producto comercial, el proyecto recomendado es Media Kit Jhulyana.
Para revisar Angular, contenido tecnico, Supabase y arquitectura de blog, el proyecto recomendado es VictorAI Blog.
`.trim(),
  },
  {
    id: "project-victorai-blog",
    title: "Caso de estudio: VictorAI Blog",
    url: "/#/projects/victorai-blog",
    tags: ["proyecto", "blog", "angular", "supabase", "vercel", "ia", "python"],
    content: `
VictorAI Blog es un blog tecnico enfocado en aprendizaje y documentacion didactica sobre Inteligencia Artificial y Python.
El proyecto fue creado para reforzar estudios en IA y Python con un espacio propio de publicacion didactica.
Stack principal: Angular 19 standalone, Bootstrap 5, Supabase, marked, DOMPurify, highlight.js, ngx-highlightjs, Karma y Jasmine.
Incluye rutas lazy, secciones de articulos, categorias, Python y sobre mi.
Incluye newsletter y mensajes de contacto persistidos en Supabase.
Un reto tecnico importante fue renderizar Markdown sin abrir vectores XSS, usando marked y DOMPurify.
Otro reto fue integrar Supabase con Angular standalone mediante un servicio centralizado.
`.trim(),
  },
  {
    id: "project-media-kit",
    title: "Caso de estudio: Media Kit Jhulyana",
    url: "/#/projects/media-kit-jhulyana",
    tags: ["proyecto", "react", "vite", "tailwind", "supabase", "producto"],
    content: `
Media Kit Jhulyana es un media kit web interactivo para colaboraciones con marcas.
Fue el proyecto final de Victor en Cesur, FP Grado Superior.
El objetivo fue crear una experiencia web actualizable para que una creadora de contenido presente su alcance, audiencia, paquetes y canal de contacto.
Stack principal: React 19, Vite, Tailwind CSS v4, Supabase y formulario de contacto.
Incluye presentacion personal, audiencia, destaques, paquetes de colaboracion y contacto.
Un reto tecnico importante fue aprender React 19 y Tailwind v4 en un proyecto real.
Otro reto fue optimizar imagenes sin perder calidad visual.
`.trim(),
  },
  {
    id: "project-chatbot-rag",
    title: "Proyecto: Chatbot RAG del portafolio",
    url: "/#/",
    tags: ["proyecto", "chatbot", "rag", "ia", "supabase", "cloudflare", "vue"],
    content: `
El Chatbot RAG del portafolio es un asistente integrado en el portafolio de Victor.
Su objetivo es responder preguntas sobre el portafolio usando fuentes controladas.
Arquitectura: Vue en el frontend, corpus en portfolioDocuments, embeddings con Xenova multilingual-e5-small, Supabase PostgreSQL con pgvector, funcion match_portfolio_documents, Cloudflare Worker y Workers AI.
El flujo es: el usuario pregunta, el frontend genera embedding del query, Supabase recupera documentos relevantes, el Worker recibe mensaje y contexto, y el modelo responde usando solo el contexto.
Este proyecto demuestra uso practico de Inteligencia Artificial aplicada, retrieval semantico, fuentes, backend serverless y control de alcance.
`.trim(),
  },
  {
    id: "contact",
    title: "Contacto profesional",
    url: "/#/contact",
    tags: ["contacto", "cta", "oportunidades"],
    content: `
La via recomendada para contactar profesionalmente con Victor es el formulario de contacto del portafolio.
El formulario permite enviar nombre, correo electronico, asunto y mensaje.
Los mensajes del formulario se guardan en Supabase.
Victor esta disponible para contratar y abierto a oportunidades profesionales.
Tambien se puede revisar el CV desde la accion Descargar CV del portafolio.
`.trim(),
  },
  {
    id: "assistant-scope",
    title: "Limites del asistente del portafolio",
    url: "/#/",
    tags: ["limites", "seguridad", "alcance", "asistente"],
    content: `
El asistente del portafolio esta diseñado para responder preguntas sobre Victor, su perfil, disponibilidad, experiencia, stack, proyectos, CV y contacto profesional.
El asistente no debe responder como calculadora general.
El asistente no debe explicar conceptos generales de programacion si la pregunta no esta conectada con el portafolio de Victor.
El asistente no debe proporcionar contraseñas, claves, tokens, credenciales, secretos ni configuracion interna.
Si una pregunta esta fuera del portafolio, debe indicar que solo responde sobre el portafolio, proyectos, stack, experiencia, disponibilidad y contacto profesional de Victor.
`.trim(),
  },
];
