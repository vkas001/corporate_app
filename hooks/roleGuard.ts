import { getRoles, normalizeRole } from "@/utils/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useRoleGuard = (allowedRoles: string[]) => {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      console.log("🔍 Role guard: checking roles", { allowedRoles });
      const roles = await getRoles();
      console.log("🔑 Role guard: user roles", roles);

      const allowedNormalized = (allowedRoles ?? []).map(normalizeRole);
      const rolesNormalized = (roles ?? []).map(normalizeRole);

      if (!rolesNormalized.some((r: string) => allowedNormalized.includes(r))) {
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