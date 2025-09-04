import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateCitaDto {
  @IsDateString()
  fecha: string;

  @IsString()
  hora: string;

  @IsOptional()
  @IsString()
  motivo?: string;

  @IsString()
  especialidad: string;
}
