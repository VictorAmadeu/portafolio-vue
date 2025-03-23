import { defineConfig } from "vite"; // ✅ IMPORT NECESSÁRIA!
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/portafolio-vue/",
  build: {
    outDir: "docs",
    copyPublicDir: true,
  },
  plugins: [vue()],
});
