import {
  createResident,
  getResidentById,
  getResidents,
  getSanctuariesForAccount,
  updateAccount,
  updateResident,
  updateResidentGeneralNotes,
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
  updateResidentGeneralNotes: updateResidentGeneralNotes(),
});

export type AppRouter = typeof appRouter;
