import { ProductCardProp } from "../utils/types";

const ProductCard: React.FC<ProductCardProp> = ({ product, handleClick }) => {
  return (
    <div className="flex justify-center items-center flex-col bg-white p-4 shadow-md rounded">
      <img
        src={product.image}
        alt="product-image"
        className="w-full aspect-square object-cover"
      />
      <p className="w-full text-start mt-4 text-blue">{product.price} $</p>
      <p className="w-full text-start my-4">{product.name}</p>
      <button
        onClick={() => {
          handleClick(product);
        }}
        className="w-full bg-blue p-2 rounded text-white"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
