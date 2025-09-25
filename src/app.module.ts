import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteModule } from './paciente/paciente.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { CitasModule } from './citas/citas.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ hace que esté disponible en todos los módulos
    }),
    AuthModule, PacienteModule, PrismaModule, UsersModule, EspecialidadesModule, CitasModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
