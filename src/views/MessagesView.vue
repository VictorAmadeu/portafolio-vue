<!-- 
  A continuación verás el archivo "MessagesView.vue" completamente actualizado,
  combinando la nueva apariencia de la tabla (estilo, espacio y modo oscuro)
  con la protección por contraseña para que solo tú tengas acceso.

  Incluye explicaciones didácticas línea por línea en TODO el código, 
  sin dejar ninguna línea sin comentarios.

  IMPORTANTE: Sustituye la URL de fetch("https://portafolio-vue.onrender.com/messages")
  por la de tu propio backend si fuera distinta.
-->

<template>
  <!-- 
    Envolvemos TODO en un contenedor que, por defecto, muestra:
    1) La tabla de mensajes (si "authenticated" es true)
    2) El formulario de contraseña si "authenticated" es false.
    Se controla con v-if y v-else en la raíz.
  -->
  <div>
    <!-- 
      Sección principal que muestra la tabla de mensajes 
      SOLO si "authenticated" es true
    -->
    <div 
      class="container mt-5"
      v-if="authenticated"
    >
      <!-- Título centrado (text-center) con margen inferior (mb-4). -->
      <h2 class="text-center mb-4">📥 Mensagens Recebidas</h2>

      <!-- 
        Verificamos si "messages" tiene datos con v-if.
        Si "messages.length" > 0, mostramos la tabla; de lo contrario, un bloque alternativo.
      -->
      <div v-if="messages.length">
        <!-- 
          "table-responsive" para que la tabla sea desplazable 
          horizontalmente en pantallas pequeñas, sin romper el layout.
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
                <!-- Encabezado para el cuerpo del mensaje -->
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
    
    <!-- 
      Si NO estamos autenticados (authenticated = false),
      mostramos un formulario de contraseña para restringir acceso.
      "v-else" complementa el v-if="authenticated" anterior.
    -->
    <div 
      class="container mt-5 text-center"
      v-else
    >
      <!-- Título indicando que el acceso está protegido -->
      <h3>🔐 Acesso Restrito</h3>
      <p>Digite a senha para acessar as mensagens:</p>
      
      <!-- Campo de senha -->
      <input
        type="password"
        v-model="passwordInput"
        class="form-control mb-3 mx-auto"
        style="max-width: 300px;"
        placeholder="Senha"
      />

      <!-- Botón para validar la contraseña ingresada -->
      <button 
        @click="checkPassword"
        class="btn btn-primary"
      >
        Entrar
      </button>

      <!-- Mensaje de error si la contraseña es incorrecta -->
      <p 
        v-if="error" 
        class="text-danger mt-3"
      >
        Senha incorreta!
      </p>
    </div>
  </div>
</template>

<script>
/* 
  Este componente se encarga de:
  - Proteger la vista de mensajes con una contraseña (passwordInput).
  - Mostrar la tabla de mensajes solamente si el usuario ingresa la contraseña correcta.
*/
export default {
  // "name" es buena práctica para debug e identificación del componente
  name: "MessagesView",

  /* 
    data() retorna un objeto con las propiedades reactivas:
    1) messages: array donde guardamos los mensajes del backend.
    2) authenticated: booleano que indica si el usuario pasó la barrera de contraseña.
    3) passwordInput: almacena la contraseña digitada en el input.
    4) error: muestra si la contraseña está incorrecta.
  */
  data() {
    return {
      messages: [],
      authenticated: false,
      passwordInput: "",
      error: false,
    };
  },

  /* 
    methods: seccion donde definimos funciones.
    1) checkPassword(): verifica si la contraseña digitada es la correcta.
    2) fetchMessages(): si la contraseña es correcta, hace GET al backend para obtener mensajes.
  */
  methods: {
    // Verifica la contraseña ingresada y, si es correcta, carga los mensajes
    checkPassword() {
      // Aquí defines la contraseña que deseas proteger
      const correctPassword = "Victor01121993aaa"; // MODIFICA esta línea con tu contraseña

      if (this.passwordInput === correctPassword) {
        // Si coincide, marcamos authenticated = true y luego llamamos a fetchMessages()
        this.authenticated = true;
        this.fetchMessages();
      } else {
        // Se muestra el error y permanece sin autenticar
        this.error = true;
      }
    },

    // Hace la petición GET al backend para obtener la lista de mensajes
    async fetchMessages() {
      try {
        // Sustituye la URL si tu endpoint es distinto
        const res = await fetch("https://portafolio-vue.onrender.com/messages");
        // Convertimos la respuesta a JSON
        const data = await res.json();
        // Asignamos los datos al array messages
        this.messages = data;
      } catch (error) {
        // Si hay fallo de red o parseo, lo mostramos en consola
        console.error("Erro ao carregar mensagens:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 
  "scoped" hace que estos estilos solo se apliquen dentro de este componente,
  sin afectar a otros componentes de la aplicación.
*/

/* 
  Ajustamos el contenedor para que ocupe al menos el 80% de la altura de la pantalla (min-height: 80vh)
  y añadimos un padding-bottom para separar el contenido del footer.
  También usamos flex para centrar verticalmente si el contenido es corto.
*/
.container {
  max-width: 1000px; /* ancho máximo de 1000px para la tabla */
  min-height: 80vh;  /* ocupa el 80% de la altura de la ventana */
  padding-bottom: 4rem; /* espacio extra abajo para que el footer no quede pegado */
  display: flex;         /* convertimos el contenedor en flexbox */
  flex-direction: column; /* apilamos elementos verticalmente */
  justify-content: center; /* centramos el contenido verticalmente */
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
