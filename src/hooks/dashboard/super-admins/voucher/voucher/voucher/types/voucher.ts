export interface voucher {
  id: string;
  title: string;
  brand: string;
  stock: number;
  price: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

// Modal Form

export interface VoucherFormProps {
  voucher?: voucher;
  onSubmit: (
    data: Omit<voucher, "id" | "createdAt" | "updatedAt">
  ) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Table

export interface VoucherTableProps {
  vouchers: voucher[];
  onEdit: (voucher: voucher) => void;
  onDelete: (id: string) => void;
}

// Search

export interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  availableBrands: string[];
  vouchers: voucher[];
}
