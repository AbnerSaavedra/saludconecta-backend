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

  @ApiProperty({ example: '+58 412-1234567', required: false })
  telefono?: string;

  @ApiProperty({ example: 'Barquisimeto, Lara', required: false })
  direccion?: string;

  @ApiProperty({ example: '1990-05-12', required: false })
  fechaNacimiento?: string;

  @ApiProperty({ example: 'Activo', enum: ['Activo', 'Suspendido'], required: false })
  estado?: string;

  @ApiProperty({ example: '2025-09-09T15:00:00.000Z', required: false })
  createdAt?: string;
}
