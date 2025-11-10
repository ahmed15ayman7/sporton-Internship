import { User } from '@shared/prisma';

export type RegisterDTO = Omit<User, 'id' | 'createdAt' | 'isDeleted'>;

export type UserResponseDTO = {
  token: string;
  userData: Omit<User, 'password'>;
};

export type LoginDTO = Pick<User, 'email' | 'password'>;
