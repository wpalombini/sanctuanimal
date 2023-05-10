import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/prisma';
import { updateAccountSchema } from '@/lib/validation/account-schema';

import { protectedProcedure } from '../trpc';

export const updateAccount = () => {
  return protectedProcedure.input(updateAccountSchema).mutation(async opts => {
    const { user: authUSer } = opts.ctx;
    const { name } = opts.input;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      const updatedUser = await prisma.user.update({
        where: { email: authUSer.email },
        data: { name },
      });

      return { user: updatedUser };
    } catch (error) {
      console.error(`Error updating user ${authUSer.email}`, error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
