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
  date: string; 
  time: string; 
  title: string;
  value: number;
  unit?: string;
  amount?: number; 
  meta?: Record<string, any>;
};
