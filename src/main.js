// Estilos de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Vue core
import { createApp } from "vue";
import App from "./App.vue";

// Roteador
import router from "./router";

// AOS - animações ao rolar
import AOS from "aos";
import "aos/dist/aos.css";

// Criação do app Vue
const app = createApp(App);

// Uso do roteador
app.use(router);

// Inicialização do AOS
app.mixin({
  mounted() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  },
});

// Scroll suave após troca de rota
router.afterEach(() => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 100);
});

// Montagem da aplicação
app.mount("#app");
