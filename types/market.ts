export type PriceCell = {
  unit: string;      // e.g. "Per Piece", "Per Crate"
  price: number;
};

export type MarketItem = {
  type: string;      // Small, Medium, Large
  prices: PriceCell[];
};

export type MarketCategory = {
  id: string;
  name: string;
  columns: string[]; // Header columns
  items: MarketItem[];
};
