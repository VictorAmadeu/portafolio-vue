// Estilos de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Paleta global del proyecto
import "./assets/theme-palette.css";

// Vue core
import { createApp } from "vue";
import App from "./App.vue";

// Router
import router from "./router";

// AOS - animaciones al desplazarse
import AOS from "aos";
import "aos/dist/aos.css";

// Creación del app Vue
const app = createApp(App);

// Uso del router
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

// Scroll suave después del cambio de ruta
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
