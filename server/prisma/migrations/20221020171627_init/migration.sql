-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "choiceA" TEXT NOT NULL,
    "choiceB" TEXT,
    "choiceC" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
