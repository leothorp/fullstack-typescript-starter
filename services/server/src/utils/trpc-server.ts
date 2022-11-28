import { getUserById } from "@server/database/queries";
import { validateAccessToken } from "@server/utils/server-utils";
import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = async ({ req }: CreateExpressContextOptions) => {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const userInfo = await validateAccessToken(
        req.headers.authorization.split(" ")[1]
      );
      return userInfo;
    }
    return null;
  }
  const result = await getUserFromHeader();

  const user = result ? await getUserById(result.userId) : null;
  return {
    user,
  };
}; // no context
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

const isAuthorized = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
// you can reuse this for any procedure
export const protectedProcedure = t.procedure.use(isAuthorized);

export const router = t.router;
export const publicProcedure = t.procedure;
