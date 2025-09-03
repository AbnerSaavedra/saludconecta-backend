import { Module } from '@nestjs/common';
import { OdontologiaModule } from './odontologia/odontologia.module';

@Module({
  imports: [OdontologiaModule]
})
export class EspecialidadesModule {}
