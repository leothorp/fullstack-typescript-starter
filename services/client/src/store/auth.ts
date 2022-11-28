import { createImmerStore } from "@client/store/storeUtils";
import { trpcVanillaClient } from "@client/utils/trpc-client";
import { loadGoogleSignInScript } from "@client/utils/utils";
import { GOOGLE_CLIENT_ID } from "@utilities/shared-constants";
// import jwt_decode from "jwt-decode";

interface User {
  email: string;
  id: number;
}

interface AuthStore {
  token: string | null;
  currentUser: User | null;
  googleSignInInitialized: boolean;
  setSignInInitialized: () => void;
  initGoogleSignIn: () => void;
  loginComplete: (token: string, currentUser: User) => void;
}

export const useAuthStore = createImmerStore<AuthStore>((set, get) => ({
  token: null,
  currentUser: null,
  googleSignInInitialized: false,
  loginComplete: (token: string, currentUser: User) =>
    set({ token, currentUser }),
  setSignInInitialized: () => set({ googleSignInInitialized: true }),
  initGoogleSignIn: async () => {
    await loadGoogleSignInScript();
    window.google.accounts.id.disableAutoSelect();
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      auto_select: false,
      callback: async ({ credential: idToken }) => {
        //now that they have authenticated with google, log into our own backend
        const resp: { accessToken: string; id: number; email: string } =
          await trpcVanillaClient.api.googleLogin.mutate({ idToken });
        get().loginComplete(resp.accessToken, {
          email: resp.email,
          id: resp.id,
        });
      },
    });

    get().setSignInInitialized();
  },
}));

// export const loadGoogleAuth = async () => {
//       await loadGoogleSignInScript(() => {
//         //TODO(lt): vvv revisit one tap
//         dispatch(initGoogleSignIn(false));
//         // dispatch(initGoogleSignIn(auto_select));
//       });
//   };
