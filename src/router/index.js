import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import ContactView from "../views/ContactView.vue";

const router = createRouter({
  // El historial hash evita errores 404 en despliegues estáticos como GitHub Pages.
  history: createWebHashHistory(),
  routes: [
    // Ruta principal.
    { path: "/", component: HomeView },

    // Ruta de proyectos.
    { path: "/projects", component: ProjectsView },

    // Ruta de contacto.
    { path: "/contact", component: ContactView },
  ],
});

export default router;
