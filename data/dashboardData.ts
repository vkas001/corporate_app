import { DashboardStats, Period } from "@/types/dashboard";

export const DASHBOARD_DATA: Record<Period, DashboardStats> = {
  today: {
    revenue: {
      value: "12.4k",
      change: "+2.1%",
      positive: true,
    },
    orders: {
      value: "128",
      aov: "96",
    },
    netProfit: {
      value: "3.6k",
      margin: "29%",
    },
    operatingProfit: {
      value: "2.1k",
    },

    financeOverview: {
      cashFlow: {
        inflow: "417.9 mln",
        outflow: "110.9 mln",
        freeCash: "307.0 mln",
      },
      cashBank: "307.5 mln",
      debts: {
        receivables: "4.36 k",
        payables: "50.0k",
      },
      stock: {
        value: "3.2 k",
        daysOfSupply: 14,
        criticalItems: ["Wings", "BBQ sauce"],
      },
      alerts: [
        "Food cost 36% (target ≤ 32%)",
        "5 items < 3 days",
        "2 overdue payments",
      ],
    },
  },

  week: {
    revenue: {
      value: "86.9k",
      change: "+5.2%",
      positive: true,
    },
    orders: {
      value: "892",
      aov: "98",
    },
    netProfit: {
      value: "24.7k",
      margin: "28%",
    },
    operatingProfit: {
      value: "15.2k",
    },

    financeOverview: {
      cashFlow: {
        inflow: "2.4 k",
        outflow: "1.1 k",
        freeCash: "1.3 k",
      },
      cashBank: "1.8 k",
      debts: {
        receivables: "8.9 k",
        payables: "210k",
      },
      stock: {
        value: "3.0 k",
        daysOfSupply: 11,
        criticalItems: ["Oil", "Packaging"],
      },
      alerts: ["3 items < 3 days"],
    },
  },

  month: {
    revenue: {
      value: "417.8k",
      change: "+3.4%",
      positive: true,
    },
    orders: {
      value: "4,196",
      aov: "99.6",
    },
    netProfit: {
      value: "117.3k",
      margin: "28%",
    },
    operatingProfit: {
      value: "71.4k",
    },

    financeOverview: {
      cashFlow: {
        inflow: "6.8 k",
        outflow: "4.1 k",
        freeCash: "2.7 k",
      },
      cashBank: "3.2 k",
      debts: {
        receivables: "12.4 k",
        payables: "540k",
      },
      stock: {
        value: "3.4 k",
        daysOfSupply: 18,
        criticalItems: [],
      },
      alerts: ["Chicken cost above target"],
    },
  },
};
