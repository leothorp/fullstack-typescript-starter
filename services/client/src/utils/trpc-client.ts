import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import { API_ORIGIN, API_PREFIX } from "@utilities/shared-constants";
import { QueryClient } from "@tanstack/react-query";

//TODO(lt): vvv fix these aliases for auto-import
import { AppRouter } from "@server/router";
export const trpcReact = createTRPCReact<AppRouter>();

export const queryClient = new QueryClient();
export const trpcClient = 
  trpcReact.createClient({
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
  })
)
