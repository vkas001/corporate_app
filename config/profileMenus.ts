import { UserRole } from "@/types/user";

export type ProfileMenuItem = {
  icon: string;
  label: string;
  action: string;
  danger?: boolean;
};

export const profileMenus: Record<UserRole, ProfileMenuItem[]> = {
  producer: [
    { icon: "settings-outline", label: "Settings", action: "settings" },
    { icon: "card-outline", label: "Billing Details", action: "billing" },
    { icon: "people-outline", label: "User Management", action: "users" },
    { icon: "information-circle-outline", label: "Information", action: "info" },
    { icon: "log-out-outline", label: "Logout", action: "logout", danger: true },
  ],

  seller: [
    { icon: "settings-outline", label: "Settings", action: "settings" },
    { icon: "card-outline", label: "Billing", action: "billing" },
    { icon: "people-outline", label: "Users", action: "users" },
    { icon: "information-circle-outline", label: "Information", action: "info" },
    { icon: "log-out-outline", label: "Logout", action: "logout", danger: true },
  ],
};
