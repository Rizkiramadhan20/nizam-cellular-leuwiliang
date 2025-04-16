export interface ServiceContent {
  id?: string;
  title: string;
  text: string;
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ServiceFormData = Omit<
  ServiceContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: ServiceFormData = {
  title: "",
  text: "",
  description: "",
  imageUrl: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: ServiceFormData;
  setFormData: (data: ServiceFormData) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface DeleteModalProps {
  onConfirm: () => void;
  onClose: () => void;
}
