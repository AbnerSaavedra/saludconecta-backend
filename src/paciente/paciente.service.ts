// src/paciente/paciente.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { CreateOdontogramaDto } from './dto/CreateOdontogramaDto';
import { CreateCitaDto } from './dto/CreateCitaDto';
import { CreateIntervencionDto } from './dto/CreateIntervencionDto';

@Injectable()
export class PacienteService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(dto: CreatePacienteDto) {
    const cedulaExistente = await this.prisma.paciente.findUnique({
      where: { cedula: dto.cedula },
    });

    if (cedulaExistente) {
      throw new BadRequestException('La cédula ya está registrada');
    }

    return this.prisma.paciente.create({
      data: {
        cedula: dto.cedula,
        nombre: dto.nombre,
        apellido: dto.apellido,
        fechaNacimiento: new Date(dto.fechaNacimiento),
        telefono: dto.telefono,
        correo: dto.correo,
        direccion: dto.direccion,
      },
    });
  }

  async listarTodos() {
    return this.prisma.paciente.findMany({
      orderBy: { creadoEn: 'desc' },
    });
  }

  async buscarPorId(id: number) {
    const paciente = await this.prisma.paciente.findUnique({ where: { id } });
    if (!paciente) throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
    return paciente;
  }

  async actualizar(id: number, dto: UpdatePacienteDto) {
    await this.buscarPorId(id); // Validación ética
    return this.prisma.paciente.update({
      where: { id },
      data: {
        ...dto,
        fechaNacimiento: dto.fechaNacimiento ? new Date(dto.fechaNacimiento) : undefined,
      },
    });
  }

  async eliminar(id: number) {
    await this.buscarPorId(id); // Validación ética
    return this.prisma.paciente.delete({ where: { id } });
  }

  async obtenerIntervencionesPorPaciente(pacienteId: number) {
    return this.prisma.intervencion.findMany({
      where: { pacienteId },
      orderBy: { fecha: 'desc' },
      include: {
        usuario: {
          select: {
            name: true,
            specialty: true,
          },
        },
      },
    });
  }


  async obtenerHistorialCompleto(pacienteId: number) {
    const citas = await this.prisma.cita.findMany({
      where: { pacienteId },
      orderBy: { fecha: 'desc' },
    });

    const intervenciones = await this.prisma.intervencion.findMany({
      where: { pacienteId },
      orderBy: { fecha: 'desc' },
    });

    return { citas, intervenciones };
  }

  async obtenerCitasPorPaciente(pacienteId: number) {
    return this.prisma.cita.findMany({
      where: { pacienteId },
      orderBy: { fecha: 'desc' },
    });
  }

  async obtenerOdontograma(pacienteId: number) {
    return this.prisma.intervencion.findMany({
      where: { pacienteId },
      orderBy: { fecha: 'desc' },
    });
  }

    async registrarOdontograma(dto: CreateOdontogramaDto) {
    return this.prisma.odontograma.create({
      data: {
        ...dto,
      },
    });
  }

  async registrarCita(dto: CreateCitaDto) {
    return this.prisma.cita.create({
      data: {
        estado: 'PENDIENTE',
        ...dto,
      },
    });
  }

  async registrarIntervencion(dto: CreateIntervencionDto) {
    return this.prisma.intervencion.create({
      data: {
        ...dto,
      },
    });
  }

  

}
