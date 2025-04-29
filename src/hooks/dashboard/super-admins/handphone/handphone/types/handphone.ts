export interface Handphone {
  id: string;
  title: string;
  brand: string;
  owner: string;
  stock: number;
  price: number;
  total: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}