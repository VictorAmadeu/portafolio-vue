<template>
    <div class="chatbot-root">
      <button
        class="chatbot-fab"
        type="button"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="chatbot-panel"
        @click="toggle"
      >
        <span v-if="!isOpen">💬</span>
        <span v-else>✕</span>
      </button>
  
      <section
        v-if="isOpen"
        id="chatbot-panel"
        class="chatbot-panel"
        role="dialog"
        aria-label="Asistente del portafolio"
      >
        <header class="chatbot-header">
          <div class="chatbot-title">
            <strong>Asistente del portafolio</strong>
            <small>RAG con fuentes</small>
          </div>
  
          <button
            class="chatbot-close"
            type="button"
            @click="toggle"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>
  
        <div
          v-if="messages.length === 0 && !loading"
          class="chatbot-suggestions"
        >
          <p class="suggestions-title">Sugerencias rápidas (recruiter)</p>
  
          <div class="suggestions-grid">
            <button
              class="suggestion"
              type="button"
              @click="sendSuggestion('¿Qué proyectos tienes y cuál recomiendas revisar primero?')"
            >
              Proyectos principales
            </button>
  
            <button
              class="suggestion"
              type="button"
              @click="sendSuggestion('Cuéntame el stack y en qué te consideras más fuerte.')"
            >
              Stack y fortalezas
            </button>
  
            <button
              class="suggestion"
              type="button"
              @click="sendSuggestion('¿Qué retos técnicos resolviste en VictorAI Blog?')"
            >
              Retos VictorAI Blog
            </button>
  
            <button
              class="suggestion"
              type="button"
              @click="sendSuggestion('¿Cómo puedo contactarte para una oportunidad?')"
            >
              Contacto
            </button>
          </div>
        </div>
  
        <main ref="scrollRef" class="chatbot-messages">
          <article
            v-for="(m, idx) in messages"
            :key="`${m.role}-${idx}`"
            class="msg"
            :class="m.role"
          >
            <div class="bubble">
              <div class="meta">
                {{ m.role === "user" ? "Tú" : "Asistente" }}
              </div>
  
              <div class="text" v-text="m.content"></div>
  
              <div
                v-if="m.role === 'assistant' && m.sources && m.sources.length"
                class="sources"
              >
                <div class="sources-title">Fuentes</div>
  
                <ul class="sources-list">
                  <li
                    v-for="(s, sidx) in m.sources"
                    :key="`${s.title}-${sidx}`"
                  >
                    <a
                      v-if="s.url"
                      class="source-link"
                      :href="getSourceHref(s.url)"
                    >
                      {{ s.title }}
                    </a>
  
                    <span v-else class="source-link">
                      {{ s.title }}
                    </span>
  
                    <div v-if="s.snippet" class="source-snippet">
                      {{ s.snippet }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </article>
  
          <article v-if="loading" class="msg assistant">
            <div class="bubble">
              <div class="meta">Asistente</div>
              <div class="text">Pensando…</div>
            </div>
          </article>
  
          <article v-if="error" class="msg assistant">
            <div class="bubble error">
              <div class="meta">Asistente</div>
              <div class="text">
                {{ error }}
              </div>
            </div>
          </article>
        </main>
  
        <footer class="chatbot-input">
          <form class="input-row" @submit.prevent="onSubmit">
            <input
              v-model="draft"
              class="input"
              type="text"
              placeholder="Pregunta sobre el portafolio…"
              :disabled="loading"
              aria-label="Escribe tu pregunta"
            />
  
            <button
              class="send"
              type="submit"
              :disabled="loading || !draft.trim()"
            >
              Enviar
            </button>
          </form>
  
          <p class="disclaimer">
            Este asistente responde con base en fuentes del portafolio. Si no encuentra evidencia, lo indicará.
          </p>
        </footer>
      </section>
    </div>
  </template>
  
  <script>
  import { retrieveContext } from "@/chatbot/services/retrieval.js";
  import { sendChatMessage } from "@/chatbot/services/chatApi.js";
  
  const API_URL = import.meta.env.VITE_CHATBOT_API_URL || "";
  
  export default {
    name: "ChatbotWidget",
  
    data() {
      return {
        isOpen: false,
        messages: [],
        draft: "",
        loading: false,
        error: "",
        apiUrl: API_URL,
        baseUrl: import.meta.env.BASE_URL || "/",
      };
    },
  
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
        this.error = "";
        this.$nextTick(() => this.scrollToBottom());
      },
  
      sendSuggestion(text) {
        this.draft = text;
        this.onSubmit();
      },
  
      async onSubmit() {
        const text = this.draft.trim();
  
        if (!text || this.loading) return;
  
        this.error = "";
        this.messages.push({ role: "user", content: text });
        this.draft = "";
        this.loading = true;
  
        this.$nextTick(() => this.scrollToBottom());
  
        try {
          const contextChunks = await retrieveContext(text, {
            matchThreshold: 0.55,
            matchCount: 6,
          });
  
          const result = await sendChatMessage({
            apiUrl: this.apiUrl,
            message: text,
            contextChunks,
          });
  
          this.messages.push({
            role: "assistant",
            content: result.answer || "No he podido generar una respuesta.",
            sources: result.sources || [],
          });
        } catch (e) {
          this.error =
            "No he podido responder ahora mismo. Puedes intentar otra pregunta o revisar la sección de proyectos.";
  
          console.error(e);
        } finally {
          this.loading = false;
          this.$nextTick(() => this.scrollToBottom());
        }
      },
  
      scrollToBottom() {
        const el = this.$refs.scrollRef;
  
        if (!el) return;
  
        el.scrollTop = el.scrollHeight;
      },
  
      getSourceHref(url) {
        if (!url) return "";
  
        const cleanBaseUrl = this.baseUrl.endsWith("/")
          ? this.baseUrl.slice(0, -1)
          : this.baseUrl;
  
        const cleanUrl = url.startsWith("/")
          ? url
          : `/${url}`;
  
        return `${cleanBaseUrl}${cleanUrl}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .chatbot-root {
    position: fixed;
    right: 18px;
    bottom: 18px;
    z-index: 9999;
  }
  
  .chatbot-fab {
    width: 54px;
    height: 54px;
    border-radius: 999px;
    border: 1px solid var(--color-border-soft);
    background: rgba(27, 32, 45, 0.92);
    color: var(--color-text-100);
    box-shadow: var(--shadow-soft);
    font-size: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
  .chatbot-panel {
    width: min(380px, calc(100vw - 36px));
    height: min(560px, calc(100vh - 110px));
    margin-bottom: 12px;
    border-radius: 18px;
    border: 1px solid var(--color-border-soft);
    background: linear-gradient(
      135deg,
      rgba(22, 27, 42, 0.96),
      rgba(19, 35, 55, 0.9)
    );
    box-shadow: var(--shadow-soft);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .chatbot-header {
    padding: 12px 14px;
    border-bottom: 1px solid var(--color-border-soft);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .chatbot-title small {
    display: block;
    color: var(--color-text-300);
  }
  
  .chatbot-close {
    border: 1px solid var(--color-border-soft);
    background: rgba(10, 17, 30, 0.6);
    color: var(--color-text-100);
    border-radius: 10px;
    width: 34px;
    height: 34px;
  }
  
  .chatbot-suggestions {
    padding: 10px 14px;
    border-bottom: 1px solid var(--color-border-soft);
  }
  
  .suggestions-title {
    margin: 0 0 8px;
    color: var(--color-text-300);
    font-size: 0.92rem;
  }
  
  .suggestions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  
  .suggestion {
    border: 1px solid var(--color-border-soft);
    background: rgba(10, 17, 30, 0.55);
    color: var(--color-text-100);
    padding: 10px;
    border-radius: 12px;
    font-size: 0.9rem;
    text-align: left;
  }
  
  .chatbot-messages {
    padding: 12px 14px;
    overflow: auto;
    flex: 1;
  }
  
  .msg {
    margin-bottom: 10px;
    display: flex;
  }
  
  .msg.user {
    justify-content: flex-end;
  }
  
  .msg.assistant {
    justify-content: flex-start;
  }
  
  .bubble {
    max-width: 90%;
    border: 1px solid var(--color-border-soft);
    background: rgba(10, 17, 30, 0.55);
    border-radius: 16px;
    padding: 10px 12px;
  }
  
  .msg.user .bubble {
    background: rgba(78, 196, 255, 0.14);
  }
  
  .meta {
    font-size: 0.78rem;
    color: var(--color-text-400);
    margin-bottom: 4px;
  }
  
  .text {
    white-space: pre-wrap;
    line-height: 1.35;
  }
  
  .sources {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--color-border-soft);
  }
  
  .sources-title {
    font-weight: 700;
    margin-bottom: 6px;
    color: var(--color-text-100);
  }
  
  .sources-list {
    margin: 0;
    padding-left: 18px;
    color: var(--color-text-300);
  }
  
  .source-link {
    color: var(--color-accent-cyan);
    text-decoration: none;
  }
  
  .source-snippet {
    font-size: 0.85rem;
    color: var(--color-text-400);
    margin-top: 4px;
  }
  
  .bubble.error {
    border-color: rgba(255, 120, 120, 0.6);
  }
  
  .chatbot-input {
    padding: 10px 14px 12px;
    border-top: 1px solid var(--color-border-soft);
  }
  
  .input-row {
    display: flex;
    gap: 8px;
  }
  
  .input {
    flex: 1;
    border-radius: 12px;
    border: 1px solid var(--color-border-soft);
    background: var(--color-input-bg);
    color: var(--color-text-100);
    padding: 10px 12px;
  }
  
  .send {
    border-radius: 12px;
    border: 1px solid var(--color-border-soft);
    background: rgba(0, 215, 163, 0.18);
    color: var(--color-text-100);
    padding: 10px 12px;
    min-width: 88px;
  }
  
  .disclaimer {
    margin: 8px 0 0;
    font-size: 0.8rem;
    color: var(--color-text-400);
  }
  </style>