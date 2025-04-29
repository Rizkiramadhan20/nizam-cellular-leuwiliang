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
  currentPage?: number;
  itemsPerPage?: number;
  totalValue?: number;
  totalStock?: number;
}

// Search Filter
export interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  selectedOwner: string;
  setSelectedOwner: (value: string) => void;
  availableBrands: string[];
  availableOwners: string[];
  handphones: Handphone[];
}

// Modal Form

export interface HandphoneFormProps {
  handphone?: Handphone;
  onSubmit: (
    data: Omit<Handphone, "id" | "createdAt" | "updatedAt">
  ) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}
