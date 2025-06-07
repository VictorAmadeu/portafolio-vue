<template>
  <form @submit.prevent="sendMessage">
    <input v-model="form.name"    placeholder="Nombre"  required />
    <input v-model="form.email"   type="email" required />
    <input v-model="form.subject" placeholder="Asunto"  required />
    <textarea v-model="form.message" placeholder="Mensaje" required></textarea>
    <button type="submit">Enviar</button>
    <p v-if="errorMessage"   class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </form>
</template>

<script>
import { supabase } from "@/services/supabase";

export default {
  data() {
    return {
      form: { name: "", email: "", subject: "", message: "" },
      errorMessage: "",
      successMessage: ""
    };
  },
  methods: {
    async sendMessage() {
      this.errorMessage = "";
      this.successMessage = "";

      const newMessage = {
        nombre:  this.form.name,
        email:   this.form.email,
        asunto:  this.form.subject,
        mensaje: this.form.message
      };

      const { data, error } = await supabase
        .from("mensajes")
        .insert([newMessage]);

      if (error) {
        console.error("❌ Error al insertar:", error);
        this.errorMessage = "No se pudo enviar. Revisa la consola.";
        return;
      }

      console.log("✅ Insertado:", data);
      this.successMessage = "¡Enviado correctamente!";
      this.form = { name: "", email: "", subject: "", message: "" };
    }
  }
};
</script>

<style scoped>
.error   { color: red; }
.success { color: green; }
</style>

