export type HistoryType =
  | "production"
  | "feed"
  | "mortality"
  | "payment"
  | "sale";

export type UserRole = "producer" | "seller" | "superAdmin";

export type HistoryItem = {
  id: string;
  type: HistoryType;
  date: string; 
  time: string; 
  title: string;
  description?: string;
  value: number;
  unit?: string;
  amount?: number; 
  meta?: Record<string, any>;
};
