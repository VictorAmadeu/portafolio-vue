<!-- 
  A continuación, se muestra el archivo "ContactView.vue" con las modificaciones 
  necesarias para enviar correctamente name, email, subject y message. 
  Incluye explicaciones didácticas, línea por línea, en TODO el código.
  NOTA: Sustituye la URL de fetch("https://portafolio-vue.onrender.com/contact") 
  por la de tu backend si es distinta.
-->

<template>
  <!-- Contenedor principal con clases de Bootstrap para margen y padding -->
  <div class="container mt-5">
    <!-- Título centrado que describe la sección de contacto -->
    <h2 class="text-center mb-4">Contato</h2>

    <!-- Formulario que captura los datos del usuario y los envía mediante @submit.prevent="sendMessage". 
         "prevent" evita la recarga de la página por defecto al enviar el formulario. -->
    <form @submit.prevent="sendMessage">
      <!-- Grupo de formulario para el campo 'Nome' -->
      <div class="mb-3">
        <!-- Etiqueta que indica qué dato se solicita, con clase de Bootstrap 'form-label' -->
        <label for="name" class="form-label">Nome</label>
        <!-- Input de texto ligado a 'form.name' gracias a v-model. 
             'required' obliga a que el usuario llene este campo antes de enviar. 
             'id="name"' lo asocia con el label anterior. -->
        <input
          type="text"
          v-model="form.name"
          class="form-control"
          id="name"
          required
        />
      </div>

      <!-- Grupo de formulario para el campo 'Email' -->
      <div class="mb-3">
        <!-- Etiqueta para el correo electrónico con clase 'form-label' -->
        <label for="email" class="form-label">Email</label>
        <!-- Input de tipo 'email' para validación básica del navegador.
             v-model enlaza su valor a 'form.email'.
             'required' obliga a rellenarlo antes de enviar. -->
        <input
          type="email"
          v-model="form.email"
          class="form-control"
          id="email"
          required
        />
      </div>

      <!-- Grupo de formulario para el campo 'Assunto' -->
      <div class="mb-3">
        <!-- Etiqueta que describe el campo del asunto del mensaje -->
        <label for="subject" class="form-label">Assunto</label>
        <!-- Input de texto para el asunto.
             v-model enlaza su valor a 'form.subject'.
             'required' hace obligatorio este campo. 
             Si no quieres que sea obligatorio, quita 'required'. -->
        <input
          type="text"
          v-model="form.subject"
          class="form-control"
          id="subject"
          required
        />
      </div>

      <!-- Grupo de formulario para el campo 'Mensagem' -->
      <div class="mb-3">
        <!-- Etiqueta que indica el área de texto para el mensaje -->
        <label for="message" class="form-label">Mensagem</label>
        <!-- Textarea para que el usuario introduzca su mensaje.
             v-model enlaza su valor a 'form.message'.
             'required' obliga a llenarlo antes de enviar.
             'rows="5"' define el alto en 5 líneas aproximadamente. -->
        <textarea
          v-model="form.message"
          class="form-control"
          id="message"
          rows="5"
          required
        ></textarea>
      </div>

      <!-- Botón para enviar el formulario.
           'type="submit"' dispara el evento @submit del formulario.
           Clase de Bootstrap 'btn btn-primary' para estilo de botón principal. -->
      <button type="submit" class="btn btn-primary">
        Enviar
      </button>
    </form>
  </div>
</template>

<script>
/*
  Exportamos este componente de Vue con el nombre 'ContactView'.
  Contiene los datos (form) y el método 'sendMessage' 
  para realizar la petición al backend.
*/
export default {
  // name es opcional, pero útil para depuración.
  name: "ContactView",

  // data() retorna las propiedades reactivas que se usarán en la plantilla.
  data() {
    return {
      // Objeto form que agrupa todos los campos del formulario:
      form: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },

  // methods define las funciones de nuestro componente, 
  // en especial la lógica de envío del formulario.
  methods: {
    // Función asíncrona que envía el contenido del formulario al servidor.
    async sendMessage() {
      try {
        // Realiza una petición POST al endpoint de tu backend.
        // Ajusta la URL si tu servidor difiere de "https://portafolio-vue.onrender.com/contact".
        const response = await fetch("https://portafolio-vue.onrender.com/contact", {
          // Método HTTP que indica que enviamos datos nuevos.
          method: "POST",
          // Indicamos el tipo de contenido que se está enviando: JSON.
          headers: {
            "Content-Type": "application/json",
          },
          // Convertimos el objeto 'form' a formato JSON para el cuerpo de la solicitud.
          body: JSON.stringify(this.form),
        });

        // Si la respuesta es satisfactoria (código 2xx), mostramos éxito.
        if (response.ok) {
          alert("Mensagem enviada com sucesso!");
          // Reseteamos el formulario después de un envío exitoso.
          this.form = { name: "", email: "", subject: "", message: "" };
        } else {
          // Si el servidor respondió, pero con un código de error.
          throw new Error("Erro ao enviar mensagem.");
        }
      } catch (err) {
        // Si ocurrió algún problema de conexión o similar, lo registramos en consola.
        console.error(err);
        // Mostramos al usuario que no se pudo enviar el mensaje.
        alert("Erro ao enviar mensagem.");
      }
    },
  },
};
</script>

<style scoped>
/*
  'scoped' asegura que estos estilos sólo afecten a este componente.
*/

/* Clase 'container' con margen superior. 
   Ancho máximo de ~900px si lo requieres, 
   o déjalo así para usar las clases de Bootstrap integradas. */
.container {
  max-width: 900px; /* Ajusta si deseas un contenedor más o menos ancho */
}

/* El botón principal con margenes suaves. 
   Puedes personalizar más clases de Bootstrap si deseas. */
.btn-primary {
  margin-top: 1rem;
}
</style>
