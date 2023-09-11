import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getResidentHistoricalNotes = () => {
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
        return await prisma.historicalNotes.findMany({
          where: {
            deletedAt: null,
            animalId: id,
          },
          orderBy: {
            updatedAt: 'desc',
          },
          select: {
            id: true,
            historicalNote: true,
            historicalNoteType: true,
            createdAt: true,
          },
        });
      } catch (error) {
        console.error(
          `Error getResidentHistoricalNotes for residentId ${id} for account ${authUser.email}`,
          error,
        );
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
      }
    });
};
