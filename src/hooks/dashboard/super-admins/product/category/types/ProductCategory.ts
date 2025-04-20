export interface ProductCategoryContent {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductCategoryFormData = Omit<
  ProductCategoryContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: ProductCategoryFormData = {
  title: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: ProductCategoryFormData;
  setFormData: (data: ProductCategoryFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isDeleting?: boolean;
}
