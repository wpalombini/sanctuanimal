import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getResidents = () => {
  return protectedProcedure
    .input(z.object({ sanctuaryId: z.string().uuid(), searchTerm: z.string().optional() }))
    .query(async opts => {
      const { user: authUser } = opts.ctx;
      const { sanctuaryId, searchTerm } = opts.input;

      if (!authUser.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

      const user = await prisma.user.findUnique({
        where: {
          email: authUser.email,
        },
      });

      if (!user || user.deletedAt !== null) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

      const userSanctuaries = await prisma.userSanctuary.findMany({
        where: {
          sanctuaryId: sanctuaryId,
          userId: user.id,
        },
      });

      if (userSanctuaries.length !== 1)
        throw new TRPCError({ code: userSanctuaries.length === 0 ? 'FORBIDDEN' : 'CONFLICT' });

      try {
        const residents = await prisma.animal.findMany({
          where: {
            sanctuaryId,
            deletedAt: null,
          },
          orderBy: {
            updatedAt: 'desc',
          },
          select: {
            id: true,
            name: true,
            species: true,
            breed: true,
            gender: true,
            dateOfBirth: true,
          },
        });

        // For now, filter the list of residents on the business layer, not on db layer
        if (searchTerm) {
          const searchTermLowerCase = searchTerm.toLowerCase();
          return residents.filter(
            resident =>
              resident.name.toLowerCase().includes(searchTermLowerCase) ||
              resident.species.toLowerCase().includes(searchTermLowerCase) ||
              resident.breed.toLowerCase().includes(searchTermLowerCase),
          );
        } else {
          return residents;
        }
      } catch (error) {
        console.error(`Error getResidents for account ${authUser.email}`, error);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
      }
    });
};
