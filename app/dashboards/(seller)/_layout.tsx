import { CustomTabLayout, TabConfig } from '@/components/navigation/CustomTabLayout';
import { Ionicons } from '@expo/vector-icons';

const sellerTabs: TabConfig[] = [
  {
    name: 'index',
    label: 'Home',
    icon: Ionicons,
    iconName: 'home-outline',
    iconNameFocused: 'home',
  },
  {
    name: 'sales',
    label: 'Record',
    icon: Ionicons,
    iconName: 'clipboard-outline',
    iconNameFocused: 'clipboard',
  },
  {
    name: 'profile',
    label: 'Profile',
    icon: Ionicons,
    iconName: 'person-outline',
    iconNameFocused: 'person',
  },
];

export default function TabLayout() {
  return <CustomTabLayout tabs={sellerTabs} />;
}