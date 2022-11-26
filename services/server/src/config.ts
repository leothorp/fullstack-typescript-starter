export interface ServerOptions {
  dev: boolean;
  port: number;
  prefix: string;
}
export const serverConfig: ServerOptions = {
  dev: false,
  port: 5000,
  prefix: "/api",
};
