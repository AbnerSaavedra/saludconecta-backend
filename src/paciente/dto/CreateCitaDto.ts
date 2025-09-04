export class CreateCitaDto {
  fecha: Date;
  hora: string;
  motivo?: string;
  estado?: string;
  especialidad: string;
  pacienteId: number;
  usuarioId: string;
}
