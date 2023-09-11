import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { serverCreateResidentSchema } from '@/lib/validation/resident-details.schema';

import { protectedProcedure } from '../trpc';

export const createResident = () => {
  return protectedProcedure.input(serverCreateResidentSchema).mutation(async opts => {
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
      const animal = await prisma.animal.create({
        data: {
          name: input.name,
          species: input.species,
          breed: input.breed,
          gender: input.gender,
          dateOfBirth: input.dateOfBirth || undefined,
          bio: input.bio || undefined,
          sanctuaryId: input.sanctuaryId,
        },
      });

      return {
        ...animal,
      };
    } catch (error) {
      console.error(`Error creating resident for account ${authUser.email}`, error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
