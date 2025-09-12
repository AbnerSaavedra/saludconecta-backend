import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, hashPassword } from '../helpers/hash.helper';
import { generateAccessToken } from '../helpers/token.helper';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
        where: { email: email },
        select: {
            id: true,
            email: true,
            password: true,
            roles: true,
            name: true,
            specialty: true,
            telefono: true,
            direccion: true,
            fechaNacimiento: true,
            estado: true,
            createdAt: true,
        },
        });

    if (!user) return null;

    const isValid = await comparePassword(password, user.password);
    return isValid ? user : null;
  }

  // auth.service.ts
async login(dto: LoginDto): Promise<LoginResponseDto> {
  const user = await this.validateUser(dto.email, dto.password);

  console.log("User: ", user)

    if (!user) {
    throw new UnauthorizedException('Credenciales inválidas. Verifica tu correo clínico y contraseña.');
    }

    //const token = this.jwtService.sign({ sub: user.id, role: user.roles });
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      roles: user.roles, // ✅ plural y consistente
    });


    return {
      accessToken: token,
      roles: user.roles,
      email: user.email,
      name: user.name,
      specialty: user?.specialty || '',
      telefono: user?.telefono || '',
      direccion: user?.direccion || '',
      fechaNacimiento: user.fechaNacimiento?.toISOString(),
      estado: user.estado,
      createdAt: user.createdAt.toISOString(),
    };
}


  async register(dto: RegisterDto) {
    console.log("Usuario DTO: ", dto)
  const existing = await this.prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (existing) {
    throw new BadRequestException('Ya existe un usuario con ese correo');
  }

  const hashed = await hashPassword(dto.password);

  const user = await this.prisma.user.create({
    data: {
      name: dto.name,
      email: dto.email,
      password: hashed,
      roles: dto.roles,
      specialty: dto.specialty ?? '',
      telefono: dto.telefono,
      direccion: dto.direccion,
      fechaNacimiento: dto.fechaNacimiento && !isNaN(Date.parse(dto.fechaNacimiento))
        ? new Date(dto.fechaNacimiento)
        : undefined,

    },
  });

  return {
    access_token: generateAccessToken(this.jwtService, user),
    roles: user.roles,
    email: user.email,
  };
  
}

generarTokenRecuperacion(usuarioId: string): string {
  return this.jwtService.sign(
    { usuarioId },
    { expiresIn: '15m', secret: this.configService.get('JWT_RECUPERACION') }
  );
}

validarTokenRecuperacion(token: string): { usuarioId: string } {
  try {
    const payload = this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_RECUPERACION'),
    });

    return { usuarioId: payload.usuarioId };
  } catch (err) {
    throw new UnauthorizedException('Token inválido o expirado');
  }
}


}
