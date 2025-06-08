import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // 👈 necessário para configurar o alias

export default defineConfig({
  base: "/portafolio-vue/",
  build: {
    outDir: "docs",
    copyPublicDir: true,
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 define que @ aponta para /src
    },
  },
});
