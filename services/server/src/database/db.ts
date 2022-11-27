/* eslint-disable @typescript-eslint/no-unused-vars */
import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

const initializeDB = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>({
    forceUtcTimezone: true,
    metadataProvider: TsMorphMetadataProvider,
    // entities: ["./dist/entities"], // path to our JS entities (dist), relative to `baseDir`
    // entitiesTs: ["./src/entities"], // path to our TS entities (src), relative to `baseDir`
    // dbName: "my-db-name",
    type: "postgresql",
    clientUrl: process.env.DATABASE_URL,
  });
  return orm;
};

export { initializeDB };
