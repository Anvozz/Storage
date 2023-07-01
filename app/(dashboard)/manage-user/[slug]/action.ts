"use server";

import { db } from "@/lib/drizzle";
import { user } from "@/lib/drizzle/schema/users";
import { eq } from "drizzle-orm";
import { editUserschema } from "./form";
import { z } from "zod";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import * as bcrypt from "bcrypt";

export async function getUserbyid(id: string) {
  const userbyId = await db.select().from(user).where(eq(user.id, id));
  if (!userbyId) throw new Error("User not found");
  return userbyId[0];
}

export async function updateUser(
  data: z.infer<typeof editUserschema>,
  id: string
) {
  if (!id)
    return {
      success: false,
      message: "ไม่พบไอดี",
    };
  const userinDb = await db.select().from(user).where(eq(user.id, id));
  if (userinDb.length <= 0)
    return {
      success: false,
      message: "ไม่พบไอดีของผู้ใช้ในฐานข้อมูล",
    };
  /** Set value section */
  let newData: any = data;
  if (data.password === "") {
    newData = _.omit(newData, ["password"]);
  } else {
    newData.password = bcrypt.hashSync(newData.password, 10);
  }
  newData.isActive = newData.isActive === "true" ? true : false;
  newData = _.omit(newData, ["id"]);
  /** End Set value section */
  await db.update(user).set(newData).where(eq(user.id, id));
  revalidatePath("/manage-user");
  return {
    success: true,
    messgae: "แก้ไขผู้ใช้งานสำเร็จ",
  };
}
