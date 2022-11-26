import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";

import react from "@vitejs/plugin-react";
//TODO(lt): vvv check if still necessary
import tsconfigPaths from "vite-tsconfig-paths";

const getConfig = (env) => {
  // any process.env values desired for use on the frontend must be specified here
  const envVariablesToForward: string[] = ["NODE_ENV", "API_ORIGIN"];
  const commonConfig = {
    plugins: [
      EnvironmentPlugin(envVariablesToForward),
      tsconfigPaths(),
      react(),
    ],
  };

  if (env.nodeEnv === "production") {
    return defineConfig({
      ...commonConfig,
      build: {
        manifest: true,
        rollupOptions: {
          // overwrite default .html entry
          input: "./src/main.tsx",
        },
      },
    });
  }

  return defineConfig({
    ...commonConfig,
    server: {
      port: env.CLIENT_PORT,
    },
    preview: {
      port: env.CLIENT_PORT,
    },
  });
};

// https://vitejs.dev/config/
export default getConfig(process.env);
