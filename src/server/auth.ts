import { PrismaAdapter } from "@next-auth/prisma-adapter";
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
console.log('process.env.GOOGLE_CLIENT_ID',process.env.GOOGLE_CLIENT_ID);
console.log('process.env.GOOGLE_CLIENT_SECERET',process.env.GOOGLE_CLIENT_SECERET);

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECERET as string,
    }),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", 
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      console.log('token', token);
      return token;
    },
    session: async ({ session, token }) => {
      const userId = token.sub;
      const userExists =(await db.user.findUnique({ where: { id: userId } })) || {};
      console.log('userExists', userExists);
      session.user = {
        ...session.user,
        ...userExists,
        // @ts-expect-error
        id: token.sub,
        // @ts-expect-error
        username: token?.user?.username || token?.user?.gh_username,
      };
      console.log('session', session);

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`: undefined,
        secure: VERCEL_DEPLOYMENT,
      },
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