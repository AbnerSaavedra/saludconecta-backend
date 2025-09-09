import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistroOdontogramaDto } from './dto/registro-odontograma.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

@Injectable()
export class OdontologiaService {

constructor(private readonly prisma: PrismaService) {}

async registrarIntervencion(dto: RegistroOdontogramaDto, usuarioId: string) {
    // Validación ética: evitar duplicados por pieza/fecha/paciente
    const existe = await this.prisma.odontograma.findFirst({
      where: {
        pieza: dto.pieza,
        fecha: new Date(dto.fecha),
        pacienteId: dto.pacienteId,
      },
    });

    if (existe) {
      throw new Error('Ya existe una intervención registrada para esta pieza en esa fecha');
    }

    return this.prisma.odontograma.create({
      data: {
        pieza: dto.pieza,
        cuadrante: dto.cuadrante ?? null,
        estado: dto.estado,
        tratamientoSugerido: dto.tratamientoSugerido,
        fecha: new Date(dto.fecha),
        usuarioId,
        pacienteId: dto.pacienteId,
      },
    });
  }

async obtenerHistorial(usuarioId: string) {
  return this.prisma.odontograma.findMany({
    where: { usuarioId },
    orderBy: { fecha: 'desc' },
  });
}

async obtenerEvolucionPorPieza(usuarioId: string, pieza: string) {
  return this.prisma.odontograma.findMany({
    where: {
      usuarioId,
      pieza,
    },
    orderBy: {
      fecha: 'asc',
    },
  });
}

async generarHistorialPDF(usuarioId: string): Promise<Buffer> {
    const intervenciones = await this.prisma.odontograma.findMany({
      where: { usuarioId },
      orderBy: { fecha: 'asc' },
    });

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    let y = height - 50;
    page.drawText('Historial Dental', {
      x: 50,
      y,
      size: 18,
      font,
      color: rgb(0.2, 0.2, 0.6),
    });

    y -= 30;

    intervenciones.forEach((i) => {
      const fecha = new Date(i.fecha).toLocaleDateString();
      const texto = `🦷 Pieza: ${i.pieza} | 📅 Fecha: ${fecha}\Estado: ${i.estado}\nTratamiento sugerido: ${i.tratamientoSugerido}`;
      page.drawText(texto, {
        x: 50,
        y,
        size: 11,
        font,
        color: rgb(0, 0, 0),
        lineHeight: 14,
      });
      y -= 60;
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }

}
