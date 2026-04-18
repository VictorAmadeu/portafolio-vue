import { beforeEach, describe, expect, it, vi } from "vitest";
import worker from "../../src/index.js";

const expectedAnswer =
  "Victor Amadeu Braga Heleno aparece en estas fuentes como Desarrollador Full Stack Junior y disponible para contratar.";

const contextChunks = [
  {
    title: "Perfil y propuesta (Home)",
    url: "/#/",
    content:
      "Victor Amadeu Braga Heleno. Desarrollador Full Stack Junior. Disponible para contratar.",
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

describe("identity fallback", () => {
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
      answer: expectedAnswer,
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
    expect(body.answer).toBe(expectedAnswer);
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
    expect(body.answer).toBe(expectedAnswer);
    expect(env.AI.run).not.toHaveBeenCalled();
  });

  it("no usa fallback si el contexto no contiene datos suficientes", async () => {
    env.AI.run.mockResolvedValue({
      response: "No dispongo de esa información en mis fuentes actuales.",
    });

    const response = await worker.fetch(
      makeRequest("¿Quién es Victor?", [
        {
          title: "Fuente vacía",
          url: "/#/",
          content: "Esta fuente no contiene datos suficientes.",
        },
      ]),
      env
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe(
      "No dispongo de esa información en mis fuentes actuales."
    );
    expect(env.AI.run).toHaveBeenCalled();
  });

  it("no usa fallback para una pregunta que no es de identidad", async () => {
    env.AI.run.mockResolvedValue({
      response: "Respuesta del modelo.",
    });

    const response = await worker.fetch(
      makeRequest("¿Qué proyectos tiene Victor?"),
      env
    );

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.answer).toBe("Respuesta del modelo.");
    expect(env.AI.run).toHaveBeenCalled();
  });
});
