import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { auth } from '@/lib/firebase/server';

export const createContext = async ({ req }: trpcNext.CreateNextContextOptions) => {
  const getUIDFromHeader = async () => {
    try {
      if (req.headers.authorization) {
        // HERE: CONVERT TOKEN TO USER.UID
        const token = req.headers.authorization.split(' ')[1];
        const { uid } = await auth.verifyIdToken(token);
        return uid;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const uid = await getUIDFromHeader();
  return { uid };
};

export type Context = inferAsyncReturnType<typeof createContext>;
