/* eslint-disable @typescript-eslint/no-unused-vars */
import { MikroORM, PostgreSqlDriver } from "@mikro-orm/postgresql";
import dbConfig from "./mikro-orm.config";
const initializeDB = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>(dbConfig);
  return orm;
};

export { initializeDB };
