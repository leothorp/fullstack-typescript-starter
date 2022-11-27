import { isDevelopment, API_PREFIX } from "@utilities/shared-constants";

export interface ServerOptions {
  dev: boolean;
  port: number;
  prefix: string;
}

console.log(process.env);
export const serverConfig: ServerOptions = {
  dev: isDevelopment,
  port: Number(process.env.PORT),
  prefix: API_PREFIX,
};
