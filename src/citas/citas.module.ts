import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';

@Module({
  providers: [CitasService],
  controllers: [CitasController]
})
export class CitasModule {}
