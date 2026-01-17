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
  
];

export default function TabLayout() {

  return (
    <CustomTabLayout
      tabs={superAdminTabs}
      hiddenRoutes={['add-user']}
      resetOnTabPress
    />
  );
}