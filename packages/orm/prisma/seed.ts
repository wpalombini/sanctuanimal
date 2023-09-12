import { PrismaClient } from '../generated';

const prisma = new PrismaClient({
  log: ['query'],
});

const main = async () => {
  const user1DisplayName = 'Peach Orange';
  const user1Email = 'peach.orange.733@example.com';
  const user1ExternalId = 'cYufyazkAeXV70lJxrieWV6TW5RL';
  const user1Sanctuary1Name = 'Waltz Sanctuary Seed';
  const user1Sanctuary1Contact = 'Waltz Sanctuary Contact Seed';

  const isDBSeeded = await prisma.user.findFirst({
    where: { externalId: user1ExternalId },
  });

  if (isDBSeeded) {
    return;
  }

  const account1 = await prisma.user.create({
    data: {
      externalId: user1ExternalId,
      email: user1Email,
      name: user1DisplayName,
    },
  });

  const sanctuary1Account1 = await prisma.sanctuary.create({
    data: {
      name: user1Sanctuary1Name,
      contact: user1Sanctuary1Contact,
    },
  });

  await prisma.userSanctuary.create({
    data: {
      userId: account1.id,
      sanctuaryId: sanctuary1Account1.id,
    },
  });
};

// eslint-disable-next-line promise/catch-or-return
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
