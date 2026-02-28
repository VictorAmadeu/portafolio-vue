import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import ContactView from "../views/ContactView.vue";

const router = createRouter({
  // Historial hash para evitar errores 404 en GitHub Pages.
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/about", component: AboutView },
    { path: "/projects", component: ProjectsView },
    { path: "/contact", component: ContactView },
  ],
});

export default router;
