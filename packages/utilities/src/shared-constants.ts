/* eslint-disable @typescript-eslint/no-namespace */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      API_ORIGIN: string;
      PORT: string;
      CLIENT_ORIGIN: string;
      API_PREFIX: string;
    }
  }
}

export const NODE_ENV = process.env.NODE_ENV;
export const isDevelopment = NODE_ENV === "development";
export const isProduction = NODE_ENV === "production";
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;
export const API_ORIGIN = process.env.API_ORIGIN;
export const API_PREFIX = process.env.API_PREFIX;
export const PORT = Number(process.env.PORT);
