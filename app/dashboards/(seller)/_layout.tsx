import { CustomTabLayout, TabConfig } from '@/components/Layout';
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
    name: 'stocks',
    label: 'Stock',
    icon: Ionicons,
    iconName: 'stats-chart-outline',
    iconNameFocused: 'stats-chart',
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