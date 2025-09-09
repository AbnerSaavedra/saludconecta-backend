import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateOdontogramaDto {
  @IsString()
  pieza: string;

  @IsString()
  estado: string;

  @IsString()
  tratamientoSugerido: string;

  @IsDateString()
  fecha: Date;
}
