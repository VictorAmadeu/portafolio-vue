<template>
  <!-- Contenedor adaptado para mayor responsividad -->
  <div class="container my-5">
    <h2 class="text-center mb-4">📩 Contacto</h2>

    <form @submit.prevent="sendMessage">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" v-model="form.name" class="form-control" id="name" required />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input type="email" v-model="form.email" class="form-control" id="email" required />
      </div>

      <div class="mb-3">
        <label for="subject" class="form-label">Asunto</label>
        <input type="text" v-model="form.subject" class="form-control" id="subject" required />
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea v-model="form.message" class="form-control" id="message" rows="5" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ContactView",
  data() {
    return {
      form: { name: "", email: "", subject: "", message: "" },
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await fetch("https://portafolio-vue.onrender.com/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        });
        const data = await response.json();

        if (response.ok) {
          alert("Mensaje enviado con éxito!");
          this.form = { name: "", email: "", subject: "", message: "" };
        } else {
          alert(data.error || "Error al enviar el mensaje.");
        }
      } catch (err) {
        console.error("Error:", err);
        alert("Error al enviar el mensaje.");
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
