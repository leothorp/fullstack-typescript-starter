/* eslint-disable @typescript-eslint/no-unused-vars */
import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";

const initializeDB = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    forceUtcTimezone: true,
    entities: ["./dist/entities"], // path to our JS entities (dist), relative to `baseDir`
    entitiesTs: ["./src/entities"], // path to our TS entities (src), relative to `baseDir`
    // dbName: "my-db-name",
    type: "postgresql",
    clientUrl: "placeholder",
  });
};

export { initializeDB };
