-- Intervencion: eliminamos columnas obsoletas y agregamos nuevas con valores por defecto
ALTER TABLE "public"."Intervencion"
DROP COLUMN "pieza",
DROP COLUMN "tratamiento",
ADD COLUMN "observaciones" TEXT,
ADD COLUMN "odontogramaId" TEXT NOT NULL DEFAULT 'TEMP',
ADD COLUMN "tipo" TEXT NOT NULL DEFAULT 'Sin clasificar',
ADD COLUMN "tratamientoRealizado" TEXT NOT NULL DEFAULT 'Pendiente';

-- Odontograma: eliminamos columnas obsoletas y agregamos nuevas con valores por defecto
ALTER TABLE "public"."Odontograma"
DROP COLUMN "diagnostico",
DROP COLUMN "tratamiento",
ADD COLUMN "cuadrante" TEXT,
ADD COLUMN "estado" TEXT NOT NULL DEFAULT 'pendiente',
ADD COLUMN "tratamientoSugerido" TEXT NOT NULL DEFAULT 'Sin definir';

-- Relación entre Intervencion y Odontograma
ALTER TABLE "public"."Intervencion"
ADD CONSTRAINT "Intervencion_odontogramaId_fkey"
FOREIGN KEY ("odontogramaId")
REFERENCES "public"."Odontograma"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;
