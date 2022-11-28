/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const NODE_ENV = process.env.NODE_ENV!;
export const isDevelopment = NODE_ENV === "development";
export const isProduction = NODE_ENV === "production";
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN!;
export const API_ORIGIN = process.env.API_ORIGIN!;
export const API_PREFIX = "/api";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
