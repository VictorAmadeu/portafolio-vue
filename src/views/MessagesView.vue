<template>
  <div>
    <div class="container mt-4">
      <h2 class="text-center mb-4">📥 Mensajes recibidos</h2>

      <!-- Si hay mensajes -->
      <div v-if="messages.length">
        <!-- MOBILE FIRST: Tarjetas para pantallas pequeñas -->
        <div class="d-md-none">
          <div
            v-for="(msg, index) in messages"
            :key="msg.id || index"
            class="card mb-3 shadow-sm"
          >
            <div class="card-body">
              <h5 class="card-title">{{ msg.nombre }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ msg.email }}</h6>
              <p class="card-text"><strong>Asunto:</strong> {{ msg.asunto }}</p>
              <p class="card-text">{{ msg.mensaje }}</p>
              <button
                class="btn btn-danger btn-sm mt-2 w-100"
                @click="deleteMessage(msg.id)"
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
                :key="msg.id || index"
              >
                <td>{{ msg.nombre }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.asunto }}</td>
                <td>{{ msg.mensaje }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteMessage(msg.id)"
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
        <p class="text-muted text-center">Solo el administrador (Victor Amadeu) tiene acceso a los mensajes recibidos.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessages, deleteMessage } from "@/services/api";

export default {
  name: "MessagesView",
  data() {
    return {
      messages: []
    };
  },
  async created() {
    await this.fetchMessages();
  },
  methods: {
    // Obtiene los mensajes desde Supabase
    async fetchMessages() {
  try {
    const data = await getMessages();
    this.messages = data;
  } catch (error) {
    console.error("Error al cargar los mensajes:", error);
  }
},

async deleteMessage(id) {
  if (!confirm("¿Estás seguro de que deseas borrar este mensaje?")) return;

  const res = await deleteMessage(id);

  if (!res.success) {
    alert("Error al borrar el mensaje");
    return;
  }

  await this.fetchMessages();
  alert("¡Mensaje borrado con éxito!");
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
