import { useTheme } from "@/theme/themeContext";
import type { UserRole } from "@/types/userManagement";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  role: UserRole;
  getRoleColor: (role: string, colors: any) => string;
  getRoleIcon: (role: string) => string;
  getRoleDescription?: (role: UserRole) => string;
  count?: number;
  compact?: boolean;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const roleLabel = (role: UserRole) => {
  if (role === "superAdmin") return "Super Admin";
  return role.charAt(0).toUpperCase() + role.slice(1);
};

export default function RoleCard({
  role,
  getRoleColor,
  getRoleIcon,
  getRoleDescription,
  count,
  compact,
  selected,
  disabled,
  onPress,
}: Props) {
  const { colors } = useTheme();
  const accent = useMemo(() => getRoleColor(role, colors), [colors, getRoleColor, role]);
  const icon = useMemo(() => getRoleIcon(role), [getRoleIcon, role]);

  const description = getRoleDescription ? getRoleDescription(role) : "";
  const showCount = typeof count === "number";

  const Container: any = onPress ? TouchableOpacity : View;
  const backgroundColor = selected ? `${accent}10` : colors.surface;
  const borderColor = selected ? `${accent}70` : colors.border;

  return (
    <Container
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      className={"rounded-2xl border p-4"}
      style={{
        backgroundColor,
        borderColor,
        shadowColor: colors.primary,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        opacity: disabled ? 0.7 : 1,
      }}
    >
      <View className="flex-row items-start justify-between">
        <View
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: `${accent}15` }}
        >
          <Ionicons name={icon as any} size={20} color={accent} />
        </View>

        {showCount ? (
          <View
            className="px-2 py-1 rounded-full border"
            style={{ borderColor: `${accent}40`, backgroundColor: `${accent}10` }}
          >
            <Text className="text-xs font-bold" style={{ color: accent }}>
              {count}
            </Text>
          </View>
        ) : selected ? (
          <View
            className="px-2 py-1 rounded-full border"
            style={{ borderColor: `${accent}40`, backgroundColor: `${accent}10` }}
          >
            <Ionicons name="checkmark" size={14} color={accent} />
          </View>
        ) : null}
      </View>

      <Text className="text-sm font-bold mt-3" style={{ color: colors.textPrimary }}>
        {roleLabel(role)}
      </Text>

      {!compact ? (
        <Text className="text-xs mt-1" style={{ color: colors.textSecondary }}>
          {description}
        </Text>
      ) : null}
    </Container>
  );
}
