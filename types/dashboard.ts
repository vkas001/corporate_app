import { ReactNode } from "react";

export type Period = "today" | "week" | "month";

export interface FinanceOverview {
  cashFlow: {
    inflowValue: any;
    outflowValue: any;
    net: ReactNode;
    inflow: string;
    outflow: string;
    freeCash: string;
  };
  cashBank: string;
  debts: {
    receivables: string;
    payables: string;
  };
  stock: {
    value: string;
    daysOfSupply: number;
    criticalItems: string[];
  };
  alerts: string[];
}

export interface DashboardStats {
  revenue: {
    value: string;
    change: string;
    positive: boolean;
  };
  orders: {
    value: string;
    aov: string;
  };
  netProfit: {
    value: string;
    margin: string;
  };
  operatingProfit: {
    value: string;
  };

  financeOverview: FinanceOverview;
}
