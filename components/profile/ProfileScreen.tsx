import { createProfileStyles } from "@/style/producer/profileStyleSheet";
import { useTheme } from "@/theme";
import { UserRole } from "@/types/user";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileMenuItem from "./profileMenuItem";
import { profileMenus } from "./profileMenus";

type Props = {
  role: UserRole;
  name: string;
  email: string;
  onAction: (action: string) => void;
  onEditAvatar?: () => void;
};

export default function ProfileScreen({
  role,
  name,
  email,
  onAction,
  onEditAvatar,
}: Props) {
  const { colors } = useTheme();
  const styles = createProfileStyles(colors);
  const menus = profileMenus[role];

  return (
    <SafeAreaView style={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Ionicons name="person-circle" size={100} color={colors.primary} />
          {onEditAvatar && (
            <TouchableOpacity style={styles.avatarEditBtn} onPress={onEditAvatar}>
              <Ionicons name="camera-outline" size={16} color={colors.surface} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userEmail}>{email}</Text>

        <TouchableOpacity
          style={styles.editProfileBtn}
          onPress={() => onAction("edit-profile")}
        >
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.menuCard}>
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
