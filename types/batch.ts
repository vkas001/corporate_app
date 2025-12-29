export type BatchRecord = {
  id: string;
  batchCode: string;     
  startDate: string;

  initialBirdCount: number;
  currentBirdCount: number;
  mortalityCount: number;

  eggsProducedTotal: number;

  status: "active" | "closed";

  remarks?: string;
};
