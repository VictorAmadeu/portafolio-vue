<!-- 
  A continuación tienes el archivo "MessagesView.vue" COMPLETAMENTE actualizado,
  con la funcionalidad de eliminar mensajes individuales, protección con contraseña y persistencia 
  en localStorage, manteniendo el estilo y comentarios detallados EN ESPAÑOL.

  NOTA: Ajusta la URL de fetch("https://portafolio-vue.onrender.com/messages") 
  o fetch("https://portafolio-vue.onrender.com/messages/:id") si tu endpoint es distinto.
-->

<template>
  <!-- 
    Contenedor principal que muestra:
    1) La tabla de mensajes con botón "Apagar" SI el usuario está autenticado (isAuthenticated).
    2) El formulario de contraseña SI no está autenticado.
  -->
  <div>
    <!-- Sección protegida (tabla) → solo visible si isAuthenticated es true -->
    <div class="container mt-5" v-if="isAuthenticated">
      <!-- Título centrado para la lista de mensajes -->
      <h2 class="text-center mb-4">📥 Mensagens Recebidas</h2>

      <!-- Evaluamos si existe al menos un mensaje en "messages" -->
      <div v-if="messages.length">
        <div class="table-responsive">
          <!-- 
            Tabla con:
            - Hover y borde
            - Sombra ligera
            - Bordes redondeados (rounded-3)
          -->
          <table class="table table-hover table-bordered shadow-sm rounded-3">
            <!-- Encabezado oscuro con texto centrado -->
            <thead class="table-dark text-center">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Assunto</th>
                <th>Mensagem</th>
                <!-- Columna de acciones (botón Apagar) -->
                <th>Acciones</th>
              </tr>
            </thead>

            <!-- Cuerpo de la tabla con fondo claro -->
            <tbody class="table-light">
              <!-- 
                Recorremos "messages" con v-for. 
                Usamos msg._id como key (si el backend lo provee) o index.
              -->
              <tr
                v-for="(msg, index) in messages"
                :key="msg._id || index"
              >
                <!-- Campos de la tabla -->
                <td>{{ msg.name }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.subject }}</td>
                <td>{{ msg.message }}</td>
                <td class="text-center">
                  <!-- Botón para eliminar el mensaje actual -->
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

      <!-- Si no hay mensajes, mostramos este texto -->
      <div v-else>
        <p class="text-muted text-center">Nenhuma mensagem recebida ainda.</p>
      </div>
    </div>

    <!-- Sección para autenticarse (contraseña) → visible si isAuthenticated es false -->
    <div class="container mt-5 text-center" v-else>
      <h3>🔐 Acesso Restrito</h3>
      <p>Digite a senha para acessar as mensagens:</p>
      
      <!-- Campo de contraseña -->
      <input
        type="password"
        v-model="passwordInput"
        class="form-control mb-3 mx-auto"
        style="max-width: 300px;"
        placeholder="Senha"
      />

      <!-- Botón para validar la contraseña -->
      <button
        @click="checkPassword"
        class="btn btn-primary"
      >
        Entrar
      </button>

      <!-- Si la contraseña está equivocada, mostramos un texto de error -->
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
    mounted() se ejecuta justo después de montar el componente en el DOM.
    Revisamos si el usuario ya se autenticó antes, usando localStorage.
    Si es así, no pedimos la contraseña de nuevo y cargamos mensajes al instante.
  */
  async mounted() {
    const authFlag = localStorage.getItem("isAuthenticatedMessages");
    if (authFlag === "true") {
      this.isAuthenticated = true;
      await this.fetchMessages();
    }
  },

  methods: {
    /*
      checkPassword(): verifica si la contraseña digitada coincide con la correcta.
      - Si sí, guardamos "isAuthenticatedMessages" en localStorage para no pedir de nuevo.
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

    /*
      fetchMessages(): hace una petición GET al endpoint de tus mensajes.
      Ajusta la URL si tu backend es distinto.
    */
    async fetchMessages() {
      try {
        const res = await fetch("https://portafolio-vue.onrender.com/messages");
        const data = await res.json();
        this.messages = data;
      } catch (error) {
        console.error("Erro ao carregar mensagens:", error);
      }
    },

    /*
      deleteMessage(id): elimina un mensaje concreto haciendo un DELETE a /messages/:id
    */
    async deleteMessage(id) {
      const confirmDelete = confirm("Tem certeza que deseja apagar esta mensagem?");
      if (!confirmDelete) return;

      try {
        const response = await fetch(`https://portafolio-vue.onrender.com/messages/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Filtramos la lista local para quitar el mensaje borrado
          this.messages = this.messages.filter(msg => msg._id !== id);
          alert("Mensagem apagada com sucesso!");
        } else {
          alert("Erro ao apagar a mensagem.");
        }
      } catch (error) {
        console.error("Erro ao apagar mensagem:", error);
        alert("Erro ao apagar a mensagem.");
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
   También agregamos un padding-bottom para que el footer no quede pegado. */
.container {
  max-width: 1000px;   /* anchura máxima de la tabla */
  min-height: 80vh;    /* ocupa 80% de la altura de la ventana */
  padding-bottom: 4rem;/* espacio extra al final */
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
  Si tu <body> tiene la clase "dark-mode", aplicaremos estos estilos.
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
</style>
