import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getResidentById = () => {
  return protectedProcedure.input(z.object({ id: z.string() })).query(async opts => {
    const { user: authUSer } = opts.ctx;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      const animal = await prisma.animal.findFirst({
        where: {
          sanctuary: {
            user: {
              externalId: authUSer.uid,
            },
          },
          id: opts.input.id,
          deletedAt: null,
        },
      });

      return {
        ...animal,
      };
    } catch (error) {
      console.error(`Error getResidentById for account ${authUSer.email}`, error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
