export interface GalleryContent {
  id?: string;
  title: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type GalleryFormData = Omit<
  GalleryContent,
  "id" | "createdAt" | "updatedAt"
>;

export const initialFormData: GalleryFormData = {
  title: "",
  imageUrl: "",
};

export interface ContentModalProps {
  isEditing: boolean;
  formData: GalleryFormData;
  setFormData: (data: GalleryFormData) => void;
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
