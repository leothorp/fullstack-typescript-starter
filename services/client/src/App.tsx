import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "utils/trpc-client";
// import { API_ORIGIN } from "@utilities/constants";

import { serverConfig } from "@server/config";
import { Greeting } from "./Greeting";
import { API_ORIGIN, NODE_ENV, API_PORT } from "@utilities/constants";
console.log("in client", API_ORIGIN, NODE_ENV, API_PORT);

const queryClient = new QueryClient();

const App = () => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: API_ORIGIN + serverConfig.prefix,
          //TODO(lt):
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Greeting />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
export default App;
