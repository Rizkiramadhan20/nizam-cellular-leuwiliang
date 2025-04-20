export interface BlogType {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  slug: string;
  status: string;
  content: string;
  category: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  name: string;
  photoURL: string;
  role: string;
}

export interface TopBlogProps {
  blog: BlogType;
}

export interface BlogCardProps {
  blog: BlogType;
}

export interface BlogGridProps {
  blogs: BlogType[]
}

export interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategorySelect: (category: string) => void
}

export interface BlogBreadcrumbsProps {
  blog: BlogType
}

export interface RelatedArticlesProps {
  relatedArticles: BlogType[]
  currentSlug: string
}

export interface BlogHeroProps {
  blog: BlogType
}

export interface BlogFeaturedImageProps {
  blog: BlogType
}