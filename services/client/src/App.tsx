import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpcClient, trpcReact } from "@client/utils/trpc-client";
import { Greeting } from "./Greeting";

const queryClient = new QueryClient();

const App = () => {
  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Greeting />
      </QueryClientProvider>
    </trpcReact.Provider>
  );
};
export default App;
