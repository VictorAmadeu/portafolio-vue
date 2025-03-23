<template>
  <div class="container py-5 mt-5">
    <h1 class="text-center display-5 mt-4">Contacto</h1>
    <form class="mt-4" @submit.prevent="sendMessage">
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" id="name" class="form-control" v-model="form.name" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input type="email" id="email" class="form-control" v-model="form.email" required />
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea id="message" class="form-control" rows="5" v-model="form.message" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? "Enviando..." : "Enviar Mensaje" }}
      </button>
    </form>
    <div v-if="responseMessage" class="alert alert-success mt-3">
      {{ responseMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        message: "",
      },
      responseMessage: "",
      loading: false,
    };
  },
  methods: {
    async sendMessage() {
      this.loading = true;
      try {
        const response = await fetch("https://portafolio-vue.onrender.com/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.form.name,        // ✅ Agora corrigido
            email: this.form.email,
            message: this.form.message
          }),
        });

        if (response.ok) {
          this.responseMessage = "Mensaje enviado con éxito!";
          this.form.name = "";
          this.form.email = "";
          this.form.message = "";
        } else {
          this.responseMessage = "Error al enviar mensaje.";
        }
      } catch (error) {
        this.responseMessage = "Error al conectar al servidor.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn-primary {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

.btn-primary:disabled {
  background: gray;
}

.alert-success {
  margin-top: 10px;
  font-weight: bold;
}
</style>
