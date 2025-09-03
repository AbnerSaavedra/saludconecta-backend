import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { CitasModule } from './citas/citas.module';

@Module({
  imports: [PacienteModule, PrismaModule, AuthModule, UsersModule, EspecialidadesModule, CitasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
