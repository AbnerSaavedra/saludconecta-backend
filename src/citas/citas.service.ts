import { Injectable } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CitasService {
    constructor( private prisma: PrismaService ){

    }

async crearCita(dto: CreateCitaDto, usuarioId: string) {
  return this.prisma.cita.create({
    data: {
      fecha: new Date(dto.fecha),
      hora: dto.hora,
      motivo: dto.motivo,
      especialidad: dto.especialidad,
      estado: 'PENDIENTE',
      usuarioId,
      pacienteId: dto.pacienteId,
    },
  });
}

async obtenerCitasPorUsuario(usuarioId: string) {
  return this.prisma.cita.findMany({
    where: { usuarioId },
    include: { paciente: true }, // ✅ para mostrar nombre del paciente en frontend
    orderBy: { fecha: 'asc' },
  });
}

async cancelarCita(id: string, usuarioId: string) {
  return this.prisma.cita.updateMany({
    where: { id, usuarioId },
    data: { estado: 'CANCELADA' },
  });
}

}
