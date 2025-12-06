import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

const TabBarIcon = ({
  label,
  icon: Icon,
  focused,
  iconName,
  colors,
}: {
  label: string;
  icon: any;
  focused: boolean;
  iconName: string;
  colors: any;
}) => (
  <View style={{ alignItems: "center" }}>
    {/* Floating Circle Icon */}
    <View
      style={{
        width: focused ? 40 : 30,
        height: focused ? 40 : 30,
        borderRadius: 35,
        backgroundColor: focused ? colors.primary : colors.background,
        justifyContent: "center",
        alignItems: "center",

        // Lifts upward when focused
        marginBottom: focused ? 12 : 0,
        transform: focused ? [{ translateY: -10 }] : [{ translateY: 0 }],

        // Premium shadow
        shadowColor: focused ? colors.primary : "transparent",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: focused ? 0.25 : 0,
        shadowRadius: 10,
        elevation: focused ? 12 : 0,
      }}
    >
      <Icon
        name={iconName}
        size={focused ? 20 : 18}
        color={focused ? colors.onPrimary : colors.textSecondary}
      />
    </View>

    {/* Label */}
    <Text
      style={{
        fontSize: 8,
        color: focused ? colors.primary : colors.textSecondary,
        fontWeight: focused ? "300" : "200",
        marginTop: focused ? -4 : 4,
      }}
    >
      {label}
    </Text>
  </View>
);


export default function TabLayout() {

  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 40,
          backgroundColor: colors.background,
          
          shadowColor: colors.surface,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 10,
          borderWidth: 1,
          borderColor: colors.border,
        },
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              colors={colors}
              label="Home"
              icon={Ionicons}
              iconName={focused ? "home" : "home-outline"}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              colors={colors}
              label="Stats"
              icon={Ionicons}
              iconName={focused ? "stats-chart" : "stats-chart-outline"}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              colors={colors}
              label="Profile"
              icon={Ionicons}
              iconName={focused ? "person" : "person-outline"}
              focused={focused}
            />
          ),
        }}
      />

    </Tabs>
  );
}