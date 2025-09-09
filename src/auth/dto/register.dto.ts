import { IsEmail, IsString, MinLength, IsEnum, isNotEmpty, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateIf } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {

  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'medico@salud.com', description: 'Correo clínico del usuario' })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({ example: 'securePass123', minLength: 6, description: 'Contraseña segura' })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ enum: Role, isArray: true, example: [Role.ADMIN, Role.MEDICO] })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ApiProperty({ example: 'Pediatría', required: false })
  @ValidateIf((dto) => dto.roles?.includes(Role.MEDICO))
  @IsNotEmpty({ message: 'La especialidad es obligatoria para el rol MEDICO' })
  specialty?: string;

  @ApiProperty({ example: '+58 412-1234567', required: false })
  @IsString()
  telefono?: string;

  @ApiProperty({ example: 'Barquisimeto, Lara', required: false })
  @IsString()
  direccion?: string;

  @ApiProperty({ example: '1990-05-12', required: false })
  @IsString()
  fechaNacimiento?: string;
}
