import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { sanctuarySchema } from '@/lib/validation/sanctuary-details.schema';

import { protectedProcedure } from '../trpc';

export const createSanctuary = () => {
  return protectedProcedure.input(sanctuarySchema).mutation(async opts => {
    const { user: authUser } = opts.ctx;
    const input = opts.input;

    if (!authUser.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const user = await prisma.user.findUnique({
      where: {
        email: authUser.email,
      },
    });

    if (!user || user.deletedAt !== null) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      const sanctuary = await prisma.sanctuary.create({
        data: {
          contact: input.contact,
          name: input.name,
          userSanctuary: {
            create: {
              role: 'ADMIN',
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          },
        },
      });

      return {
        ...sanctuary,
      };
    } catch (error) {
      console.error(`Error creating sanctuary for account ${authUser.email}`, error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
