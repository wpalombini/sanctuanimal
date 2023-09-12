import { HistoricalNotes, PrismaClient } from '../generated';

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

  // create account 1
  const account1 = await prisma.user.create({
    data: {
      externalId: user1ExternalId,
      email: user1Email,
      name: user1DisplayName,
    },
  });

  // create sanctuary 1 for account 1
  const sanctuary1Account1 = await prisma.sanctuary.create({
    data: {
      name: user1Sanctuary1Name,
      contact: user1Sanctuary1Contact,
    },
  });

  // link account 1 to sanctuary 1
  await prisma.userSanctuary.create({
    data: {
      userId: account1.id,
      sanctuaryId: sanctuary1Account1.id,
    },
  });

  // create residents for sanctuary 1
  const residentsSanctuary1 = await createResidentsForSanctuaryId(sanctuary1Account1.id);

  // create historical notes for residents for sanctuaryId 1
  const residentsHistoricalNotesSanctuary1: Array<Promise<Array<HistoricalNotes>>> = [];
  residentsSanctuary1.forEach(resident => {
    residentsHistoricalNotesSanctuary1.push(createHistoricalNotesForResidentId(resident.id));
  });
  await Promise.all(residentsHistoricalNotesSanctuary1);
};

const createResidentsForSanctuaryId = async (sanctuaryId: string) => {
  const resident1 = prisma.animal.create({
    data: {
      name: 'Resident 1',
      species: 'Dog',
      breed: 'Labrador',
      gender: 'M',
      generalNotes: 'This is a general note for Resident 1',
      dateOfBirth: '09/09/2014',
      bio: 'This is a bio for Resident 1',
      sanctuaryId: sanctuaryId,
    },
  });

  const resident2 = prisma.animal.create({
    data: {
      name: 'Resident 2',
      species: 'Cat',
      breed: 'Siamese',
      gender: 'F',
      generalNotes: 'This is a general note for Resident 2',
      dateOfBirth: '09/09/2020',
      bio: 'This is a bio for Resident 2',
      sanctuaryId: sanctuaryId,
    },
  });

  const resident3 = prisma.animal.create({
    data: {
      name: 'Resident 3',
      species: 'Horse',
      breed: 'Mix',
      gender: 'F',
      generalNotes: 'This is a general note for Resident 3',
      dateOfBirth: '09/09/2018',
      bio: 'This is a bio for Resident 3',
      sanctuaryId: sanctuaryId,
    },
  });

  const resident4 = prisma.animal.create({
    data: {
      name: 'Resident 4',
      species: 'Cow',
      breed: 'Mix',
      gender: 'F',
      generalNotes: 'This is a general note for Resident 4',
      dateOfBirth: '09/09/2016',
      bio: 'This is a bio for Resident 4',
      sanctuaryId: sanctuaryId,
    },
  });

  const resident5 = prisma.animal.create({
    data: {
      name: 'Resident 5',
      species: 'Chicken',
      breed: 'Mix',
      gender: 'F',
      generalNotes: 'This is a general note for Resident 5',
      dateOfBirth: '09/09/2019',
      bio: 'This is a bio for Resident 5',
      sanctuaryId: sanctuaryId,
    },
  });

  return await Promise.all([resident1, resident2, resident3, resident4, resident5]);
};

const createHistoricalNotesForResidentId = async (residentId: string) => {
  const historicalNote1Promise = prisma.historicalNotes.create({
    data: {
      historicalNote: 'This is a medical historical note.',
      historicalNoteType: 'M',
      animalId: residentId,
    },
  });

  const historicalNote2Promise = prisma.historicalNotes.create({
    data: {
      historicalNote: 'This is a general historical note.',
      historicalNoteType: 'G',
      animalId: residentId,
    },
  });

  const historicalNote3Promise = prisma.historicalNotes.create({
    data: {
      historicalNote: 'This is a medical historical note',
      historicalNoteType: 'M',
      animalId: residentId,
    },
  });

  const historicalNote4Promise = prisma.historicalNotes.create({
    data: {
      historicalNote: 'This is a medical historical note.',
      historicalNoteType: 'M',
      animalId: residentId,
    },
  });

  const historicalNote5Promise = prisma.historicalNotes.create({
    data: {
      historicalNote: 'This is a general historical note.',
      historicalNoteType: 'G',
      animalId: residentId,
    },
  });

  return await Promise.all([
    historicalNote1Promise,
    historicalNote2Promise,
    historicalNote3Promise,
    historicalNote4Promise,
    historicalNote5Promise,
  ]);
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
