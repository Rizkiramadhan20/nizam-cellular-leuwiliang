import { ProductCategory } from "@/hooks/dashboard/super-admins/product/genre/lib/FetchProductGenre";

export interface ProductGenreContent {
  id?: string;
  title: string;
  categoryTitle: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductGenreFormData = Omit<
  ProductGenreContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: ProductGenreFormData = {
  title: "",
  categoryTitle: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: ProductGenreFormData;
  setFormData: (data: ProductGenreFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
  categories: ProductCategory[];
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}
