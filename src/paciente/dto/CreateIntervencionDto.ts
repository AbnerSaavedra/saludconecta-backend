import { IsNotEmpty, IsString, IsDateString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIntervencionDto {
  @ApiProperty({ example: 'Preventiva', description: 'Tipo de intervención clínica' })
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @ApiProperty({ example: 'Caries profunda en premolar', description: 'Diagnóstico clínico realizado' })
  @IsNotEmpty()
  @IsString()
  diagnostico: string;

  @ApiProperty({ example: 'Aplicación de flúor', description: 'Tratamiento realizado durante la intervención' })
  @IsOptional()
  @IsString()
  tratamientoRealizado?: string;

  @ApiProperty({ example: 'Paciente con sensibilidad en premolares', description: 'Observaciones clínicas adicionales' })
  @IsOptional()
  @IsString()
  observaciones?: string;

  @ApiProperty({ example: '2025-09-02', description: 'Fecha de la intervención' })
  @IsNotEmpty()
  @IsDateString()
  fecha: string;

  @ApiProperty({ example: 12, description: 'ID del paciente asociado' })
  @IsNotEmpty()
  @IsInt()
  pacienteId: number;

  @ApiProperty({ example: 'uuid-del-usuario', description: 'ID del profesional que realiza la intervención' })
  @IsNotEmpty()
  @IsString()
  usuarioId: string;

  @ApiProperty({ example: 'uuid-del-odontograma', description: 'ID del odontograma vinculado' })
  @IsOptional()
  @IsString()
  odontogramaId?: string;
}
