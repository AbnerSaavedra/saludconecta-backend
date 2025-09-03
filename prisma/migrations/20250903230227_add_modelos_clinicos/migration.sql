-- CreateTable
CREATE TABLE "public"."Intervencion" (
    "id" TEXT NOT NULL,
    "pieza" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pacienteId" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Intervencion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Intervencion" ADD CONSTRAINT "Intervencion_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Intervencion" ADD CONSTRAINT "Intervencion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
