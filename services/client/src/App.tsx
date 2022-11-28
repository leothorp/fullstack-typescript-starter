import { QueryClientProvider } from "@tanstack/react-query";
import { trpcReactClient, trpc, queryClient } from "@client/utils/trpc-client";
import { GoogleSignInButton } from "./GoogleSignInButton";
const App = () => {
  return (
    <trpc.Provider client={trpcReactClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <GoogleSignInButton />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
export default App;
