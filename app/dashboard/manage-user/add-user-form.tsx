"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addUser } from "./actions";
import { useState } from "react";
import Swal from "sweetalert2";

export const addUserschema = z.object({
  firstname: z.string().max(30).min(4),
  lastname: z.string().max(30).min(4),
  tel: z.string().min(10),
  role: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function AddUserForm() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof addUserschema>>({
    resolver: zodResolver(addUserschema),
    defaultValues: {
      firstname: "",
      lastname: "",
      tel: "",
      role: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addUserschema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const adduser = await addUser(values);
    if (adduser.success) {
      setOpen(false);
      Swal.fire({
        title: adduser.messgae,
        text: "กดยืนยันเพื่อปิดหน้าต่างนี้",
        icon: "success",
        confirmButtonText: "ยืนยัน",
        confirmButtonColor: "#000",
      });
    } else {
      Swal.fire({
        title: adduser.messgae,
        text: "หน้าต่างนี้จะปิดโดยอัตโนมัติ",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1000,
      });
    }
    console.log(adduser);
  }
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>เพิ่มผู้ใช้</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เพิ่มผู้ใช้</DialogTitle>
          <DialogDescription>กรุณากรอกข้อมูลผู้ใช้ให้ครบถ้วน</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อจริง</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>นามสกุล</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>เบอร์โทรศัพท์</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>อีเมลล์</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รหัสผ่าน</FormLabel>
                  <FormControl>
                    <Input type="Password" {...field} />
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
            <Button type="submit">เพิ่มผู้ใช้</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
