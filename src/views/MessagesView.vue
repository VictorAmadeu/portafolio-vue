<!-- 
  A continuación verás el archivo "MessagesView.vue" completamente actualizado,
  con las modificaciones solicitadas para mejorar el estilo de la tabla.
  Incluye explicaciones didácticas línea por línea en TODO el código, 
  sin dejar ninguna línea sin comentarios.
  IMPORTANTE: Sustituye la URL de fetch("https://portafolio-vue.onrender.com/messages")
  por la de tu propio backend si fuera distinta.
-->

<template>
  <!-- Contenedor principal con clase de Bootstrap "container" y margen superior (mt-5) -->
  <div class="container mt-5">
    <!-- Título centrado (text-center) y con margen inferior (mb-4) para la sección de mensajes -->
    <h2 class="text-center mb-4">📥 Mensagens Recebidas</h2>

    <!-- Verificamos si "messages" tiene datos con v-if -->
    <div v-if="messages.length">
      <!-- 
        "table-responsive" es una clase de Bootstrap que hace la tabla desplazable 
        horizontalmente en pantallas pequeñas sin romper el layout.
      -->
      <div class="table-responsive">
        <!-- 
          "table" es la clase principal de Bootstrap para tablas.
          "table-hover" añade un efecto hover a las filas.
          "table-bordered" añade un borde a cada celda.
          "shadow-sm" añade una ligera sombra alrededor.
          "rounded-3" redondea las esquinas con un radio mayor.
        -->
        <table class="table table-hover table-bordered shadow-sm rounded-3">
          <!-- 
            "thead" para el encabezado.
            "table-dark" le da un fondo oscuro al encabezado.
            "text-center" alinea el texto al centro.
          -->
          <thead class="table-dark text-center">
            <tr>
              <!-- Encabezado para el nombre de la persona que envía el mensaje -->
              <th>Nome</th>
              <!-- Encabezado para el correo electrónico de la persona -->
              <th>Email</th>
              <!-- Encabezado para el asunto de la persona -->
              <th>Assunto</th>
              <!-- Encabezado para el cuerpo de la persona -->
              <th>Mensagem</th>
            </tr>
          </thead>

          <!-- 
            "tbody" contiene los datos reales.
            "table-light" pone un color de fondo claro en las filas.
          -->
          <tbody class="table-light">
            <!-- 
              "v-for" recorre el array "messages".
              "msg" representa cada elemento, "index" es la posición en el array.
              ":key" ayuda a Vue a optimizar la renderización de listas.
            -->
            <tr v-for="(msg, index) in messages" :key="index">
              <!-- 
                Muestra el nombre del remitente guardado en "msg.name"
              -->
              <td>{{ msg.name }}</td>
              <!-- Muestra el email del remitente guardado en "msg.email" -->
              <td>{{ msg.email }}</td>
              <!-- Muestra el asunto del mensaje guardado en "msg.subject" -->
              <td>{{ msg.subject }}</td>
              <!-- Muestra el cuerpo del mensaje guardado en "msg.message" -->
              <td>{{ msg.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 
      Si "messages" está vacío (no hay datos), se muestra este bloque alternativo.
      "v-else" se activa cuando v-if="messages.length" es false (0 elementos).
    -->
    <div v-else>
      <!-- Mensaje indicando que no se recibieron mensajes -->
      <p class="text-muted text-center">Nenhuma mensagem recebida ainda.</p>
    </div>
  </div>
</template>

<script>
/* 
  Exportamos este componente para que pueda ser utilizado en el router de Vue 
  o en cualquier otra parte de la aplicación. 
*/
export default {
  // "name" es buena práctica para depuración e identificación del componente
  name: "MessagesView",

  // "data()" retorna un objeto con las propiedades reactivas que usaremos en la plantilla
  data() {
    return {
      // "messages" es el array que contendrá la lista de mensajes traídos del backend
      messages: [],
    };
  },

  // "mounted()" es un ciclo de vida de Vue que se ejecuta inmediatamente 
  // después de que el componente ha sido insertado en el DOM.
  async mounted() {
    try {
      // Realizamos la petición GET al backend para obtener los mensajes
      const res = await fetch("https://portafolio-vue.onrender.com/messages");
      // Convertimos la respuesta en un objeto/array JSON
      const data = await res.json();
      // Asignamos los datos a "messages".
      // Si quieres ver los más recientes primero, podrías usar data.reverse().
      this.messages = data;
    } catch (error) {
      // Si ocurre un error de red o de parseo, lo mostramos en la consola
      console.error("Erro ao carregar mensagens:", error);
    }
  },
};
</script>

<style scoped>
/* 
  "scoped" hace que estos estilos solo se apliquen dentro de este componente,
  sin afectar a otros componentes de la aplicación.
*/

/* Ajusta el ancho máximo del contenedor a 1000px */
.container {
  max-width: 1000px;
}

/* 
  Estilos específicos para la tabla:
  - Fondo blanco
  - Borde redondeado
  - Tamaño de fuente un poco más pequeño
*/
table {
  background-color: white; /* color de fondo de la tabla */
  border-radius: 10px;     /* esquinas redondeadas */
  overflow: hidden;        /* oculta contenido que sobresalga del borde */
  font-size: 0.95rem;      /* reduce ligeramente el tamaño de letra */
}

/* Encabezados dentro de thead */
thead th {
  background-color: #343a40; /* color de fondo oscuro */
  color: white;             /* texto blanco para contraste */
}

/* Celdas dentro de tbody */
tbody td {
  vertical-align: middle; /* centra verticalmente el texto */
  text-align: left;       /* alinea el contenido a la izquierda */
}

/* Efecto hover en las filas */
tr:hover {
  background-color: #f1f1f1; /* color de fondo gris claro al pasar el cursor */
}

/* 
  Para un posible modo oscuro (dark-mode):
  Si tu body tiene la clase "dark-mode", aplicamos estos estilos:
*/
body.dark-mode table {
  background-color: #1e1e1e; /* fondo más oscuro para la tabla */
  color: #e0e0e0;            /* color de texto claro */
}

body.dark-mode thead th {
  background-color: #333; /* encabezado ligeramente más claro que el fondo */
}

body.dark-mode tr:hover {
  background-color: #2a2a2a; /* hover un poco más claro que #1e1e1e */
}
</style>
