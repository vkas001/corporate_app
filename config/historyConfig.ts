import { Ionicons } from "@expo/vector-icons";
import { HistoryType } from "@/types/history";

export const historyConfig: Record<
  HistoryType,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  production: {
    label: "Egg Production",
    icon: "egg-outline",
  },
  feed: {
    label: "Feed Record",
    icon: "nutrition-outline",
  },
  mortality: {
    label: "Mortality",
    icon: "skull-outline",
  },
  payment: {
    label: "Payment",
    icon: "cash-outline",
  },
  sale: {
    label: "Egg Sale",
    icon: "cart-outline",
  },
};
