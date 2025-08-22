import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { comparePassword, hashPassword } from '../helpers/hash.helper';
import { generateAccessToken } from '../helpers/token.helper';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
        where: { email: email },
        select: {
            id: true,
            email: true,
            password: true,
            role: true,
        },
        });

    if (!user) return null;

    const isValid = await comparePassword(password, user.password);
    return isValid ? user : null;
  }

  // auth.service.ts
async login(dto: LoginDto): Promise<LoginResponseDto> {
  const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
    throw new UnauthorizedException('Credenciales inválidas. Verifica tu correo clínico y contraseña.');
    }

    const token = this.jwtService.sign({ sub: user.id, role: user.role });

    return {
    accessToken: token,
    role: user.role,
    email: user.email,
    };
}


  async register(dto: CreateUserDto) {
    const hashed = await hashPassword(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        role: dto.role,
      },
    });

    return {
      access_token: generateAccessToken(this.jwtService, user),
    };
  }
}
