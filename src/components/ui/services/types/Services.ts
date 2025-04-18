export interface ServicesType {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
}

// Service Card Props

export interface ServiceCardProps {
  service: ServicesType;
  isHidden: boolean;
  onTitleClick: (id: string) => void;
}
