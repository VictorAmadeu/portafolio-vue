import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Usar modo de histórico correto
  routes: [
    { path: "/", component: HomeView },
    { path: "/contact", component: ContactView },
  ],
});

export default router;
