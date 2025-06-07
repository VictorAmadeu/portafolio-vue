<template>
  <!-- Contenedor principal con márgenes verticales -->
  <div class="container my-5">
    <h2 class="text-center mb-4">📩 Contacto</h2>

    <form @submit.prevent="sendMessage">
      <!-- Campo: Nombre -->
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" v-model="form.nombre" class="form-control" id="name" required />
      </div>

      <!-- Campo: Correo electrónico -->
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input type="email" v-model="form.email" class="form-control" id="email" required />
      </div>

      <!-- Campo: Asunto -->
      <div class="mb-3">
        <label for="subject" class="form-label">Asunto</label>
        <input type="text" v-model="form.asunto" class="form-control" id="subject" required />
      </div>

      <!-- Campo: Mensaje -->
      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea v-model="form.mensaje" class="form-control" id="message" rows="5" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100">Enviar</button>
    </form>
  </div>
</template>

<script>
// ✅ Importamos a instância configurada do Supabase
import { supabase } from '../services/supabase';

export default {
  name: "ContactView",
  data() {
    return {
      form: {
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
      },
    };
  },
  methods: {
    async sendMessage() {
      try {
        // ✅ Envio dos dados para a tabela "mensajes" no Supabase
        const { data, error } = await supabase
          .from("mensajes")
          .insert([
            {
              nombre: this.form.nombre,
              email: this.form.email,
              asunto: this.form.asunto,
              mensaje: this.form.mensaje,
            },
          ]);

        // Verificamos se houve erro
        if (error) {
          console.error("Erro Supabase:", error);
          alert("❌ Ocorreu um erro ao enviar sua mensagem.");
          return;
        }

        // ✅ Sucesso!
        alert("✅ Mensaje enviado con éxito!");

        // Limpa o formulário
        this.form = { nombre: "", email: "", asunto: "", mensaje: "" };

      } catch (err) {
        console.error("Erro inesperado:", err);
        alert("❌ Ocorreu um erro inesperado.");
      }
    },
  },
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
