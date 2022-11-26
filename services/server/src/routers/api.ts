import { publicProcedure, router } from "utils/trpc-server";
import { z } from "zod";

// type User = {
//   id: string;
//   email: string;
// };

export const apiRouter = router({
  hello: publicProcedure
    .input(z.object({ username: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return {
        text: `hello ${input?.username ?? ctx.user?.name ?? "world"}`,
      };
    }),
  //TODO(lt): vvv add
  // getUserById: t.procedure.input(z.string()).query(({ input }) => {
  //   return users[input]; // input type is string
  // }),
  // createUser: t.procedure
  //   .input(
  //     z.object({
  //       name: z.string().min(3),
  //       bio: z.string().max(142).optional(),
  //     }),
  //   )
  //   .mutation(({ input }) => {
  //     const id = Date.now().toString();
  //     const user: User = { id, ...input };
  //     users[user.id] = user;
  //     return user;
  //   }),
});
