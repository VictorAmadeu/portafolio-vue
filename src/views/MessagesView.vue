<template>
  <div>
    <!-- Sección protegida (autenticado) -->
    <div class="container mt-4" v-if="isAuthenticated">
      <h2 class="text-center mb-4">📥 Mensajes Recibidos</h2>

      <!-- Si hay mensajes -->
      <div v-if="messages.length">
        <!-- MOBILE FIRST: Cards para pantallas pequeñas -->
        <div class="d-md-none">
          <div
            v-for="(msg, index) in messages"
            :key="msg._id || index"
            class="card mb-3 shadow-sm"
          >
            <div class="card-body">
              <h5 class="card-title">{{ msg.name }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ msg.email }}</h6>
              <p class="card-text"><strong>Asunto:</strong> {{ msg.subject }}</p>
              <p class="card-text">{{ msg.message }}</p>
              <button
                class="btn btn-danger btn-sm mt-2 w-100"
                @click="deleteMessage(msg._id)"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- TABLA para pantallas medianas y grandes -->
        <div class="table-responsive d-none d-md-block">
          <table class="table table-hover table-bordered shadow-sm rounded-3">
            <thead class="table-dark text-center">
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Asunto</th>
                <th>Mensaje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody class="table-light">
              <tr
                v-for="(msg, index) in messages"
                :key="msg._id || index"
              >
                <td>{{ msg.name }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.subject }}</td>
                <td>{{ msg.message }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteMessage(msg._id)"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Si no hay mensajes -->
      <div v-else>
        <p class="text-muted text-center">No hay mensajes aún.</p>
      </div>
    </div>

    <!-- Sección de autenticación -->
    <div class="container mt-5 text-center" v-else>
      <h3>🔐 Acceso Restringido</h3>
      <p>Escribe la contraseña para ver los mensajes:</p>

      <input
        type="password"
        v-model="passwordInput"
        class="form-control mb-3 mx-auto"
        style="max-width: 300px;"
        placeholder="Contraseña"
      />
      <button @click="checkPassword" class="btn btn-primary">
        Entrar
      </button>
      <p v-if="error" class="text-danger mt-3">
        Contraseña incorrecta
      </p>
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
      passwordInput: "",
      error: false,
    };
  },
  async mounted() {
    const authFlag = localStorage.getItem("isAuthenticatedMessages");
    if (authFlag === "true") {
      this.isAuthenticated = true;
      await this.fetchMessages();
    }
  },
  methods: {
    async checkPassword() {
      const correctPassword = "Victor01121993aaa";
      if (this.passwordInput === correctPassword) {
        this.isAuthenticated = true;
        localStorage.setItem("isAuthenticatedMessages", "true");
        await this.fetchMessages();
      } else {
        this.error = true;
      }
    },
    async fetchMessages() {
      try {
        const res = await fetch("https://portafolio-vue.onrender.com/messages");
        const data = await res.json();
        this.messages = data;
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    },
    async deleteMessage(id) {
      const confirmDelete = confirm("¿Estás seguro de querer borrar este mensaje?");
      if (!confirmDelete) return;

      try {
        const response = await fetch(`https://portafolio-vue.onrender.com/messages/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          this.messages = this.messages.filter(msg => msg._id !== id);
          alert("Mensaje eliminado con éxito");
        } else {
          alert("Error al borrar el mensaje.");
        }
      } catch (error) {
        console.error("Error al borrar mensaje:", error);
        alert("Error al borrar el mensaje.");
      }
    },
  },
};
</script>

<style scoped>
/* Contenedor principal */
.container {
  max-width: 1000px;
  min-height: 80vh;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Tabla clásica */
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

/* Dark Mode */
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

/* Cards (mobile) */
.card {
  background-color: #f8f9fa;
}

.card h5 {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
