import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getSanctuariesForAccount = () => {
  return protectedProcedure.query(async opts => {
    const { user: authUser } = opts.ctx;

    if (!authUser.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const user = await prisma.user.findUnique({
      where: {
        email: authUser.email,
      },
    });

    if (!user || user.deletedAt !== null) return { sanctuaries: [], user: null }; //throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const userSanctuaries = await prisma.userSanctuary.findMany({
      where: {
        userId: user.id,
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

    return { sanctuaries, user };
  });
};
