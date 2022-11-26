import { API_PORT } from "@utilities/constants";
console.log(typeof API_PORT, API_PORT);

export interface ServerOptions {
  dev: boolean;
  port: number;
  prefix: string;
}
export const serverConfig: ServerOptions = {
  dev: false,
  port: API_PORT,
  prefix: "/api",
};
