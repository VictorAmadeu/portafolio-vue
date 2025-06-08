<template>
  <form @submit.prevent="sendMessage">
    <input v-model="form.name"    placeholder="Nome"    required />
    <input v-model="form.email"   type="email"          required />
    <input v-model="form.subject" placeholder="Assunto" required />
    <textarea v-model="form.message" placeholder="Mensagem" required></textarea>
    <button type="submit">Enviar</button>

    <p v-if="errorMessage"   class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </form>
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
          nombre:  this.form.name,
          email:   this.form.email,
          asunto:  this.form.subject,
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
.error   { color: red; }
.success { color: green; }
</style>
