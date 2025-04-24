export interface ProductType {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    photoURL: string;
    role: string;
    uid: string;
  };
  content: string;
  description: string;
  imageUrl: string;
  images: string[];
  price: number;
  sold: number;
  slug: string;
  icon: string;
  logo: string;
  status: string;
  stock: number;
  genreTitle: string;
  typeCategory: string;
  typeTitle: string;
}
