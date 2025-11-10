import { Contact } from '@shared/prisma';

export type ContactDTO = Omit<
  Contact,
  'id' | 'createdAt' | 'status' | 'updatedAt'
>;
export type ContactUpdateDTO = Pick<Contact, 'status'>;
