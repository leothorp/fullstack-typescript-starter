import { trpc } from "utils/trpc-client";

export function Greeting() {
  const greeting = trpc.api.useQuery({ name: "tRPC user" });
  // const trpc = trpc.

  return <div>{greeting.data?.text}</div>;
}
