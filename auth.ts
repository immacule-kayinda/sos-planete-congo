import { validateUser } from "@/lib/db";
import prisma from "@/lib/prisma";
import { signInSchema } from "@/lib/zod";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import authConfig from "./auth.config";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    lastValidated?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      ...authConfig,
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);
          const user = await validateUser(email, password);

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          if (error instanceof ZodError) return null;
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
    error: "/signin",
    newUser: "/signUp",
    verifyRequest: "/signin",
  },
  debug: true,
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 jours
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.lastValidated = Math.floor(Date.now() / 1000);
      }

      // Validation périodique (toutes les 5 minutes)
      const now = Math.floor(Date.now() / 1000);
      const lastCheck = token.lastValidated || 0;
      const checkInterval = 5 * 60; // 5 minutes

      if (now - lastCheck > checkInterval) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id },
            select: { id: true, role: true, isActive: true },
          });

          if (!dbUser || !dbUser.isActive) {
            // Utilisateur supprimé ou désactivé
            return null;
          }

          token.role = dbUser.role;
          token.lastValidated = now;
        } catch (error) {
          console.error("Erreur validation token:", error);
          return null;
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!token || !token.id) {
        // Token invalide - vider les données utilisateur
        return {
          ...session,
          user: {
            ...session.user,
            id: "",
            role: undefined,
          },
        };
      }

      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
    async authorized({ auth }) {
      return !!auth;
    },
  },
  trustHost: true,
});
