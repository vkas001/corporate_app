import type { UserRole } from "@/types/user";
import { getUserRoleOverrides } from "@/utils/userRoleOverrides";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

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
export const ADMIN_ROLE_LABEL = "Admin";

const coerceUserRole = (role: unknown): UserRole | null => {
  if (role === "superAdmin" || role === "admin" || role === "producer" || role === "seller") return role;
  return null;
};

export const roleToRoleLabel = (role: UserRole): string => {
  if (role === "superAdmin") return SUPER_ADMIN_ROLE_LABEL;
  if (role === "admin") return ADMIN_ROLE_LABEL;
  if (role === "producer") return "Producer";
  return "Seller";
};

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
    if (normalized.includes(normalizeRole(ADMIN_ROLE_LABEL))) return "admin";
    if (normalized.includes(normalizeRole("Producer"))) return "producer";
    if (normalized.includes(normalizeRole("Seller"))) return "seller";
    // Fallback keeps UI stable even if backend returns an unexpected role label
    return "seller";
  })();

  const ensuredRoles = (effectiveRoles ?? []).length ? (effectiveRoles ?? []) : [roleToRoleLabel(role)];

  const enrichedUser: AuthUser = {
    ...user,
    roles: ensuredRoles,
    permissions: effectivePermissions ?? [],
    role,
  };

  await AsyncStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ token, roles: ensuredRoles, permissions: effectivePermissions ?? [], user: enrichedUser } satisfies AuthState)
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
  if (!auth) return [];

  // Apply local override if present (set by Super Admin in this app)
  try {
    const overrides = await getUserRoleOverrides();
    const overrideRole = coerceUserRole(overrides[String(auth.user?.id)]);
    if (overrideRole) return [roleToRoleLabel(overrideRole)];
  } catch {
    // ignore overrides failures
  }

  const storedRoles = auth?.roles ?? [];
  if (storedRoles.length) return storedRoles;

  const derived = auth?.user?.role;
  return derived ? [roleToRoleLabel(derived)] : [];
};

export const getUser = async () => {
  const auth = await getAuth();
  if (!auth?.user) return null;

  try {
    const overrides = await getUserRoleOverrides();
    const overrideRole = coerceUserRole(overrides[String(auth.user.id)]);
    if (overrideRole) {
      return {
        ...auth.user,
        role: overrideRole,
        roles: [roleToRoleLabel(overrideRole)],
      };
    }
  } catch {
    // ignore overrides failures
  }

  return auth.user;
};

export const getEffectiveUserRole = async (): Promise<UserRole | null> => {
  const user = await getUser();
  return user?.role ?? null;
};

export const updateAuthUser = async (
  updates: Partial<Pick<BackendUser, "name" | "email" | "phone" | "address" | "photo" | "status">> & {
    role?: UserRole;
    roles?: string[];
    permissions?: string[];
  }
) => {
  const auth = await getAuth();
  if (!auth?.user) return;

  const nextRole = updates.role ?? auth.user.role;
  const nextRoles =
    updates.roles ??
    (updates.role ? [roleToRoleLabel(nextRole)] : auth.user.roles) ??
    auth.roles;

  const ensuredRoles = (nextRoles ?? []).length ? (nextRoles ?? []) : [roleToRoleLabel(nextRole)];

  const nextUser: AuthUser = {
    ...auth.user,
    ...updates,
    role: nextRole,
    roles: ensuredRoles,
    permissions: updates.permissions ?? auth.user.permissions,
  };

  const nextAuth: AuthState = {
    ...auth,
    roles: ensuredRoles,
    permissions: updates.permissions ?? auth.permissions,
    user: nextUser,
  };

  await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(nextAuth));
};

export const setAuthUserRole = async (role: UserRole) => {
  await updateAuthUser({ role, roles: [roleToRoleLabel(role)] });
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

    const res = await fetch(`${API_BASE_URL}/validate-token`, {
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