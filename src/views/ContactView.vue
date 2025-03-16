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
      // Se elimina el uso de "loading" y "responseMessage" ya que se utilizan alertas para la respuesta.
      try {
        // Realiza la petición al backend usando la URL actualizada a Render
        const response = await fetch("https://portafolio-vue.onrender.com/contact", {
          method: "POST", // Especifica que se enviará una solicitud HTTP POST
          headers: { "Content-Type": "application/json" }, // Indica que el contenido enviado es JSON
          // Convierte a JSON los datos del formulario (se envían solo email y message)
          body: JSON.stringify({
            email: this.form.email,
            message: this.form.message
          }),
        });

        // Comprueba si la respuesta del servidor es exitosa (status HTTP 200-299)
        if (response.ok) {
          alert("Mensagem enviada!"); // Muestra una alerta indicando éxito
        } else {
          alert("Erro ao enviar mensagem."); // Muestra una alerta indicando error en el envío
        }
      } catch (error) {
        alert("Erro ao conectar ao servidor."); // Alerta si hay un error en la conexión con el servidor
        console.error(error); // Imprime el error en la consola para depuración
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
