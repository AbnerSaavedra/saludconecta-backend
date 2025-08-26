-- 1. Renombrar columna antigua
ALTER TABLE "User" RENAME COLUMN "role" TO "role_legacy";

-- 2. Crear nueva columna como arreglo
ALTER TABLE "User" ADD COLUMN "roles" "Role"[] DEFAULT ARRAY['MEDICO']::"Role"[];

-- 3. Migrar datos existentes
UPDATE "User" SET "roles" = ARRAY["role_legacy"];

-- 4. Eliminar columna antigua
ALTER TABLE "User" DROP COLUMN "role_legacy";
