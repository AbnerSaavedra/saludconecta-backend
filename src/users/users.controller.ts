import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private users: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Listar todos los usuarios (solo ADMIN)' })
  @ApiResponse({ status: 200, description: 'Usuarios listados correctamente' })
  findAll() {
    return this.users.findAll();
  }

  @Roles(Role.ADMIN, Role.MEDICO)
  @Get('medicos')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Listar usuarios con rol MÉDICO (ADMIN y MÉDICO)' })
  @ApiResponse({ status: 200, description: 'Médicos listados correctamente' })
  @ApiResponse({ status: 401, description: 'Token inválido o ausente' })
  @ApiResponse({ status: 403, description: 'Acceso denegado por rol clínico' })
  findMedicos() {
    return this.users.findByRole(Role.MEDICO);
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuario por ID (solo ADMIN)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: string) {
    return this.users.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar usuario por ID (solo ADMIN)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario por ID (solo ADMIN)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(@Param('id') id: string) {
    return this.users.remove(id);
  }
}
