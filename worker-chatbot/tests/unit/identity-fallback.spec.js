import { beforeEach, describe, expect, it, vi } from "vitest";
import worker from "../../src/index.js";

const expectedIdentityAnswer =
  "Victor Amadeu Braga Heleno aparece en estas fuentes como Desarrollador Full Stack Junior y disponible para contratar.";

const contextChunks = [
  {
    title: "Perfil y propuesta (Home)",
    url: "/#/",
    content:
      "Victor Amadeu Braga Heleno. Desarrollador Full Stack Junior. Disponible para contratar.",
  },
];

const richContextChunks = [
  {
    title: "Proyectos principales del portafolio",
    url: "/#/projects",
    content:
      "Proyectos principales del portafolio de Victor: VictorAI Blog, Media Kit Jhulyana y Chatbot RAG del portafolio. Para un recruiter interesado en Inteligencia Artificial, el proyecto recomendado para revisar primero es el Chatbot RAG del portafolio.",
  },
  {
    title: "Sobre mi: resumen, stack y experiencia",
    url: "/#/about",
    content:
      "Stack frontend: Ionic, Angular, TypeScript, Vue 3, React, JavaScript, Tailwind, CSS3, HTML5 y Bootstrap. Stack backend y datos: Symfony, PHP, Node, Express, PostgreSQL, Supabase, Meteor, Java, Python y MySQL. Practicas de trabajo: Git, GitHub, Bitbucket. Inteligencia Artificial: Ingenieria de Prompt.",
  },
  {
    title: "Contacto profesional",
    url: "/#/contact",
    content:
      "La via recomendada para contactar profesionalmente con Victor es el formulario de contacto del portafolio. Victor esta disponible para contratar y abierto a oportunidades profesionales.",
  },
];

function makeRequest(message, chunks = contextChunks) {
  return new Request("https://worker.test/api/chat", {
    method: "POST",
    headers: {
      origin: "https://victoramadeu.github.io",
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      message,
      contextChunks: chunks,
    }),
  });
}

