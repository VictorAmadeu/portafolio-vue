<template>
  <div>
    <div class="container mt-4">
      <h2 class="text-center mb-4">📥 Mensagens Recebidas</h2>
      <div v-if="messages.length">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="card mb-3"
        >
          <div class="card-body">
            <h5 class="card-title">{{ msg.asunto }}</h5>
            <h6 class="card-subtitle text-muted mb-2">
              De: {{ msg.nombre }} ({{ msg.email }})
            </h6>
            <p class="card-text">{{ msg.mensaje }}</p>
            <!-- Botão opcional de deletar -->
            <!-- <button @click="deleteMessage(msg.id)" class="btn btn-danger btn-sm">Apagar</button> -->
          </div>
        </div>
      </div>
      <p v-else class="text-muted text-center">Nenhuma mensagem encontrada.</p>
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
    }

    // Para implementar deleteMessage, basta copiar do MessagesView1.
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 1rem;
}
</style>
