import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
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
  crear(@Body() dto: CreatePacienteDto) {
    return this.pacienteService.crear(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los pacientes' })
  @ApiResponse({ status: 200, description: 'Listado completo de pacientes' })
  listar() {
    return this.pacienteService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar paciente por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  buscar(@Param('id') id: string) {
    return this.pacienteService.buscarPorId(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de paciente' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del paciente' })
  @ApiBody({ type: UpdatePacienteDto })
  @ApiResponse({ status: 200, description: 'Paciente actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  actualizar(@Param('id') id: string, @Body() dto: UpdatePacienteDto) {
    return this.pacienteService.actualizar(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar paciente clínico' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del paciente' })
  @ApiResponse({ status: 200, description: 'Paciente eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
  eliminar(@Param('id') id: string) {
    return this.pacienteService.eliminar(+id);
  }
}
