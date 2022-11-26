import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//TODO(lt): vvv check if still necessary
import tsconfigPaths from "vite-tsconfig-paths";

const getConfig = (env) => {
  if (env.nodeEnv === "production") {
    return;
  }

  return defineConfig({
    server: {
      port: env.CLIENT_PORT,
    },
    preview: {
      port: env.CLIENT_PORT,
    },
    plugins: [tsconfigPaths(), react()],
    build: {
      manifest: true,
      rollupOptions: {
        // overwrite default .html entry
        input: "./src/main.tsx",
      },
    },
  });
};

// https://vitejs.dev/config/
export default getConfig(process.env);
