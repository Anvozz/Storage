"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/drizzle/schema/users";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    header: "ID",
    cell({ row }) {
      return <p>{Number(row.id) + 1}</p>;
    },
  },
  {
    accessorKey: "email",
    header: "อีเมล",
  },
  {
    accessorKey: "firstname",
    header: "ชื่อจริง",
  },
  {
    accessorKey: "lastname",
    header: "นามสกุล",
  },
  {
    accessorKey: "role",
    header: "สิทธื์",
    cell: ({ row }) => {
      const role: string = row.getValue("role");
      const color = role === "admin" ? "" : "bg-green-500 hover:bg-green-300";
      return <Badge className={`${color}`}>{role.toUpperCase()}</Badge>;
    },
  },
  {
    accessorKey: "isActive",
    header: "สถานะการใช้งาน",
  },
];
