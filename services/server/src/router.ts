// import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "utils/trpc-server";
import { apiRouter } from "routers/api";
// import { postsRouter } from "routers/posts";
import { subRouter } from "routers/sub";

export const appRouter = router({
  // posts: postsRouter,
  api: apiRouter,
  sub: subRouter,
});

export type AppRouter = typeof appRouter;
// type RouterInput = inferRouterInputs<AppRouter>;
// type RouterOutput = inferRouterOutputs<AppRouter>;
