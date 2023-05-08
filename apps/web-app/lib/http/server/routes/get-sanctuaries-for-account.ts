import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getSanctuariesForAccount = () => {
  return protectedProcedure.query(async opts => {
    const { user: authUSer } = opts.ctx;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    const sanctuaries = await prisma.sanctuary.findMany({
      where: {
        user: { externalId: authUSer.uid },
      },
      include: { user: true },
    });

    // if no sanctuaries, check whether account exist
    if (!sanctuaries?.length) {
      let user = await prisma.user.findUnique({
        where: {
          email: authUSer.email,
        },
      });

      // if no existing user, then create one from the jwt data
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: authUSer.name,
            email: authUSer.email,
            externalId: authUSer.uid,
          },
        });
      }

      return { sanctuaries, user };
    }

    return { sanctuaries, user: sanctuaries[0].user };
  });
};
