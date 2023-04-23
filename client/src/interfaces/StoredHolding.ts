export interface StoredHolding {
  id: string;
  quantity: number;
}

export interface StoredHoldingsEntities {
  [s: string]: StoredHolding;
}
