import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";

const router = createRouter({
  history: createWebHashHistory(), // 🔥 Usa hash para evitar erro 404 no GitHub Pages
  routes: [
    { path: "/", component: HomeView },
    { path: "/contact", component: ContactView },
  ],
});

export default router;
