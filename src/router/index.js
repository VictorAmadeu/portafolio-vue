import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import ContactView from "../views/ContactView.vue";

const router = createRouter({
  // Historial hash para evitar errores 404 en GitHub Pages.
  history: createWebHashHistory(),
  routes: [
    { path: "/", name: "Home", component: HomeView },
    { path: "/about", name: "About", component: AboutView },
    { path: "/projects", name: "Projects", component: ProjectsView },
    {
      path: "/projects/:slug",
      name: "ProjectDetail",
      component: () => import("../views/ProjectDetail.vue"),
    },
    { path: "/contact", name: "Contact", component: ContactView },
    {
      path: "/404",
      name: "NotFound",
      component: () => import("../views/NotFoundView.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: { name: "NotFound" } },
  ],
});

export default router;
