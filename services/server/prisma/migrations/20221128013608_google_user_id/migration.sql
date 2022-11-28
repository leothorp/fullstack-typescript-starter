/*
  Warnings:

  - A unique constraint covering the columns `[google_user_id]` on the table `app_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `google_user_id` to the `app_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `app_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_user" ADD COLUMN     "google_user_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "note" ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "app_user_google_user_id_key" ON "app_user"("google_user_id");
