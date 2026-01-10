import { UserRole } from '@/types/userManagement';
import { useState } from 'react';

export const useUserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleColor = (role: string, colors: any) => {
    switch (role) {
      case 'admin':
        return colors.primary;
      case 'manager':
        return '#8C5E34';
      case 'staff':
        return colors.textSecondary;
      default:
        return colors.border;
    }
  };

  const getRoleIcon  = (role: string) => {
    switch (role) {
      case 'admin':
        return 'shield-checkmark-outline';
      case 'manager':
        return 'briefcase-outline';
      case 'staff':
        return 'person-outline';
      default:
        return 'person-outline';
    }
  };

  const getRoleDescription = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return 'Full access to all features';
      case 'manager':
        return 'Can manage staff and reports';
      case 'staff':
        return 'Limited access to assigned tasks';
      default:
        return '';
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    getRoleColor,
    getRoleIcon,
    getRoleDescription,
  };
};
