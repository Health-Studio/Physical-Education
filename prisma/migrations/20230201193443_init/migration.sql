-- CreateEnum
CREATE TYPE "CircumferenceType" AS ENUM ('ARM', 'CHEST', 'WAIST', 'ABDOMEN', 'GLUTEUS', 'THIGH', 'CALF');

-- CreateEnum
CREATE TYPE "SkinFoldType" AS ENUM ('CHEST', 'ABDOMEN', 'THIGH');

-- CreateTable
CREATE TABLE "Educator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cref" TEXT NOT NULL,

    CONSTRAINT "Educator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pacient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pacient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circumference" (
    "id" TEXT NOT NULL,
    "type" "CircumferenceType" NOT NULL,
    "pacientId" TEXT NOT NULL,
    "measure" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Circumference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkinFold" (
    "id" TEXT NOT NULL,
    "type" "CircumferenceType" NOT NULL,
    "pacientId" TEXT NOT NULL,
    "measure" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkinFold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EducatorToPacient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Educator_cref_key" ON "Educator"("cref");

-- CreateIndex
CREATE UNIQUE INDEX "Pacient_cpf_key" ON "Pacient"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "_EducatorToPacient_AB_unique" ON "_EducatorToPacient"("A", "B");

-- CreateIndex
CREATE INDEX "_EducatorToPacient_B_index" ON "_EducatorToPacient"("B");

-- AddForeignKey
ALTER TABLE "Circumference" ADD CONSTRAINT "Circumference_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkinFold" ADD CONSTRAINT "SkinFold_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EducatorToPacient" ADD CONSTRAINT "_EducatorToPacient_A_fkey" FOREIGN KEY ("A") REFERENCES "Educator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EducatorToPacient" ADD CONSTRAINT "_EducatorToPacient_B_fkey" FOREIGN KEY ("B") REFERENCES "Pacient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
