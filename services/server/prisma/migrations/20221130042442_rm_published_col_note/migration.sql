/*
  Warnings:

  - You are about to drop the column `published` on the `note` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `tag` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "note" DROP COLUMN "published";

-- AlterTable
ALTER TABLE "tag" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);
