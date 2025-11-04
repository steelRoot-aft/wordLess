import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userExists = await prisma.user.findUnique({
        where: { email: user.email! },
      });

      if (!userExists) {
        await prisma.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            avatar: user.image!,
          },
        });
      }

      return true;
    },
    async session({ session, token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user?.email! },
      });

      if (dbUser) {
        session.user = {
          ...session.user,
          coins: dbUser.coins,
          wins: dbUser.wins,
          losses: dbUser.losses,
          games: dbUser.games,
          score: dbUser.score,
          avatar: dbUser.avatar,
          name: dbUser.name,
          email: dbUser.email,
        };
      }

      return session;
    },
  },
};
