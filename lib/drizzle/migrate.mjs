import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

console.clear();

const sql = postgres(
  process.env.DRIZZLE_CONNECTION_STRING ||
    "postgres://postgres:xVz99!axzLoz@localhost:5432/Storagenext",
  { max: 1 }
);
const db = drizzle(sql);

await migrate(db, { migrationsFolder: "drizzle" });

console.log("Database : migrate successfully.");

process.exit();
