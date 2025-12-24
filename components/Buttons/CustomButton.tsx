import { useTheme } from "@/theme/themeContext";
import React from "react";
import { ActivityIndicator, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";

type Buttonsize = "small" | "medium" | "large";

interface CustomButtonProps {
  onPress: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
  size?: Buttonsize;
}

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
  size = "medium",
}: CustomButtonProps) => {
  const { colors } = useTheme();
  const currentSize = sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: colors.primaryDark,
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
          borderRadius: currentSize.borderRadius,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        },
        style,
      ]}
    >
      {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}

      {isLoading ? (
        <ActivityIndicator size="small" color={colors.textPrimary} />
      ) : (
        <Text
          style={[
            {
              color: colors.textPrimary,
              fontWeight: "600",
              fontSize: currentSize.fontSize,
              textAlign: "center",
            },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};


export default CustomButton;

const sizeStyles = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 10,
  },
  medium: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 16,
  },
  large: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    fontSize: 18,
    borderRadius: 20,
  },
};
