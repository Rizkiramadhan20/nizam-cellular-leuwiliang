import { Timestamp } from "firebase/firestore";

export interface Project {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  images: string[];
  icon: string;
  slug: string;
  typeCategory: string;
  typeTitle: string;
  genreTitle: string;
  status: "draft" | "publish";
  content: string;
  stock: number;
  price: number;
  logo: string;
  author: {
    name: string;
    role: string;
    uid: string;
    photoURL: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  [key: `${string}.${string}`]: string | number | boolean | null | undefined;
}

export interface ProjectType {
  id: string;
  title: string;
  categoryTitle: string;
  genreTitle: string;
  createdAt: Timestamp;
}

export interface FormInputs {
  title: string;
  description: string;
  slug: string;
  typeCategory: string;
  typeTitle: string;
  genreTitle: string;
  status: "draft" | "publish";
  content: string;
  stock: number;
  price: number;
  authorId: string;
  icon: string;
  logo: string;
}

export interface ViewModalProps {
  viewProject: Project | null;
  onClose: () => void;
}

export interface ViewHeroProps {
  project: Project;
  onClose: () => void;
}

export interface ViewStatsProps {
  project: Project;
}

export interface ViewContentProps {
  project: Project;
}

export interface ViewSidebarProps {
  project: Project;
}

export interface ViewImagesProps {
  project: Project;
}

export interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  availableCategories: string[];
  availableGenres: string[];
  availableTypes: string[];
  projects: Project[];
}

export interface CardProps {
  project: Project;
  onView: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export interface DelateModalProps {
  projectToDelete: string | null;
  setProjectToDelete: (id: string | null) => void;
  isDeleting: boolean;
  setIsDeleting: (isDeleting: boolean) => void;
  onSuccess: () => void;
}

export interface DelateModalRef {
  showModal: () => void;
  closeModal: () => void;
}

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  editData: Project | null;
  editingId: string | null;
  projectTypes: ProjectType[];
  productIcons: { id: string; imageUrl: string }[];
  productLogo: { id: string; imageUrl: string }[];
  user: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    role?: string;
  } | null;
  onSuccess: () => Promise<void>;
}
