export interface faqsText {
  title: string;
  description: string;
}

export interface FaqsContent {
  id?: string;
  title: string;
  faqs: faqsText[];
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: FaqsContent;
  setFormData: (data: FaqsContent) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
