import { router } from "../trpc";
import { bonusRouter } from "./bonus";

export const appRouter = router({
  bonus: bonusRouter,
});

export type AppRouter = typeof appRouter;
