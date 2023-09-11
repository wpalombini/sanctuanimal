import { UserRole } from '@sanctuanimal/orm';
import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { updateSanctuarySchema } from '@/lib/validation/sanctuary-details.schema';

import { protectedProcedure } from '../trpc';

export const updateSanctuary = () => {
  return protectedProcedure.input(updateSanctuarySchema).mutation(async opts => {
    const { user: authUSer } = opts.ctx;
    const { contact, id, name } = opts.input;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const user = await prisma.user.findUnique({
      where: {
        email: authUSer.email,
      },
    });

    if (!user || user.deletedAt !== null) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    // ensure the user is admin on the sanctuary
    const userSanctuaries = await prisma.userSanctuary.findMany({
      where: {
        userId: user.id,
        sanctuaryId: id,
        role: UserRole.ADMIN,
        sanctuary: {
          deletedAt: null,
        },
      },
    });

    if (userSanctuaries.length !== 1)
      throw new TRPCError({ code: userSanctuaries.length === 0 ? 'FORBIDDEN' : 'CONFLICT' });

    const updatedSanctuary = await prisma.sanctuary.update({
      where: {
        id,
      },
      data: {
        contact,
        name,
      },
    });

    return { ...updatedSanctuary };
  });
};
