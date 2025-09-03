import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto } from './dto/create-cita.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('citas')
@UseGuards(AuthGuard('jwt'))
export class CitasController {
  constructor(private readonly citasService: CitasService) {}

  @Post()
  async crear(@Body() dto: CreateCitaDto, @Req() req: RequestWithUser) {
    return this.citasService.crearCita(dto, req.user.id);
  }

  @Get()
  async listar(@Req() req: RequestWithUser) {
    return this.citasService.obtenerCitasPorUsuario(req.user.id);
  }

  @Delete(':id')
  async cancelar(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.citasService.cancelarCita(id, req.user.id);
  }
}
