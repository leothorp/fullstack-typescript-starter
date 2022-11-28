// import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "@server/utils/trpc-server";

import { apiRouter } from "@server/routers/api";
import { subRouter } from "@server/routers/sub";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = router({
  // posts: postsRouter,
  api: apiRouter,
  sub: subRouter,
});

export type AppRouter = typeof appRouter;

//TODO(lt): how are these meant to be used?
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
