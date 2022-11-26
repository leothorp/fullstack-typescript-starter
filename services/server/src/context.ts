import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export interface User {
  name: string | string[];
}

export function createContext({ req, res }: CreateFastifyContextOptions) {
  //TODO(lt): grab from DB based on auth header/token
  const user: User = { name: req.headers["username"] ?? "anonymous" };

  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
