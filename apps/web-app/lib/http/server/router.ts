import { z } from 'zod';

import { getSanctuariesForAccount } from './routes';
import { router } from './trpc';

export const appRouter = router({
  getSanctuariesForAccount: getSanctuariesForAccount(),
});

export type AppRouter = typeof appRouter;
