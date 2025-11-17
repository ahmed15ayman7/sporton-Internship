import { RegisterDTO } from 'src/modules/auth/dto/auth.dto';
import z, { ZodType } from 'zod';
import { AdminRole, AdminStatus } from '@shared/prisma';
import { CreateAdminDto } from 'src/dtos/Admin.create.dto';
import { UpdateAdminDto } from 'src/dtos/Admin.update.dto';
import { updateUserDTO } from 'src/modules/user/dto/user.dto';

// Admin validation schema for registration
export const adminValidationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().toLowerCase(), // validate and transform to lowercase
  password: z.string().min(6).max(100),
  role: z.nativeEnum(AdminRole),
  phone: z.string().min(10).max(20).optional(),
  status: z.nativeEnum(AdminStatus),
  image: z.string().min(1).max(255).optional(),
});

export const updateUserSchema = adminValidationSchema
  .pick({
    name: true,
    email: true,
  })
  .partial() satisfies ZodType<updateUserDTO>;
