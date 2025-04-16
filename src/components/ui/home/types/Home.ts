export interface HomeType {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  description: string;
  button1: Button;
  button2: Button;
  typing: typingText[];
  createdAt: string;
  updatedAt: string;
}

export interface typingText {
  title: string;
}

export interface Button {
  href: string;
  text: string;
}
