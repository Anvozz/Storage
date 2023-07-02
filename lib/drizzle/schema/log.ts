import { json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./users";
import { InferModel, relations } from "drizzle-orm";

export const log = pgTable("log", {
  id: uuid("id").primaryKey().defaultRandom(),
  logProvider: text("log_provider").$type<"USER" | "LOGIN" | "USER_MANAGE">(),
  message: text("message"),
  metadata: json("metadata"),
  ip: text("ip"),
  device: text("device"),
  userId: uuid("user_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const postsRelations = relations(log, ({ one }) => ({
  author: one(user, {
    fields: [log.userId],
    references: [user.id],
  }),
}));

export type Logger = InferModel<typeof log, "select">;
export type NewLogger = InferModel<typeof log, "insert">;
