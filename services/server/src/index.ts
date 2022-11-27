// import "module-alias/register";
// import { serverConfig } from "@server/config";
import "reflect-metadata";
import { serverConfig } from "@server/config";
import { initializeDB } from "@server/_old_mikorm_database/db";
import { createServer } from "@server/server";

const init = async () => {
  const orm = await initializeDB();
  const server = await createServer(serverConfig, orm);

  server.start();
};

init();
