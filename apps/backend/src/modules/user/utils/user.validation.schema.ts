import { RegisterDTO } from 'src/modules/auth/dto/auth.dto';
import z, { ZodType } from 'zod';
import { updateUserDTO } from '../dto/user.dto';
import { Role, Sport, UserStatus } from '@shared/prisma';

export const validationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email().toLowerCase(), // validate and transform to lowercase
  password: z.string().min(6).max(100),
  role: z.nativeEnum(Role),
  phone: z.string().min(10).max(10).optional(),
  image: z.string().min(1).max(255).optional(),
  cover: z.string().min(1).max(255).optional(),
  country: z.string().min(1).max(255).optional(),
  city: z.string().min(1).max(255).optional(),
  language: z.string().min(1).max(255).optional(),
  sport: z.nativeEnum(Sport),
}) satisfies ZodType<RegisterDTO>;

export const updateUserSchema =
  validationSchema.partial() satisfies ZodType<updateUserDTO>;
