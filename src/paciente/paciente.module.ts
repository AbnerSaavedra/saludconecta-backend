import { Module } from '@nestjs/common';
import { PacienteController } from './paciente.controller';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';

@Module({
  controllers: [PacienteController],
  providers: [PacienteService]
})
export class PacienteModule {}
