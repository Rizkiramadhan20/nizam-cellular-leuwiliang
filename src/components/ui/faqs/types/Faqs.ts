export interface FaqsType {
  id: string;
  title: string;
  imageUrl:string;
  faqs: FaqsList[];
  createdAt: string;
  updatedAt: string;
}

export interface FaqsList {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
} 

// FAQ Item Props

export interface FAQItemProps {
  faq: FaqsType;
  index: number;
}