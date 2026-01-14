import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UserRole } from "@/types/user";

const AUTH_KEY = "auth";

export type BackendUser = {
  id: number;
  email: string;
  name: string | null;
  roles: string[];
  permissions: string[];
  status?: boolean;
  photo?: string | null;
  phone?: string | null;
  address?: string | null;
};

export type AuthUser = BackendUser & {
  // Derived app role used by UI components (ProfileScreen menus, etc.)
  role: UserRole;
};

export type AuthState = {
  token: string;
  roles: string[];
  permissions: string[];
  user: AuthUser;
};

export const SUPER_ADMIN_ROLE_LABEL = "Super Admin";

export const saveAuth = async (
  token: string,
  roles: string[],
  permissions: string[],
  user: BackendUser
) => {
  const effectiveRoles = user?.roles?.length ? user.roles : roles;
  const effectivePermissions = user?.permissions?.length ? user.permissions : permissions;

  const role: UserRole = (() => {
    const normalized = (effectiveRoles ?? []).map(normalizeRole);
    if (normalized.includes(normalizeRole(SUPER_ADMIN_ROLE_LABEL))) return "superAdmin";
    if (normalized.includes(normalizeRole("Producer"))) return "producer";
    if (normalized.includes(normalizeRole("Seller"))) return "seller";
    // Fallback keeps UI stable even if backend returns an unexpected role label
    return "seller";
  })();

  const enrichedUser: AuthUser = {
    ...user,
    roles: effectiveRoles ?? [],
    permissions: effectivePermissions ?? [],
    role,
  };

  await AsyncStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ token, roles: effectiveRoles ?? [], permissions: effectivePermissions ?? [], user: enrichedUser } satisfies AuthState)
  );
};

export const getAuth = async (): Promise<AuthState | null> => {
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

export const getUser = async () => {
  const auth = await getAuth();
  return auth?.user ?? null;
};

export const normalizeRole = (role: string) =>
  (role ?? "").toLowerCase().replace(/\s+/g, "").trim();

export const getNormalizedRoles = async () => {
  const roles = await getRoles();
  return (roles ?? []).map(normalizeRole);
};

export const hasAnyRole = async (allowedRoles: string[]) => {
  const allowedNormalized = (allowedRoles ?? []).map(normalizeRole);
  const rolesNormalized = await getNormalizedRoles();
  return rolesNormalized.some((r) => allowedNormalized.includes(r));
};

export const seedDevAuth = async (options: {
  roles: string[];
  permissions?: string[];
  user?: Partial<BackendUser>;
  token?: string;
}) => {
  const {
    roles,
    permissions = [],
    token = "dev-token",
    user = {
      id: 1,
      email: "superadmin@eggadmin.com",
      name: null,
      roles: [SUPER_ADMIN_ROLE_LABEL],
      permissions: [],
      status: false,
      photo: null,
      phone: null,
      address: null,
    },
  } = options;

  await saveAuth(token, roles, permissions, user as BackendUser);
};

export const getPermissions = async () => {
  const auth = await getAuth();
  return auth?.permissions ?? [];
};

export const clearAuth = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};

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