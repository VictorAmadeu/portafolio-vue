// Importamos desde "vue-router" las funciones necesarias para crear el enrutador
// y para configurar un historial basado en hash (en lugar de HTML5 history).
import { createRouter, createWebHashHistory } from "vue-router";

// Importamos el componente que representa la vista principal (Home).
import HomeView from "../views/HomeView.vue";

// Importamos el componente que representa la vista de la página de contacto.
import ContactView from "../views/ContactView.vue";

// Importamos el componente que representa la vista de los mensajes recibidos.
import MessagesView from "../views/MessagesView.vue"; // Nueva vista para mostrar mensajes

// Creamos una constante "router" donde configuramos el enrutador de Vue.
const router = createRouter({
  // Definimos el modo de historial: en este caso, "createWebHashHistory",
  // ideal para entornos como GitHub Pages, evitando errores 404.
  history: createWebHashHistory(),

  // Declaramos un array "routes" que contiene los objetos de configuración
  // para cada ruta de la aplicación.
  routes: [
    // Primera ruta: la raíz ("/") mostrará el componente "HomeView".
    { path: "/", component: HomeView },

    // Segunda ruta: "/contact" mostrará el componente "ContactView".
    { path: "/contact", component: ContactView },

    // Tercera ruta: "/messages" mostrará el componente "MessagesView",
    // donde se listarán los mensajes guardados.
    { path: "/messages", component: MessagesView }, // Nueva ruta agregada
  ],
});

// Exportamos por defecto el enrutador para que pueda ser utilizado
// en el archivo principal "main.js" u otros lugares donde se necesite.
export default router;
