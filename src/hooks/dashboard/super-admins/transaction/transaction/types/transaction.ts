import { Timestamp } from "firebase/firestore";

export type TransactionStatus =
  | "pending"
  | "sedang_dikerjakan"
  | "selesai"
  | "return";

export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface Transaction {
  id?: string;
  customer: Customer;
  deviceBrand: string;
  deviceModel: string;
  complaint: string;
  repairActions?: string;
  status: TransactionStatus;
  price: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  [key: `${string}.${string}`]: string | number | boolean | null | undefined;
}
