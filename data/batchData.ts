import { BatchRecord } from "@/types/batch";

export const mockBatches: BatchRecord[] = [
  {
    id: "batch-1",
    batchCode: "BATCH-2025-01",
    startDate: "2025-01-01",
    initialBirdCount: 500,
    currentBirdCount: 485,
    mortalityCount: 15,
    eggsProducedTotal: 12500,
    status: "active",
  },
  {
    id: "batch-2",
    batchCode: "BATCH-2024-11",
    startDate: "2024-11-01",
    initialBirdCount: 400,
    currentBirdCount: 0,
    mortalityCount: 40,
    eggsProducedTotal: 18000,
    status: "closed",
    remarks: "Batch completed",
  },
];
