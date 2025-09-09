// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  private cargarPlantilla(nombre: string): string {
    const ruta = path.join(__dirname, 'templates', nombre);
    return fs.readFileSync(ruta, 'utf8');
  }

  async enviarRecuperacion(email: string, nombre: string, token: string, ip: string) {
    const plantilla = this.cargarPlantilla('recuperar.html')
      .replace('{{nombre}}', nombre)
      .replace('{{email}}', email)
      .replace('{{fecha}}', new Date().toLocaleString())
      .replace('{{ip}}', ip)
      .replace('{{enlaceRecuperacion}}', `https://tusistema.com/restablecer/${token}`)
      .replace('{{urlSistema}}', 'https://tusistema.com')
      .replace('{{nombreSistema}}', 'Sistema Clínico Modular');

    await this.mailer.sendMail({
      to: email,
      subject: 'Recuperación de acceso a tu cuenta clínica',
      html: plantilla,
    });
  }

  // Puedes agregar más métodos como:
  // enviarConfirmacionCita(), enviarValidacionEtica(), etc.
}
