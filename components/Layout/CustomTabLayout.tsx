import { useTheme } from '@/theme/themeContext';
import { Tabs } from 'expo-router';
import { TabBarIcon } from './TabBarIcon';

export interface TabConfig {
  name: string;
  label: string;
  icon: any;
  iconName: string;
  iconNameFocused?: string;
}

interface CustomTabLayoutProps {
  tabs: TabConfig[];
  headerShown?: boolean;
  tabBarHeight?: number;
}

export const CustomTabLayout = ({
  tabs,
  headerShown = false,
  tabBarHeight = 70,
}: CustomTabLayoutProps) => {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          height: tabBarHeight,
          backgroundColor: colors.background,
          elevation: 10,
          borderColor: colors.border,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                colors={colors}
                label={tab.label}
                icon={tab.icon}
                iconName={focused ? (tab.iconNameFocused || tab.iconName) : tab.iconName}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};
