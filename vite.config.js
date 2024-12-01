import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://auth-backend-six-tau.vercel.app",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    "process.env": {},
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
