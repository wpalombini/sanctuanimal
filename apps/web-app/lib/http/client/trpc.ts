import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import { getUserTokenId } from '@/lib/firebase/client';

import { AppRouter } from '../server/router';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      },
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc`,
          async headers() {
            const token = await getUserTokenId();
            return {
              authorization: `Bearer ${token || ''}`,
            };
          },
        }),
      ],
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
});
