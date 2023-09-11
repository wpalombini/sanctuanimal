import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { serverUpdateGeneralNotesSchema } from '@/lib/validation/resident-general-notes.schema';

import { protectedProcedure } from '../trpc';

export const updateResidentGeneralNotes = () => {
  return protectedProcedure.input(serverUpdateGeneralNotesSchema).mutation(async opts => {
    const { user: authUser } = opts.ctx;
    const input = opts.input;

    if (!authUser.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const user = await prisma.user.findUnique({
      where: {
        email: authUser.email,
      },
    });

    if (!user || user.deletedAt !== null) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const userSanctuaries = await prisma.userSanctuary.findMany({
      where: {
        sanctuaryId: input.sanctuaryId,
        userId: user.id,
      },
    });

    if (userSanctuaries.length !== 1)
      throw new TRPCError({ code: userSanctuaries.length === 0 ? 'FORBIDDEN' : 'CONFLICT' });

    try {
      const updatedAnimal = await prisma.animal.updateMany({
        where: {
          id: input.id,
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
        `Error saving general notes for resident id: ${opts?.input?.id} for account ${authUser.email}`,
        error,
      );
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
