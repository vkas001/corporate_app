export type AppPermission =
  | "users.read"
  | "users.create"
  | "users.update"
  | "users.delete"
  | "production.read"
  | "production.create"
  | "sales.read"
  | "sales.create";

export const PERMISSION_OPTIONS: Array<{ key: AppPermission; label: string; description: string }> = [
  { key: "users.read", label: "View users", description: "Can view user list and profiles" },
  { key: "users.create", label: "Create users", description: "Can add new users" },
  { key: "users.update", label: "Edit users", description: "Can update user details" },
  { key: "users.delete", label: "Delete users", description: "Can remove users" },
  { key: "production.read", label: "View production", description: "Can view production dashboards/records" },
  { key: "production.create", label: "Create production", description: "Can add production records" },
  { key: "sales.read", label: "View sales", description: "Can view sales dashboards/records" },
  { key: "sales.create", label: "Create sales", description: "Can add sales records" },
];
