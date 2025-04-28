export interface BrandHandphoneContent {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BrandHandphoneContentFormData = Omit<
  BrandHandphoneContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: BrandHandphoneContentFormData = {
  title: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: BrandHandphoneContentFormData;
  setFormData: (data: BrandHandphoneContentFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isDeleting?: boolean;
}
