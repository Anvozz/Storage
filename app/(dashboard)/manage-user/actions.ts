"use server";

import { z } from "zod";
import { addUserschema } from "./add-user-form";
import { db } from "@/lib/drizzle";
import { NewUser, user } from "@/lib/drizzle/schema/users";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteUser(id: string) {
  const isHaveuser = await db.select().from(user).where(eq(user.id, id));
  if (!isHaveuser)
    return {
      success: false,
      messgae: "ไม่มีผู้ใช้ในระบบ",
    };
  await db.delete(user).where(eq(user.id, id));
  revalidatePath("/manage-user");
  return {
    success: true,
    messgae: "ลบผู้ใช้งานสำเร็จ",
  };
}

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
  revalidatePath("/manage-user");
  return {
    success: true,
    messgae: "สร้างผู้ใช้งานสำเร็จ",
  };
}
