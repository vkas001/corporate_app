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

export const getRoles = async () => {
  const auth = await getAuth();
  return auth?.roles ?? [];
};

export const getPermissions = async () => {
  const auth = await getAuth();
  return auth?.permissions ?? [];
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};

// Convenience alias to match imports expecting `logout`
export const logout = clearAuth;

export const validateToken = async () => {
  try {
    console.log("🔐 Validating token...");
    const token = await getToken();

    if (!token) {
      console.log(" No token found");
      return false;
    }

    const res = await fetch("https://eggadmin.aanshtech.com.np/api/validate-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("📡 Validation response status:", res.status);

    if (!res.ok) {
      console.log(" Token is invalid or expired");
      await clearAuth();
      return false;
    }

    console.log(" Token is valid");
    return true;
  } catch (err: any) {
    console.error(" Token validation error:", err);
    await clearAuth();
    return false;
  }
};