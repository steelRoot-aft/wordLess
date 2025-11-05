import { router } from "../trpc";
import { bonusRouter } from "./bonus";
import { userRouter } from "./user";

export const appRouter = router({
  bonus: bonusRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
