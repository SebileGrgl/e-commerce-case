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
  handleClick: (params: ProductType) => void;
};

export type PaginationProp = {
  handleChange: (params: number) => void;
  pageCount: number;
};

export type ProductFilterItemProps = {
  type: "radio" | "checkbox";
  searchEnabled?: boolean;
  value: string | string[];
  label: string;
  options: Option[];
  onChange: (selectedValues: string | string[]) => void;
};

export type ProductFilterDrawerProps = {
  filters: { [key: string]: string | string[] };
  onFilterChange: (key: string, value: string | string[]) => void;
  parameters: FilterParametersType;
};

export type ProductFiltersProps = {
  onApplyFilters: (filters: { [key: string]: string | any }) => void;
  parameters: FilterParametersType;
};

type Option = {
  label: string;
  value: string;
};

export type FilterParametersType = {
  searchTerm: string;
  brands: Option[];
  models: Option[];
  sortBy: Option[];
};

export type CartItem = ProductType & {
  quantity: number;
};

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: ProductType) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
};

export type CartItemProps = {
  cartItem: CartItem;
};
