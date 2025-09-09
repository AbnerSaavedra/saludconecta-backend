import { Body, Controller, NotFoundException, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
              private mailService: MailService,
              private readonly configService: ConfigService,
              private userService: UsersService,
              private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login clínico ético' })
  @ApiResponse({ status: 201, description: 'Login exitoso', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas o usuario no clínico' })
  login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(dto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro clínico de usuario' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado con éxito' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  register(@Body() dto: RegisterDto) {
    //console.log("Dto user controller: ", dto)
    return this.authService.register(dto);
  }

@Post('recuperar')
async solicitarRecuperacion(@Body('email') email: string, @Req() req: Request) {
  const usuario = await this.userService.findByEmail(email);
  if (!usuario) throw new NotFoundException('Correo no registrado');

  const token = this.authService.generarTokenRecuperacion(usuario.id); // JWT con expiración
  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'IP desconocida';
  //const ip = req.ip || req.headers['x-forwarded-for'] || 'IP desconocida';

  await this.mailService.enviarRecuperacion(usuario.email, usuario.name, token, ip);
  return { mensaje: 'Correo enviado con instrucciones para recuperar la contraseña' };
}


@Post('restablecer')
async restablecer(@Body() dto: { token: string; nuevaClave: string }) {
  const valido = this.authService.validarTokenRecuperacion(dto.token);
  if (!valido) throw new UnauthorizedException('Token inválido o expirado');

  await this.userService.actualizarClave(valido.usuarioId, dto.nuevaClave);
  return { mensaje: 'Contraseña actualizada correctamente' };
}

@Post('restablecer/:token')
async restablecerClave(
  @Param('token') token: string,
  @Body('clave') clave: string,
) {
  try {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_RECUPERACION'),
    });

    await this.userService.actualizarClave(payload.usuarioId, clave);
    return { mensaje: 'Contraseña actualizada correctamente' };
  } catch (err) {
    throw new UnauthorizedException('Token inválido o expirado');
  }
}


}

