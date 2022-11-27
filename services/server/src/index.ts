// import "module-alias/register";
// import { serverConfig } from "@server/config";

import { serverConfig } from "@server/config";
import { initializeDB } from "@server/database/db";
import { createServer } from "@server/server";

const init = async () => {
  const orm = await initializeDB();
  const server = await createServer(serverConfig, orm);

  server.start();
};

init();
