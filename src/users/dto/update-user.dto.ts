import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, MinLength, IsEnum } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/common/enums/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsEnum(Role, { message: 'Rol no válido' })
  role?: Role;
  fechaNacimiento: any;
}
