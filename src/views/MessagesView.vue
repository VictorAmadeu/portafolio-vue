<!-- 
  A continuación encontrarás el archivo MessagesView.vue completamente funcional 
  y actualizado, con explicaciones didácticas línea por línea en todo el código.
  Recuerda sustituir "https://portafolio-vue.onrender.com/messages" por la URL de tu propio backend,
  si fuera el caso. 
-->

<template>
  <!-- Contenedor principal con clases de Bootstrap para espaciar la sección -->
  <div class="container mt-5">
    <!-- Título centrado con margen inferior de 4 unidades -->
    <h2 class="text-center mb-4">📨 Mensagens Recebidas</h2>

    <!-- Estructura condicional que evalúa si "messages.length" es mayor que 0 -->
    <div v-if="messages.length">
      <!-- Tabla con estilo de Bootstrap, bordeada y con rayas alternadas (striped) -->
      <table class="table table-bordered table-striped">
        <!-- Encabezado de tabla con fondo oscuro de Bootstrap -->
        <thead class="table-dark">
          <tr>
            <!-- Encabezado de columna para el nombre de la persona -->
            <th>Nome</th>
            <!-- Encabezado de columna para el correo electrónico -->
            <th>Email</th>
            <!-- Encabezado de columna para el asunto del mensaje -->
            <th>Assunto</th>
            <!-- Encabezado de columna para el cuerpo del mensaje -->
            <th>Mensagem</th>
          </tr>
        </thead>
        <!-- Cuerpo de la tabla donde se despliegan los datos reales -->
        <tbody>
          <!-- 
            Bucle v-for que recorre el array "messages".
            "msg" representa cada elemento, "index" es la posición en el array.
            ":key" ayuda a Vue a optimizar la renderización de listas.
          -->
          <tr v-for="(msg, index) in messages" :key="index">
            <!-- Muestra el nombre de la persona que envía el mensaje -->
            <td>{{ msg.name }}</td>
            <!-- Muestra el email de la persona que envía el mensaje -->
            <td>{{ msg.email }}</td>
            <!-- Muestra el asunto enviado por la persona -->
            <td>{{ msg.subject }}</td>
            <!-- Muestra el contenido del mensaje -->
            <td>{{ msg.message }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 
      Si "messages" está vacío, se muestra este bloque alternativo.
      "v-else" se activa cuando v-if="messages.length" es false (o sea, 0 mensajes).
    -->
    <div v-else>
      <p class="text-muted text-center">Nenhuma mensagem recebida ainda.</p>
    </div>
  </div>
</template>

<script>
/* 
  Exportamos por defecto (default export) este componente de Vue,
  para poder usarlo en cualquier parte de la aplicación (por ejemplo, en el router).
*/
export default {
  // "name" es una buena práctica para depurar el componente o identificarlo
  name: "MessagesView",

  // "data()" retorna un objeto con las propiedades reactivas que usaremos en la plantilla
  data() {
    return {
      // "messages" es un array donde se guardarán los datos traídos del backend
      messages: [],
    };
  },

  // "mounted()" es un ciclo de vida de Vue que se ejecuta inmediatamente
  // después de que el componente ha sido insertado en el DOM.
  async mounted() {
    try {
      // Hacemos la petición GET al backend para obtener la lista de mensajes
      // Reemplaza esta URL por tu endpoint si es diferente
      const res = await fetch("https://portafolio-vue.onrender.com/messages");

      // Convertimos la respuesta en un objeto JSON que contendrá el array de mensajes
      const data = await res.json();

      // Guardamos los datos en "messages" para poder mostrarlos en la tabla
      // "reverse()" invierte el orden, mostrando los más recientes primero
      this.messages = data.reverse();
    } catch (err) {
      // Si ocurre un error en la petición o la conversión a JSON, lo reportamos en la consola
      console.error("Erro ao buscar mensagens:", err);
    }
  },
};
</script>

<style scoped>
/* 
  "scoped" indica que estos estilos sólo se aplicarán dentro de este componente,
  sin afectar a otros componentes del proyecto.
*/
.container {
  /* Define un ancho máximo de 900 píxeles para el contenedor */
  max-width: 900px;
}
</style>
