// import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
// import { router } from "@server/utils/trpc-server";

// import { apiRouter } from "@server/routers/api";
// import { subRouter } from "@server/routers/sub";
// import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

// //any type to silence "has or is using" TS error
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const appRouter = router({
//   // posts: postsRouter,
//   api: apiRouter,
//   sub: subRouter,
// });

// export type AppRouter = typeof appRouter;

// //TODO(lt): how are these meant to be used?
// export type RouterInput = inferRouterInputs<AppRouter>;
// export type RouterOutput = inferRouterOutputs<AppRouter>;
