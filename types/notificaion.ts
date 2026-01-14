export type UserRole = "producer" | "seller" | "superAdmin" | "all";

export type NotificationType =
  | "payment"
  | "rateUpdate"
  | "reminder"
  | "lowStock";

export type NotificationStatus = "new" | "read";

export interface AppNotification {
  id: string;
  role: UserRole;
  title: string;
  description?: string;
  type: NotificationType;
  timestamp: string;
  status: NotificationStatus;
  meta?: string;
}
