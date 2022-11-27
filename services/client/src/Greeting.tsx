import { trpc } from "utils/trpc-client";
export function Greeting() {
  const greeting = trpc.api.hello.useQuery({ username: "Leo" });

  return <div>{greeting.data?.text}</div>;
}