export interface BannerContent {
    id?: string;
    imageUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ContentModalProps {
    formData: BannerContent;
    setFormData: (data: BannerContent) => void;
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
