import { trpc } from "utils/trpc-client";

export function Greeting() {
  const greeting = trpc.api.hello.useQuery({ username: "tRPC user" });
  // const trpc = trpc.

  return <div>{greeting.data?.text}</div>;
}
