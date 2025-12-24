import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/theme";

type Props = {
  icon: string;
  label: string;
  danger?: boolean;
  onPress: () => void;
};

export default function ProfileMenuItem({
  icon,
  label,
  danger,
  onPress,
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        borderRadius: 12,
      }}
    >
      <Ionicons
        name={icon as any}
        size={20}
        color={danger ? colors.primary : colors.textPrimary}
      />

      <Text
        style={{
          marginLeft: 12,
          fontSize: 15,
          fontWeight: "500",
          color: danger ? colors.primary : colors.textPrimary,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
