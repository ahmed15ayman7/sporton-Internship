import { User } from '@shared/prisma';
import { UpdateUserDto } from 'src/dtos/User.update.dto';

export type updateUserDTO = Partial<
  Omit<UpdateUserDto, 'isOnline' | 'isProfileCompleted' | 'isChoseRole'>
>;
