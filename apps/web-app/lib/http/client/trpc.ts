import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import { getUserTokenId } from '@/lib/firebase/client';

import { AppRouter } from '../server/router';

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc`,

          // You can pass any HTTP headers you wish here
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
