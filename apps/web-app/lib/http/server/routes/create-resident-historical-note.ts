import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { serverNewHistoricalNoteSchema } from '@/lib/validation/resident-historical-notes-new.schema';

import { protectedProcedure } from '../trpc';

export const createResidentHistoricalNote = () => {
  return protectedProcedure.input(serverNewHistoricalNoteSchema).mutation(async opts => {
    const { user: authUSer } = opts.ctx;
    const input = opts.input;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      // const updatedAnimal = await prisma.animal.updateMany({
      //   where: {
      //     id: input.id,
      //     sanctuary: {
      //       user: {
      //         externalId: authUSer.uid,
      //       },
      //     },
      //   },
      //   data: {
      //     historicalNote: input.historicalNote,
      //   },
      // });
      console.log('INPUT:', input);
      return {
        id: '1',
        historicalNote: input.historicalNote,
        historicalNoteType: input.historicalNoteType,
      };
    } catch (error) {
      console.error(
        `Error saving historical note for resident id: ${opts.input.residentId} for account ${authUSer.email}`,
        error,
      );
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
