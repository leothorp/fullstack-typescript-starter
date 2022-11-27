/* eslint-disable @typescript-eslint/no-unused-vars */
import { Options } from "@mikro-orm/core";
import { User } from "@server/database/entities/user";

const config: Options = {
  entities: [User],

  forceUtcTimezone: true,
  // entities: ["./dist/entities"], // path to our JS entities (dist), relative to `baseDir`
  // entitiesTs: ["./src/entities"], // path to our TS entities (src), relative to `baseDir`
  // dbName: "my-db-name",
  type: "postgresql",
  clientUrl: process.env.DATABASE_URL,
};

export default config;
