import { Admin, User } from '@shared/prisma';

export type updateAdminDTO = Partial<Pick<Admin, 'name' | 'email'>>;
