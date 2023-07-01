"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/drizzle/schema/users";
import { ColumnDef } from "@tanstack/react-table";
import { ClipboardEdit, Contact, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUser } from "./actions";
import Swal from "sweetalert2";
import Link from "next/link";

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
    cell: ({ row }) => {
      const isactive: string = row.getValue("isActive");
      const activeText = isactive ? "เปิดใช้งาน" : "ปิดใช้งาน";
      const color = isactive
        ? "bg-green-500 hover:bg-green-300"
        : "bg-red-500 hover:bg-red-400";
      return <Badge className={`${color}`}>{activeText}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              <ClipboardEdit size={15} /> &nbsp; คัดลอกไอดี
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`manage-user/${user.id}`}>
              <DropdownMenuItem>
                <Contact size={15} /> &nbsp; ดูโปรไฟล์ผู้ใช้งานระบบ{" "}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={async () => {
                Swal.fire({
                  title: `ยืนยันการลบผู้ใช้ ${user.firstname} ${user.lastname} ?`,
                  text: "กดยืนยันเพื่อลบผู้ใช้นี้",
                  icon: "info",
                  confirmButtonText: "ยืนยัน",
                  confirmButtonColor: "#000",
                  cancelButtonText: "ยกเลิก",
                  cancelButtonColor: "#8f8f8f",
                  showCancelButton: true,
                }).then(async (res) => {
                  if (res.isConfirmed) {
                    const deleteUsers = await deleteUser(user.id);
                    if (deleteUsers.success) {
                      Swal.fire({
                        title: deleteUsers.messgae,
                        text: "กดยืนยันเพื่อปิดหน้าต่างนี้",
                        icon: "success",
                        confirmButtonText: "ยืนยัน",
                        confirmButtonColor: "#000",
                      });
                    } else {
                      Swal.fire({
                        title: deleteUsers.messgae,
                        text: "กดยืนยันเพื่อปิดหน้าต่างนี้",
                        icon: "error",
                        confirmButtonText: "ยืนยัน",
                        confirmButtonColor: "#000",
                      });
                    }
                  }
                });
              }}
            >
              <Trash2 size={15} /> &nbsp; ลบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
