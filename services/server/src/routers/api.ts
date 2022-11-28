// import { publicProcedure, router } from "@server/utils/trpc-server";
import { publicProcedure, router } from "@server/utils/trpc-server";
import { TRPCError } from "@trpc/server";
import { verifyGoogleIdToken } from "@server/utils/server-utils";
import { z } from "zod";
import { createUser, getUserByEmail } from "@server/database/queries";

// type User = {
//   id: string;
//   email: string;
// };

export const apiRouter = router({
  hello: publicProcedure
    .input(z.object({ username: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        text: `hello ${input?.username}`,
      };
    }),
  //TODO(lt): error handling
  googleLogin: publicProcedure
    .input(z.object({ idToken: z.string() }))
    .mutation(async ({ input: { idToken } }) => {
      //TODO(lt): WIP, pulled from microtask

      if (!idToken) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid Google id token.",
        });
      }
      try {
        const { googleUserId, email } = await verifyGoogleIdToken(idToken);

        const existingUser = await getUserByEmail(email);

        let user;
        if (!existingUser) {
          console.log("creating new user: ");
          const newUser = await createUser({ email, googleUserId });
          user = newUser;
        } else {
          console.log("existing user found: ");
          if (existingUser.googleUserId !== googleUserId) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Google user id does not match.",
            });
          }
          user = existingUser;
        }

        const accessToken = await generateAccessToken(
          existingUser.id,
          existingUser.email
        );
        const result = {
          accessToken,
          id: existingUser.id,
          email: existingUser.email,
        };
        console.log("final result: ", result);
        res.json(result);

        //1. lookup user by email
        //2. if not exists:
        //    - create user
        //3. if exists:
        //    - verify google user id

        //4. generate/return token
      } catch (e) {
        console.error("error during google auth", e);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid Google id token.",
        });
      }
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
