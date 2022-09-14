/*
  Warnings:

  - You are about to drop the column `hourly_TagRankListId` on the `TagRank` table. All the data in the column will be lost.
  - You are about to drop the `Hourly_TagRankList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagRankListId` to the `TagRank` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type_TagRankList" AS ENUM ('HOUR', 'DAY', 'WEEK', 'YEAR');

-- DropForeignKey
ALTER TABLE "TagRank" DROP CONSTRAINT "TagRank_hourly_TagRankListId_fkey";

-- AlterTable
ALTER TABLE "TagRank" DROP COLUMN "hourly_TagRankListId",
ADD COLUMN     "tagRankListId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Hourly_TagRankList";

-- CreateTable
CREATE TABLE "TagRankList" (
    "id" TEXT NOT NULL,
    "type" "Type_TagRankList" NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TagRankList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TagRankList_start_end_idx" ON "TagRankList"("start", "end");

-- CreateIndex
CREATE UNIQUE INDEX "TagRankList_start_end_key" ON "TagRankList"("start", "end");

-- CreateIndex
CREATE INDEX "TagRank_tagRankListId_idx" ON "TagRank"("tagRankListId");

-- AddForeignKey
ALTER TABLE "TagRank" ADD CONSTRAINT "TagRank_tagRankListId_fkey" FOREIGN KEY ("tagRankListId") REFERENCES "TagRankList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
