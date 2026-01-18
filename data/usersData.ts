import { User } from '@/types/userManagement';

export const defaultUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'superAdmin',
    status: 'active',
    joinDate: 'Jan 2024',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'producer',
    status: 'active',
    joinDate: 'Feb 2024',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'seller',
    status: 'active',
    joinDate: 'Mar 2024',
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'seller',
    status: 'inactive',
    joinDate: 'Apr 2024',
  },
];
