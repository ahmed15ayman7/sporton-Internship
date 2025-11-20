import { Admin } from '@shared/prisma';

export type RegisterDTO = Omit<Admin, 'id' | 'createdAt' | 'isDeleted'>;

export type AdminResponseDTO = {
  accessToken: string;
  refreshToken: string;
  adminData: Omit<Admin, 'password'>;
};

export type LoginDTO = Pick<Admin, 'email' | 'password'>;
