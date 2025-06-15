<template>
  <div>
    <div class="container mt-4">
      <h2 class="text-center mb-4">📥 Mensajes recibidos</h2>

      <!-- Se houver mensagens -->
      <div v-if="messages.length">
        <!-- MOBILE FIRST: Cards para telas pequenas -->
        <div class="d-md-none">
          <div
            v-for="(msg, index) in messages"
            :key="msg.id || index"
            class="card mb-3 shadow-sm"
          >
            <div class="card-body">
              <h5 class="card-title">{{ msg.nombre }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ msg.email }}</h6>
              <p class="card-text"><strong>Assunto:</strong> {{ msg.asunto }}</p>
              <p class="card-text">{{ msg.mensaje }}</p>
              <button
                class="btn btn-danger btn-sm mt-2 w-100"
                @click="deleteMessage(msg.id)"
              >
                🗑️ Apagar
              </button>
            </div>
          </div>
        </div>

        <!-- TABELA para desktop -->
        <div class="table-responsive d-none d-md-block">
          <table class="table table-hover table-bordered shadow-sm rounded-3">
            <thead class="table-dark text-center">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Assunto</th>
                <th>Mensagem</th>
                <th>Ações</th>
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
                    🗑️ Apagar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Se não houver mensagens -->
      <div v-else>
        <p class="text-muted text-center">Nenhuma mensagem encontrada.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "@/services/supabase";

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
    async fetchMessages() {
      const { data, error } = await supabase
        .from("mensajes")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Erro ao carregar mensagens:", error);
        return;
      }

      this.messages = data;
    },
    async deleteMessage(id) {
  if (!confirm("Tem certeza de que deseja apagar esta mensagem?")) return;

  const { error } = await supabase
    .from("mensajes")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro do Supabase:", error);
    alert("Erro ao apagar mensagem: " + error.message);
    return;
  }

  await this.fetchMessages(); // <-- Importante!
  alert("Mensagem apagada com sucesso!");
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

/* Tabela responsiva e estilizada */
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

/* Cards (mobile) */
.card {
  background-color: #f8f9fa;
}

.card h5 {
  font-size: 1.1rem;
  font-weight: bold;
}
</style>
