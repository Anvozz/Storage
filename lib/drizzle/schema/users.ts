import { InferModel, relations } from "drizzle-orm";
import { text, timestamp, pgTable, uuid, boolean } from "drizzle-orm/pg-core";
import { log } from "./log";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  tel: text("tel").notNull(),
  isActive: boolean("isActive").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role").$type<"admin" | "user">().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(user, ({ many }) => ({
  log: many(log),
}));

export type User = InferModel<typeof user, "select">;
export type NewUser = InferModel<typeof user, "insert">;
