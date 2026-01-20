import { HistoryItem } from "@/types/history";

// Seed history items shown when a user has no stored history yet.
// Real history is created when users submit record forms.
export const HISTORY_SEED_DATA: HistoryItem[] = [
  {
    id: "1",
    type: "production",
    title: "Morning Collection",
    description: "Daily egg collection from coop A",
    value: 120,
    unit: "eggs",
    date: "2026-01-01",
    time: "08:30",
  },
  {
    id: "2",
    type: "payment",
    title: "Payment Received",
    description: "Settlement received via bank transfer",
    value: 300,
    amount: 4500,
    date: "2026-01-01",
    time: "14:10",
  },
  {
    id: "3",
    type: "sale",
    title: "Market Sale",
    description: "Sold at local market stall #12",
    value: 200,
    unit: "eggs",
    amount: 3200,
    date: "2025-12-31",
    time: "17:00",
  },
];
