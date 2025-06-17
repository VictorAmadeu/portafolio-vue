// Estilos de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Vue core
import { createApp } from "vue";
import App from "./App.vue";

// Roteador
import router from "./router";

// AOS - animaciones al desplazarse
import AOS from "aos";
import "aos/dist/aos.css";

// Criación del app Vue
const app = createApp(App);

// Uso del roteador
app.use(router);

// Inicialización del AOS
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

// Scroll suave desupués del cambio de ruta
router.afterEach(() => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 100);
});

// Montaje de la aplicación Vue
app.mount("#app");
