import { CustomTabLayout, TabConfig } from '@/components/navigation/CustomTabLayout';
import { Ionicons } from '@expo/vector-icons';

const superAdminTabs: TabConfig[] = [
  {
    name: 'index',
    label: 'Home',
    icon: Ionicons,
    iconName: 'home-outline',
    iconNameFocused: 'home',
  },

  {
    name: 'eggTypes',
    label: 'Egg Types',
    icon: Ionicons,
    iconName: 'egg-outline',
    iconNameFocused: 'egg',
  },
];

export default function SuperAdminLayout() {
  // Keep non-tab routes accessible but hidden from the tab bar
  return (
    <CustomTabLayout
      tabs={superAdminTabs}
      hiddenRoutes={['add-user', 'assign-role']}
      resetOnTabPress
    />
  );
}