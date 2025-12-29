import { FinanceOverview } from "@/types/dashboard";

export const MARGIN_BY_DAY_DATA = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [120, 200, 150, 80, 70, 110, 130],
};

export const financeOverviewData: FinanceOverview = {
  cashFlow: {
    inflow: "417.9 mln",
    outflow: "110.9 mln",
    freeCash: "307.0 mln",
  },
  cashBank: "307.5 mln",
  debts: {
    receivables: "4.36 bln",
    payables: "50.0k",
  },
  stock: {
    value: "3.2 bln",
    daysOfSupply: 14,
    criticalItems: ["Wings", "BBQ sauce"],
  },
  alerts: [
    "Food cost 36% (target ≤ 32%)",
    "5 items < 3 days",
    "2 overdue payments",
  ],
};
