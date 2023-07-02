import { InferModel, InferModelFromColumns } from "drizzle-orm";
import { db } from "..";
import { NewLogger, log } from "../schema/log";
import { headers } from "next/headers";
import { PropType } from "@/types/utilityType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const loggerLog = async (
  method: PropType<InferModel<typeof log, "select">, "logProvider">,
  message: string,
  id: string | undefined = undefined
) => {
  const headersList = headers();
  const forwardedfor = headersList.get("x-forwarded-for");
  const userAgent = headersList.get("user-agent");
  const session = await getServerSession(authOptions);
  const data: NewLogger = {
    logProvider: method,
    message: message,
    userId: id || session?.user.id,
    ip: forwardedfor || "NOT FOUND",
    device: userAgent || "NOT FOUND",
  };

  await db.insert(log).values(data);
};
