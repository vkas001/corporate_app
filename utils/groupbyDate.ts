import { HistoryItem } from "@/types/history";

export function groupByDate(items: HistoryItem[]) {
  return items.reduce<Record<string, HistoryItem[]>>((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});
}
