export interface UangLaciContent {
  id?: string;
  uangModal: string;
  pendapatan: string;
  UangLaba: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UangLaciFormData = Omit<
  UangLaciContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: UangLaciFormData = {
  uangModal: "",
  pendapatan: "",
  UangLaba: "",
  date: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: UangLaciFormData;
  setFormData: (data: UangLaciFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}
