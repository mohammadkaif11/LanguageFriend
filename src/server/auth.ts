import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Session } from "@prisma/client";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: "471571752403-c4mpukjj4gssk7e4fcnfalq883si1s97.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", 
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      const userId = token.sub;
      const userExists =(await db.user.findUnique({ where: { id: userId } })) || {};
      session.user = {
        ...session.user,
        ...userExists,
        // @ts-expect-error
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      return session;
    },
  },
};

export interface UserSessionInterface {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  } | null;
  expires:string;

}

// Assuming `getServerAuthSession` returns a Promise of SessionInterface
export const getServerAuthSession = (): Promise<UserSessionInterface | null> => getServerSession(authOptions);