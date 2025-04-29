export interface BrandPerdanaContent {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type BrandPerdanaContentFormData = Omit<
  BrandPerdanaContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: BrandPerdanaContentFormData = {
  title: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: BrandPerdanaContentFormData;
  setFormData: (data: BrandPerdanaContentFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isDeleting?: boolean;
}
