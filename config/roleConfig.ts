import { AppPermission } from "./permissionConfig";

export type AppRole = "SUPER_ADMIN" | "ADMIN" | "PRODUCER" | "SELLER";

export const ROLE_PERMISSIONS: Record<AppRole, AppPermission[]> = {
  SUPER_ADMIN: [
    "users.read",
    "users.create",
    "users.update",
    "users.delete",
    "production.read",
    "production.create",
    "sales.read",
    "sales.create",
  ],

  ADMIN: [
    "users.read",
    "users.create",
    "users.update",
  ],

  PRODUCER: [
    "production.read",
    "production.create",
  ],

  SELLER: [
    "sales.read",
    "sales.create",
  ],
};
