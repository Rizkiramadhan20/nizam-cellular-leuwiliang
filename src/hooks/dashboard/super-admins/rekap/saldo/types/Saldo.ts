export interface SaldoContent {
  id?: string;
  saldo: string;
  date: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SaldoFormData = Omit<
  SaldoContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: SaldoFormData = {
  saldo: "",
  date: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: SaldoFormData;
  setFormData: (data: SaldoFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting?: boolean;
}
