import { Timestamp } from "firebase/firestore";

export interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  slug: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
  };
  description: string;
  status: "draft" | "published";
}

export interface Category {
  id: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CategoryWithTags extends Omit<Category, "nameTags"> {
  nameTags: string[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  slug: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
  };
  description: string;
  status: "draft" | "published";
}

export interface Category {
  id: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface BlogFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedStatus: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export interface ViewModalProps {
  article: Article | null;
  onClose: () => void;
}

export interface SearchAndFilterProps {
  filters: BlogFilters;
  categories: Category[];
  onFilterChange: (filters: BlogFilters) => void;
}

export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface ArticleCardProps {
  article: Article;
  onView: (article: Article) => void;
  onEdit: (article: Article) => void;
  onDelete: (id: string) => void;
}

export interface ArticleModalProps {
  article?: Article | null;
  onClose: () => void;
  onSuccess?: () => void;
}
