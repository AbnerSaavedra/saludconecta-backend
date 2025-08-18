import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  Matches,
  IsEmail,
  Length,
} from 'class-validator';

export class CreatePacienteDto {
  @ApiProperty({ example: 'V12345678', description: 'Cédula del paciente' })
  @IsString()
  @IsNotEmpty({ message: 'La cédula es obligatoria' })
  @Matches(/^[VE]-?\d{7,9}$/, {
    message: 'Formato de cédula inválido (ej: V12345678)',
  })
  cedula: string;

  @ApiProperty({ example: 'María', description: 'Nombre del paciente' })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  nombre: string;

  @ApiProperty({ example: 'González', description: 'Apellido del paciente' })
  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @Length(2, 50, { message: 'El apellido debe tener entre 2 y 50 caracteres' })
  apellido: string;

  @ApiProperty({
    example: '1990-05-20',
    description: 'Fecha de nacimiento (YYYY-MM-DD)',
  })
  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  fechaNacimiento: string;

  @ApiProperty({ example: '04141234567', required: false })
  @IsOptional()
  @Matches(/^0(412|414|416|424|426)\d{7}$/, {
    message: 'Teléfono inválido (ej: 04141234567)',
  })
  telefono?: string;

  @ApiProperty({ example: 'maria@gcorreo.com', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'Correo electrónico inválido' })
  correo?: string;

  @ApiProperty({
    example: 'Av. Bolívar, Barquisimeto',
    required: false,
  })
  @IsOptional()
  @IsString()
  direccion?: string;
}
