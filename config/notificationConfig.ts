import { NotificationType } from "@/types/notificaion";

export const NOTIFICATION_CONFIG: Record<
  NotificationType,
  {
    label: string;
    icon: string;
    color: string;
  }
> = {
  payment: {
    label: "Payment",
    icon: "cash-outline",
    color: "#2E7D32",
  },
  rateUpdate: {
    label: "Rate Update",
    icon: "trending-up-outline",
    color: "#1976D2",
  },
  reminder: {
    label: "Reminder",
    icon: "notifications-outline",
    color: "#D64545",
  },
  lowStock: {
    label: "Low Stock",
    icon: "alert-outline",
    color: "#D64545",
  },
};
