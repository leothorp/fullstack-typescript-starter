import { createTRPCReact } from "@trpc/react-query";
//TODO(lt): vvv fix these aliases for auto-import
import { AppRouter } from "@server/router";

export const trpc = createTRPCReact<AppRouter>();
