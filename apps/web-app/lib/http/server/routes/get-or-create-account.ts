import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getOrCreateAccount = () => {
  return protectedProcedure.query(async opts => {
    const { user: authUser } = opts.ctx;

    if (!authUser.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      const existingAccount = await prisma.user.findUnique({
        where: {
          email: authUser.email,
        },
      });

      // if account exist and is active, return it
      if (existingAccount && existingAccount.deletedAt === null) return { user: existingAccount };

      // if account does not exist or is inactive, create a new one
      const newAccount = await prisma.user.create({
        data: {
          email: authUser.email,
          externalId: authUser.uid,
          name: authUser.name,
        },
      });

      return { user: newAccount };
    } catch (error) {
      console.error(`Error getting or creating user ${authUser.email}`, error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
