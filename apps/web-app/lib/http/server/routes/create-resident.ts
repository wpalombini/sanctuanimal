import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { serverCreateResidentSchema } from '@/lib/validation/resident-details.schema';

import { protectedProcedure } from '../trpc';

export const createResident = () => {
  return protectedProcedure.input(serverCreateResidentSchema).mutation(async opts => {
    const { user: authUSer } = opts.ctx;
    const input = opts.input;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      const sanctuaries = await prisma.sanctuary.findMany({
        where: {
          user: { externalId: authUSer.uid },
        },
      });

      if (!sanctuaries?.length) {
        throw new Error(`Sanctuary not found for account ${authUSer.email}`);
      }

      const animal = await prisma.animal.create({
        data: {
          name: input.name,
          species: input.species,
          breed: input.breed,
          gender: input.gender,
          dateOfBirth: input.dateOfBirth || undefined,
          bio: input.bio || undefined,
          sanctuaryId: sanctuaries[0].id,
        },
      });

      return {
        ...animal,
      };
    } catch (error) {
      console.error(`Error upserting resident for account ${authUSer.email}`, error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
