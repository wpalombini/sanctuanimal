import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

// https://github.com/prisma/studio/issues/614
declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export const getResidentById = () => {
  return protectedProcedure
    .input(z.object({ sanctuaryId: z.string().uuid(), id: z.string().uuid() }))
    .query(async opts => {
      const { user: authUser } = opts.ctx;
      const { id, sanctuaryId } = opts.input;

      if (!authUser.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

      const user = await prisma.user.findUnique({
        where: {
          email: authUser.email,
        },
      });

      if (!user || user.deletedAt !== null) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

      const userSanctuaries = await prisma.userSanctuary.findMany({
        where: {
          sanctuaryId,
          userId: user.id,
        },
      });

      if (userSanctuaries.length !== 1)
        throw new TRPCError({ code: userSanctuaries.length === 0 ? 'FORBIDDEN' : 'CONFLICT' });

      try {
        const animal = await prisma.animal.findUnique({
          where: {
            id,
          },
        });

        if (animal?.deletedAt !== null) throw new TRPCError({ code: 'NOT_FOUND' });

        return {
          ...animal,
        };
      } catch (error) {
        console.error(`Error getResidentById for account ${authUser.email}`, error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
      }
    });
};
