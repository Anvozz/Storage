import { db } from "@/lib/drizzle";
import { User, user } from "@/lib/drizzle/schema/users";
import { cookies } from "next/headers";

export type UserDataTypes = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  tel: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  usergroup: number;
  username: string;
};

async function getData() {
  const users = db.select().from(user);
  return users;
}

export default async function ManageUser() {
  const users: User[] = await getData();
  console.log(users);
  return (
    <div>
      {users.map((e) => {
        return <p key={e.id}>{e.firstname}</p>;
      })}
    </div>
  );
}
