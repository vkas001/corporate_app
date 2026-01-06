import api from "@/services/api";
import { clearAuth, saveAuth } from "@/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });

  const { token, roles, permissions, user } = res.data;

  await saveAuth(token, roles, permissions, user);

  return user;
};

export const logout = async () => {
  try {
    console.log("🔓 Logout initiated");
    const token = await AsyncStorage.getItem("authToken");
    console.log("🔑 Token retrieved from storage");

    console.log("⏳ Sending logout request...");
    const res = await fetch("https://eggadmin.aanshtech.com.np/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    console.log("📡 Response status:", res.status);

    if (!res.ok) {
      console.log("❌ Logout request failed");
      throw new Error("Logout failed");
    }

    const data = await res.json();
    console.log("📦 Response data:", data);

    // Clear local storage
    console.log("🗑️ Clearing authentication data from storage");
   await clearAuth();
   
    console.log("✅ Logout successful");
  } catch (err: any) {
    console.error("❌ Logout error:", err);
    throw err;
  }
};
