import { Admin } from '@shared/prisma';
import { CreateAdminDto } from 'src/dtos/Admin.create.dto';

export type RegisterAdminDTO = Omit<
  CreateAdminDto,
  'id' | 'createdAt' | 'isDeleted' | 'status'
>;

export type AdminResponseDTO = {
  accessToken: string;
  refreshToken: string;
  adminData: Omit<Admin, 'password'>;
};

export type LoginDTO = Pick<Admin, 'email' | 'password'>;
