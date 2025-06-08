<template>
  <!-- Contenedor principal con márgenes verticales -->
  <div class="container my-5">
    <!-- Título del formulario de contacto -->
    <h2 class="text-center mb-4">📩 Contacto</h2>

    <!-- Formulario que se envía mediante la función sendMessage al hacer submit -->
    <form @submit.prevent="sendMessage">
      <!-- Campo: Nombre -->
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <!-- Campo de texto vinculado con form.nombre mediante v-model -->
        <input type="text" v-model="form.nombre" class="form-control" id="name" required />
      </div>

      <!-- Campo: Correo electrónico -->
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <!-- Campo de email vinculado con form.email -->
        <input type="email" v-model="form.email" class="form-control" id="email" required />
      </div>

      <!-- Campo: Asunto del mensaje -->
      <div class="mb-3">
        <label for="subject" class="form-label">Asunto</label>
        <!-- Campo de texto vinculado con form.asunto -->
        <input type="text" v-model="form.asunto" class="form-control" id="subject" required />
      </div>

      <!-- Campo: Mensaje -->
      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <!-- Área de texto vinculada con form.mensaje -->
        <textarea v-model="form.mensaje" class="form-control" id="message" rows="5" required></textarea>
      </div>

      <!-- Botón para enviar el formulario -->
      <button type="submit" class="btn btn-primary w-100">Enviar</button>
    </form>
  </div>
</template>

<script>

export default {
  // Nombre del componente
  name: "ContactView",

  // Datos internos del componente
  data() {
    return {
      // Objeto form contiene los datos del formulario
      form: {
        nombre: "",   // Campo nombre del usuario
        email: "",    // Campo correo electrónico
        asunto: "",   // Campo asunto del mensaje
        mensaje: ""   // Campo del contenido del mensaje
      },
    };
  },

  // Métodos del componente
  methods: {
    // Función para enviar el mensaje al servidor backend
    async sendMessage() {
      try {
        // Se envían los datos del formulario mediante POST al backend
        const response = await fetch("https://portafolio-vue.onrender.com/mensajes", {
          method: "POST", // Método HTTP POST
          headers: {
            "Content-Type": "application/json" // Indicamos que enviamos JSON
          },
          body: JSON.stringify(this.form) // Convertimos el objeto form a JSON
        });

        // Esperamos la respuesta del servidor y la convertimos a objeto
        const data = await response.json();

        // Si el envío fue exitoso...
        if (response.ok) {
          // Mostramos mensaje de éxito
          alert("Mensaje enviado con éxito!");
          // Reiniciamos los campos del formulario
          this.form = { nombre: "", email: "", asunto: "", mensaje: "" };
        } else {
          // Mostramos mensaje de error si algo falló
          alert(data.error || "Error al enviar el mensaje.");
        }
      } catch (err) {
        // Capturamos errores de red o del servidor
        console.error("Error:", err);
        alert("Error al enviar el mensaje.");
      }
    },
  },
};
</script>

<style scoped>
/* Estilo del contenedor principal */
.container {
  max-width: 900px;              /* Ancho máximo del formulario */
  min-height: 85vh;              /* Altura mínima para ocupar casi toda la pantalla */
  display: flex;                 /* Usamos flexbox */
  flex-direction: column;        /* Dirección vertical */
  justify-content: center;      /* Centramos verticalmente */
  padding-bottom: 4rem;          /* Espacio inferior */
}

/* Estilo del botón */
.btn-primary {
  margin-top: 1rem;              /* Espacio superior al botón */
}

/* Responsividad para pantallas pequeñas */
@media (max-width: 768px) {
  .container {
    padding: 1rem;               /* Padding interno en móviles */
    min-height: auto;            /* Quitamos altura mínima fija */
  }

  h2 {
    font-size: 1.5rem;           /* Título más pequeño en móviles */
  }

  .btn-primary {
    margin-top: 0.5rem;          /* Menor espacio sobre el botón */
  }
}
</style>
