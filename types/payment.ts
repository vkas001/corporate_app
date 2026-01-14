export type PaymentRecord = {
  id: string;
  role: "producer" | "seller" | "superAdmin";

  periodStart: string;
  periodEnd: string;

  grossAmount: number;
  deductions?: number;     // producer
  commission?: number;     // seller

  netAmount: number;
  paidAmount: number;
  balanceAmount: number;

  status: "pending" | "partial" | "paid";
  paidAt?: string;
};
