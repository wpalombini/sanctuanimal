/*
  Warnings:

  - You are about to drop the column `userId` on the `Sanctuary` table. All the data in the column will be lost.

*/

-- Migrate data from 1:n to n:m (User.sanctuaries -> UserSanctuary)
INSERT INTO "UserSanctuary" 
SELECT 'ADMIN'::"UserRole", CURRENT_TIMESTAMP, NULL, CURRENT_TIMESTAMP, "User".id, "Sanctuary".id
FROM "User"
INNER JOIN "Sanctuary" on "User".id = "Sanctuary"."userId";

-- DropForeignKey
ALTER TABLE "Sanctuary" DROP CONSTRAINT "Sanctuary_userId_fkey";

-- AlterTable
ALTER TABLE "Sanctuary" DROP COLUMN "userId";
