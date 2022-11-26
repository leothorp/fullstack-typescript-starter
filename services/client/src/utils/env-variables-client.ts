//Vite requires its own env variable constants file, as process.env is replaced buy import.meta.env

export const NODE_ENV = import.meta.env.NODE_ENV;
console.log("vite node env", NODE_ENV);
export const isDevelopment = NODE_ENV === "development";
export const isProduction = NODE_ENV === "production";

export const API_ORIGIN = import.meta.env.API_ORIGIN;
export const API_PORT = Number(import.meta.env.API_PORT);
export const CLIENT_ORIGIN = import.meta.env.CLIENT_ORIGIN;
export const CLIENT_PORT =
  import.meta.env.CLIENT_PORT && Number(import.meta.env.CLIENT_PORT);
