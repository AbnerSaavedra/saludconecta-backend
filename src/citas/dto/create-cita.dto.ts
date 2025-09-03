import { IsDateString, IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCitaDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  hora: string;

  @IsString()
  motivo?: string;

  @IsString()
  @IsNotEmpty()
  especialidad: string;

  @IsInt()
  pacienteId: number;
}
