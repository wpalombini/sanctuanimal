import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { serverUpdateGeneralNotesSchema } from '@/lib/validation/resident-general-notes.schema';

import { protectedProcedure } from '../trpc';

export const updateResidentGeneralNotes = () => {
  return protectedProcedure.input(serverUpdateGeneralNotesSchema).mutation(async opts => {
    const { user: authUSer } = opts.ctx;
    const input = opts.input;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      const updatedAnimal = await prisma.animal.updateMany({
        where: {
          id: input.id,
          sanctuary: {
            user: {
              externalId: authUSer.uid,
            },
          },
        },
        data: {
          generalNotes: input.generalNotes,
        },
      });

      return {
        ...updatedAnimal,
      };
    } catch (error) {
      console.error(
        `Error saving general notes for resident id: ${opts?.input?.id} for account ${authUSer.email}`,
        error,
      );
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
