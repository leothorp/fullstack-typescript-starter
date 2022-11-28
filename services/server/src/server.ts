import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { createContext } from "@server/context";
import { ServerOptions } from "@server/config";
import cors from "@fastify/cors";
import middie from "@fastify/middie";
import { CLIENT_ORIGIN } from "@utilities/shared-constants";
import { router } from "@server/utils/trpc-server";

import { apiRouter } from "@server/routers/api";
import { subRouter } from "@server/routers/sub";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

//any type to silence "has or is using" TS error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appRouter = router({
  // posts: postsRouter,
  api: apiRouter,
  sub: subRouter,
});

export type AppRouter = typeof appRouter;

//TODO(lt): how are these meant to be used?
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const createServer = async (opts: ServerOptions) => {
  const { dev, port, prefix } = opts;

  const server = fastify({ logger: dev });
  server.register(cors, { origin: CLIENT_ORIGIN });
  server.register(middie);

  server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  //TODO(lt): check if db connection is happening for this too
  server.get("/healthz", {
    handler: (req, resp) => {
      resp.send({});
    },
  });

  //TODO(lt): graceful handle sigterm with this + close DB connection
  const stop = () => server.close();
  const start = async () => {
    try {
      await server.listen({ port });
      console.log("Server ready. listening on port:", port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
};
