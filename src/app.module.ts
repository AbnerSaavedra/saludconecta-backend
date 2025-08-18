import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PacienteModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
