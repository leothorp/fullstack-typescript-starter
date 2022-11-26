import { API_PORT, isDevelopment } from "@utilities/constants";

export interface ServerOptions {
  dev: boolean;
  port: number;
  prefix: string;
}
export const serverConfig: ServerOptions = {
  dev: isDevelopment,
  port: API_PORT,
  prefix: "/api",
};
