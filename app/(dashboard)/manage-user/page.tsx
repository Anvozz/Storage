import { db } from "@/lib/drizzle";
import { User, user } from "@/lib/drizzle/schema/users";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import AddUserForm from "./add-user-form";

export const metadata = {
  title: "Storage | จัดการผู้ใช้",
};

async function getData() {
  const users = db.select().from(user);
  return users;
}

export default async function ManageUser() {
  const users: User[] = await getData();
  return (
    <>
      <div className="py-2">
        <AddUserForm />
      </div>
      <DataTable columns={columns} data={users} />
    </>
  );
}
