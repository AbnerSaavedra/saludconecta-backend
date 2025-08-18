// src/paciente/paciente.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Injectable()
export class PacienteService {
  constructor(private readonly prisma: PrismaService) {}

  async crear(dto: CreatePacienteDto) {
    return this.prisma.paciente.create({
      data: {
        ...dto,
        fechaNacimiento: new Date(dto.fechaNacimiento),
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
}
