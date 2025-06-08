<template>
  <div class="contact-container">
    <h2>Contato</h2>
    <form @submit.prevent="sendMessage">
      <div class="mb-3">
        <input v-model="form.name" type="text" placeholder="Nome" required />
      </div>
      <div class="mb-3">
        <input v-model="form.email" type="email" placeholder="Email" required />
      </div>
      <div class="mb-3">
        <input v-model="form.subject" type="text" placeholder="Assunto" required />
      </div>
      <div class="mb-3">
        <textarea v-model="form.message" placeholder="Mensagem" required></textarea>
      </div>
      <button type="submit">Enviar</button>

      <p v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-success mt-2">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import { supabase } from "@/services/supabase";

export default {
  name: "ContactView",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      successMessage: "",
      errorMessage: ""
    };
  },
  methods: {
    async sendMessage() {
      this.errorMessage = "";
      this.successMessage = "";

      const { data, error } = await supabase
        .from("mensajes")
        .insert([{
          nombre: this.form.name,
          email: this.form.email,
          asunto: this.form.subject,
          mensaje: this.form.message
        }]);

      if (error) {
        console.error("Erro ao enviar:", error);
        this.errorMessage = "Não foi possível enviar a mensagem.";
        return;
      }

      this.successMessage = "Mensagem enviada com sucesso!";
      this.form = { name: "", email: "", subject: "", message: "" };
    }
  }
};
</script>

<style scoped>
.contact-container {
  max-width: 600px;
  margin: 2rem auto;
}
.mb-3 {
  margin-bottom: 1rem;
}
</style>
