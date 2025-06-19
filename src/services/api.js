const API_URL = import.meta.env.VITE_API_URL;

// Headers con JWT, si existe
function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Obtener mensajes (admin autenticado)
export async function getMessages() {
  const res = await fetch(`${API_URL}/messages`, {
    headers: authHeaders(),
  });
  return res.json();
}

// Borrar mensaje (admin autenticado)
export async function deleteMessage(id) {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return res.json();
}

// Enviar mensaje (público)
export async function postMessage(body) {
  const res = await fetch(`${API_URL}/mensajes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
