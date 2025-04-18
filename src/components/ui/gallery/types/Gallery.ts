export interface GalleryType {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryFilterProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export interface GalleryGridProps {
  items: GalleryType[];
  onImageSelect: (imageUrl: string) => void;
}

export interface GalleryModalProps {
  selectedImage: string | null;
  onClose: () => void;
}