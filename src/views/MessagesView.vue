<template>
  <div>
    <div class="container my-5" v-if="isAuthenticated">
      <h2 class="text-center mb-4">📥 Mensajes Recibidos</h2>

      <div v-if="messages.length">
        <div class="table-responsive">
          <table class="table table-hover table-bordered shadow-sm rounded-3">
            <thead class="table-dark text-center">
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Asunto</th>
                <th>Mensaje</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody class="table-light">
              <tr v-for="(msg, index) in messages" :key="msg._id || index">
                <td>{{ msg.name }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.subject }}</td>
                <td>{{ msg.message }}</td>
                <td class="text-center">
                  <button class="btn btn-danger btn-sm" @click="deleteMessage(msg._id)">
                    🗑️ Borrar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else>
        <p class="text-muted text-center">No hay mensajes aún.</p>
      </div>
    </div>

    <div class="container my-5 text-center" v-else>
      <h3>🔐 Acceso Restringido</h3>
      <p>Escribe la contraseña para ver los mensajes:</p>
      <input type="password" v-model="passwordInput" class="form-control mb-3 mx-auto" style="max-width:300px;" placeholder="Contraseña" />
      <button @click="checkPassword" class="btn btn-primary">Entrar</button>
      <p v-if="error" class="text-danger mt-3">Contraseña incorrecta</p>
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
      if (this.passwordInput === "Victor01121993aaa") {
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
      if (!confirm("¿Seguro quieres borrar este mensaje?")) return;
      try {
        const response = await fetch(`https://portafolio-vue.onrender.com/messages/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          this.messages = this.messages.filter(msg => msg._id !== id);
          alert("Mensaje eliminado con éxito.");
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
.container {
  max-width: 1000px;
  min-height: 85vh;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

table {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.9rem;
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

@media (max-width: 768px) {
  .container {
    padding: 1rem;
    margin-top: 1rem;
    min-height: auto;
  }

  table {
    font-size: 0.8rem;
  }

  thead th,
  tbody td {
    padding: 8px;
  }

  button {
    width: 100%;
    font-size: 0.8rem;
  }
}
</style>
