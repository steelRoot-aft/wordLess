import z from "zod";
import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";

export const bonusRouter = router({
  openFirst: protectedProcedure
    .input(
      z.object({
        word: z.string(),
        alreadyOpened: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      const { word, alreadyOpened } = input;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const firstChar = word[0];
      if (alreadyOpened.includes(firstChar)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This letter has already been opened",
        });
      }

      const price = 25;

      const failed = user.coins < price;
      if (failed) {
        throw new TRPCError({
          code: "PAYMENT_REQUIRED",
          message: "Not enough coins",
        });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          coins: user.coins - price,
        },
      });

      user.coins -= price;

      return {
        success: true,
        bonusChar: firstChar,
        coins: user.coins,
      };
    }),

  openLast: protectedProcedure
    .input(z.object({ word: z.string(), alreadyOpened: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      const { word, alreadyOpened } = input;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const lastChar = word[word.length - 1];
      if (alreadyOpened.includes(lastChar)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This letter has already been opened",
        });
      }

      const price = 15;

      const failed = user.coins < price;
      if (failed) {
        throw new TRPCError({
          code: "PAYMENT_REQUIRED",
          message: "Not enough coins",
        });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          coins: user.coins - price,
        },
      });

      user.coins -= price;

      return {
        success: true,
        bonusChar: word[word.length - 1],
        coins: user.coins,
      };
    }),

  openAll: protectedProcedure
    .input(z.object({ word: z.string(), alreadyOpened: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      const { word, alreadyOpened } = input;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const wordLetters = word.split("");
      const allLettersOpened = wordLetters.every((letter) =>
        alreadyOpened.includes(letter),
      );

      if (allLettersOpened) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "All letters are already opened",
        });
      }

      const price = 55;

      const failed = user.coins < price;
      if (failed) {
        throw new TRPCError({
          code: "PAYMENT_REQUIRED",
          message: "Not enough coins",
        });
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          coins: user.coins - price,
        },
      });

      user.coins -= price;

      return {
        success: true,
        bonusChar: word.split(""),
        coins: user.coins,
      };
    }),
});
