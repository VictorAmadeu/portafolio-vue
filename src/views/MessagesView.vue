<!-- 
  A continuación tienes el archivo "MessagesView.vue" ACTUALIZADO 
  con mejoras de responsividad para pantallas pequeñas,
  manteniendo la funcionalidad de eliminar mensajes, 
  protección con contraseña y persistencia en localStorage.
-->

<template>
  <!-- Contenedor principal que muestra:
       1) La tabla de mensajes con botón "Apagar" si el usuario está autenticado (isAuthenticated).
       2) El formulario de contraseña si no está autenticado.
  -->
  <div>
    <!-- Sección protegida (tabla) → visible si isAuthenticated es true -->
    <div class="container mt-5" v-if="isAuthenticated">
      <h2 class="text-center mb-4">📥 Mensajes Recibidos</h2>

      <div v-if="messages.length">
        <!-- "table-responsive" ayuda a que la tabla tenga scroll horizontal en móviles -->
        <div class="table-responsive">
          <table class="table table-hover table-bordered shadow-sm rounded-3">
            <thead class="table-dark text-center">
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Asunto</th>
                <th>Mensaje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody class="table-light">
              <tr
                v-for="(msg, index) in messages"
                :key="msg._id || index"
              >
                <td>{{ msg.name }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.subject }}</td>
                <td>{{ msg.message }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteMessage(msg._id)"
                  >
                    🗑️ Apagar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else>
        <p class="text-muted text-center">No hay mensajes aún.</p>
      </div>
    </div>

    <!-- Sección de autenticación (contraseña) → visible si isAuthenticated es false -->
    <div class="container mt-5 text-center" v-else>
      <h3>🔐 Acceso Restringido</h3>
      <p>Escribe la contraseña para ver los mensajes:</p>
      
      <input
        type="password"
        v-model="passwordInput"
        class="form-control mb-3 mx-auto"
        style="max-width: 300px;"
        placeholder="Contraseña"
      />

      <button
        @click="checkPassword"
        class="btn btn-primary"
      >
        Entrar
      </button>

      <p
        v-if="error"
        class="text-danger mt-3"
      >
        Contraseña incorrecta
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessagesView",

  /*
    data() devuelve un objeto con las propiedades reactivas:
    - messages: array de mensajes traídos del backend.
    - isAuthenticated: booleano para mostrar tabla o formulario de contraseña.
    - passwordInput: almacena el texto digitado como contraseña.
    - error: muestra si la contraseña está incorrecta.
  */
  data() {
    return {
      messages: [],
      isAuthenticated: false,
      passwordInput: "",
      error: false,
    };
  },

  /*
    mounted() se ejecuta después de montar el componente en el DOM.
    Revisamos si el usuario ya se autenticó antes (localStorage).
    Si sí, no pedimos la contraseña de nuevo y cargamos mensajes.
  */
  async mounted() {
    const authFlag = localStorage.getItem("isAuthenticatedMessages");
    if (authFlag === "true") {
      this.isAuthenticated = true;
      await this.fetchMessages();
    }
  },

  methods: {
    /* checkPassword():
       - Verifica si la contraseña es la correcta.
       - Si sí, guardamos "isAuthenticatedMessages" = true en localStorage
         para no pedir de nuevo.
       - Si no, mostramos error. 
    */
    async checkPassword() {
      const correctPassword = "Victor01121993aaa";
      if (this.passwordInput === correctPassword) {
        this.isAuthenticated = true;
        localStorage.setItem("isAuthenticatedMessages", "true");
        await this.fetchMessages();
      } else {
        this.error = true;
      }
    },

    /* fetchMessages():
       Hace una petición GET al endpoint de tus mensajes.
       Ajusta la URL si tu backend es distinto.
    */
    async fetchMessages() {
      try {
        const res = await fetch("https://portafolio-vue.onrender.com/messages");
        const data = await res.json();
        this.messages = data;
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    },

    /* deleteMessage(id):
       Elimina un mensaje concreto haciendo DELETE a /messages/:id
    */
    async deleteMessage(id) {
      const confirmDelete = confirm("¿Estás seguro de querer borrar este mensaje?");
      if (!confirmDelete) return;

      try {
        const response = await fetch(`https://portafolio-vue.onrender.com/messages/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Filtramos la lista local para quitar el mensaje borrado
          this.messages = this.messages.filter(msg => msg._id !== id);
          alert("Mensaje eliminado con éxito");
        } else {
          alert("Error al borrar el mensaje.");
        }
      } catch (error) {
        console.error("Error al borrar mensaje:", error);
        alert("Error al borrar el mensaje.");
      }
    },
  },
};
</script>

<style scoped>
/* 
  "scoped" indica que estos estilos se aplican únicamente a este componente,
  evitando conflictos con otros estilos globales.
*/

/* Ajustamos el contenedor para que haya espacio vertical (al menos 80% de la altura de la ventana).
   Y un padding-bottom para que el footer no quede pegado. */
.container {
  max-width: 1000px;
  min-height: 80vh;
  padding-bottom: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Tabla con fondo blanco, bordes redondeados y fuente algo reducida */
table {
  background-color: white; 
  border-radius: 10px;     
  overflow: hidden;        
  font-size: 0.95rem;      
}

/* Encabezado oscuro */
thead th {
  background-color: #343a40; 
  color: white;             
}

/* Celdas con alineación vertical al centro y texto a la izquierda */
tbody td {
  vertical-align: middle;
  text-align: left;
}

/* Efecto hover de color gris claro */
tr:hover {
  background-color: #f1f1f1; 
}

/* 
  Modo oscuro (dark-mode):
  Si tu <body> tiene la clase "dark-mode", aplicamos estos estilos.
*/
body.dark-mode table {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

body.dark-mode thead th {
  background-color: #333;
}

body.dark-mode tr:hover {
  background-color: #2a2a2a;
}

/* 
  MEDIA QUERIES para pantallas pequeñas
  Ajustamos márgenes, fuente y overflow 
*/
@media (max-width: 768px) {
  .container {
    padding: 1rem;
    margin-top: 2rem;
    min-height: auto;
  }

  /* Reducimos fuente de la tabla para que quepa en pantalla */
  table {
    font-size: 0.9rem;
  }

  thead th,
  tbody td {
    white-space: nowrap; /* Evita que el texto se corte en varias líneas */
  }

  .table-responsive {
    overflow-x: auto; /* Permite scroll horizontal en móviles */
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    width: 100%;
  }
}
</style>
