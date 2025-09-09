-- AlterTable
ALTER TABLE "public"."Intervencion" ALTER COLUMN "odontogramaId" DROP DEFAULT,
ALTER COLUMN "tipo" DROP NOT NULL,
ALTER COLUMN "tipo" DROP DEFAULT,
ALTER COLUMN "tratamientoRealizado" DROP NOT NULL,
ALTER COLUMN "tratamientoRealizado" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Odontograma" ALTER COLUMN "estado" DROP DEFAULT,
ALTER COLUMN "tratamientoSugerido" DROP DEFAULT;
