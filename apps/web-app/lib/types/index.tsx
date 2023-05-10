import type { inferRouterOutputs } from '@trpc/server';

import type { AppRouter } from '../http/server/router';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type AccountOutput = RouterOutput['getSanctuariesForAccount']['user'];
export type SanctuariesOutput = RouterOutput['getSanctuariesForAccount']['sanctuaries'];
