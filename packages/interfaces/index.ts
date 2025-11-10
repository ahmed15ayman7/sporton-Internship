

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  isDeleted: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}