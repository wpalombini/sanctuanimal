import { z } from 'zod';

import { procedure, protectedProcedure, router } from './trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(opts => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  secret: protectedProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(opts => {
      console.log('uid from context', opts.ctx.uid);
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
