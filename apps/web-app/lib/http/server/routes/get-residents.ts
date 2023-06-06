import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getResidents = () => {
  return protectedProcedure.query(async opts => {
    const { user: authUSer } = opts.ctx;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      return await prisma.animal.findMany({
        where: {
          sanctuary: {
            user: {
              externalId: authUSer.uid,
            },
          },
          deletedAt: null,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    } catch (error) {
      console.error(`Error getResidentById for account ${authUSer.email}`, error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
