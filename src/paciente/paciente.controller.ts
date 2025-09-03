import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';


@ApiTags('Pacientes')
@Controller('pacientes')
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear paciente clínico' })
  @ApiResponse({ status: 201, description: 'Paciente creado exitosamente' })
  @ApiBody({ type: CreatePacienteDto })
  async crear(@Body() dto: CreatePacienteDto) {
    const paciente = await this.pacienteService.crear(dto);
    return {
      mensaje: 'Paciente creado exitosamente',
      paciente,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los pacientes' })
  @ApiResponse({ status: 200, description: 'Listado completo de pacientes' })
  async listar() {
    const pacientes = await this.pacienteService.listarTodos();
    return {
      mensaje: `Se encontraron ${pacientes.length} pacientes registrados`,
      pacientes,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar paciente por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async buscar(@Param('id') id: string) {
    const paciente = await this.pacienteService.buscarPorId(+id);
    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return {
      mensaje: 'Paciente encontrado',
      paciente,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de paciente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del paciente' })
  @ApiBody({ type: UpdatePacienteDto })
  @ApiResponse({ status: 200, description: 'Paciente actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async actualizar(@Param('id') id: string, @Body() dto: UpdatePacienteDto) {
    const paciente = await this.pacienteService.actualizar(+id, dto);
    if (!paciente) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return {
      mensaje: 'Paciente actualizado correctamente',
      paciente,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar paciente clínico' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  async eliminar(@Param('id') id: string) {
    const eliminado = await this.pacienteService.eliminar(+id);
    if (!eliminado) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return {
      mensaje: 'Paciente eliminado correctamente',
    };
  }

  @Get(':id/intervenciones')
  async intervenciones(@Param('id') id: number) {
    return this.pacienteService.obtenerIntervencionesPorPaciente(id);
  }

  @Get(':id/historial')
  async historial(@Param('id') id: number) {
    return this.pacienteService.obtenerHistorialCompleto(id);
  }

  @Get(':id/citas')
  async citas(@Param('id') id: number) {
    return this.pacienteService.obtenerCitasPorPaciente(id);
  }

  @Get(':id/odontograma')
  async odontograma(@Param('id') id: number) {
    return this.pacienteService.obtenerOdontograma(id);
  }

}
