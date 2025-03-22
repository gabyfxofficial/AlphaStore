import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/AlphaStore/", 
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), 
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    target: "esnext",
  },
  define: {
    "process.env": {},
  },
});
