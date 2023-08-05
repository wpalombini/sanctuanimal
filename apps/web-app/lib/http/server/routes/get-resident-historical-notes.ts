import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getResidentHistoricalNotes = () => {
  return protectedProcedure.input(z.object({ residentId: z.string().uuid() })).query(async opts => {
    const { user: authUSer } = opts.ctx;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      return [
        {
          historicalNote: 'My historical note 1',
          historicalNoteType: 'G',
          id: '1',
        },
        {
          historicalNote: 'My historical note 2',
          historicalNoteType: 'M',
          id: '2',
        },
      ];
      // return await prisma.animal.findMany({
      //   where: {
      //     sanctuary: {
      //       user: {
      //         externalId: authUSer.uid,
      //       },
      //     },
      //     deletedAt: null,
      //   },
      //   orderBy: {
      //     updatedAt: 'desc',
      //   },
      //   select: {
      //     id: true,
      //     name: true,
      //     species: true,
      //     breed: true,
      //     gender: true,
      //     dateOfBirth: true,
      //   },
      // });
    } catch (error) {
      console.error(
        `Error getResidentHistoricalNotes for residentId ${opts?.input?.residentId} for account ${authUSer.email}`,
        error,
      );
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
