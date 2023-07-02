"use server";

import { z } from "zod";
import { addUserschema } from "./add-user-form";
import { db } from "@/lib/drizzle";
import { NewUser, user } from "@/lib/drizzle/schema/users";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { loggerLog } from "@/lib/drizzle/global/logger";

export async function deleteUser(id: string) {
  const session = await getServerSession(authOptions);
  const isHaveuser = await db.select().from(user).where(eq(user.id, id));
  if (!isHaveuser)
    return {
      success: false,
      messgae: "ไม่มีผู้ใช้ในระบบ",
    };
  await db.delete(user).where(eq(user.id, id));
  await loggerLog(
    "USER_MANAGE",
    `${session?.user.firstname} ${session?.user.lastname} ได้ทำการลบผู้ใช้ ${isHaveuser[0].firstname} ${isHaveuser[0].lastname}`
  );
  revalidatePath("/manage-user");
  return {
    success: true,
    messgae: "ลบผู้ใช้งานสำเร็จ",
  };
}

export async function addUser(data: z.infer<typeof addUserschema>) {
  const session = await getServerSession(authOptions);
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
  await loggerLog(
    "USER_MANAGE",
    `${session?.user.firstname} ${session?.user.lastname} ได้ทำการเพิ่มผู้ใช้`,
    {
      data: data,
    }
  );
  revalidatePath("/manage-user");
  return {
    success: true,
    messgae: "สร้างผู้ใช้งานสำเร็จ",
  };
}
