import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },

  define: {
    "process.env": {},
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
