import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { auth } from '@/lib/firebase/server';

export const createContext = async ({ req }: trpcNext.CreateNextContextOptions) => {
  const getUserFromJWT = async () => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        return await auth.verifyIdToken(token);
      }

      return null;
    } catch (error) {
      console.log('Error getUserFromJWT', error);
      return null;
    }
  };

  const user = await getUserFromJWT();
  return { user };
};

export type Context = inferAsyncReturnType<typeof createContext>;
