-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'VOLUNTEER');

-- CreateTable
CREATE TABLE "UserSanctuary" (
    "role" "UserRole" NOT NULL DEFAULT 'VOLUNTEER',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMPTZ(3),
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "userId" VARCHAR(36) NOT NULL,
    "sanctuaryId" VARCHAR(36) NOT NULL,

    CONSTRAINT "UserSanctuary_pkey" PRIMARY KEY ("userId","sanctuaryId")
);

-- AddForeignKey
ALTER TABLE "UserSanctuary" ADD CONSTRAINT "UserSanctuary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSanctuary" ADD CONSTRAINT "UserSanctuary_sanctuaryId_fkey" FOREIGN KEY ("sanctuaryId") REFERENCES "Sanctuary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
