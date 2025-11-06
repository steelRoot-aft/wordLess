import z from "zod";
import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { Difficulty } from "@/lib/generated/enums";

export const userRouter = router({
  gameOver: protectedProcedure
    .input(
      z.object({
        difficulty: z.enum(Difficulty).optional(),
        isVictory: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      const { difficulty, isVictory } = input;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      if (difficulty && isVictory) {
        const coins =
          difficulty === "EASY" ? 10 : difficulty === "MEDIUM" ? 15 : 25;

        const updatedUser = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            coins: user.coins + coins,
            wins: user.wins + 1,
            games: user.games + 1,
          },
        });

        return {
          coins: updatedUser.coins,
        };
      }

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          losses: user.losses + 1,
          games: user.games + 1,
        },
      });

      return {
        coins: user.coins,
      };
    }),

  addWord: protectedProcedure
    .input(
      z.object({
        word: z.string().min(3).max(7),
        difficulty: z.enum(Difficulty),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      const { word, difficulty } = input;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const lowerCaseWord = word.toLowerCase();

      const existingWord = await prisma.word.findUnique({
        where: {
          word: lowerCaseWord,
        },
      });

      if (existingWord) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Word already exists",
        });
      }

      await prisma.word.create({
        data: {
          word: lowerCaseWord,
          length: lowerCaseWord.length,
          authorId: user.id,
          difficulty,
        },
      });

      return {
        success: true,
      };
    }),
});
