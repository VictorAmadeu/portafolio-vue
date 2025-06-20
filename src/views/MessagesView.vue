<template>
  <div>
    <div class="container mt-4">
      <h2 class="text-center mb-4">📥 Mensajes recibidos</h2>
      
      <!-- LOGIN FORM -->
      <div v-if="!isLogged">
        <form @submit.prevent="login" class="mb-4" style="max-width: 350px; margin:auto;">
          <div class="mb-3">
            <label class="form-label">Usuario</label>
            <input v-model="username" class="form-control" required autocomplete="username" />
          </div>
          <div class="mb-3">
            <label class="form-label">Contraseña</label>
            <input v-model="password" class="form-control" type="password" required autocomplete="current-password" />
          </div>
          <button class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? "Entrando..." : "Entrar como admin" }}
          </button>
          <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
        </form>
        <p class="text-muted text-center">
          Solo el administrador (Victor Amadeu) tiene acceso a los mensajes recibidos.
        </p>
      </div>

      <!-- LOGGED IN VIEW -->
      <div v-else>
        <!-- Botón de logout arriba a la derecha -->
        <div class="text-end mb-3">
          <button class="btn btn-outline-danger btn-sm" @click="logout">
            Cerrar sesión
          </button>
        </div>

        <!-- Si hay mensajes -->
        <div v-if="messages.length">
          <!-- MOBILE FIRST: Tarjetas para pantallas pequeñas -->
          <div class="d-md-none">
            <div
              v-for="(msg, index) in messages"
              :key="msg.id || msg._id || index"
              class="card mb-3 shadow-sm"
            >
              <div class="card-body">
                <h5 class="card-title">{{ msg.nombre }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ msg.email }}</h6>
                <p class="card-text"><strong>Asunto:</strong> {{ msg.asunto }}</p>
                <p class="card-text">{{ msg.mensaje }}</p>
                <button
                  class="btn btn-danger btn-sm mt-2 w-100"
                  @click="deleteMessage(msg.id || msg._id)"
                >
                  🗑️ Borrar
                </button>
              </div>
            </div>
          </div>

          <!-- TABLA para escritorio -->
          <div class="table-responsive d-none d-md-block">
            <table class="table table-hover table-bordered shadow-sm rounded-3">
              <thead class="table-dark text-center">
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Asunto</th>
                  <th>Mensaje</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody class="table-light">
                <tr
                  v-for="(msg, index) in messages"
                  :key="msg.id || msg._id || index"
                >
                  <td>{{ msg.nombre }}</td>
                  <td>{{ msg.email }}</td>
                  <td>{{ msg.asunto }}</td>
                  <td>{{ msg.mensaje }}</td>
                  <td class="text-center">
                    <button
                      class="btn btn-danger btn-sm"
                      @click="deleteMessage(msg.id || msg._id)"
                    >
                      🗑️ Borrar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Si no hay mensajes -->
        <div v-else>
          <p class="text-muted text-center">
            No hay mensajes para mostrar.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = import.meta.env.VITE_API_URL;
export default {
  name: "MessagesView",
  data() {
    return {
      messages: [],
      isLogged: !!localStorage.getItem("jwt_token"),
      username: "",
      password: "",
      loading: false,
      error: ""
    };
  },
  mounted() {
    // Si ya estás logueado, carga mensajes automáticamente
    if (this.isLogged) {
      this.fetchMessages();
    }
  },
  methods: {
    // LOGIN
    async login() {
      this.loading = true;
      this.error = "";
      try {
        const res = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        const data = await res.json();
        if (res.ok && data.token) {
          localStorage.setItem("jwt_token", data.token);
          this.isLogged = true;
          this.username = "";
          this.password = "";
          await this.fetchMessages();
        } else {
          this.error = data.error || "Login incorrecto";
        }
      } catch {
        this.error = "Error al conectar con el backend";
      }
      this.loading = false;
    },

    // LOGOUT
    logout() {
      localStorage.removeItem("jwt_token");
      this.isLogged = false;
      this.messages = [];
      this.error = "";
    },

    // OBTENER MENSAJES
    async fetchMessages() {
      try {
        const res = await fetch(`${API_URL}/api/messages`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt_token")
          }
        });

        if (!res.ok) {
          if (res.status === 401) {
            this.logout();
            this.error = "Sesión expirada o no autorizada. Inicia sesión de nuevo.";
          } else {
            throw new Error("Error al cargar los mensajes");
          }
          return;
        }

        const data = await res.json();
        this.messages = data;
      } catch {
        this.messages = [];
        this.logout();
        this.error = "No autorizado o error al cargar los mensajes";
      }
    },

    // BORRAR MENSAJE
    async deleteMessage(id) {
      if (!confirm("¿Estás seguro de que deseas borrar este mensaje?")) return;
      try {
        const res = await fetch(`${API_URL}/api/messages/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt_token")
          }
        });

        if (!res.ok) {
          if (res.status === 401) {
            this.logout();
            alert("No autorizado. Debes iniciar sesión nuevamente.");
          } else {
            throw new Error("Error al borrar el mensaje");
          }
          return;
        }

        await this.fetchMessages();
        alert("¡Mensaje borrado con éxito!");
      } catch {
        alert("Error al borrar el mensaje");
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  min-height: 80vh;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Tabla responsiva y estilizada */
table {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.95rem;
}

thead th {
  background-color: #343a40;
  color: white;
}

tbody td {
  vertical-align: middle;
  text-align: left;
}

tr:hover {
  background-color: #f1f1f1;
}

/* Dark Mode (opcional) */
body.dark-mode table {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

body.dark-mode thead th {
  background-color: #333;
}

body.dark-mode tr:hover {
  background-color: #2a2a2a;
}

/* Tarjetas (mobile) */
.card {
  background-color: #f8f9fa;
}

.card h5 {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
