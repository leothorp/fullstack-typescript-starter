// export interface IProcessEnv {
//   NODE_ENV: string;
//   API_ORIGIN: string;
//   API_PORT: string;
//   CLIENT_ORIGIN: string;
//   CLIENT_PORT?: string;
// }

// declare global {
//   namespace NodeJS {
//     type ProcessEnv = IProcessEnv
//   }
// }
export const NODE_ENV = process.env.NODE_ENV;
export const isDevelopment = NODE_ENV === "development";
export const isProduction = NODE_ENV === "production";

export const API_ORIGIN = process.env.API_ORIGIN;
export const API_PORT = Number(process.env.API_PORT);
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
export const CLIENT_PORT =
  process.env.CLIENT_PORT && Number(process.env.CLIENT_PORT);
