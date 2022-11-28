import { createTRPCReact } from "@trpc/react-query";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { API_ORIGIN, API_PREFIX } from "@utilities/shared-constants";
import { QueryClient } from "@tanstack/react-query";
//TODO(lt):auto-imports not working again
//TODO(lt): vvv fix these aliases for auto-import
import type { AppRouter } from "@server/server";

//https://blog.logrocket.com/build-full-stack-typescript-app-trpc-react/

export const trpc = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();

export const trpcReactClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: API_ORIGIN + API_PREFIX,
      //TODO(lt):
      // headers() {
      //   return {
      //     authorization: getAuthCookie(),
      //   };
      // },
    }),
  ],
});

//used for requests outside of a React component context (just login currently)
export const trpcVanillaClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: API_ORIGIN + API_PREFIX,
    }),
  ],
});
