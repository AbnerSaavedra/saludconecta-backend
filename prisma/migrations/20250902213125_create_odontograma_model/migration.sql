-- CreateTable
CREATE TABLE "public"."Odontograma" (
    "id" TEXT NOT NULL,
    "pieza" TEXT NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Odontograma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Odontograma" ADD CONSTRAINT "Odontograma_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
