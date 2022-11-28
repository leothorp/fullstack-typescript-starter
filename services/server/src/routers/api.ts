// import { publicProcedure, router } from "@server/utils/trpc-server";
import { publicProcedure, router } from "@server/utils/trpc-server";
import { TRPCError } from "@trpc/server";
import { verifyGoogleIdToken } from "@server/utils/server-utils";
import { z } from "zod";

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
        //TODO(lt): vvv what happens for not found?
        let existingUser;
        const getUserResponse = await queries.getUserByEmail(email);
        console.log(getUserResponse.users);
        if (getUserResponse.errors) {
          throw getUserResponse.errors[0].message;
        }
        existingUser = getUserResponse.data.users[0];
        console.log("existence check: ", existingUser);
        if (!existingUser) {
          console.log("creating: ");

          const createUserResponse = await queries.createUser(
            email,
            googleUserId
          );
          if (createUserResponse.errors) {
            throw createUserResponse.errors[0].message;
          }
          existingUser = createUserResponse.data.insert_users_one;
        }

        if (existingUser.googleUserId !== googleUserId) {
          throw new Error("Google user id does not match.");
        }
        console.log(existingUser);
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
