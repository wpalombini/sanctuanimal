import { createResident, getSanctuariesForAccount, updateAccount, upsertSanctuary } from './routes';
import { router } from './trpc';

export const appRouter = router({
  getSanctuariesForAccount: getSanctuariesForAccount(),
  upsertSanctuary: upsertSanctuary(),
  updateAccount: updateAccount(),
  createResident: createResident(),
});

export type AppRouter = typeof appRouter;
