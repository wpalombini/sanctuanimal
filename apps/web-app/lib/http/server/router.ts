import { createResident, getSanctuariesForAccount, updateAccount, upsertSanctuary } from './routes';
import { getResidentById } from './routes/get-resident-by-id';
import { updateResident } from './routes/update-resident';
import { router } from './trpc';

export const appRouter = router({
  // Sanctuaries
  getSanctuariesForAccount: getSanctuariesForAccount(),
  upsertSanctuary: upsertSanctuary(),

  // Account
  updateAccount: updateAccount(),

  // Residents
  createResident: createResident(),
  getResidentById: getResidentById(),
  updateResident: updateResident(),
});

export type AppRouter = typeof appRouter;
