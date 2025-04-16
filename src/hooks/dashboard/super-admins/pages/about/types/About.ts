export interface images {
  images: string;
  file?: File;
}

export interface countText {
  title: string;
  number: number;
}

export interface descriptionText {
  description: string;
}

export interface AboutContent {
  id?: string;
  title: string;
  description: descriptionText[];
  imageUrl: images[];
  count: countText[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentModalProps {
  formData: AboutContent;
  setFormData: (data: AboutContent) => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export interface DeleteModalProps {
  onDelete: () => void;
  isSubmitting: boolean;
  onClose: () => void;
}
