export interface Kartu {
  id: string;
  title: string;
  brand: string;
  stock: number;
  price: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

//  Modal Form

export interface VoucherFormProps {
  Kartu?: Kartu;
  onSubmit: (
    data: Omit<Kartu, "id" | "createdAt" | "updatedAt">
  ) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Table
export interface KartuTableProps {
  kartus: Kartu[];
  onEdit: (handphone: Kartu) => void;
  onDelete: (id: string) => void;
}

// Search
export interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  availableBrands: string[];
  kartus: Kartu[];
}
