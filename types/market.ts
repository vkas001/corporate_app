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

export interface EggUnit {
  id?: string;
  name: string;
  abbreviation?: string;
  conversion_factor?: number;
  is_base_unit?: boolean;
  price?: number;
}

export interface EggType {
  id: string;
  name: string;
  description?: string;
  photo?: string;
  units?: EggUnit[];
  createdAt?: string;
}
