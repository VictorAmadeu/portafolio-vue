import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/portafolio-vue/", // Certifica que os caminhos estão corretos no GitHub Pages
  build: {
    outDir: "docs", // Garante que o build seja gerado na pasta correta
    copyPublicDir: true, // Garante que arquivos da pasta /public sejam copiados para /docs
  },
  plugins: [vue()],
});
