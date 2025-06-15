<template> 
  <!-- Contenedor principal con layout bonito y centralizado -->
  <div class="container my-5">
    <h2 class="text-center mb-4">📩 Contacto</h2>
    <form @submit.prevent="sendMessage">
      <!-- Nombre -->
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input v-model="form.name" type="text" class="form-control" id="name" required />
      </div>
      <!-- Correo electrónico -->
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input v-model="form.email" type="email" class="form-control" id="email" required />
      </div>
      <!-- Asunto -->
      <div class="mb-3">
        <label for="subject" class="form-label">Asunto</label>
        <input v-model="form.subject" type="text" class="form-control" id="subject" required />
      </div>
      <!-- Mensaje -->
      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea v-model="form.message" class="form-control" id="message" rows="5" required></textarea>
      </div>
      <!-- Botón -->
      <button type="submit" class="btn btn-primary w-100">Enviar</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
        this.errorMessage = "No ha sido posible enviar su mensaje.";
        return;
      }

      this.successMessage = "Su mensaje ha sido enviada con éxito!";
      this.form = { name: "", email: "", subject: "", message: "" };
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;              
  min-height: 85vh;              
  display: flex;                 
  flex-direction: column;        
  justify-content: center;       
  padding-bottom: 4rem;          
}
.btn-primary {
  margin-top: 1rem;              
}
.error   { color: red; margin-top: 0.5rem; }
.success { color: green; margin-top: 0.5rem; }

/* Responsividade para telas pequenas */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
    min-height: auto;
  }
  h2 {
    font-size: 1.5rem;
  }
  .btn-primary {
    margin-top: 0.5rem;
  }
}
</style>
