export type ProductType = {
  brand: string;
  createdAt: string;
  description: string;
  image: string;
  model: string;
  name: string;
  id: string;
  price: number;
};

export type ProductListProps = {
  error: string | null;
  isLoading: boolean;
  productList: ProductType[];
};

export type ProductCardProp = {
  product: ProductType;
};

export type PaginationProp = {
  handleChange: (params: number) => void;
  pageCount: number;
};
