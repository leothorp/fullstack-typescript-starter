import { observable } from "@trpc/server/observable";
import { router, publicProcedure } from "@server/utils/trpc-server";

export const subRouter = router({
  randomNumber: publicProcedure.subscription(() => {
    return observable<{ randomNumber: number }>((emit) => {
      const timer = setInterval(() => {
        emit.next({ randomNumber: Math.random() });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    });
  }),
});
