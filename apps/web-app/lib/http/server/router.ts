import {
  createResident,
  createResidentHistoricalNote,
  createSanctuary,
  getOrCreateAccount,
  getResidentById,
  getResidentHistoricalNotes,
  getResidents,
  getSanctuariesForAccount,
  getSanctuaryById,
  updateAccount,
  updateResident,
  updateResidentGeneralNotes,
  updateSanctuary,
} from './routes';
import { router } from './trpc';

export const appRouter = router({
  // Sanctuaries
  createSanctuary: createSanctuary(),
  getSanctuaryById: getSanctuaryById(),
  getSanctuariesForAccount: getSanctuariesForAccount(),
  updateSanctuary: updateSanctuary(),

  // Account
  getOrCreateAccount: getOrCreateAccount(),
  updateAccount: updateAccount(),

  // Residents
  createResident: createResident(),
  getResidents: getResidents(),
  getResidentById: getResidentById(),
  updateResident: updateResident(),

  // Resident notes
  createResidentHistoricalNote: createResidentHistoricalNote(),
  getResidentHistoricalNotes: getResidentHistoricalNotes(),
  updateResidentGeneralNotes: updateResidentGeneralNotes(),
});

export type AppRouter = typeof appRouter;
