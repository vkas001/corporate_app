import { AppNotification, NotificationType } from "@/types/notificaion";

export type FilterKey = "all" | "payment" | "alerts" | "reminders";

export const FILTER_MAP: Record<FilterKey, NotificationType[] | "all"> = {
  all: "all",
  payment: ["payment"],
  reminders: ["reminder", "rateUpdate"],
  alerts: ["lowStock"],
};

export const getUnreadCountByFilter = (
  notifications: AppNotification[],
  filter: FilterKey
) => {
  if (filter === "all") {
    return notifications.filter(n => n.status === "new").length;
  }

  return notifications.filter(
    n =>
      n.status === "new" &&
      FILTER_MAP[filter] !== "all" &&
      FILTER_MAP[filter].includes(n.type)
  ).length;
};
