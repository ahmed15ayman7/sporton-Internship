import { Injectable, NotFoundException } from '@nestjs/common';
import { removeFields } from '../utils/object.util';
import { Admin} from '@shared/prisma';
import { BaseService } from 'src/common/services/base.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AdminsService extends BaseService<Admin> {
  constructor(prisma: PrismaService) {
    super(prisma, 'admin');
  }
  async create(data: any): Promise<Admin> {
    const password = await bcrypt.hash(data.password, 10);
    return super.create({ ...data, password });
  }
  async findByEmail(email: string): Promise<Admin> {
    const admin = await this.prisma.admin.findUniqueOrThrow({
        where: { email },
    });
    if (!admin) {
        throw new NotFoundException('المستخدم غير موجود');
    }
    return admin;
}

  mapUserWithoutPassword(user: Admin) {
    const userWithoutPassword = removeFields(user, ['password']);

    return {
      ...userWithoutPassword,
      id: userWithoutPassword.id,
    };
  }
}
