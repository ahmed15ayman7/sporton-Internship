
import { UserResponseDTO } from 'src/auth/dto/auth.dto';
import { Admin } from '@shared/prisma';
import { AdminResponseDTO } from 'src/auth-admin/dto/auth-admin.dto';

export type EnvVariables = {
  JWT_SECRET: string;
  IMAGEKIT_PRIVATE_KEY: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRATION: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserResponseDTO['userData'];
    }
    interface Request {
      admin?: AdminResponseDTO['adminData'];
    }
  }
  namespace NodeJS {
    interface ProcessEnv extends EnvVariables {}
  }
}
