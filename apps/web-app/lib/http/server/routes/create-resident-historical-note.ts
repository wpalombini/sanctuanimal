import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { serverNewHistoricalNoteSchema } from '@/lib/validation/resident-historical-notes-new.schema';

import { protectedProcedure } from '../trpc';

export const createResidentHistoricalNote = () => {
  return protectedProcedure.input(serverNewHistoricalNoteSchema).mutation(async opts => {
    const { user: authUser } = opts.ctx;
    const { residentId, sanctuaryId, historicalNote, historicalNoteType } = opts.input;

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
      const newHistoricalNote = await prisma.historicalNotes.create({
        data: {
          historicalNote,
          historicalNoteType,
          animalId: residentId,
        },
      });

      return {
        ...newHistoricalNote,
      };
    } catch (error) {
      console.error(
        `Error saving historical note for resident id: ${residentId} for account ${authUser.email}`,
        error,
      );
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
