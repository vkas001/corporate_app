import { useTheme } from "@/theme";
import { UserRole } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { profileMenus } from "../../config/profileConfig";
import ProfileMenuItem from "./profileMenuItem";

type Props = {
  role: UserRole;
  name: string;
  email: string;
  avatarUri?: string | null;
  onAction: (action: string) => void;
  onEditAvatar?: () => void;
};

export default function ProfileScreen({
  role,
  name,
  email,
  avatarUri,
  onAction,
  onEditAvatar,
}: Props) {
  const { colors } = useTheme();
  const menus = profileMenus[role];
  const [imageError, setImageError] = useState(false);
  const hasAvatar = !!avatarUri && avatarUri.trim() !== "" && !imageError;

  return (
    <SafeAreaView className="flex-1 px-4"
      style={{ backgroundColor: colors.background }}>
      <View className="w-full max-w-md">
        <View className="items-center">
          <View className="relative mb-4">
            {hasAvatar ? (
              <Image
                source={{ uri: avatarUri }}
                className="w-24 h-24 rounded-full"
                onError={() => setImageError(true)}
              />
            ) : (
              <Ionicons name="person-circle" size={100} color={colors.primary} />
            )}
            {onEditAvatar && (
              <TouchableOpacity
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full items-center justify-center"
                style={{ backgroundColor: colors.primary }}
                onPress={onEditAvatar}
                activeOpacity={0.7}
              >
                <Ionicons name="camera-outline" size={16} color={colors.surface} />
              </TouchableOpacity>
            )}
          </View>

          <Text className="text-xl font-bold mb-1"
            style={{ color: colors.textPrimary }}>
            {name}
          </Text>
          <Text className="text-sm mb-4"
            style={{ color: colors.textSecondary }}>
            {email}
          </Text>

          <TouchableOpacity
            className="px-6 py-2.5 rounded-full border mb-6"
            style={{ borderColor: colors.primary }}
            onPress={() => onAction("edit-profile")}
            activeOpacity={0.7}
          >
            <Text className="text-sm font-semibold"
              style={{ color: colors.primary }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        <View className="rounded-2xl border"
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
          {menus.map((item) => (
            <ProfileMenuItem
              key={item.action}
              icon={item.icon}
              label={item.label}
              danger={item.danger}
              onPress={() => onAction(item.action)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
