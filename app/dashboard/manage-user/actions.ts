"use server";

import { z } from "zod";
import { addUserschema } from "./add-user-form";
import { db } from "@/lib/drizzle";
import { NewUser, user } from "@/lib/drizzle/schema/users";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function addUser(data: z.infer<typeof addUserschema>) {
  const isDuplicate = await db
    .select()
    .from(user)
    .where(eq(user.email, data.email));
  /** Check duplicate email */
  if (isDuplicate.length > 0)
    return {
      success: false,
      messgae: "อีเมลล์ซ้ำในระบบ",
    };
  data.password = bcrypt.hashSync(data.password, 10);
  const result = await db
    .insert(user)
    .values({ ...data, isActive: false } as NewUser);
  revalidatePath("/dashboard/manage-user");
  return {
    success: true,
    messgae: "สร้างผู้ใช้งานสำเร็จ",
  };
}
