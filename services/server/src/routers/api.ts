// import { publicProcedure, router } from "@server/utils/trpc-server";
import {
  protectedProcedure,
  publicProcedure,
  router,
} from "@server/utils/trpc-server";
import { TRPCError } from "@trpc/server";
import {
  verifyGoogleIdToken,
  generateAccessToken,
} from "@server/utils/server-utils";
import { z } from "zod";
import {
  createUser,
  getNotesForUser,
  getUserByEmail,
} from "@server/database/queries";

const LoginOutputSchema = z.object({
  accessToken: z.string(),
  email: z.string().email(),
  id: z.number(),
});

const NotesOutputSchema = z.array(
  z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
  })
);

export const apiRouter = router({
  //TODO(lt): error handling
  googleLogin: publicProcedure
    .input(z.object({ idToken: z.string() }))
    .output(LoginOutputSchema)
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
          console.log("creating new user.");
          const newUser = await createUser({ email, googleUserId });
          user = newUser;
        } else {
          console.log("existing user found.");
          if (existingUser.google_user_id !== googleUserId) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Google user id does not match.",
            });
          }
          user = existingUser;
        }

        const accessToken = await generateAccessToken(user.id, user.email);
        const result = {
          accessToken,
          id: user.id,
          email: user.email,
        };
        return result;
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
  getNotes: protectedProcedure
    .output(NotesOutputSchema)
    .query(async ({ ctx }) => {
      const notes = await getNotesForUser(ctx.user.id);
      return notes;
    }),
});
