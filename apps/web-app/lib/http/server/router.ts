import { getSanctuariesForAccount, upsertSanctuary } from './routes';
import { router } from './trpc';

export const appRouter = router({
  upsertSanctuary: upsertSanctuary(),
  getSanctuariesForAccount: getSanctuariesForAccount(),
});

export type AppRouter = typeof appRouter;
