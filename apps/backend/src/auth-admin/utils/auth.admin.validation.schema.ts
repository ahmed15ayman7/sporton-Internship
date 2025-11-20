import { validationSchema } from 'src/modules/user/utils/user.validation.schema';
import { ZodType } from 'zod';
import { LoginDTO } from '../dto/auth-admin.dto';
import { adminValidationSchema } from 'src/modules/admin/utils/admin.validation.schema';

export const registerValidationSchema = adminValidationSchema;

export const loginValidationSchema = adminValidationSchema
  .pick({
    email: true,
    password: true,
  })
  .strict() satisfies ZodType<LoginDTO>;
