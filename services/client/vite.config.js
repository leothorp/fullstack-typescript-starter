var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
import { defineConfig } from "vite";
// import EnvironmentPlugin from "vite-plugin-environment";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
var envVariablesToForward = [
  "NODE_ENV",
  "API_ORIGIN",
  "CLIENT_ORIGIN",
  "API_PREFIX",
];
var pullValuesFromEnv = function (keys, env) {
  return keys.reduce(function (acc, curr) {
    acc["process.env.".concat(curr)] = JSON.stringify(env[curr]);
    return acc;
  }, {});
};
var getConfig = function (env) {
  // any process.env values desired for use on the frontend must be specified here
  var define = pullValuesFromEnv(envVariablesToForward, env);
  console.log(define, "define");
  var commonConfig = {
    define: define,
    plugins: [
      //we are already using dotenv cli to load env variables,
      //so { loadEnvFiles: false } is used to disable EnvironmentPlugin's own .env file support
      // EnvironmentPlugin(envVariablesToForward, { loadEnvFiles: false }),
      tsconfigPaths(),
      react(),
    ],
  };
  if (env.nodeEnv === "production") {
    return defineConfig(
      __assign(__assign({}, commonConfig), {
        optimizeDeps: {
          force: true,
        },
        build: {
          sourcemap: true,
          manifest: true,
          outDir: "/dist",
          rollupOptions: {
            // overwrite default .html entry
            input: "./src/main.tsx",
          },
        },
      })
    );
  }
  return defineConfig(
    __assign(__assign({}, commonConfig), {
      server: {
        port: 3000,
      },
      preview: {
        port: 3000,
      },
    })
  );
};
// https://vitejs.dev/config/
export default getConfig(process.env);
