import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Importuri scurte (ex: "@/components/Navbar")
    },
  },
  server: {
    port: 3000, // Poți schimba portul, dacă ai nevoie
    strictPort: true, // Dacă portul e ocupat, Vite nu va schimba automat portul
    open: true, // Deschide automat browser-ul la pornire
  },
  build: {
    outDir: "dist", // Directorul unde se generează build-ul
    emptyOutDir: true, // Șterge conținutul vechi înainte de build
    target: "esnext", // Optimizează pentru browsere moderne
  },
  define: {
    "process.env": {}, // Evită erori legate de "process is not defined" în React
  },
});
