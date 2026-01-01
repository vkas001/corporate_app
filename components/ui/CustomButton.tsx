import { useTheme } from "@/theme/themeContext";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

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

const sizeContainer: Record<Buttonsize, string> = {
  small: "py-2 px-3 rounded-lg",
  medium: "py-3 px-4 rounded-2xl",
  large: "py-4 px-5 rounded-3xl",
};

const sizeText: Record<Buttonsize, string> = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
};

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

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center ${sizeContainer[size]}`}
      style={[{ backgroundColor: colors.primaryDark }, style]}
    >
      {leftIcon && <View className="mr-2">{leftIcon}</View>}

      {isLoading ? (
        <ActivityIndicator size="small" color={colors.textPrimary} />
      ) : (
        <Text
          className={`font-semibold text-center ${sizeText[size]}`}
          style={[{ color: colors.textPrimary }, textStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;