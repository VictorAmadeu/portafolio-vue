<template>
  <div class="container py-5 mt-5">
    <!-- Título de la página de contacto -->
    <h1 class="text-center display-5 mt-4">Contacto</h1>
    
    <!-- Formulario de contacto con Bootstrap -->
    <form class="mt-4" @submit.prevent="sendMessage">
      <!-- Campo Nombre -->
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <input type="text" id="name" class="form-control" v-model="form.name" required />
      </div>
      
      <!-- Campo Correo Electrónico -->
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <input type="email" id="email" class="form-control" v-model="form.email" required />
      </div>
      
      <!-- Campo Mensaje -->
      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <textarea id="message" class="form-control" rows="5" v-model="form.message" required></textarea>
      </div>
      
      <!-- Botón de envío con estado dinámico -->
      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? "Enviando..." : "Enviar Mensaje" }}
      </button>
    </form>

    <!-- Mensaje de confirmación después del envío -->
    <div v-if="responseMessage" class="alert alert-success mt-3">
      {{ responseMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Objeto que almacena los datos del formulario
      form: {
        name: "", // Campo para el nombre
        email: "", // Campo para el email
        message: "", // Campo para el mensaje
      },
      responseMessage: "", // Mensaje de respuesta después del envío
      loading: false, // Indicador de carga para el botón de envío
    };
  },
  methods: {
    /**
     * Método para enviar el formulario al backend
     */
    async sendMessage() {
      this.loading = true; // Activa el estado de carga
      this.responseMessage = ""; // Limpia el mensaje de respuesta anterior
      
      try {
        // Petición al backend para enviar el mensaje
        const response = await fetch("http://localhost:3000/contact", {
          method: "POST", // Método HTTP
          headers: { "Content-Type": "application/json" }, // Tipo de contenido JSON
          body: JSON.stringify(this.form), // Convierte los datos del formulario a JSON
        });

        // Obtiene la respuesta del servidor
        const data = await response.json();
        this.responseMessage = data.message; // Guarda el mensaje de respuesta

        // Si la respuesta es exitosa, limpia los campos del formulario
        if (response.ok) {
          this.form = { name: "", email: "", message: "" };
        }
      } catch (error) {
        this.responseMessage = "Error al enviar el mensaje."; // Mensaje de error en caso de fallo
      } finally {
        this.loading = false; // Desactiva el estado de carga
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para la estructura principal del formulario */
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

/* Estilos para los campos de entrada y área de texto */
.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Estilos para el botón de envío */
.btn-primary {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

/* Estilos para el botón cuando está deshabilitado */
.btn-primary:disabled {
  background: gray;
}

/* Estilos para el mensaje de confirmación */
.alert-success {
  margin-top: 10px;
  font-weight: bold;
}
</style>
