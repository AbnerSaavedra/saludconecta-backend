-- CreateEnum
CREATE TYPE "public"."EstadoUsuario" AS ENUM ('Activo', 'Suspendido');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "estado" "public"."EstadoUsuario" NOT NULL DEFAULT 'Activo',
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3),
ADD COLUMN     "telefono" TEXT;
