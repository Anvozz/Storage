import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ViewEditUserForm from "./form";
import { getUserbyid } from "./action";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const user = await getUserbyid(params.slug);
  return (
    <>
      <Card className="w-96">
        <CardHeader>
          <div className="flex space-x-2 items-center">
            <div className="hover:bg-slate-100 rounded-full p-1">
              <Link href={"/manage-user"}>
                <MoveLeft />
              </Link>
            </div>
            <h1 className="text-md font-bold">โปรไฟล์ผู้ใช้</h1>
          </div>
        </CardHeader>
        <CardContent>
          <ViewEditUserForm data={user} />
        </CardContent>
      </Card>
    </>
  );
}
