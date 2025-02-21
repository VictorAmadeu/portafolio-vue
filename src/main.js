// Importamos los archivos de estilos y scripts de Bootstrap para el diseño y la funcionalidad
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Importamos Vue y la función createApp para inicializar nuestra aplicación
import { createApp } from "vue";
import App from "./App.vue"; // Importamos el componente principal de la aplicación

// Importamos el enrutador de Vue para manejar la navegación entre páginas
import router from "./router";

// Importamos la librería AOS (Animate On Scroll) para agregar animaciones al desplazarse
import AOS from "aos";
import "aos/dist/aos.css"; // Importamos los estilos de AOS

// Creamos la aplicación de Vue
const app = createApp(App);

// Configuramos el enrutador en la aplicación para gestionar la navegación entre rutas
app.use(router);

// Configuración global de AOS para definir cómo se comportarán las animaciones en la página
AOS.init({
  duration: 1000, // Duración de la animación en milisegundos (1 segundo)
  easing: "ease-in-out", // Tipo de animación para una transición fluida
  once: true, // La animación solo se ejecutará una vez al hacer scroll
  mirror: false, // No volverá a animarse al hacer scroll hacia atrás
});

// Agregamos un efecto de desplazamiento suave al cambiar de ruta en la navbar
// Esto evita saltos bruscos en la navegación y mejora la experiencia del usuario
router.afterEach(() => {
  setTimeout(() => {
    window.scrollTo({
      top: 0, // Se desplaza al inicio de la página
      behavior: "smooth", // Aplica una animación de desplazamiento suave
    });
  }, 100); // Se agrega un pequeño retraso para asegurar una transición efectiva
});

// Montamos la aplicación en el elemento con el ID "app" dentro del HTML
app.mount("#app");