describe("portfolio chatbot worker", () => {
  const env = {
    ALLOWED_ORIGIN: "https://victoramadeu.github.io",
    AI: {
      run: vi.fn(),
    },
  };

  beforeEach(() => {
    env.AI.run.mockReset();
  });

  it("responde correctamente a: ¿Quién es Victor?", async () => {
    const response = await worker.fetch(makeRequest("¿Quién es Victor?"), env);
    const body = await response.json();

    expect(response.status).toBe(200);

    expect(body).toEqual({
      answer: expectedIdentityAnswer,
      sources: [
        {
          title: "Perfil y propuesta (Home)",
          url: "/#/",
          snippet:
            "Victor Amadeu Braga Heleno. Desarrollador Full Stack Junior. Disponible para contratar.",
        },
      ],
    });

    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("responde correctamente a: Quien es Victor?", async () => {
    const response = await worker.fetch(makeRequest("Quien es Victor?"), env);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(expectedIdentityAnswer);
    expect(body.sources).toHaveLength(1);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it.each([
    "quién es Víctor",
    "Quién es Víctor?",
    "¿Quién es Víctor?",
    "quien es victor amadeu",
    "quién es Victor Amadeu",
    "quien es victor amadeu braga",
    "quién es Victor Amadeu Braga Heleno",
    "¿quién es Víctor Amadeu Braga Heleno?",
    "¿ Quién es   Víctor ?",
  ])("acepta variante de identidad: %s", async (message) => {
    const response = await worker.fetch(makeRequest(message), env);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(expectedIdentityAnswer);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("responde saludos sin llamar al modelo ni devolver fuentes", async () => {
    const response = await worker.fetch(makeRequest("hola", richContextChunks), env);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "Hola. Puedo ayudarte a revisar el portafolio de Victor: proyectos, stack, experiencia, disponibilidad y formas de contacto."
    );
    expect(body.sources).toEqual([]);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("rechaza peticiones de secretos sin llamar al modelo ni devolver fuentes", async () => {
    const response = await worker.fetch(
      makeRequest("¿Cuál es la contraseña de Victor?", richContextChunks),
      env
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "No puedo ayudar con contraseñas, claves, tokens ni credenciales. Puedo responder preguntas publicas sobre el portafolio, proyectos, stack, experiencia, disponibilidad y contacto profesional de Victor."
    );
    expect(body.sources).toEqual([]);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("no responde preguntas matematicas generales", async () => {
    const response = await worker.fetch(
      makeRequest("¿Cuánto es 1+14?", richContextChunks),
      env
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "Este asistente esta diseñado para responder preguntas sobre el portafolio, proyectos, stack, experiencia, disponibilidad y contacto profesional de Victor."
    );
    expect(body.sources).toEqual([]);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("no responde definiciones generales de programacion", async () => {
    const response = await worker.fetch(
      makeRequest("¿Qué es Python?", richContextChunks),
      env
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "Este asistente esta diseñado para responder preguntas sobre el portafolio, proyectos, stack, experiencia, disponibilidad y contacto profesional de Victor."
    );
    expect(body.sources).toEqual([]);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("responde stack desde contexto recuperado sin llamar al modelo", async () => {
    const response = await worker.fetch(
      makeRequest("¿Cuáles son las tecnologías que Victor trabaja?", richContextChunks),
      env
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toContain("Victor trabaja con frontend, backend");
    expect(body.answer).toContain("Angular");
    expect(body.answer).toContain("Supabase");
    expect(body.sources.length).toBeGreaterThan(0);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("responde proyectos y recomendacion desde contexto recuperado sin llamar al modelo", async () => {
    const response = await worker.fetch(
      makeRequest("¿Qué proyectos tienes y cuál recomiendas revisar primero?", richContextChunks),
      env
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "Los proyectos principales son VictorAI Blog, Media Kit Jhulyana y el Chatbot RAG del portafolio. Para un recruiter interesado en Inteligencia Artificial, el proyecto recomendado para revisar primero es el Chatbot RAG del portafolio."
    );
    expect(body.sources.length).toBeGreaterThan(0);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("responde disponibilidad desde contexto recuperado sin llamar al modelo", async () => {
    const response = await worker.fetch(
      makeRequest("¿Victor está disponible para trabajar?", richContextChunks),
      env
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "Victor aparece en estas fuentes como disponible para contratar y abierto a oportunidades profesionales."
    );
    expect(body.sources.length).toBeGreaterThan(0);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("responde contacto desde contexto recuperado sin llamar al modelo", async () => {
    const response = await worker.fetch(
      makeRequest("¿Cómo puedo contactar con Victor?", richContextChunks),
      env
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "La via recomendada para contactar profesionalmente con Victor es el formulario de contacto del portafolio."
    );
    expect(body.sources.length).toBeGreaterThan(0);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("no usa fallback si el contexto no contiene datos suficientes", async () => {
    env.AI.run.mockResolvedValue({
      response: "No dispongo de esa informacion en mis fuentes actuales.",
    });

    const response = await worker.fetch(
      makeRequest("¿Quién es Victor?", [
        {
          title: "Fuente vacia",
          url: "/#/",
          content: "Esta fuente no contiene datos suficientes.",
        },
      ]),
      env
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "No dispongo de esa informacion en mis fuentes actuales."
    );
    expect(env.AI.run).toHaveBeenCalled();
  });

  it("llama al modelo cuando la pregunta es de portafolio pero no hay fallback determinista", async () => {
    env.AI.run.mockResolvedValue({
      response: "Respuesta del modelo.",
    });

    const response = await worker.fetch(
      makeRequest("¿Qué retos técnicos resolviste en VictorAI Blog?", richContextChunks),
      env
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe("Respuesta del modelo.");
    expect(env.AI.run).toHaveBeenCalled();
  });
});
