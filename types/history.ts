export type HistoryType =
  | "production"
  | "feed"
  | "mortality"
  | "payment"
  | "sale";

export type UserRole = "producer" | "seller";

export type HistoryItem = {
  description: any;
  id: string;
  type: HistoryType;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  title: string;
  value: number;
  unit?: string;
  amount?: number; // money
  meta?: Record<string, any>;
};
