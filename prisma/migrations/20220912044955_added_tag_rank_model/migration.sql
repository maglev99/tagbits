-- CreateTable
CREATE TABLE "TagRank" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "TagRank_pkey" PRIMARY KEY ("id")
);
