import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getSanctuaryById = () => {
  return protectedProcedure.input(z.object({ id: z.string().uuid() })).query(async opts => {
    const { user: authUser } = opts.ctx;

    if (!authUser.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const user = await prisma.user.findUnique({
      where: {
        email: authUser.email,
      },
    });

    if (!user || user.deletedAt !== null) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const userSanctuaries = await prisma.userSanctuary.findMany({
      where: {
        userId: user.id,
        sanctuaryId: opts.input.id,
      },
      include: {
        sanctuary: true,
      },
    });

    const sanctuaries = userSanctuaries
      .filter(userSanctuary => userSanctuary.sanctuary.deletedAt === null)
      .map(userSanctuary => ({
        ...userSanctuary.sanctuary,
        role: userSanctuary.role,
      }));

    if (sanctuaries.length !== 1)
      throw new TRPCError({ code: sanctuaries.length === 0 ? 'NOT_FOUND' : 'CONFLICT' });

    return { ...sanctuaries[0] };
  });
};
