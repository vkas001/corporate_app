import { UserRole } from '@/types/userManagement';
import { useState } from 'react';

export const useUserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const getRoleColor = (role: string, colors: any) => {
    switch (role) {
      case 'superAdmin':
        return colors.primary;
      case 'admin':
        return '#7C3AED';
      case 'producer':
        return '#2F855A';
      case 'seller':
        return '#2B6CB0';
      default:
        return colors.border;
    }
  };

  const getRoleIcon  = (role: string) => {
    switch (role) {
      case 'superAdmin':
        return 'shield-checkmark-outline';
      case 'admin':
        return 'shield-outline';
      case 'producer':
        return 'leaf-outline';
      case 'seller':
        return 'storefront-outline';
      default:
        return 'person-outline';
    }
  };

  const getRoleDescription = (role: UserRole): string => {
    switch (role) {
      case 'superAdmin':
        return 'Full access to all features';
      case 'admin':
        return 'Manage users and settings';
      case 'producer':
        return 'Manage production and related records';
      case 'seller':
        return 'Manage sales and related records';
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
