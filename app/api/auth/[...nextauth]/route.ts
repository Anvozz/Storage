import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Credential", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();
        const cookieStore = cookies();
        /** Set Authentication Cookie */
        cookieStore.set("Authentication", user.accessToken, {
          httpOnly: true,
          expires: new Date(user.expires),
        });
        if (res.ok && user) {
          // console.log(res.ok, user);
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account, profile }) {
      // console.log(
      //   "Token =>",
      //   token,
      //   "User =>",
      //   user,
      //   "Account =>",
      //   account,
      //   "Profile =>",
      //   profile
      // );
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.isActive = user.isActive;
        token.tel = user.tel;
        token.usergroup = user.usergroup;
      }
      return token;
    },
    session({ user, session, token }) {
      // console.log(token);
      if (token && session) {
        session.user.id = token.id;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.email = token.email;
        session.user.tel = token.tel;
        session.user.isActive = token.isActive;
        session.user.usergroup = token.usergroup;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signIn",
  },
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
