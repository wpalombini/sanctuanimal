import { Prisma } from '@sanctuanimal/orm';
import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { upsertSanctuarySchema } from '@/lib/validation/sanctuary-schema';

import { protectedProcedure } from '../trpc';

export const upsertSanctuary = () => {
  return protectedProcedure.input(upsertSanctuarySchema).mutation(async opts => {
    const { user: authUSer } = opts.ctx;
    const { contact, name } = opts.input;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const user = await prisma.user.findUnique({
      where: {
        email: authUSer.email,
      },
      include: { sanctuaries: true },
    });

    if (!user) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    // if no sanctuary exists, create one.
    if (user.sanctuaries.length === 0) {
      try {
        const newSanctuary = await prisma.sanctuary.create({
          data: {
            contact,
            name,
            userId: user.id,
          },
        });

        return { sanctuary: newSanctuary };
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          throw new TRPCError({ code: 'CONFLICT', message: 'Sanctuary already exists' });
        }
      }
    } else {
      // else, update the existing one.
      const updatedSanctuary = await prisma.sanctuary.update({
        where: {
          id: user.sanctuaries[0].id,
        },
        data: {
          contact,
          name,
        },
      });

      return { sanctuary: updatedSanctuary };
    }
  });
};
