/*
  Warnings:

  - You are about to drop the column `nacimiento` on the `Paciente` table. All the data in the column will be lost.
  - Added the required column `actualizadoEn` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaNacimiento` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Paciente" DROP COLUMN "nacimiento",
ADD COLUMN     "actualizadoEn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "apellido" TEXT NOT NULL,
ADD COLUMN     "correo" TEXT,
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "telefono" TEXT;
