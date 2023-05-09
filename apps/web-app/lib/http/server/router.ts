import { createOrUpdateSanctuary, getSanctuariesForAccount } from './routes';
import { router } from './trpc';

export const appRouter = router({
  createOrUpdateSanctuary: createOrUpdateSanctuary(),
  getSanctuariesForAccount: getSanctuariesForAccount(),
});

export type AppRouter = typeof appRouter;
