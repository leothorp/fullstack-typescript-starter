import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [react()],
  build: {
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "./src/main.tsx",
    },
  },
});
