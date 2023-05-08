import { prisma } from '@/lib/prisma';

import { protectedProcedure } from '../trpc';

export const getSanctuariesForAccount = () => {
  return protectedProcedure.query(async opts => {
    const sanctuaries = await prisma.sanctuary.findMany({
      where: {
        user: { externalId: opts.ctx.uid },
      },
    });

    return { sanctuaries };
  });
};
