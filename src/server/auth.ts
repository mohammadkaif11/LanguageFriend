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

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECERET ?? "",
    })
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
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
        domain: VERCEL_DEPLOYMENT? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`: undefined,
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
      // const userId = token.sub;
      // const userExists =(await prisma.user.findUnique({ where: { id: userId } })) || {};
      // const googleAdsCredentials = await prisma.userGoogleCredentials.findMany({
      //   where: { userId: token.sub },
      // });

      // if (googleAdsCredentials.length > 0) {
      //   session.user = {
      //     ...session.user,
      //     ...userExists,
      //     // @ts-expect-error
      //     id: token.sub,
      //     // @ts-expect-error
      //     username: token?.user?.username || token?.user?.gh_username,
      //     googleRefreshToken: googleAdsCredentials[0].refreshToken,
      //     googleEmail: googleAdsCredentials[0].userGoogleEmail,
      //   };
      // } else {
      //   session.user = {
      //     ...session.user,
      //     ...userExists,
      //     // @ts-expect-error
      //     id: token.sub,
      //     // @ts-expect-error
      //     username: token?.user?.username || token?.user?.gh_username,
      //     googleRefreshToken: null,
      //     googleEmail: null,
      //   };
      // }
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