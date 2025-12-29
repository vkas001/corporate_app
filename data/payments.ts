import { PaymentRecord } from "@/types/payment";

/* ---------------- PRODUCER PAYMENTS ---------------- */

export const producerPayments: PaymentRecord[] = [
  {
    id: "pp-001",
    role: "producer",
    periodStart: "2025-01-01",
    periodEnd: "2025-01-07",
    grossAmount: 14000,        // eggs × rate
    deductions: 1000,          // feed / advance
    netAmount: 13000,
    paidAmount: 8000,
    balanceAmount: 5000,
    status: "partial",
  },
  {
    id: "pp-002",
    role: "producer",
    periodStart: "2025-01-08",
    periodEnd: "2025-01-14",
    grossAmount: 16000,
    deductions: 0,
    netAmount: 16000,
    paidAmount: 16000,
    balanceAmount: 0,
    status: "paid",
    paidAt: "2025-01-15",
  },
];

/* ---------------- SELLER PAYMENTS ---------------- */

export const sellerPayments: PaymentRecord[] = [
  {
    id: "sp-001",
    role: "seller",
    periodStart: "2025-01-01",
    periodEnd: "2025-01-31",
    grossAmount: 200000,      // total sales
    commission: 10000,        // commission earned
    netAmount: 10000,
    paidAmount: 10000,
    balanceAmount: 0,
    status: "paid",
    paidAt: "2025-02-01",
  },
  {
    id: "sp-002",
    role: "seller",
    periodStart: "2025-02-01",
    periodEnd: "2025-02-15",
    grossAmount: 120000,
    commission: 6000,
    netAmount: 6000,
    paidAmount: 0,
    balanceAmount: 6000,
    status: "pending",
  },
];
