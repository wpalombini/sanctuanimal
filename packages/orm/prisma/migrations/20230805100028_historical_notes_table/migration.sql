-- CreateTable
CREATE TABLE "HistoricalNotes" (
    "id" VARCHAR(36) NOT NULL,
    "historicalNote" VARCHAR(1000) NOT NULL,
    "historicalNoteType" VARCHAR(2) NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(3),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "animalId" VARCHAR(36) NOT NULL,

    CONSTRAINT "HistoricalNotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoricalNotes" ADD CONSTRAINT "HistoricalNotes_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
