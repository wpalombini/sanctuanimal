import * as trpcNext from '@trpc/server/adapters/next';

import { createContext } from '@/lib/http/server/context';
import { appRouter } from '@/lib/http/server/router';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
