export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-2 mx-auto">
      <h1 className="font-bold tracking-tight text-3xl">จัดการผู้ใช้</h1>
      <p className="text-lg text-muted-foreground">จัดการผู้ใช้ในระบบ</p>
      {children}
    </div>
  );
}
