import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getResidentHistoricalNotes = () => {
  return protectedProcedure.input(z.object({ residentId: z.string().uuid() })).query(async opts => {
    const { user: authUSer } = opts.ctx;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      return await prisma.historicalNotes.findMany({
        where: {
          animal: {
            sanctuary: {
              user: {
                externalId: authUSer.uid,
              },
            },
          },
          deletedAt: null,
          animalId: opts?.input?.residentId,
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
        `Error getResidentHistoricalNotes for residentId ${opts?.input?.residentId} for account ${authUSer.email}`,
        error,
      );
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
