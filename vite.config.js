// Línea 1: Importamos la función "defineConfig" desde el paquete "vite".
// Esta función nos ayuda a definir y tipar la configuración de Vite de manera clara.
import { defineConfig } from "vite";

// Línea 2: Importamos el plugin de Vue para Vite, que permite procesar y compilar archivos .vue.
// Esto es esencial para poder utilizar Vue en nuestro proyecto.
import vue from "@vitejs/plugin-vue";

// Línea 4: Comentario que nos remite a la documentación oficial de Vite, para consultas adicionales.
// No afecta la ejecución del código.
// https://vite.dev/config/

// Línea 5-9: Exportamos por defecto la configuración definida con "defineConfig".
// Dentro del objeto de configuración incluimos las propiedades necesarias para nuestro proyecto.
export default defineConfig({
  // Línea 6: Propiedad "base" que define el camino base (URL base) de la aplicación cuando se despliega.
  // Esto es útil cuando el proyecto se aloja en un subdirectorio, en este caso "/portafolio-vue/".
  base: "/portafolio-vue/",

  // Línea 7: Propiedad "plugins", donde registramos los plugins que Vite usará para procesar el código.
  // Aquí, pasamos el plugin de Vue, que se invoca como "vue()", permitiendo la transformación adecuada de los componentes Vue.
  plugins: [vue()],
});
