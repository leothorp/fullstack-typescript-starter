// import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "@server/utils/trpc-server";

import { apiRouter } from "@server/routers/api";
import { subRouter } from "@server/routers/sub";

export const appRouter = router({
  // posts: postsRouter,
  api: apiRouter,
  sub: subRouter,
});

export type AppRouter = typeof appRouter;
// type RouterInput = inferRouterInputs<AppRouter>;
// type RouterOutput = inferRouterOutputs<AppRouter>;
