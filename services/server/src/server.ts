import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter } from "router";
import { createContext } from "context";
import { ServerOptions } from "config";
import cors from "@fastify/cors";
import { CLIENT_ORIGIN } from "@utilities/shared-constants";

export function createServer(opts: ServerOptions) {
  const { dev, port, prefix } = opts;

  const server = fastify({ logger: dev });
  server.register(cors, { origin: CLIENT_ORIGIN });
  server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  server.get("/healthz", {
    handler: (req, resp) => {
      resp.send({});
    },
  });

  const stop = () => server.close();
  const start = async () => {
    try {
      await server.listen(port);
      console.log("listening on port", port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}
