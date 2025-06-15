import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // 👈 necesario para configurar el alias

export default defineConfig({
  base: "/portafolio-vue/",
  build: {
    outDir: "docs",
    copyPublicDir: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 define que @ apunta a /src
    },
  },
});
