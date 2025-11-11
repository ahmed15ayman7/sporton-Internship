export type Role = 'PLAYER' | 'COACH' | 'AGENT' | 'CLUB' | 'COMPANY' | 'SCOUT' | 'TRAINER' | 'GUEST';

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR' | 'MONITOR' | 'MARKETING';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role | undefined;
  createdAt: Date;
  isDeleted: boolean;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
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