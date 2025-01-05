import { ProductCardProp } from "../utils/types";
import AddToCartBtn from "./AddToCartBtn";

const ProductCard: React.FC<ProductCardProp> = ({ product }) => {
  return (
    <div className="flex justify-center items-center flex-col bg-white p-4 shadow-md rounded">
      <img
        src={product.image}
        alt="product-image"
        className="w-full aspect-square object-cover"
      />
      <p className="w-full text-start mt-4 text-blue">{product.price} $</p>
      <p className="w-full text-start my-4">{product.name}</p>
      <AddToCartBtn />
    </div>
  );
};

export default ProductCard;
