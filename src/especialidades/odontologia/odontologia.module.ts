import { Module } from '@nestjs/common';
import { OdontologiaController } from './odontologia.controller';
import { OdontologiaService } from './odontologia.service';

@Module({
    controllers: [OdontologiaController],
    providers: [OdontologiaService],
    exports: [OdontologiaService]
})
export class OdontologiaModule {}
