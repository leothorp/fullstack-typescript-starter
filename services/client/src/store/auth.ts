import { createImmerStore } from "@client/store/storeUtils";
import { trpcReactClient, trpcVanillaClient } from "@client/utils/trpc-client";
import { GOOGLE_CLIENT_ID } from "@utilities/shared-constants";
import jwt_decode from "jwt-decode";

interface User {
  email: string;
  id: number;
}

interface AuthStore {
  token: string | null;
  currentUser: User | null;
  googleSignInInitialized: boolean;
}

export const useAuthStore = createImmerStore<AuthStore>((set) => ({
  token: null,
  currentUser: null,
  googleSignInInitialized: false,
  asfasf: "he",
  loginComplete: (token: string, currentUser: User) =>
    set({ token, currentUser }),
    setSignInInitialized: () => set({ googleSignInInitialized: true }),
    initGoogleSignIn: async () => {
        //TODO(lt): vvv have elsewhere, or get rid of if no one-tap?
        window.google.accounts.id.disableAutoSelect();
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          auto_select: false,
            callback: ({ credential: idToken }) => {
                trpcVanillaClient.api.googleLogin.mutate({idToken})
              //TODO(lt): vvv now that they have authenticated with google, log into our own backend
            // dispatch(authActions.googleLogin(credential));
          },
        });

      
        dispatch(googleSignInInitialized());
      };
}));

export const loadGoogleAuth = async () => {
      await loadGoogleSignInScript(() => {
        //TODO(lt): vvv revisit one tap
        dispatch(initGoogleSignIn(false));
        // dispatch(initGoogleSignIn(auto_select));
      });
  };
