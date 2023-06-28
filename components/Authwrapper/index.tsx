"use client";
import { SessionProvider } from "next-auth/react";

type AuthWrapper = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapper) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
};

export default AuthWrapper;
