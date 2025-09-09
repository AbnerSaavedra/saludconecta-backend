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
    if (!fs.existsSync(ruta)) {
      console.error(`❌ Plantilla no encontrada: ${ruta}`);
      throw new Error('La plantilla de correo no está disponible en el entorno actual.');
    }
    return fs.readFileSync(ruta, 'utf8');
  }

  async enviarRecuperacion(email: string, nombre: string, token: string, ip: string) {
    console.log('📧 Configuración SMTP:', {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      user: process.env.MAIL_USER,
    });
    const plantilla = this.cargarPlantilla('recuperar.html')
      .replace('{{nombre}}', nombre)
      .replace('{{email}}', email)
      .replace('{{fecha}}', new Date().toLocaleString())
      .replace('{{ip}}', ip)
      .replace('{{enlaceRecuperacion}}', `http://localhost:5173/restablecer/${token}`)
      .replace('{{urlSistema}}', 'http://localhost:5173/')
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
