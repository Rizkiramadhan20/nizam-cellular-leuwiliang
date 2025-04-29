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

// Table

export interface HandphoneTableProps {
  handphones: Handphone[];
  onEdit: (handphone: Handphone) => void;
  onDelete: (id: string) => void;
}
