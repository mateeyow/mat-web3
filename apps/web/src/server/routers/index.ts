import { router } from "../trpc.server";
import { contractRouter } from "./contract.router";

export const appRouter = router({
  contract: contractRouter,
});

export type AppRouter = typeof appRouter;
