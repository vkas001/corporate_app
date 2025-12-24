import { Text, View } from 'react-native';

interface TabBarIconProps {
  label: string;
  icon: any;
  focused: boolean;
  iconName: string;
  colors: any;
}

export const TabBarIcon = ({
  label,
  icon: Icon,
  focused,
  iconName,
  colors,
}: TabBarIconProps) => (
  <View style={{ alignItems: "center" }}>
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

    <Text
      numberOfLines={1}
      ellipsizeMode="clip"
      style={{
        fontSize: 11,
        color: focused ? colors.primary : colors.textSecondary,
        fontWeight: focused ? "500" : "400",
        marginTop: focused ? -2 : 4,
        width: 50,
        textAlign: "center",
      }}
    >
      {label}
    </Text>
  </View>
);
