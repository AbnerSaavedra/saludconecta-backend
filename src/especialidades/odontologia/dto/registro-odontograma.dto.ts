import { IsNotEmpty, IsString, IsDateString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistroOdontogramaDto {
  @ApiProperty({ example: '1.6', description: 'Identificador de la pieza dental' })
  @IsNotEmpty()
  @IsString()
  pieza: string;

  @ApiProperty({ example: 'superior izquierdo', description: 'Cuadrante dental (opcional)' })
  @IsOptional()
  @IsString()
  cuadrante?: string;

  @ApiProperty({ example: 'pendiente', description: 'Estado clínico de la pieza' })
  @IsNotEmpty()
  @IsString()
  estado: string;

  @ApiProperty({ example: 'Obturación con resina', description: 'Tratamiento sugerido por el profesional' })
  @IsNotEmpty()
  @IsString()
  tratamientoSugerido: string;

  @ApiProperty({ example: '2025-09-02', description: 'Fecha de registro clínico' })
  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @ApiProperty({ example: 12, description: 'ID del paciente asociado' })
  @IsNotEmpty()
  @IsInt()
  pacienteId: number;

  @ApiProperty({ example: 'uuid-del-usuario', description: 'ID del profesional que registra el odontograma' })
  @IsNotEmpty()
  @IsString()
  usuarioId: string;
}
