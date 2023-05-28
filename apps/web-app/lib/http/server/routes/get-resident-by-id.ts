import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure } from '../trpc';

export const getResidentById = () => {
  return protectedProcedure.input(z.object({ id: z.string() })).query(async opts => {
    const { user: authUSer } = opts.ctx;

    if (!authUSer.email) throw new TRPCError({ code: 'PRECONDITION_FAILED' });

    return {
      bio: 'My lovely Alice bio',
      breed: 'Greyhound',
      dateOfBirth: '2017-01-01T00:00:00+10:00',
      gender: 'F',
      id: '123',
      name: 'Alice',
      species: 'Dog',
    };
  });
};
