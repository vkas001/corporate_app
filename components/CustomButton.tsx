import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, StyleProp, TextStyle, ViewStyle } from "react-native";
import { useTheme } from "@/theme/themeContext";

interface CustomButtonProps {
  onPress: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>; 
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: colors.primary,
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 16,
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
              fontSize: 16,
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
