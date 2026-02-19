<template>
  <!-- Contenedor principal de contacto -->
  <div class="container my-5 contact-view">
    <h2 class="text-center mb-4">Contacto</h2>

    <form @submit.prevent="sendMessage">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Tu nombre"
          required
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          placeholder="tuemail@dominio.com"
          required
        />
      </div>

      <div class="mb-3">
        <label for="subject" class="form-label">Asunto</label>
        <input
          v-model="form.subject"
          type="text"
          class="form-control"
          id="subject"
          placeholder="Asunto"
          required
        />
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea
          v-model="form.message"
          class="form-control"
          id="message"
          rows="5"
          placeholder="Cuéntame en qué puedo ayudarte..."
          required
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100">Enviar</button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import { supabase } from "@/services/supabase.js";

export default {
  name: "ContactView",
  data() {
    return {
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async sendMessage() {
      this.errorMessage = "";
      this.successMessage = "";

      const { error } = await supabase.from("mensajes").insert([
        {
          nombre: this.form.name,
          email: this.form.email,
          asunto: this.form.subject,
          mensaje: this.form.message,
        },
      ]);

      if (error) {
        this.errorMessage = "No ha sido posible enviar su mensaje.";
        return;
      }

      this.successMessage = "Su mensaje ha sido enviado con éxito.";
      this.form = { name: "", email: "", subject: "", message: "" };
    },
  },
};
</script>

<style scoped>
.contact-view {
  max-width: 900px;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 4rem;
  color: var(--color-text-100);
}

h2 {
  color: var(--color-text-100);
}

form {
  background: linear-gradient(135deg, rgba(22, 27, 42, 0.88), rgba(19, 35, 55, 0.72));
  border: 1px solid var(--color-border-soft);
  border-radius: 22px;
  box-shadow: var(--shadow-soft);
  padding: 1.5rem;
}

.form-label {
  color: var(--color-text-300);
}

.form-control {
  background: var(--color-input-bg);
  border: 1px solid var(--color-border-soft);
  color: var(--color-text-100);
  border-radius: 14px;
}

.form-control::placeholder {
  color: var(--color-text-400);
}

.form-control:focus {
  color: var(--color-text-100);
  background: var(--color-input-bg);
  border-color: var(--color-accent-cyan);
  box-shadow: 0 0 0 0.2rem rgba(78, 196, 255, 0.2);
}

.btn-primary {
  margin-top: 1rem;
  border-radius: 14px;
  border: 1px solid var(--color-border-soft);
  background: rgba(27, 32, 45, 0.88);
  color: var(--color-text-100);
}

.btn-primary:hover {
  border-color: var(--color-accent-teal);
  background: rgba(34, 42, 60, 0.95);
  color: var(--color-text-100);
}

.error {
  color: #ff6f7d;
  margin-top: 0.6rem;
}

.success {
  color: var(--color-accent-emerald);
  margin-top: 0.6rem;
}

@media (max-width: 768px) {
  .contact-view {
    padding: 1rem;
    min-height: auto;
  }

  h2 {
    font-size: 1.5rem;
  }

  form {
    padding: 1rem;
  }

  .btn-primary {
    margin-top: 0.5rem;
  }
}
</style>
