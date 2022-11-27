// import "module-alias/register";
// import { serverConfig } from "@server/config";

import { serverConfig } from "@server/config";
import { createServer } from "@server/server";

const server = createServer(serverConfig);

server.start();
