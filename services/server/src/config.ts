import { PORT, isDevelopment } from "@utilities/constants";

export interface ServerOptions {
  dev: boolean;
  port: number;
  prefix: string;
}
export const serverConfig: ServerOptions = {
  dev: isDevelopment,
  port: PORT,
  prefix: "/api",
};
