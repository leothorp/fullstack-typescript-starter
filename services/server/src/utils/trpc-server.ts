import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = ({}: CreateExpressContextOptions) => ({}); // no context
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
