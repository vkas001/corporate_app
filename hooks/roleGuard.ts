import { useEffect, useState } from "react";
import { router } from "expo-router";
import { getRoles } from "@/utils/auth";

export const useRoleGuard = (allowedRoles: string[]) => {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      console.log("🔍 Role guard: checking roles", { allowedRoles });
      const roles = await getRoles();
      console.log("🔑 Role guard: user roles", roles);

      if (!roles.some((r: string) => allowedRoles.includes(r))) {
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