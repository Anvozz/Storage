"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/lib/drizzle/schema/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { z } from "zod";
import { deleteUser } from "../actions";
import { useRouter } from "next/navigation";
import { updateUser } from "./action";

export const editUserschema = z.object({
  id: z.string(),
  firstname: z.string().max(30).min(4),
  lastname: z.string().max(30).min(4),
  tel: z.string().min(10),
  role: z.string(),
  email: z.string().email(),
  isActive: z.string(),
  password: z.string(),
});

type UserPropsType = {
  data: User;
};

export default function ViewEditUserForm({ data }: UserPropsType) {
  const router = useRouter();
  const form = useForm<z.infer<typeof editUserschema>>({
    resolver: zodResolver(editUserschema),
    defaultValues: {
      id: data?.id || "",
      firstname: data?.firstname || "",
      lastname: data?.lastname || "",
      tel: data?.tel || "",
      role: data?.role || "",
      email: data?.email || "",
      isActive: data?.isActive ? "true" : "false" || "false",
      password: "",
    },
  });
  /** Delete User function */
  async function onDelete() {
    Swal.fire({
      title: `ยืนยันการลบผู้ใช้ ${data.firstname} ${data.lastname} ?`,
      text: "กดยืนยันเพื่อลบผู้ใช้นี้",
      icon: "info",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "#000",
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#8f8f8f",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        const deleteUsers = await deleteUser(data.id);
        if (deleteUsers.success) {
          Swal.fire({
            title: deleteUsers.messgae,
            text: "กดยืนยันเพื่อปิดหน้าต่างนี้",
            icon: "success",
            confirmButtonText: "ยืนยัน",
            confirmButtonColor: "#000",
          }).then(async (res) => {
            if (res.isConfirmed) {
              router.push("/manage-user");
            }
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
  }
  async function onSubmit(values: z.infer<typeof editUserschema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    Swal.fire({
      title: `ยืนยันการแก้ไขผู้ใช้ ${data.firstname} ${data.lastname} ?`,
      text: "กดยืนยันเพื่อแก้ไขผู้ใช้นี้",
      icon: "info",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "#000",
      cancelButtonText: "ยกเลิก",
      cancelButtonColor: "#8f8f8f",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        const updateUsers = await updateUser(values, data.id);
        if (updateUsers.success) {
          Swal.fire({
            title: updateUsers.messgae,
            text: "กดยืนยันเพื่อปิดหน้าต่างนี้",
            icon: "success",
            confirmButtonText: "ยืนยัน",
            confirmButtonColor: "#000",
          }).then(async (res) => {
            if (res.isConfirmed) {
              router.push("/manage-user");
            }
          });
        } else {
          Swal.fire({
            title: updateUsers.messgae,
            text: "กดยืนยันเพื่อปิดหน้าต่างนี้",
            icon: "error",
            confirmButtonText: "ยืนยัน",
            confirmButtonColor: "#000",
          });
        }
      }
    });
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ไอดี</FormLabel>
                <FormControl>
                  <Input disabled={true} {...field} />
                </FormControl>
                {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อจริง</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>นามสกุล</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>อีเมลล์</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>รหัสผ่าน</FormLabel>
                <FormControl>
                  <Input type="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>สถานะการใช้งาน</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">ใช้งาน</SelectItem>
                    <SelectItem value="false">ไม่ได้ใช้งาน</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>สิทธิ์</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">แอดมิน</SelectItem>
                    <SelectItem value="user">ผู้ใช้</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">แก้ไขผู้ใช้</Button>
          <Button
            onClick={onDelete}
            type="button"
            className="ml-2 bg-red-500 hover:bg-red-400"
          >
            ลบผู้ใช้
          </Button>
        </form>
      </Form>
    </>
  );
}
