import {
  createResident,
  getResidentById,
  getResidents,
  getSanctuariesForAccount,
  updateAccount,
  updateResident,
  upsertSanctuary,
} from './routes';
import { router } from './trpc';

export const appRouter = router({
  // Sanctuaries
  getSanctuariesForAccount: getSanctuariesForAccount(),
  upsertSanctuary: upsertSanctuary(),

  // Account
  updateAccount: updateAccount(),

  // Residents
  createResident: createResident(),
  getResidents: getResidents(),
  getResidentById: getResidentById(),
  updateResident: updateResident(),
});

export type AppRouter = typeof appRouter;
