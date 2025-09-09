// src/mail/mail.module.ts
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.tuservidor.com',
        port: 587,
        auth: {
          user: 'tu-correo@tusistema.com',
          pass: 'clave-segura',
        },
      },
      defaults: {
        from: '"Soporte Clínico" <soporte@tusistema.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
