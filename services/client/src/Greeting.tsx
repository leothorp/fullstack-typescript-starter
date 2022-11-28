import { trpcReact } from "@client/utils/trpc-client";
export function Greeting() {
  const greeting = trpcReact.api.hello.useQuery({ username: "User" });

  return <div>{greeting.data?.text}</div>;
}
