import { useTheme } from "@/theme/themeContext";
import type { User } from "@/types/userManagement";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type Props = {
  user: User;
  currentUserId?: string | null;
  getRoleColor: (role: string, colors: any) => string;
  getRoleIcon: (role: string) => string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function UserCard({
  user,
  currentUserId,
  getRoleColor,
  getRoleIcon,
  onEdit,
  onDelete,
}: Props) {
  const { colors } = useTheme();
  const isSignedInUser = !!currentUserId && user.id === currentUserId;

  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const displayName = useMemo(() => {
    const n = (user.name ?? "").trim();
    if (n) return n;
    const e = (user.email ?? "").trim();
    return e || "User";
  }, [user.email, user.name]);

  const formatJoinDate = useMemo(() => {
    const date = (user as any)?.created_at || (user as any)?.joinDate;
    if (!date) return "";
    try {
      // Parse ISO format date like "2026-01-07T10:00:00.000000Z"
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return "Unknown";
      }
      // Format as "Jan 07, 2026"
      const month = dateObj.toLocaleDateString("en-US", { month: "short" });
      const day = String(dateObj.getDate()).padStart(2, "0");
      const year = dateObj.getFullYear();
      return `${month} ${day}, ${year}`;
    } catch (e) {
      return "Unknown";
    }
  }, [(user as any)?.created_at, (user as any)?.joinDate]);

  const danger = "#EF4444";

  return (
    <View
      className="rounded-2xl p-4 mb-3 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        shadowColor: colors.primary,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="relative mr-3">
            <Ionicons
              name="person-circle"
              size={52}
              color={user.status === "active" ? colors.primary : colors.textSecondary}
            />
            {isSignedInUser && (
              <View
                className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2"
                style={{ backgroundColor: "#1E8E3E", borderColor: colors.surface }}
              />
            )}
          </View>

          <View className="flex-1">
            <Text className="text-base font-bold mb-0.5"
              style={{ color: colors.textPrimary }}>
              {user.name}
            </Text>
            <Text className="text-sm mb-2"
              style={{ color: colors.textSecondary }}>
              {user.email}
            </Text>
            <View className="flex-row items-center gap-2">
              <View
                className="flex-row items-center gap-1 px-2 py-1 rounded-full"
                style={{ backgroundColor: `${getRoleColor(user.role, colors)}15` }}
              >
                <Ionicons
                  name={getRoleIcon(user.role) as any}
                  size={11}
                  color={getRoleColor(user.role, colors)}
                />
                <Text
                  className="text-xs font-bold capitalize"
                  style={{ color: getRoleColor(user.role, colors) }}
                >
                  {user.role === "superAdmin"
                    ? "Super Admin"
                    : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Text>
              </View>

              <Text className="text-xs"
                style={{ color: colors.textSecondary }}>
                • Joined {formatJoinDate}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2 ml-2">
          <TouchableOpacity
            className="w-9 h-9 rounded-xl items-center justify-center"
            style={{ backgroundColor: colors.background }}
            activeOpacity={0.7}
            onPress={() => onEdit?.(user.id)}
          >
            <Ionicons name="create-outline" size={18} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-9 h-9 rounded-xl items-center justify-center"
            style={{ backgroundColor: colors.background }}
            activeOpacity={0.7}
            onPress={() => {
              if (!onDelete) return;
              setMenuVisible(true);
            }}
          >
            <Ionicons name="ellipsis-vertical" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Options modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onPress={() => setMenuVisible(false)}
        >
          <Pressable
            className="rounded-t-3xl px-5 pt-3 pb-5 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            onPress={(e) => e.stopPropagation()}
          >
            <View className="items-center mb-3">
              <View className="w-12 h-1.5 rounded-full"
                style={{ backgroundColor: colors.border }} />
            </View>

            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-base font-bold"
                  style={{ color: colors.textPrimary }}>
                  {displayName}
                </Text>
                <Text className="text-xs mt-1"
                  style={{ color: colors.textSecondary }}>
                  User options
                </Text>
              </View>

              <Pressable
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: colors.background }}
                onPress={() => setMenuVisible(false)}
              >
                <Ionicons name="close" size={18} color={colors.textSecondary} />
              </Pressable>
            </View>

            <View className="mt-4">
              <Pressable
                className="rounded-2xl px-4 py-3 border"
                style={{
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                  opacity: isSignedInUser ? 0.6 : 1,
                }}
                disabled={isSignedInUser}
                onPress={() => {
                  setMenuVisible(false);
                  setConfirmVisible(true);
                }}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-9 h-9 rounded-xl items-center justify-center mr-3"
                    style={{ backgroundColor: `${danger}15` }}
                  >
                    <Ionicons name="trash-outline" size={18} color={danger} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-sm font-semibold"
                      style={{ color: danger }}>
                      Delete user
                    </Text>
                    <Text className="text-xs mt-1"
                      style={{ color: colors.textSecondary }}>
                      Remove this account from the app.
                    </Text>
                  </View>
                </View>

                {isSignedInUser ? (
                  <Text className="text-xs mt-2"
                    style={{ color: colors.textSecondary }}>
                    You can’t delete your own account.
                  </Text>
                ) : null}
              </Pressable>

              <Pressable
                className="mt-3 rounded-2xl px-4 py-3 border"
                style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                onPress={() => setMenuVisible(false)}
              >
                <Text className="text-sm font-semibold text-center"
                  style={{ color: colors.textPrimary }}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Confirm delete modal */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center px-6"
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
          onPress={() => setConfirmVisible(false)}
        >
          <Pressable
            className="w-full rounded-3xl p-5 border"
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            onPress={(e) => e.stopPropagation()}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1 pr-3">
                <View
                  className="w-10 h-10 rounded-2xl items-center justify-center mr-3"
                  style={{ backgroundColor: `${danger}15` }}
                >
                  <Ionicons name="warning-outline" size={20} color={danger} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold"
                    style={{ color: colors.textPrimary }}>
                    Delete account?
                  </Text>
                  <Text className="text-xs mt-1"
                    style={{ color: colors.textSecondary }}>
                    This action can’t be undone.
                  </Text>
                </View>
              </View>

              <Pressable
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: colors.background }}
                onPress={() => setConfirmVisible(false)}
              >
                <Ionicons name="close" size={18} color={colors.textSecondary} />
              </Pressable>
            </View>

            <View className="mt-4">
              <Text className="text-sm"
                style={{ color: colors.textSecondary }}>
                You are about to delete {displayName}.
              </Text>
            </View>

            <View className="mt-5 flex-row gap-3">
              <Pressable
                className="flex-1 rounded-2xl px-4 py-3 border items-center"
                style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                onPress={() => setConfirmVisible(false)}
              >
                <Text className="text-sm font-semibold"
                  style={{ color: colors.textPrimary }}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                className="flex-1 rounded-2xl px-4 py-3 items-center"
                style={{ backgroundColor: danger }}
                onPress={() => {
                  setConfirmVisible(false);
                  onDelete?.(user.id);
                }}
              >
                <Text className="text-sm font-semibold"
                  style={{ color: "#FFFFFF" }}>
                  Delete
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
