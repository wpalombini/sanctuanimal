import { TRPCError } from '@trpc/server';

import { updateResidentSchema } from '@/lib/validation/resident-details.schema';

import { protectedProcedure } from '../trpc';

export const updateResident = () => {
  return protectedProcedure.input(updateResidentSchema).mutation(async opts => {
    const { user: authUSer } = opts.ctx;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    try {
      return {
        ...opts.input,
      };
    } catch (error) {
      console.error(
        `Error updating resident id: ${opts.input.id} for account ${authUSer.email}`,
        error,
      );
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'An error occurred' });
    }
  });
};
