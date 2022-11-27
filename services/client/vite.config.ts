import { defineConfig, UserConfigExport } from "vite";
// import EnvironmentPlugin from "vite-plugin-environment";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
const envVariablesToForward: string[] = [
  "NODE_ENV",
  "API_ORIGIN",
  "CLIENT_ORIGIN",
  "API_PREFIX",
];
const pullValuesFromEnv = (keys, env) => {
  return keys.reduce((acc, curr) => {
    acc[`process.env.${curr}`] = JSON.stringify(env[curr]);
    return acc;
  }, {});
};

const getConfig = (env) => {
  // any process.env values desired for use on the frontend must be specified here
  const define = pullValuesFromEnv(envVariablesToForward, env);
  console.log(define, "define");
  const commonConfig: UserConfigExport = {
    define,
    plugins: [
      //we are already using dotenv cli to load env variables,
      //so { loadEnvFiles: false } is used to disable EnvironmentPlugin's own .env file support
      // EnvironmentPlugin(envVariablesToForward, { loadEnvFiles: false }),
      tsconfigPaths(),
      react(),
    ],
  };

  if (env.nodeEnv === "production") {
    return defineConfig({
      ...commonConfig,
      optimizeDeps: {
        force: true,
      },
      build: {
        sourcemap: true,
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
