// Línea 1: Importamos la función "defineConfig" desde el paquete "vite".
// Esta función nos ayuda a definir la configuración de Vite de manera tipada y clara.
import { defineConfig } from "vite";

// Línea 2: Importamos el plugin de Vue para Vite, que permite procesar y compilar archivos .vue.
// Este plugin es esencial para que Vite entienda y maneje correctamente los componentes de Vue.js.
import vue from "@vitejs/plugin-vue";

// Línea 4: Exportamos por defecto la configuración de Vite utilizando la función "defineConfig".
// Esta estructura nos permite organizar de forma clara todas las opciones de configuración necesarias para el proyecto.
export default defineConfig({
  // Línea 6: Definimos la propiedad "base", que especifica la URL base de la aplicación cuando se despliega.
  // Este ajuste es importante cuando el proyecto se aloja en un subdirectorio, como en GitHub Pages.
  // Aquí "/portafolio-vue/" representa la ruta en la que estará accesible el sitio.
  base: "/portafolio-vue/",

  // Línea 10: Definimos la propiedad "plugins", que es un array donde registramos los plugins que Vite usará.
  // En este caso, estamos utilizando el plugin de Vue, invocándolo con "vue()".
  // Esto permite que los archivos .vue sean procesados correctamente por Vite.
  plugins: [vue()],

  // Línea 14: Agregamos la configuración "build" para definir opciones relacionadas con la construcción (compilación) del proyecto.
  build: {
    // Línea 16: Definimos la propiedad "outDir", que indica en qué carpeta se generarán los archivos de compilación.
    // GitHub Pages requiere que los archivos del sitio se encuentren en la carpeta "/docs", por lo que especificamos esa ruta.
    outDir: "docs",
  },
});
