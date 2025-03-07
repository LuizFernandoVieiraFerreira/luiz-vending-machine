export type ItemType = "cola" | "water" | "coffee";

export interface Item {
  name: string;
  price: number;
  stock: number;
}

export interface Coin {
  name: string;
  value: number;
}
