import { isDevelopment, API_PREFIX } from "@utilities/shared-constants";

export interface ServerOptions {
  dev: boolean;
  port: number;
  prefix: string;
}
export const serverConfig: ServerOptions = {
  dev: isDevelopment,
  port: Number(process.env.PORT),
  prefix: API_PREFIX,
};
