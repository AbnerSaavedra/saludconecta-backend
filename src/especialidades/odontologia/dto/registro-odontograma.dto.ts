import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistroOdontogramaDto {
  @ApiProperty({ example: '1.6', description: 'Identificador de la pieza dental' })
  @IsNotEmpty()
  @IsString()
  pieza: string;

  @ApiProperty({ example: 'Caries profunda', description: 'Diagnóstico clínico' })
  @IsNotEmpty()
  @IsString()
  diagnostico: string;

  @ApiProperty({ example: 'Obturación con resina', description: 'Tratamiento aplicado' })
  @IsNotEmpty()
  @IsString()
  tratamiento: string;

  @ApiProperty({ example: '2025-09-02', description: 'Fecha de intervención' })
  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @IsInt()
  pacienteId: number;
}
