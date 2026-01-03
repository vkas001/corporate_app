import { AppNotification } from "@/types/notificaion";

export const notificationData: AppNotification[] = [
   {
    id: "p1",
    role: "producer",
    title: "Payment Released",
    description: "₹18,450 credited to your account",
    type: "payment",
    timestamp: "2h ago",
    status: "new",
    meta: "Batch #24",
  },
  {
    id: "p2",
    role: "producer",
    title: "Rate Updated",
    description: "Egg rate updated to ₹14.50",
    type: "rateUpdate",
    timestamp: "Yesterday",
    status: "read",
  },

  // ---------------- SELLER ----------------
  {
    id: "s1",
    role: "seller",
    title: "Low Stock Alert",
    description: "Stock below 120 trays",
    type: "lowStock",
    timestamp: "1h ago",
    status: "new",
  },
  {
    id: "s2",
    role: "seller",
    title: "Payment Due Reminder",
    description: "Pending payment of ₹9,200",
    type: "reminder",
    timestamp: "Today",
    status: "read",
  },

  // ---------------- COMMON ----------------
  {
    id: "a1",
    role: "all",
    title: "Market Rate Updated",
    description: "Today's egg market rate is ₹15",
    type: "rateUpdate",
    timestamp: "Today",
    status: "new",
  },
  
];
