import { Request } from 'express';
import { User } from '@prisma/client'; // o tu entidad personalizada si no usas Prisma directamente

export interface RequestWithUser extends Request {
  user: User;
}
