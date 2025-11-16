import { User } from '@shared/prisma';
import { CreateUserDto } from 'src/dtos/User.create.dto';
import { UserDto } from 'src/dtos/User.dto';

export type RegisterDTO = Omit<
  CreateUserDto,
  | 'createdAt'
  | 'updatedAt'
  | 'lastLogin'
  | 'status'
  | 'isOnline'
  | 'isProfileCompleted'
  | 'isChoseRole'
>;

export type UserResponseDTO = {
  accessToken: string;
  refreshToken: string;
  userData: Omit<User, 'password'>;
};

export type LoginDTO = Pick<CreateUserDto, 'email' | 'password'>;
