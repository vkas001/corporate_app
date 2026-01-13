import { getRoles } from "@/utils/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useRoleGuard = (allowedRoles: string[]) => {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      console.log("🔍 Role guard: checking roles", { allowedRoles });
      const roles = await getRoles();
      console.log("🔑 Role guard: user roles", roles);

      const normalizeRole = (role: string) => role.trim().toLowerCase().replace(/\s+/g, " ");
      const normalizedAllowed = allowedRoles.map(normalizeRole);
      const normalizedRoles = roles.map(normalizeRole);

      if (!normalizedRoles.some((r: string) => normalizedAllowed.includes(r))) {
        console.warn("🚫 Role guard: access denied", { roles, allowedRoles });
        router.replace("/(auth)/sign-in");
        return;
      }

      console.log("✅ Role guard: access granted", { roles, allowedRoles });
      setChecking(false);
    };

    checkRole();
  }, []);

  return checking;
};