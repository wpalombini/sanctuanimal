import { TRPCError } from '@trpc/server';

import { createResidentSchema } from '@/lib/validation/resident-details.schema';

import { protectedProcedure } from '../trpc';

export const createResident = () => {
  return protectedProcedure.input(createResidentSchema).mutation(async opts => {
    const { user: authUSer } = opts.ctx;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      // const updatedUser = await prisma.user.update({
      //   where: { email: authUSer.email },
      //   data: { name },
      // });

      // return { user: updatedUser };

      return {
        ...opts.input,
        id: '123',
      };
    } catch (error) {
      console.error(`Error upserting resident for account ${authUSer.email}`, error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
