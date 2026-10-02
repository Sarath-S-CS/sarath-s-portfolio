import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// GitHub Pages serves this project at /sarath-s-portfolio/, so the built
// asset URLs need that base path. For a user/organization page served at the
// domain root, change this to "/".
export default defineConfig({
  base: "/sarath-s-portfolio/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
