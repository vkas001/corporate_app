import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "auth";

export const saveAuth = async (
  token: string,
  roles: string[],
  permissions: string[],
  user: any
) => {
  await AsyncStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ token, roles, permissions, user })
  );
};

export const getAuth = async () => {
  const data = await AsyncStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
};

export const getToken = async () => {
  const auth = await getAuth();
  return auth?.token || null;
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};

export const logout = async () => {
  await clearAuth();
};
