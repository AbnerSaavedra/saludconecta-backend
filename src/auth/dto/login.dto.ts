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
    minLength: 4,
    description: 'Contraseña clínica con mínimo 4 caracteres',
  })
  @MinLength(4)
  password: string;
}
