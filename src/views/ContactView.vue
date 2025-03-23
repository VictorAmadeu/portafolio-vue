<!-- 
  A continuación se muestra el archivo "ContactView.vue" con la adición del campo "subject"
  y explicaciones didácticas, línea por línea, en TODO el código.
  IMPORTANTE: Sustituye la URL "https://portafolio-vue.onrender.com/contact" 
  por la de tu backend si es diferente.
-->

<template>
  <!-- Contenedor principal con clases de Bootstrap que añaden padding vertical (py-5) y margen superior (mt-5). -->
  <div class="container py-5 mt-5">
    <!-- Título de la sección, centrado y con tamaño de letra "display-5" según Bootstrap. -->
    <h1 class="text-center display-5 mt-4">Contacto</h1>

    <!-- Formulario principal que se encarga de manejar el envío de los datos. 
         Usa la directiva @submit.prevent="sendMessage" para llamar al método "sendMessage" y 
         prevenir que el navegador recargue la página al enviar. -->
    <form class="mt-4" @submit.prevent="sendMessage">
      <!-- Campo para el nombre con clase "mb-3" que genera un margen inferior. -->
      <div class="mb-3">
        <!-- Etiqueta que describe el campo "Nombre". -->
        <label for="name" class="form-label">Nombre</label>
        <!-- Input de texto que enlaza su valor a form.name mediante v-model. 
             "required" obliga a que este campo no esté vacío antes de enviar. -->
        <input 
          type="text" 
          id="name" 
          class="form-control" 
          v-model="form.name" 
          required 
        />
      </div>

      <!-- Campo para el correo electrónico. -->
      <div class="mb-3">
        <!-- Etiqueta para el campo "Correo Electrónico". -->
        <label for="email" class="form-label">Correo Electrónico</label>
        <!-- Input de tipo "email" validado por HTML5. 
             Enlaza su valor a form.email con v-model. 
             "required" exige que no esté vacío al enviar. -->
        <input 
          type="email" 
          id="email" 
          class="form-control" 
          v-model="form.email" 
          required 
        />
      </div>

      <!-- Campo para el asunto del mensaje. -->
      <div class="mb-3">
        <!-- Etiqueta descriptiva para "Asunto". -->
        <label for="subject" class="form-label">Asunto</label>
        <!-- Input de texto para el asunto, enlazado mediante v-model="form.subject". 
             No es "required", así que puede estar vacío. -->
        <input 
          type="text" 
          id="subject" 
          class="form-control" 
          v-model="form.subject" 
        />
      </div>

      <!-- Campo para el contenido del mensaje. -->
      <div class="mb-3">
        <!-- Etiqueta que describe el campo "Mensaje". -->
        <label for="message" class="form-label">Mensaje</label>
        <!-- Textarea de varias líneas (rows="5") para el cuerpo del mensaje. 
             Enlaza su valor a form.message y es "required". -->
        <textarea 
          id="message" 
          class="form-control" 
          rows="5" 
          v-model="form.message" 
          required
        ></textarea>
      </div>

      <!-- Botón para enviar el formulario. 
           :disabled="loading" hace que el botón se deshabilite mientras se envía. 
           El texto cambia de "Enviar Mensaje" a "Enviando..." según el estado de "loading". -->
      <button 
        type="submit" 
        class="btn btn-primary w-100" 
        :disabled="loading"
      >
        {{ loading ? "Enviando..." : "Enviar Mensaje" }}
      </button>
    </form>

    <!-- Mensaje de respuesta tras el envío, 
         se muestra sólo si "responseMessage" no está vacío. -->
    <div 
      v-if="responseMessage" 
      class="alert alert-success mt-3"
    >
      {{ responseMessage }}
    </div>
  </div>
</template>

<script>
/*
  Exportamos el componente Vue con la configuración:
  - data(): retorna los campos reactivos (form, responseMessage, loading).
  - methods: contiene la lógica para enviar el mensaje (sendMessage).
*/
export default {
  // data() define las propiedades reactivas de nuestro componente.
  data() {
    return {
      // form: objeto con las propiedades necesarias para el formulario.
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
      // responseMessage: mensaje que aparece tras el envío (exitoso o con error).
      responseMessage: "",
      // loading: controla si estamos en proceso de enviar (deshabilitando el botón).
      loading: false,
    };
  },
  methods: {
    // Método asincrónico que se ejecuta al enviar el formulario.
    async sendMessage() {
      // Se activa el estado de "loading" para deshabilitar el botón mientras envía.
      this.loading = true;
      try {
        // Usamos fetch() para realizar una solicitud POST al backend.
        const response = await fetch("https://portafolio-vue.onrender.com/contact", {
          method: "POST",               // Tipo de método HTTP: POST.
          headers: { "Content-Type": "application/json" }, // Indicamos que se envía JSON.
          // body: contenido en formato JSON con los campos del formulario.
          body: JSON.stringify({
            name: this.form.name,
            email: this.form.email,
            subject: this.form.subject,
            message: this.form.message,
          }),
        });

        // Si la respuesta del servidor es "ok" (status 200-299), mostramos éxito.
        if (response.ok) {
          this.responseMessage = "Mensaje enviado con éxito!";
          // Reseteamos los campos del formulario a cadenas vacías.
          this.form.name = "";
          this.form.email = "";
          this.form.subject = "";
          this.form.message = "";
        } else {
          // Si el estado HTTP no está en rango 200-299, mostramos error.
          this.responseMessage = "Error al enviar mensaje.";
        }
      } catch (error) {
        // Si algo falla al conectar, mostramos este error genérico.
        this.responseMessage = "Error al conectar al servidor.";
        console.error(error);
      } finally {
        // Quitamos el modo "loading" sin importar éxito o error.
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* 
  scoped: limita los estilos únicamente a este componente,
  evitando conflictos con otros componentes.
*/

/* El contenedor principal se centra horizontalmente (margin: auto)
   y se le pone un ancho máximo de 600px para no expandirse en pantallas muy grandes. */
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

/* Define la apariencia de los campos de formulario, 
   con padding interno, borde, etc. */
.form-control {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Botón primario con fondo azul (#007bff),
   texto blanco, sin borde extra y un cambio de fondo suave al hacer hover. */
.btn-primary {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}

/* Estado deshabilitado del botón: fondo gris. */
.btn-primary:disabled {
  background: gray;
}

/* Alerta de éxito que se muestra cuando "responseMessage" tiene contenido. */
.alert-success {
  margin-top: 10px;
  font-weight: bold;
}
</style>
