import type { UserRole } from "@/types/userManagement";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "user_role_overrides";

export const getUserRoleOverrides = async (): Promise<Record<string, UserRole>> => {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, UserRole>;
  } catch {
    return {};
  }
};

export const setUserRoleOverride = async (userId: string, role: UserRole) => {
  const prev = await getUserRoleOverrides();
  const next: Record<string, UserRole> = { ...prev, [userId]: role };
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
};

export const clearUserRoleOverrides = async () => {
  await AsyncStorage.removeItem(KEY);
};
