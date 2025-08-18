import { ApiProperty } from '@nestjs/swagger';

export class CreatePacienteDto {
  @ApiProperty({ example: 'V12345678', description: 'Cédula del paciente' })
  cedula: string;

  @ApiProperty({ example: 'María', description: 'Nombre del paciente' })
  nombre: string;

  @ApiProperty({ example: 'González', description: 'Apellido del paciente' })
  apellido: string;

  @ApiProperty({ example: '1990-05-20', description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  fechaNacimiento: string;

  @ApiProperty({ example: '04141234567', required: false })
  telefono?: string;

  @ApiProperty({ example: 'maria@gcorreo.com', required: false })
  correo?: string;

  @ApiProperty({ example: 'Av. Bolívar, Barquisimeto', required: false })
  direccion?: string;
}
