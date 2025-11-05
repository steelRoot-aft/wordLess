import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
  getUser: protectedProcedure.query(({ ctx }) => {
    const { user } = ctx;

    return {
      user: user,
      coins: user?.coins,
    };
  }),
});
