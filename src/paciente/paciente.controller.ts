import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  Req,
  ForbiddenException,
  BadRequestException,
  UseGuards,
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
  ApiBearerAuth
} from '@nestjs/swagger';
import { CreateOdontogramaDto } from './dto/CreateOdontogramaDto';
import { CreateCitaDto } from './dto/CreateCitaDto';
import { CreateIntervencionDto } from './dto/CreateIntervencionDto';
import { AuthGuard } from '@nestjs/passport';
import { esFechaIgualOPosterior } from 'src/utils/functions';


@ApiTags('Pacientes')
@Controller('pacientes')
@UseGuards(AuthGuard("jwt"))
export class PacienteController {
  constructor(private readonly pacienteService: PacienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear paciente clínico' })
  @ApiResponse({ status: 201, description: 'Paciente creado exitosamente' })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: CreatePacienteDto })
  async crear(@Body() dto: CreatePacienteDto) {
    console.log("Crear paciente DTO recibido:", JSON.stringify(dto, null, 2));
    console.log("Crear paciente: ", dto)
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
    console.log("Solicitud entrando Ctll")
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
    console.log("Obtener odontograma por paciente: ", id)
    return this.pacienteService.obtenerOdontograma(id);
  }

  @Post(':id/odontograma')
  async registrarOdontograma(
    @Body() dto: CreateOdontogramaDto,
    @Param('id') id: number,
    @Req() req: Request
  ) {
    console.log("Odontograma dto ctr: ", dto)
    const usuarioId = (req as any).user.id;

     return this.pacienteService.registrarOdontograma({
      ...dto,
      pacienteId: id,
      usuarioId,
    });
  }

  @Post(':id/citas')
  async registrarCita(
  @Param('id') id: number,
  @Body() dto: Omit<CreateCitaDto, 'estado'> & {
  pacienteId: number;
  usuarioId: string;
  estado?: string;
},
    @Req() req: Request
  ) {
    console.log("Agregar cita: ", dto)
    const user = (req as any).user;
    // ✅ Validación ética por rol
    if (!user.roles.includes('MEDICO')) {
      throw new ForbiddenException('Solo médicos pueden registrar citas');
    }

    // ✅ Validación de fecha
    const fechaCita = new Date(`${dto.fecha}T${dto.hora}:00`);
    const hoy = new Date();

    hoy.setHours(0, 0, 0, 0);

    const fechaCitaNormalizada = new Date(fechaCita);
    fechaCitaNormalizada.setHours(0, 0, 0, 0);
    console.log("Fecha cita: ", fechaCita)
    console.log("Hoy: ", hoy)
    if (fechaCitaNormalizada < hoy) {
      throw new BadRequestException('La fecha debe ser igual o posterior a hoy');
    }

    const usuarioId = user.id;

    // ✅ Registro clínico
    const cita = await this.pacienteService.registrarCita({
      ...dto,
      pacienteId: id,
      usuarioId,
      estado: 'PENDIENTE',
    });

    // ✅ Respuesta estructurada
    return {
      mensaje: '✅ Cita registrada correctamente',
      cita,
    };
  }

    @Post(':id/intervenciones')
    async registrarIntervencion(
    @Param('id') id: number,
    @Body() dto: CreateIntervencionDto,
    @Req() req: Request
  ) {
    const usuarioId = (req as any).user.id;
    return this.pacienteService.registrarIntervencion({ ...dto, pacienteId: id, usuarioId: usuarioId });
  }

}
