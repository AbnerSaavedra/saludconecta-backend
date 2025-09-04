import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateOdontogramaDto {
  @IsString()
  pieza: string;

  @IsString()
  diagnostico: string;

  @IsString()
  tratamiento: string;

  @IsDateString()
  fecha: Date;
}
