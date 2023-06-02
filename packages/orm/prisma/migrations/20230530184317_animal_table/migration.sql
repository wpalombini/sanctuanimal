-- CreateTable
CREATE TABLE "Animal" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "species" VARCHAR(100) NOT NULL,
    "breed" VARCHAR(100) NOT NULL,
    "gender" VARCHAR(1) NOT NULL,
    "dateOfBirth" VARCHAR(10),
    "bio" VARCHAR(1000),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(3),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "sanctuaryId" VARCHAR(36) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
