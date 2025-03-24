<!-- 
  A continuación verás el archivo "ContactView.vue" actualizado 
  con mejoras de responsividad para pantallas pequeñas (móviles).
  Los comentarios y textos se mantienen EN ESPAÑOL.
-->

<template>
  <!-- Contenedor principal con margen superior (mt-5) -->
  <div class="container mt-5">
    <!-- Título centrado para la sección de contacto -->
    <h2 class="text-center mb-4">Contacto</h2>

    <!-- Formulario que dispara la función 'sendMessage' en el evento 'submit' 
         con .prevent para evitar recargar la página -->
    <form @submit.prevent="sendMessage">
      
      <!-- Campo Nombre -->
      <div class="mb-3">
        <label for="name" class="form-label">Nombre</label>
        <!-- Input de texto enlazado a form.name con v-model -->
        <input
          type="text"
          v-model="form.name"
          class="form-control"
          id="name"
          required
        />
      </div>

      <!-- Campo Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico</label>
        <!-- Input de tipo email con validación básica del navegador -->
        <input
          type="email"
          v-model="form.email"
          class="form-control"
          id="email"
          required
        />
      </div>

      <!-- Campo Asunto -->
      <div class="mb-3">
        <label for="subject" class="form-label">Asunto</label>
        <!-- Input de texto enlazado a form.subject -->
        <input
          type="text"
          v-model="form.subject"
          class="form-control"
          id="subject"
          required
        />
      </div>

      <!-- Campo Mensaje -->
      <div class="mb-3">
        <label for="message" class="form-label">Mensaje</label>
        <!-- Textarea con altura de 5 filas -->
        <textarea
          v-model="form.message"
          class="form-control"
          id="message"
          rows="5"
          required
        ></textarea>
      </div>

      <!-- Botón para enviar el formulario -->
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </div>
</template>

<script>
/*
  Este componente Vue envía los datos al backend alojado en Render.
  Los datos se envían mediante una solicitud POST en formato JSON.
*/
export default {
  // Nombre del componente para depuración
  name: "ContactView",

  // data() retorna las propiedades reactivas
  data() {
    return {
      // 'form' agrupa todos los campos del formulario
      form: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
    };
  },

  // Métodos disponibles en este componente
  methods: {
    // Función asíncrona que envía los datos al servidor
    async sendMessage() {
      try {
        // Enviamos una solicitud POST al backend en Render
        const response = await fetch("https://portafolio-vue.onrender.com/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          // Convertimos form en JSON para el cuerpo de la solicitud
          body: JSON.stringify(this.form),
        });

        // Convertimos la respuesta a objeto/array JSON
        const data = await response.json();

        // Verificamos si la respuesta fue exitosa (código 2xx)
        if (response.ok) {
          alert("Mensaje enviado con éxito!");

          // Limpiamos el formulario
          this.form = {
            name: "",
            email: "",
            subject: "",
            message: ""
          };
        } else {
          // Si el servidor respondió con un código de error
          alert(data.error || "Error al enviar el mensaje.");
        }
      } catch (err) {
        // Capturamos errores de red o excepciones
        console.error("Error:", err);
        alert("Error al enviar el mensaje.");
      }
    },
  },
};
</script>

<style scoped>
/* 
  'scoped' indica que los estilos sólo afectan a este componente 
*/

/* Contenedor principal con altura mínima de 80% de la pantalla,
   centrado verticalmente y margen inferior para separar del footer */
.container {
  max-width: 900px;
  min-height: 80vh;         /* ocupa 80% de la altura de la ventana */
  display: flex;            /* permite centrar el contenido */
  flex-direction: column;   /* apila los elementos en columna */
  justify-content: center;  /* centra verticalmente el formulario */
  padding-bottom: 4rem;     /* espacio extra antes del footer */
}

/* Margen superior para el botón 'Enviar' */
.btn-primary {
  margin-top: 1rem;
}

/* 
  Medias queries para pantallas pequeñas (hasta 768px).
  Ajustamos padding, tipografía y anchos para mejor visibilidad.
*/
@media (max-width: 768px) {
  .container {
    padding: 1rem;
    margin-top: 2rem;
    justify-content: flex-start; /* Evita forzar la vertical en pantallas bajas */
    min-height: auto;           /* Deja que crezca según el contenido */
  }
  
  h2 {
    font-size: 1.5rem;
  }

  /* Ajustamos el ancho de los inputs y el botón para que no queden muy grandes */
  .form-control,
  button {
    font-size: 1rem;
    width: 100%; 
  }
}
</style>
