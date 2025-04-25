import { ProductType } from "@/hooks/pages/product/product/types/Product";

export interface LogoGridProps {
  products: ProductType[];
}

export interface ProductGridProps {
  products: ProductType[];
  typeCategory: string;
}
