/*
  Warnings:

  - Added the required column `pieza` to the `Intervencion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `estado` on the `Odontograma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."EstadoPieza" AS ENUM ('SANO', 'CARIES', 'ENDODONCIA', 'EXTRACCION', 'OBSERVACION');

-- AlterTable
ALTER TABLE "public"."Intervencion" ADD COLUMN     "exportadoEn" TIMESTAMP(3),
ADD COLUMN     "exportadoPorId" TEXT,
ADD COLUMN     "pieza" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Odontograma" DROP COLUMN "estado",
ADD COLUMN     "estado" "public"."EstadoPieza" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Paciente" ADD COLUMN     "creadoPorId" TEXT,
ADD COLUMN     "modificadoPorId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Paciente" ADD CONSTRAINT "Paciente_creadoPorId_fkey" FOREIGN KEY ("creadoPorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Paciente" ADD CONSTRAINT "Paciente_modificadoPorId_fkey" FOREIGN KEY ("modificadoPorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Intervencion" ADD CONSTRAINT "Intervencion_exportadoPorId_fkey" FOREIGN KEY ("exportadoPorId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
