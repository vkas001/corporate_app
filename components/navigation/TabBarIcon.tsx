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
  <View style={{ alignItems: "center", marginVertical: 8 }}>
      <Icon
        name={iconName}
        size={focused ? 20 : 18}
        color={focused ? colors.primary : colors.textSecondary}
      />
    <Text
      numberOfLines={1}
      ellipsizeMode="clip"
      style={{
        fontSize: 11,
        color: focused ? colors.primary : colors.textSecondary,
        fontWeight: focused ? "500" : "400",
        width: 50,
        textAlign: "center",
      }}
    >
      {label}
    </Text>
  </View>
);
