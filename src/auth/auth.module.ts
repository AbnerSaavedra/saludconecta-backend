import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ asegura que .env esté disponible
    PassportModule.register({ defaultStrategy: 'jwt' }), // ✅ registra la estrategia por defecto
    JwtModule.register({
      secret: process.env.JWT_SECRET, // ✅ usa la misma clave que en .env
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    MailModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
