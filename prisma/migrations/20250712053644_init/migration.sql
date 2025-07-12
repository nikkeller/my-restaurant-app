-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "partySizeMin" INTEGER NOT NULL,
    "partySizeMax" INTEGER NOT NULL,
    "seatingCapacity" INTEGER NOT NULL,
    "googleRating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);
