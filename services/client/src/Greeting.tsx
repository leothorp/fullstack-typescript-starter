import { trpc } from "@client/utils/trpc-client";
export function Greeting() {
  const greeting = trpc.api.hello.useQuery({ username: "User" });

  return <div>{greeting.data?.text}</div>;
}
