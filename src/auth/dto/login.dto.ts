import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class LoginDto {
  @ApiProperty({
    example: 'medico@salud.com',
    description: 'Correo clínico registrado en el sistema',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securePass123',
    minLength: 8,
    description: 'Contraseña clínica con mínimo 8 caracteres',
  })
  @MinLength(8)
  password: string;
}
