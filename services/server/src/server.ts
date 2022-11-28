import { ServerOptions } from "@server/config";
import cors from "cors";
import { CLIENT_ORIGIN } from "@utilities/shared-constants";
import { createContext, router } from "@server/utils/trpc-server";
import express from "express";
import { apiRouter } from "@server/routers/api";
import { subRouter } from "@server/routers/sub";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { IncomingMessage, Server, ServerResponse } from "http";

const appRouter = router({
  api: apiRouter,
  sub: subRouter,
});

export type AppRouter = typeof appRouter;

//TODO(lt): how are these meant to be used?
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;

export const createServer: (opts: ServerOptions) => {
  server: Express.Application;
  start: () => Promise<Server<typeof IncomingMessage, typeof ServerResponse>>;
} = (opts: ServerOptions) => {
  const { port, prefix } = opts;

  const app = express();
  app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));

  app.use(
    prefix,
    createExpressMiddleware({
      router: appRouter,
      createContext: createContext,
    })
  );

  //TODO(lt): check if db connection is happening for this too
  app.get("/healthz", (req, res) => {
    res.sendStatus(200);
  });

  //TODO(lt): graceful handle sigterm with this + close DB connection
  const start = async () => {
    const server = app.listen({ port });
    console.log("Server ready. listening on port:", port);
    return server;
  };

  return { server: app, start };
};
