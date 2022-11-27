import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter } from "@server/router";
import { createContext } from "@server/context";
import { ServerOptions } from "@server/config";
import cors from "@fastify/cors";
import middie from "@fastify/middie";
import { CLIENT_ORIGIN } from "@utilities/shared-constants";
import { RequestContext } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";

// const requestDbContextMiddleware = (req, res, next) => {
//   RequestContext.create(orm.em, next);
// }

export const createServer = async (opts: ServerOptions, orm: MikroORM) => {
  const { dev, port, prefix } = opts;

  const server = fastify({ logger: dev });
  server.register(cors, { origin: CLIENT_ORIGIN });
  server.register(middie);

  server
    .register(fastifyTRPCPlugin, {
      prefix,
      trpcOptions: { router: appRouter, createContext },
    })
    .use((req, res, next) => {
      console.log("dbconn");
      RequestContext.create(orm.em, next);
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
