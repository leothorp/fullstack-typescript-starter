import { QueryClientProvider } from "@tanstack/react-query";
import { trpcReactClient, trpc, queryClient } from "@client/utils/trpc-client";
import { Greeting } from "./Greeting";

const App = () => {
  return (
    <trpc.Provider client={trpcReactClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Greeting />
      </QueryClientProvider>
    </trpc.Provider>
  );
};
export default App;
