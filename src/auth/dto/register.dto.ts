import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'medico@salud.com', description: 'Correo clínico del usuario' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({ example: 'securePass123', minLength: 6, description: 'Contraseña segura' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ enum: Role, example: Role.MEDICO, description: 'Rol clínico del usuario' })
  @IsEnum(Role, { message: 'Rol no válido' })
  role: Role;
}
