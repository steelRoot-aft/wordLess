import z from "zod";
import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  addCoin: protectedProcedure
    .input(
      z.object({
        difficulty: z.enum(["easy", "medium", "hard"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, user } = ctx;
      const { difficulty } = input;

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found",
        });
      }

      const coins =
        difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 25;

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          coins: user.coins + coins,
        },
      });

      return {
        coins: updatedUser.coins,
      };
    }),
});
