import { User } from '@prisma/client';

export interface JWTPayload {
  id: User['id'];
  email: User['email'];
}
