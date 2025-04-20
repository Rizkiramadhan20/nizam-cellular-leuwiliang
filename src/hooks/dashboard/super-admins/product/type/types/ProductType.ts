import { ProductType } from "@/hooks/dashboard/super-admins/product/type/lib/FetchProductType";

export interface ProductTypeContent {
  id?: string;
  title: string;
  genreTitle: string;
  categoryTitle: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductTypeFormData = Omit<
  ProductTypeContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: ProductTypeFormData = {
  title: "",
  genreTitle: "",
  categoryTitle: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: ProductTypeFormData;
  setFormData: (data: ProductTypeFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
  types: ProductType[];
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}
