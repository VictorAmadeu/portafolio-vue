<template>
  <div>
    <!-- 1) Si está autenticado, mostramos mensajes -->
    <div class="container mt-4" v-if="isAuthenticated">
      <h2 class="text-center mb-4">📥 Mensajes Recibidos</h2>
      <div v-if="messages.length">
        <div
          v-for="msg in messages"
          :key="msg._id"
          class="card mb-3"
        >
          <div class="card-body">
            <h5 class="card-title">{{ msg.subject }}</h5>
            <h6 class="card-subtitle text-muted mb-2">
              De: {{ msg.name }} ({{ msg.email }})
            </h6>
            <p class="card-text">{{ msg.message }}</p>
            <button
              @click="deleteMessage(msg._id)"
              class="btn btn-danger btn-sm"
            >
              Borrar
            </button>
          </div>
        </div>
      </div>
      <p v-else class="text-muted text-center">No hay mensajes aún.</p>
    </div>

    <!-- 2) Si NO está autenticado, mostramos el login -->
    <div class="container mt-5 text-center" v-else>
      <h3>🔐 Iniciar Sesión</h3>
      <form @submit.prevent="login">
        <div class="mb-3">
          <input
            v-model="username"
            type="text"
            class="form-control"
            placeholder="Usuario"
            required
          />
        </div>
        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="Contraseña"
            required
          />
        </div>
        <button class="btn btn-primary" type="submit">Entrar</button>
      </form>
      <p v-if="error" class="text-danger mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessagesView",
  data() {
    return {
      messages: [],
      isAuthenticated: false,
      username: "",
      password: "",
      error: ""
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.isAuthenticated = true;
      await this.fetchMessages();
    }
  },
  methods: {
    // Login y obtención de token
    async login() {
      this.error = "";
      try {
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        if (!res.ok) {
          const err = await res.json();
          this.error = err.error || "Error en login";
          return;
        }
        const { token } = await res.json();
        localStorage.setItem("token", token);
        this.isAuthenticated = true;
        await this.fetchMessages();
      } catch {
        this.error = "No se pudo conectar al servidor";
      }
    },

    // Obtención de mensajes protegida con token
    async fetchMessages() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/messages", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("No autorizado");
        this.messages = await res.json();
      } catch (err) {
        console.error("Error al cargar mensajes:", err);
        localStorage.removeItem("token");
        this.isAuthenticated = false;
      }
    },

    // Borrado de mensaje protegido
    async deleteMessage(id) {
      if (!confirm("¿Seguro que quieres borrar este mensaje?")) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/messages/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error();
        this.messages = this.messages.filter(msg => msg._id !== id);
        alert("Mensaje borrado");
      } catch {
        alert("No se pudo borrar el mensaje");
      }
    }
  }
};
</script>

<style scoped>
/* Tu CSS existente o ajustes adicionales */
</style>
