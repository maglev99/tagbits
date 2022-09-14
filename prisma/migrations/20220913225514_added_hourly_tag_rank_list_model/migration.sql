-- AlterTable
ALTER TABLE "TagRank" ADD COLUMN     "hourly_TagRankListId" TEXT;

-- CreateTable
CREATE TABLE "Hourly_TagRankList" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hourly_TagRankList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagRank" ADD CONSTRAINT "TagRank_hourly_TagRankListId_fkey" FOREIGN KEY ("hourly_TagRankListId") REFERENCES "Hourly_TagRankList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
