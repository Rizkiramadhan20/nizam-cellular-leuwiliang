export interface AboutType {
  id: string;
  title: string;
  imageUrl: images[];
  description: descriptionText[];
  count: count[];
  createdAt: string;
  updatedAt: string;
}

export interface descriptionText {
  id: string;
  description: string;
}

export interface images {
  id: string;
  images: string;
}

export interface count {
  id: string;
  number: number;
  title: string;
}

// Number Card

export interface NumberCardProps {
  number: number;
  title: string;
}

// About Content

export interface AboutContentProps {
  about: AboutType[];
  inView: boolean;
}

// About Gallery

export interface AboutGalleryProps {
  about: AboutType[];
  inView: boolean;
}