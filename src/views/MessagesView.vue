<!-- 
  A continuación, presentamos el archivo "messages.view.vue" 
  con el código actualizado y comentarios didácticos línea por línea.
  IMPORTANTE: Sustituye la URL de "fetch(...)" con la de tu backend real, 
  por ejemplo: "https://TU_BACKEND.onrender.com/api/messages".
-->

<template>
  <!-- Contenedor principal que aplica márgenes en la parte superior -->
  <div class="container mt-5">
    <!-- Título centrado para la sección de mensajes recibidos -->
    <h2 class="text-center mb-4">📨 Mensagens Recebidas</h2>

    <!-- Condicional que muestra la tabla sólo si existe al menos un mensaje -->
    <div v-if="messages.length">
      <!-- Tabla con clases de Bootstrap para estilo y borde -->
      <table class="table table-bordered table-striped">
        <!-- Encabezado oscuro de la tabla -->
        <thead class="table-dark">
          <tr>
            <!-- Cabecera para el nombre de quien envía -->
            <th>Nome</th>
            <!-- Cabecera para el email de quien envía -->
            <th>Email</th>
            <!-- Cabecera para el asunto del mensaje -->
            <th>Assunto</th>
            <!-- Cabecera para el contenido del mensaje -->
            <th>Mensagem</th>
          </tr>
        </thead>
        <!-- Cuerpo de la tabla donde se listan los mensajes -->
        <tbody>
          <!-- Recorremos el array "messages" con v-for, 
               mostrando cada mensaje y su índice. 
               :key="index" ayuda a Vue a renderizar la lista de forma eficiente. -->
          <tr v-for="(msg, index) in messages" :key="index">
            <!-- Muestra el nombre del remitente -->
            <td>{{ msg.name }}</td>
            <!-- Muestra el email del remitente -->
            <td>{{ msg.email }}</td>
            <!-- Muestra el asunto del mensaje -->
            <td>{{ msg.subject }}</td>
            <!-- Muestra el contenido del mensaje -->
            <td>{{ msg.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Si no hay mensajes en el array "messages", se muestra este texto -->
    <div v-else>
      <p class="text-muted text-center">Nenhuma mensagem recebida ainda.</p>
    </div>
  </div>
</template>

<script>
/* 
  Exportamos el componente para su uso dentro de la aplicación Vue.
  Dentro del objeto exportado, se definen:
  - name (opcional, para identificar el componente),
  - data (función que retorna las variables reactivas),
  - ciclos de vida como "mounted" para obtener los mensajes al iniciar. 
*/
export default {
  // Nombre opcional del componente (buena práctica para depuración)
  name: 'MessagesView',

  // data() define las propiedades reactivas que usaremos en el template
  data() {
    return {
      // messages será un array que se llenará con los datos traídos del backend
      messages: [],
    };
  },

  // mounted() se ejecuta después de que el componente haya sido insertado en el DOM
  mounted() {
    // Realizamos la petición fetch al backend para obtener la lista de mensajes
    fetch('https://TU_BACKEND.onrender.com/api/messages')
      // Convertimos la respuesta HTTP a formato JSON
      .then(res => res.json())
      // Asignamos los datos recibidos a la variable messages
      .then(data => {
        // Si deseas mostrar los mensajes más recientes primero, podrías usar data.reverse()
        // this.messages = data.reverse();
        this.messages = data;
      })
      // En caso de error, lo mostramos por consola
      .catch(err => {
        console.error('Erro ao buscar mensagens:', err);
      });
  },
};
</script>

<style scoped>
/* 
  "scoped" indica que estos estilos sólo se aplicarán al 
  contenido de este componente y no a otros componentes 
*/
.container {
  /* Limita el ancho máximo de la sección principal a 900px */
  max-width: 900px;
}
</style>
