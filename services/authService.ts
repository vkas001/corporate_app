import api from "@/services/api";
import { clearAuth, saveAuth } from "@/utils/auth";

export const signIn = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });

  const { token, roles, permissions, user } = res.data;

  await saveAuth(token, roles, permissions, user);

  return user;
};

export const logout = async () => {
  console.log("🔓 Logout initiated");
  try {
    console.log("⏳ Sending logout request...");
    const res = await api.post("/api/logout");
    console.log("📡 Logout response status:", res.status);
    console.log("📦 Response data:", res.data);
  } catch (err: any) {
    console.warn("❌ Logout request failed:", err?.message || err);
  } finally {
    console.log("🗑️ Clearing authentication data from storage");
    await clearAuth();
    console.log("✅ Logout complete");

  }
};
