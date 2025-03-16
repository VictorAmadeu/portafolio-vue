// 1. Importamos las funciones necesarias de Vue Router: createRouter para crear la instancia del enrutador
//    y createWebHashHistory para utilizar el modo de historial basado en hash (ideal para GitHub Pages).
import { createRouter, createWebHashHistory } from "vue-router";

// 2. Importamos el componente HomeView, que se mostrará en la ruta principal ('/').
import HomeView from "../views/HomeView.vue";

// 3. Importamos el componente ContactView, que se mostrará en la ruta '/contact'.
import ContactView from "../views/ContactView.vue";

// 4. Creamos la instancia del enrutador utilizando createRouter, pasando un objeto de configuración.
const router = createRouter({
  // 5. Configuramos el historial del enrutador para usar el modo hash.
  //    Se utiliza import.meta.env.BASE_URL para establecer la URL base definida en el entorno del proyecto.
  history: createWebHashHistory(import.meta.env.BASE_URL),

  // 6. Definimos el arreglo de rutas de la aplicación.
  routes: [
    // 7. Ruta principal: cuando la URL es '/', se renderiza el componente HomeView.
    { path: "/", component: HomeView },

    // 8. Ruta de contacto: cuando la URL es '/contact', se renderiza el componente ContactView.
    { path: "/contact", component: ContactView },
  ],
});

// 9. Exportamos la instancia del enrutador para poder utilizarla en otros lugares de la aplicación,
//    normalmente en el archivo principal (main.js).
export default router;
