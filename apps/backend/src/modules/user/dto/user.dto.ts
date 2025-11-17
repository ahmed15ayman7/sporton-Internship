import { User } from '@shared/prisma';

export type updateUserDTO = Partial<Pick<User, 'name' | 'email'>>;
