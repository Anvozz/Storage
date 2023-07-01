"use server";

import { db } from "@/lib/drizzle";
import { user } from "@/lib/drizzle/schema/users";
import { eq } from "drizzle-orm";

export async function getUserbyid(id: string) {
  const userbyId = await db.select().from(user).where(eq(user.id, id));
  if (!userbyId) throw new Error("User not found");
  return userbyId[0];
}
