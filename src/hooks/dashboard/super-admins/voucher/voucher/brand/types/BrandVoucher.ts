export interface BrandVoucherContent {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BrandVoucherContentFormData = Omit<
  BrandVoucherContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: BrandVoucherContentFormData = {
  title: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: BrandVoucherContentFormData;
  setFormData: (data: BrandVoucherContentFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isDeleting?: boolean;
}
