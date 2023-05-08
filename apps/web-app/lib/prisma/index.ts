import { PrismaClient } from '@sanctuanimal/orm';

import { isEnvProduction } from '../utils';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (!isEnvProduction()) globalForPrisma.prisma = prisma;
