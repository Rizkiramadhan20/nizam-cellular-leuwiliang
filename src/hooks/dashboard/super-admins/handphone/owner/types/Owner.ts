export interface OwnerHandphoneContent {
  id?: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type OwnerHandphoneContentFormData = Omit<
  OwnerHandphoneContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: OwnerHandphoneContentFormData = {
  title: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: OwnerHandphoneContentFormData;
  setFormData: (data: OwnerHandphoneContentFormData) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
  isDeleting?: boolean;
}
