import { InferModel } from "drizzle-orm";
import { text, timestamp, pgTable, uuid, boolean } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstname: text("firstname"),
  lastname: text("lastname"),
  tel: text("tel"),
  isActive: boolean("isActive"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "user">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type User = InferModel<typeof user, "select">;
export type NewUser = InferModel<typeof user, "insert">;
