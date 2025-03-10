import { ReactNode } from "react";

export type ItemType = "cola" | "water" | "coffee";

export interface Item {
  name: string;
  price: number;
  stock: number;
  icon: ReactNode;
}

export interface Coin {
  name: string;
  value: number;
}

export enum PaymentMethod {
  Card = "card",
  Money = "money",
}
