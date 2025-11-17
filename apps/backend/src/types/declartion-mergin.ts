import { AdminResponseDTO } from 'src/modules/auth-admin/dto/auth.admin.dto';
import { UserResponseDTO } from 'src/modules/auth/dto/auth.dto';

export type EnvVariables = {
  JWT_SECRET: string;
  IMAGEKIT_PRIVATE_KEY: string;
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
