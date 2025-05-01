export interface FaqsType {
  id: string;
  title: string;
  imageUrl: string;
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

export interface FaqItemProps {
  faq: {
    title: string;
    description: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export interface FaqsContentProps {
  faqs: Array<{
    title: string;
    faqs: Array<{
      title: string;
      description: string;
    }>;
  }>;
  activeTitle: string;
  expandedFaqs: { [key: string]: boolean };
  onToggleFaq: (faqId: string) => void;
}

export interface FaqsNavigationProps {
  faqs: Array<{
    title: string;
  }>;
  activeTitle: string;
  onTitleClick: (title: string) => void;
}
