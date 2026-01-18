export type UserRole = 'superAdmin' | 'producer' | 'seller';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinDate: string;
  avatar?: string;
}
