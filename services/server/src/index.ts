// import "module-alias/register";
// import { serverConfig } from "@server/config";
import "reflect-metadata";
import { serverConfig } from "@server/config";
import { createServer } from "@server/server";

const init = async () => {
  const server = createServer(serverConfig);

  server.start();
};

init();
