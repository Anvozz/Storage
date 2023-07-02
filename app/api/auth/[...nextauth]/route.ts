import { db } from "@/lib/drizzle";
import { user } from "@/lib/drizzle/schema/users";
import { eq } from "drizzle-orm";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import { loggerLog } from "@/lib/drizzle/global/logger";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Credential", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",
      async authorize(credentials, req) {
        // const res = await fetch("http://localhost:4000/auth/login", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });

        // const user = await res.json();
        // const cookieStore = cookies();
        // /** Set Authentication Cookie */
        // cookieStore.set("Authentication", user.accessToken, {
        //   httpOnly: true,
        //   expires: new Date(user.expires),
        // });
        // if (res.ok && user) {
        //   // console.log(res.ok, user);
        //   return user;
        // }
        if (!credentials?.email) throw new Error("No credential found.");
        if (!credentials?.password) throw new Error("No password found.");
        const users = await db
          .select()
          .from(user)
          .limit(1)
          .where(eq(user.email, credentials?.email));
        const currUser = users[0];
        if (currUser) {
          if (!currUser.password)
            throw new Error("Password user in database not found.");
          const comparePassword = await bcrypt.compare(
            credentials.password,
            currUser.password
          );
          if (comparePassword) {
            await loggerLog(
              "LOGIN",
              `${currUser.firstname} ${currUser.lastname} ได้ทำการเข้าสู่ระบบ`,
              currUser.id
            );
            return currUser;
          }
        } else {
          throw new Error("User not found in database");
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
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
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      // console.log(token);
      if (token && session) {
        session.user.id = token.id;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.email = token.email;
        session.user.tel = token.tel;
        session.user.isActive = token.isActive;
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // console.log(url, baseUrl);
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      // else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
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
