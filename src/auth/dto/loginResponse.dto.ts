import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Token JWT clínico',
  })
  accessToken: string;

  @ApiProperty({
    example: 'Pedro Pérez',
    description: 'El nombre del usuario',
  })
  name: string;

  @ApiProperty({
    isArray: true,
    enum: Role,
    example: [Role.ADMIN, Role.MEDICO],
    description: 'Roles clínicos del usuario autenticado',
  })
  roles: Role[];

  @ApiProperty({
    example: 'juanperez@email.com',
    description: 'Email simbólico del usuario',
  })
  email: string;

  @ApiProperty({
    example: 'Odontología',
    description: 'La especialidad que tenga el usurio con rol Médico',
  })
  specialty?: string;
}
