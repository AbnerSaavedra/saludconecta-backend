import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

export const generateAccessToken = (jwt: JwtService, user: User): string =>
  jwt.sign({
    sub: user.id,
    email: user.email,
    role: user.role,
  });
