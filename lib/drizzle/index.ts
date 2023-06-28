import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(
  process.env.DRIZZLE_CONNECTION_STRING ||
    "postgres://postgres:xVz99!axzLoz@localhost:5432/Storagenext"
);
export const db: PostgresJsDatabase = drizzle(queryClient);
