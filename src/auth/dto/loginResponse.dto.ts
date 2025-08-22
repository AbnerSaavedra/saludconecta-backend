import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Token JWT clínico' })
  accessToken: string;

  @ApiProperty({ example: 'MÉDICO', description: 'Rol clínico del usuario autenticado' })
  role: string;

  @ApiProperty({ example: 'juanperez@email.com', description: 'Email simbólico del usuario' })
  email: string;
}
