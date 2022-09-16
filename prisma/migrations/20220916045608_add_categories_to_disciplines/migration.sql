-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "disciplineId" INTEGER;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE SET NULL ON UPDATE CASCADE;
