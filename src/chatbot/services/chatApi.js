// src/chatbot/services/chatApi.js

const DEFAULT_TIMEOUT_MS = 20000;

function withTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("Timeout de red")), timeoutMs);

    promise
      .then((v) => {
        clearTimeout(id);
        resolve(v);
      })
      .catch((e) => {
        clearTimeout(id);
        reject(e);
      });
  });
}

export async function sendChatMessage({ apiUrl, message, contextChunks }) {
  if (!apiUrl) throw new Error("Falta apiUrl del chatbot");

  const res = await withTimeout(
    fetch(`${apiUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, contextChunks }),
    }),
    DEFAULT_TIMEOUT_MS
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `HTTP ${res.status}`);
  }

  return res.json();
}